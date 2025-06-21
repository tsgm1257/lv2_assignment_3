import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../app/models/book.model";
import { Borrow } from "../app/models/borrow.model";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(book)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
        error: "Invalid MongoDB ObjectId",
      });
      return;
    }

    const existingBook = await Book.findById(book);
    if (!existingBook) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: "No book found with given ID",
      });
      return;
    }

    if (existingBook.copies < quantity) {
      res.status(400).json({
        message: "Not enough copies available",
        success: false,
        error: `Only ${existingBook.copies} copies left`,
      });
      return;
    }

    existingBook.copies -= quantity;
    existingBook.updateAvailability();
    await existingBook.save();

    const borrow = await Borrow.create({ book, quantity, dueDate });
    const { _id, createdAt, updatedAt } = borrow;

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: {
        _id,
        book,
        quantity,
        dueDate,
        createdAt,
        updatedAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Borrow failed",
      success: false,
      error: error.message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    const formattedSummary = summary.map((item) => ({
      book: item.book,
      totalQuantity: item.totalQuantity,
    }));

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: formattedSummary,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve summary",
      success: false,
      error: error.message,
    });
  }
});

export default router;

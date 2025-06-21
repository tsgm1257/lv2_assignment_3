import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../app/models/book.model";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    const {
      _id,
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
      createdAt,
      updatedAt,
    } = book;

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        _id,
        title,
        author,
        genre,
        isbn,
        description,
        copies,
        available,
        createdAt,
        updatedAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sort === "asc" ? 1 : -1;

    const books = await Book.find(query).sort(sortOptions).limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error: error.message,
    });
  }
});

router.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
        error: "Invalid MongoDB ObjectId",
      });
      return;
    }

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: "No book found with the given ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve book",
      success: false,
      error: error.message,
    });
  }
});

router.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
        error: "Invalid MongoDB ObjectId",
      });
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: "No book with the given ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update book",
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: "Invalid book ID",
        success: false,
        error: "Invalid MongoDB ObjectId",
      });
      return;
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({
        message: "Book not found",
        success: false,
        error: "No book found with the given ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to delete book",
      success: false,
      error: error.message,
    });
  }
});

export default router;

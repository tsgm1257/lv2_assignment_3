import { Schema, model, Document } from 'mongoose';

export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBookDocument extends IBook, Document {
  updateAvailability(): void;
}

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Instance method to update availability
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

export const Book = model<IBookDocument>('Book', bookSchema);

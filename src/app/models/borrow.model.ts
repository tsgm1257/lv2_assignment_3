import { Schema, model, Types } from 'mongoose';

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware: runs before a borrow is saved
borrowSchema.pre('save', function (next) {
  console.log('Borrow document is about to be saved. Book ID:', this.book);
  next();
});

// Post-save middleware: runs after a borrow is saved
borrowSchema.post('save', function (doc) {
  console.log('Borrow document saved. Borrow ID:', doc._id);
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);

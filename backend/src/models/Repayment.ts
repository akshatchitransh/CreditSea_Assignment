import mongoose from "mongoose";

const repaymentSchema = new mongoose.Schema(
  {
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["UPI", "BANK_TRANSFER", "CASH"],
      required: true,
    },

    utrNumber: {
      type: String,
      required: true,
      unique: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Repayment",
  repaymentSchema
);
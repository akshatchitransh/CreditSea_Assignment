import mongoose from "mongoose";

export enum LoanStatus {

  PENDING = "PENDING",

  SANCTIONED = "SANCTIONED",

  REJECTED = "REJECTED",

  DISBURSED = "DISBURSED",

  CLOSED = "CLOSED",
}

export interface ILoan
  extends mongoose.Document {

  borrowerId: mongoose.Types.ObjectId;

  principalAmount: number;

  tenureDays: number;

  interestRate: number;

  interestAmount: number;

  totalRepayment: number;

  totalPaid: number;

  outstandingAmount: number;

  status: LoanStatus;

  rejectionReason?: string;

  disbursedAt?: Date;
}

const loanSchema =
  new mongoose.Schema<ILoan>(
    {
      borrowerId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      principalAmount: {
        type: Number,

        required: true,
      },

      tenureDays: {
        type: Number,

        required: true,
      },

      interestRate: {
        type: Number,

        default: 12,
      },

      interestAmount: {
        type: Number,

        required: true,
      },

      totalRepayment: {
        type: Number,

        required: true,
      },

      totalPaid: {
        type: Number,

        default: 0,
      },

      outstandingAmount: {
        type: Number,

        required: true,
      },

      status: {
        type: String,

        enum: Object.values(
          LoanStatus
        ),

        default:
          LoanStatus.PENDING,
      },

      rejectionReason: {
        type: String,
      },

      disbursedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

const Loan =
  mongoose.model<ILoan>(
    "Loan",
    loanSchema
  );

export default Loan;
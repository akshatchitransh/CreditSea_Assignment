import mongoose from "mongoose";

export enum EmploymentMode {
  SALARIED = "SALARIED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
}

export interface IBorrowerProfile extends mongoose.Document {
  userId: mongoose.Types.ObjectId;

  fullName: string;

  pan: string;

  dob: Date;

  monthlySalary: number;

  employmentMode: EmploymentMode;

  salarySlipUrl?: string;

  brePassed: boolean;
}

const borrowerProfileSchema =
  new mongoose.Schema<IBorrowerProfile>(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      fullName: {
        type: String,
        required: true,
      },

      pan: {
        type: String,
        required: true,
      },

      dob: {
        type: Date,
        required: true,
      },

      monthlySalary: {
        type: Number,
        required: true,
      },

      employmentMode: {
        type: String,
        enum: Object.values(EmploymentMode),
        required: true,
      },

      salarySlipUrl: {
        type: String,
      },

      brePassed: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const BorrowerProfile = mongoose.model<IBorrowerProfile>(
  "BorrowerProfile",
  borrowerProfileSchema
);

export default BorrowerProfile;
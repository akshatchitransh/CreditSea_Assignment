import mongoose from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  SALES = "SALES",
  SANCTION = "SANCTION",
  DISBURSEMENT = "DISBURSEMENT",
  COLLECTION = "COLLECTION",
  BORROWER = "BORROWER",
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.BORROWER,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
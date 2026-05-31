import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User, {
  Role,
} from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI as string
    );

    await User.deleteMany({});

    const password =
      await bcrypt.hash(
        "password123",
        10
      );

    const users = [
      {
        name: "Admin",

        email: "admin@test.com",

        password,

        role: Role.ADMIN,
      },

      {
        name: "Sales",

        email: "sales@test.com",

        password,

        role: Role.SALES,
      },

      {
        name: "Sanction",

        email: "sanction@test.com",

        password,

        role: Role.SANCTION,
      },

      {
        name: "Disbursement",

        email:
          "disbursement@test.com",

        password,

        role: Role.DISBURSEMENT,
      },

      {
        name: "Collection",

        email:
          "collection@test.com",

        password,

        role: Role.COLLECTION,
      },

      {
        name: "Borrower",

        email:
          "borrower@test.com",

        password,

        role: Role.BORROWER,
      },
    ];

    await User.insertMany(users);

    console.log(
      "Seed completed successfully"
    );

    process.exit(0);
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedUsers();
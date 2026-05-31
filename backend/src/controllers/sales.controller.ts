import type{ Request, Response } from "express";

import User, {
  Role,
} from "../models/User.js";

import Loan from "../models/Loan.js";

export const getSalesLeads =
  async (
    req: Request,
    res: Response
  ) => {
    try {
  
      const borrowers =
        await User.find({
          role: Role.BORROWER,
        });

  
      const appliedLoanBorrowers =
        await Loan.distinct(
          "borrowerId"
        );

      
      const leads = borrowers.filter(
        (borrower) =>
          !appliedLoanBorrowers.some(
            (id) =>
              id.toString() ===
              borrower._id.toString()
          )
      );

      res.status(200).json({
        leads,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",

        error,
      });
    }
  };
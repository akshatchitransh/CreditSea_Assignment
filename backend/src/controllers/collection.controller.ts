import type {
  Request,
  Response,
} from "express";

import Loan, {
  LoanStatus,
} from "../models/Loan.js";

export const getActiveLoans =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const loans =
        await Loan.find({
          status:
            LoanStatus.DISBURSED,
        }).populate(
          "borrowerId",
          "name email"
        );

      res.status(200).json({
        loans,
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error,
      });
    }
  };
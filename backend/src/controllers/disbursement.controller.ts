import type{ Request, Response } from "express";

import Loan, {
  LoanStatus,
} from "../models/Loan.js";

export const getSanctionedLoans =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const loans = await Loan.find({
        status: LoanStatus.SANCTIONED,
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

export const disburseLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    if (
      loan.status !==
      LoanStatus.SANCTIONED
    ) {
      return res.status(400).json({
        message:
          "Only sanctioned loans can be disbursed",
      });
    }

    loan.status =
      LoanStatus.DISBURSED;

    loan.disbursedAt = new Date();

    await loan.save();

    res.status(200).json({
      message:
        "Loan disbursed successfully",

      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",

      error,
    });
  }
};
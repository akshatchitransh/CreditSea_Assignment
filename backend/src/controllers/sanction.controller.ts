import type {
  Request,
  Response,
} from "express";

import Loan, {
  LoanStatus,
} from "../models/Loan.js";

export const getPendingLoans = async (
  req: Request,
  res: Response
) => {

  try {

    const loans = await Loan.find({
      status: LoanStatus.PENDING,
    }).populate(
      "borrowerId",
      "name email role"
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

export const sanctionLoan = async (
  req: Request,
  res: Response
) => {

  try {

    const { loanId } = req.params;

    const {
      approved,
      rejectionReason,
    } = req.body;

    const loan =
      await Loan.findById(loanId);

    if (!loan) {

      return res.status(404).json({
        message: "Loan not found",
      });
    }

    // Already processed
    if (
      loan.status !==
      LoanStatus.PENDING
    ) {

      return res.status(400).json({
        message:
          "Loan already processed",
      });
    }

    // APPROVE
    if (approved) {

      loan.status =
        LoanStatus.SANCTIONED;
    }

    // REJECT
    else {

      loan.status =
        LoanStatus.REJECTED;

      loan.rejectionReason =
        rejectionReason ||
        "Loan rejected";
    }

    await loan.save();

    // RETURN UPDATED LOAN
    const updatedLoan =
      await Loan.findById(
        loan._id
      ).populate(
        "borrowerId",
        "name email role"
      );

    res.status(200).json({
      message: approved
        ? "Loan sanctioned successfully"
        : "Loan rejected successfully",

      loan: updatedLoan,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
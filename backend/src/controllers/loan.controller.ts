import type { Request, Response } from "express";

import Loan, { LoanStatus } from "../models/Loan.js";

import BorrowerProfile from "../models/BorrowerProfile.js";

import { calculateLoanDetails } from "../services/loan.service.js";

export const applyLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { principalAmount, tenureDays } =
      req.body;

    const user = (req as any).user;

   
    const borrowerProfile =
      await BorrowerProfile.findOne({
        userId: user.userId,
      });

    if (!borrowerProfile) {
      return res.status(404).json({
        message:
          "Borrower profile not found",
      });
    }

    
    if (!borrowerProfile.brePassed) {
      return res.status(400).json({
        message:
          "BRE validation not completed",
      });
    }

    
    if (
      principalAmount < 50000 ||
      principalAmount > 500000
    ) {
      return res.status(400).json({
        message:
          "Loan amount must be between 50K and 5L",
      });
    }

    
    if (
      tenureDays < 30 ||
      tenureDays > 365
    ) {
      return res.status(400).json({
        message:
          "Tenure must be between 30 and 365 days",
      });
    }

   
    const {
      interestRate,

      interestAmount,

      totalRepayment,
    } = calculateLoanDetails(
      principalAmount,

      tenureDays
    );

   
    const loan = await Loan.create({
      borrowerId: user.userId,

      principalAmount,

      tenureDays,

      interestRate,

      interestAmount,

      totalRepayment,

      outstandingAmount:
        totalRepayment,

      totalPaid: 0,

      status: LoanStatus.PENDING,
    });

    res.status(201).json({
      message:
        "Loan application submitted successfully",

      loan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",

      error,
    });
  }
};

export const getPendingLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: LoanStatus.PENDING,
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
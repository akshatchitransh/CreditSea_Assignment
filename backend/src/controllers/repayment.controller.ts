import type {
  Request,
  Response,
} from "express";
import Loan, {
  LoanStatus,
} from "../models/Loan.js";


import Repayment from "../models/Repayment.js";

export const repayLoan = async (
  req: Request,
  res: Response
) => {

  try {

    const { loanId } = req.params;

    const {
      amount,
      paymentMode,
      utrNumber,
    } = req.body;

    
    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {

      return res.status(404).json({
        message: "Loan not found",
      });
    }

    
    const existingUTR =
      await Repayment.findOne({
        utrNumber,
      });

    if (existingUTR) {

      return res.status(400).json({
        message:
          "UTR number already exists",
      });
    }

    
    if (amount <= 0) {

      return res.status(400).json({
        message:
          "Invalid repayment amount",
      });
    }

    
    const repayment =
      await Repayment.create({
        loan: loan._id,
        amount,
        paymentMode,
        utrNumber,
      });

  
    loan.totalPaid =
      (loan.totalPaid || 0) + amount;

    
    const outstanding =
      loan.totalRepayment -
      loan.totalPaid;

    
    if (outstanding <= 0) {

      loan.status = LoanStatus.CLOSED;
    }

    await loan.save();

    return res.status(200).json({
      message:
        "Repayment successful",

      repayment,

      outstanding,

      loanStatus: loan.status,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Repayment failed",
    });
  }
};
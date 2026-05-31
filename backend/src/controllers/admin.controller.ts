import type{ Request, Response } from "express";

import Loan, {
  LoanStatus,
} from "../models/Loan.js";

export const getDashboardStats =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      // Total loans
      const totalLoans =
        await Loan.countDocuments();

      // Status counts
      const pendingLoans =
        await Loan.countDocuments({
          status: LoanStatus.PENDING,
        });

      const sanctionedLoans =
        await Loan.countDocuments({
          status:
            LoanStatus.SANCTIONED,
        });

      const disbursedLoans =
        await Loan.countDocuments({
          status:
            LoanStatus.DISBURSED,
        });

      const closedLoans =
        await Loan.countDocuments({
          status: LoanStatus.CLOSED,
        });

      const rejectedLoans =
        await Loan.countDocuments({
          status:
            LoanStatus.REJECTED,
        });

      
      const disbursedAmountResult =
        await Loan.aggregate([
          {
            $match: {
              status:
                LoanStatus.DISBURSED,
            },
          },

          {
            $group: {
              _id: null,

              total: {
                $sum:
                  "$principalAmount",
              },
            },
          },
        ]);

      // Total collected amount
      const collectedAmountResult =
        await Loan.aggregate([
          {
            $group: {
              _id: null,

              total: {
                $sum: "$totalPaid",
              },
            },
          },
        ]);

      res.status(200).json({
        totalLoans,

        pendingLoans,

        sanctionedLoans,

        disbursedLoans,

        closedLoans,

        rejectedLoans,

        totalDisbursedAmount:
          disbursedAmountResult[0]
            ?.total || 0,

        totalCollectedAmount:
          collectedAmountResult[0]
            ?.total || 0,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",

        error,
      });
    }
  };
import type{ Request, Response } from "express";
import Loan from "../models/Loan.js";

import BorrowerProfile, {
  EmploymentMode,
} from ""../models/BorrowerProfile.js";

import { validateBRE } from "../services/bre.service.js";

export const createBorrowerProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      pan,
      dob,
      monthlySalary,
      employmentMode,
    } = req.body;

    const user = (req as any).user;

   
    const existingProfile =
      await BorrowerProfile.findOne({
        userId: user.userId,
      });

    if (existingProfile) {
      return res.status(400).json({
        message:
          "Borrower profile already exists",
      });
    }

  
    const breResult = validateBRE({
      dob,
      monthlySalary,
      pan,
      employmentMode,
    });

    
    if (!breResult.passed) {
      return res.status(400).json({
        message: "BRE validation failed",

        errors: breResult.errors,
      });
    }

  
    const borrowerProfile =
      await BorrowerProfile.create({
        userId: user.userId,

        fullName,

        pan,

        dob,

        monthlySalary,

        employmentMode,

        brePassed: true,
      });

    res.status(201).json({
      message:
        "Borrower profile created successfully",

      borrowerProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",

      error,
    });
  }
};

export const uploadSalarySlip = async (
  req: Request,
  res: Response
) => {
  try {
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

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    borrowerProfile.salarySlipUrl =
      req.file.path;

    await borrowerProfile.save();

    res.status(200).json({
      message:
        "Salary slip uploaded successfully",

      filePath: req.file.path,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",

      error,
    });
  }
};
export const getMyLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const loans = await Loan.find({
      borrowerId: user.userId,
    }).sort({
      createdAt: -1,
    });

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
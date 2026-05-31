import express from "express";
import { getMyLoans } from "../controllers/borrower.controller.js";
import { upload } from "../middleware/upload.middleware.js";

import { uploadSalarySlip } from "../controllers/borrower.controller.js";

import { createBorrowerProfile } from "../controllers/borrower.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.post(
  "/profile",
  authMiddleware,
  authorizeRoles(Role.BORROWER),
  createBorrowerProfile
);
router.post(
  "/upload-slip",

  authMiddleware,

  authorizeRoles(Role.BORROWER),

  upload.single("salarySlip"),

  uploadSalarySlip
);

router.get(
  "/my-loans",

  authMiddleware,

  authorizeRoles(Role.BORROWER),

  getMyLoans
);

export default router;
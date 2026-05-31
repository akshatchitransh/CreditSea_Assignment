import express from "express";

import {
  getPendingLoans,
  sanctionLoan,
} from "../controllers/sanction.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

/**
 * GET PENDING LOANS
 * Accessible by:
 * - SANCTION
 * - ADMIN
 */
router.get(
  "/pending",

  authMiddleware,

  authorizeRoles(
    Role.SANCTION,
    Role.ADMIN
  ),

  getPendingLoans
);

/**
 * APPROVE / REJECT LOAN
 * Accessible by:
 * - SANCTION
 * - ADMIN
 */
router.patch(
  "/:loanId",

  authMiddleware,

  authorizeRoles(
    Role.SANCTION,
    Role.ADMIN
  ),

  sanctionLoan
);

export default router;
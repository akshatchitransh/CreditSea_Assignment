import express from "express";
import {
  getPendingLoans,
} from "../controllers/loan.controller.js";

import { applyLoan } from "../controllers/loan.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.post(
  "/apply",

  authMiddleware,

  authorizeRoles(Role.BORROWER),

  applyLoan
);
router.get(
  "/pending",

  authMiddleware,

  authorizeRoles(
    Role.SANCTION,
    Role.ADMIN
  ),

  getPendingLoans
);

export default router;
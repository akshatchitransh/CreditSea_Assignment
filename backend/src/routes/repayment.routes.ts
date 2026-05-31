import express from "express";

import { repayLoan } from "../controllers/repayment.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.post(
  "/:loanId",

  authMiddleware,

  authorizeRoles(Role.COLLECTION),

  repayLoan
);

export default router;
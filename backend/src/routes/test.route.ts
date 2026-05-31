import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  authorizeRoles(Role.ADMIN),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/borrower",
  authMiddleware,
  authorizeRoles(Role.BORROWER),
  (req, res) => {
    res.json({
      message: "Welcome Borrower",
    });
  }
);

export default router;
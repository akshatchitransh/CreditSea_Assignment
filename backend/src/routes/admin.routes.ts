import express from "express";

import { getDashboardStats } from "../controllers/admin.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.get(
  "/dashboard",

  authMiddleware,

  authorizeRoles(Role.ADMIN),

  getDashboardStats
);

export default router;
import express from "express";

import {
  getActiveLoans,
}from "../controllers/collection.controller.js";



import { authMiddleware} from "../middleware/auth.middleware.js";

import { authorizeRoles } from "../middleware/role.middleware.js";

import { Role } from "../models/User.js";

const router = express.Router();

router.get(
  "/active",

  authMiddleware,

  authorizeRoles(
    Role.COLLECTION,
    Role.ADMIN
  ),

  getActiveLoans
);

export default router;
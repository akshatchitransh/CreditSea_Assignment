import type { Request, Response, NextFunction } from "express";

import { Role } from "../models/User.js";

export const authorizeRoles = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Check role access
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};
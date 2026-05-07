import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    res.sendStatus(401);
  }
};

export const ensureGuest = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(); // No token → guest allowed

  const token = authHeader.split(" ")[1];
  if (!token) return next();

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    if (payload.sub) {
      return res.status(403).json({ message: "Already authenticated" });
    }
    next();
  } catch {
    next(); // Invalid token → treat as guest
  }
};

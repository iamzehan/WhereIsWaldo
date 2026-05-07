import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
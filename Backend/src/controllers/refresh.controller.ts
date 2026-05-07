import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { signAccessToken } from "../utils/jwt.js";

export const refresh = (req: Request, res: Response) => {
  const token = req.session.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as {
      sub: string;
    };

    const accessToken = signAccessToken(payload.sub);
    res.json({ accessToken });
  } catch {
    res.sendStatus(401);
  }
};

import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try{
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: await hashPassword(password)
    }
  });
  res.status(201).json({ id: user.id });
} catch(err){
  res.status(500).json({message: err});
}
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  req.session.userId = user.id;
  req.session.refreshToken = refreshToken;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: (env.NODE_ENV==="development")? false : true,
    sameSite: (env.NODE_ENV==="development")? "lax": "none",
    path: "/api/auth/refresh"
  });

  res.json({ accessToken });
};

export const refresh =  (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
  const newAccessToken = signAccessToken(payload.sub);
  res.json({ accessToken: newAccessToken });
}
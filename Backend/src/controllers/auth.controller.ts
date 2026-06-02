import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        field: existingUser.username === username ? "username" : "email",
      });
    }

    // 2. Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
      },
    });

    return res.status(201).json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
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
  try{
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
  const newAccessToken = signAccessToken(payload.sub);
  res.json({ accessToken: newAccessToken });
  }catch(err){
    console.log(err);
  }
}


export const me = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      select: {username: true, email: true},
      where: {
        id:req.userId
      }
    })

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
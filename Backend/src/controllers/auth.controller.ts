import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password)
    }
  });

  res.status(201).json({ id: user.id });
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

  res.json({ accessToken });
};
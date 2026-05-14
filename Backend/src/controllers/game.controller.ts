import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games: Game[] = await prisma.game.findMany({
        include: {
            image: true,
            characters: {
                include: {
                    character: true
                },
            }
        }
    });
    return res.status(200).json(games);
  } catch (err) {
    return res.status(500).json({message: "Internal Server Error"});
  }
};

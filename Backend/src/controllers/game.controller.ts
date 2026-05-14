import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get list of all games
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

// Get one game level
export const getOneGame = async (req: Request, res: Response) => {
  const { play, level } = req.query;

  if (play !== "true") {
    return res.status(400).json({ message: "Invalid play mode" });
  }

  const parsedLevel = Number(level);
  if (Number.isNaN(parsedLevel)) {
    return res.status(400).json({ message: "Invalid level" });
  }

  try {
    const game = await prisma.game.findFirst({
      where: {
        level: parsedLevel,
      },
      include: {
        image: true,
        characters: {
          include: {
            character: true,
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    return res.status(200).json(game);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

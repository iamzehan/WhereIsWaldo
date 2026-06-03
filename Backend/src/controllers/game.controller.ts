import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { getDurationInSeconds } from "../utils/helpers.js";

// Get list of all games
export const getAllGames = async (req: Request, res: Response) => {
  try {
    const games: Game[] = await prisma.game.findMany({
      include: {
        image: true,
        characters: {
          include: {
            character: true
          }
        }
      }
    });
    return res.status(200).json(games);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get one game level
export const getOneGame = async (req: Request, res: Response) => {
  const { play, level } = req.query;
  const user_id = req.userId;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (play !== "true") {
    return res.status(400).json({ message: "Invalid play mode" });
  }

  const parsedLevel = Number(level);

  if (Number.isNaN(parsedLevel)) {
    return res.status(400).json({ message: "Invalid level" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const game = await tx.game.findFirst({
        where: {
          level: parsedLevel
        },
        include: {
          image: true,
          results: true,
          characters: {
            include: {
              character: true
            }
          }
        }
      });

      if (!game) {
        throw new Error("GAME_NOT_FOUND");
      }

      const log = await tx.logs.create({
        data: {
          user_id,
          game_id: game.id
        }
      });

      return {
        ...game,
        log_id: log.id,
        start: log.start
      };
    });
    return res.status(200).json({ ...result });
  } catch (err) {
    if (err instanceof Error && err.message === "GAME_NOT_FOUND") {
      return res.status(404).json({ message: "Game not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete log entry

export const cleanupLogs = async (req: Request, res: Response) => {
  try {
    const deleted = await prisma.logs.deleteMany({
      where: {
        end: null,
        user_id: req.userId
      }
    });

    return res.status(200).json({ deleted });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// submit results
export const submitResults = async (req: Request, res: Response) => {
  const { log_id, end, comment } = req.body;
  const user_id = req.userId;
  try {
    const response = await prisma.$transaction(async (tx) => {
      const log = await tx.logs.update({
        where: {
          id: log_id
        },
        data: {
          end: new Date(end)
        }
      });

      if (log.end && user_id) {
        // get total duration
        const duration = getDurationInSeconds(+log.start, +log.end);
        // add it to leaderboard
        await tx.leaderBoard.create({
          data: {
            user_id,
            game_id: log.game_id,
            comment,
            time: duration
          }
        });
      }
      return {
        log_id
      };
    });
    return res.status(200).json({ log_id: response.log_id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLeaderBoard = async (req: Request, res: Response) => {
  const game_id = Array.isArray(req.query.game_id)
    ? req.query.game_id[0]
    : typeof req.query.game_id === "string"
      ? req.query.game_id
      : undefined;
  // get the leaderboard result
  if (!game_id) {
    return res.status(404).json({ message: "Game not found" });
  }
  const leaderboard = await prisma.leaderBoard.findMany({
    where: {
      game_id
    },
    include: {
      user: {
        select: {
          username: true
        }
      }
    },
    orderBy: {
      time: "asc"
    }
  });
  const rankedLeaderboard = leaderboard.map((entry, index) => ({
    rank: index + 1,
    player: entry.user.username,
    time: entry.time,
    comment: entry.comment,
  }));
  return res.status(200).json(rankedLeaderboard);
};

import { env } from "../config/env";
export const getAllGames = async (): Promise<Array<Game>> => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/game/all`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }
  return res.json();
};

export const getOneGame = async (
  play: boolean,
  level: string,
  accessToken: string
): Promise<Game> => {
  const res = await fetch(
    `${env.VITE_BACKEND_URL}/api/game?play=${play}&level=${level}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    },
    
  );
  if(!res.ok){
    throw new Error();
  }
  return res.json();
};

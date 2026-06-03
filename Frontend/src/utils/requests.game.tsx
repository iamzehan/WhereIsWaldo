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


export const deleteOpenLogs = async (accessToken:string | null) => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/game/logs/cleanup`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to cleanup logs");
  }

  return res.json();
};

export const submitToLeaderBoard = async (log_id: string, end: number, comment: string, accessToken: string) => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/game/logs/submit`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({log_id, end, comment})
  });
  if(!res.ok) {
    throw new Error();
  }
  return res.json();
}

export const getLeaderBoard = async (game_id: string) => {
  const res = await fetch(`${env.VITE_BACKEND_URL}/api/game/leaderboard?game_id=${game_id}`, {
    method: "GET",
    credentials: "include"
  })
  if(!res.ok) {
    throw new Error();
  }
  return res.json();
}
"use server";

import { getRankLabel, getRankStyle } from "../utils/helper";
import { AccessTime } from "@mui/icons-material";
import { useGame, useIsMobile } from "../utils/hooks";
import { useEffect, useState } from "react";
import { getLeaderBoard } from "../utils/requests.game";
import GamePageError from "./GamePageError";
import { LeaderBoardSkeleton } from "./Skeletons";
interface LeaderboardEntry {
  rank: number;
  player: string;
  time: string;
  comment?: string;
}

export default function Leaderboard() {
  const { game_id, level } = useGame();
  const [data, setData] = useState<LeaderboardEntry[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      if (!game_id) return;
      try {
        setLoading(true);
        const leaderboard = await getLeaderBoard(game_id);
        setData(leaderboard)
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchLeaderBoard();
  }, [game_id]);

  if (!level) {
    return <p className="text-center mt-10">Level not found</p>;
  }
  if(isError){
    return <GamePageError message="Could not load leaderboard"/>
  }
  if(isLoading){
    return <LeaderBoardSkeleton/>
  }
  return (
    <div className="w-full mx-auto flex justify-center bg-white py-10">
      <div className="w-full xl:max-w-7xl md:max-w-5xl">
        <h1 className="text-2xl font-bold px-4 mb-6 text-black text-3xl!">
          Level - {level} Leaderboard
        </h1>

        {/* ================= MOBILE VIEW ================= */}
        {isMobile ? (
          <div className="space-y-3 px-4">
            {data?.map((row) => (
              <div
                key={row.rank}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col"
              >
                <div className="flex flex-col gap-2 justify-center items-center mb-2">
                  <div
                    className={`w-10 h-10 flex items-center justify-center font-bold ${getRankStyle(
                      row.rank,
                    )}`}
                  >
                    {getRankLabel(row.rank)}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-gray-800 text-2xl font-bold!">
                      {row.player}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row-reverse justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    {row.time}s <AccessTime fontSize="small" />
                  </span>

                  {row.comment && (
                    <span className=" inline-block max-w-xs px-3 py-2 text-sm text-gray-700 bg-gray-200 rounded-2xl rounded-bl-none">
                      {row.comment}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= DESKTOP TABLE ================= */
          <div className="overflow-hidden md:rounded-md xl:rounded-2xl shadow-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Rank</th>
                  <th className="px-6 py-3 text-left">Player</th>
                  <th className="px-6 py-3 text-left">Time</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {data?.map((row) => (
                  <tr
                    key={row.rank}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <div
                        className={`w-10 h-10 flex items-center justify-center font-bold ${getRankStyle(
                          row.rank,
                        )}`}
                      >
                        {getRankLabel(row.rank)}
                      </div>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-xs font-bold">
                        {row.player[0]}
                      </div>
                      <span className="font-medium text-gray-800">
                        {row.player}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-400/80 text-white p-1 rounded-full px-2 flex gap-1 items-center w-fit">
                        {row.time}s <AccessTime fontSize="small" />
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">{row.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

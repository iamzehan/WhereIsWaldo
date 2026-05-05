/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { useGame } from "../utils/hooks";
import { getDurationInSeconds } from "../utils/helper";

import {
  CheckCircleOutline,
  Coffee,
  Send,
  Share,
  Close,
} from "@mui/icons-material";

export default function LevelCompletedDialog() {
  const { complete, start } = useGame();

  const [comment, setComment] = useState("");
  const [end, setEnd] = useState<number | null>(null);

  // lock completion time once
  useEffect(() => {
    if (complete && !end) {
      setEnd(Date.now());
    }
  }, [complete, end]);

  // total duration calculation
  const time = useMemo(() => {
    if (!start || !end) return null;
    return getDurationInSeconds(start, end);
  }, [start, end]);

  if (!complete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 text-center border-b border-gray-100">
          {/* Icon */}
          <div className="flex justify-center mb-3 text-emerald-500">
            <CheckCircleOutline sx={{ fontSize: 42 }} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900">
            Level completed
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You finished the level successfully
          </p>

          {/* Time badge */}
          {time !== null && (
            <div className="mt-5 inline-flex items-center px-5 py-2 rounded-full bg-emerald-500 text-white font-medium shadow-md">
              {time}s
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Comment */}
          <div>
            <label className="text-sm text-gray-600">
              Leave a comment (optional)
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write something about this run..."
              className="mt-2 w-full h-28 resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Support text */}
          <p className="text-center text-sm text-gray-500">
            Enjoying the game? Support helps build new maps.
          </p>

          {/* Coffee button */}
          <button className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2.5 transition">
            Buy me a coffee
            <Coffee fontSize="small" />
          </button>
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 space-y-3 *:hover:cursor-pointer">
          <button className="w-full flex items-center justify-center gap-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 transition">
            Submit and continue
            <Send fontSize="small" />
          </button>

          <button className="w-full flex items-center justify-center gap-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition">
            Share result
            <Share fontSize="small" />
          </button>

          <button
            title="Close"
            className="
          absolute cursor-pointer top-5 right-5 border hover:text-red-500 rounded-full 
          flex items-center justify-center gap-5 text-sm text-gray-500 hover:text-gray-700 transition"
          >
            <Close fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}

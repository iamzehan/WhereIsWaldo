/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { useAuth, useGame } from "../utils/hooks";
import { getDurationInSeconds } from "../utils/helper";

import {
  CheckCircleOutline,
  Coffee,
  Send,
  Share,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { submitToLeaderBoard } from "../utils/requests.game";

type Status = "Success" | "Error" | "Pending";

export default function LevelCompletedDialog() {
  const { complete, start, data } = useGame();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmit] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>();
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
    return getDurationInSeconds(+start, end);
  }, [start, end]);

  // submit results
  const submitResults = async () => {
    try {
      setSubmit(true);
      setStatus("Pending");
      if (data && end && accessToken)
        await submitToLeaderBoard(data?.log_id, end, comment, accessToken);
      setSubmit(false);
      setStatus("Success");
      return;
    } catch (err) {
      console.log(err);
      setStatus("Error");
      setSubmit(false);
    }
  };

  if (!complete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-md md:mx-4 md:rounded-2xl bg-white shadow-2xl overflow-hidden">
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
          {/* Submit status */}
          {status === "Error" ? (
            <p className="text-red-600"> Couldn't Submit Data try again! </p>
          ) : status === "Pending" ? (
            <p className="text-yellow-500"> Pending... </p>
          ) : status === "Success" ? (
            <p className="text-green-500">Successfully submitted </p>
          ) : null}
          
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
          <button
            onClick={() => submitResults()}
            disabled={submitting}
            aria-disabled={submitting}
            className={
              "w-full flex items-center justify-center gap-5 rounded-xl font-medium py-3 transition " +
              (submitting
                ? "bg-emerald-400 text-white opacity-70 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white")
            }
          >
            {submitting ? "Submitting..." : "Submit and continue"}
            <Send fontSize="small" />
          </button>

          <button
            className={
              "w-full flex items-center justify-center gap-5 rounded-xl font-medium py-3 transition " +
              (submitting
                ? "bg-blue-400 text-white opacity-70 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white")
            }
            disabled={submitting}
            aria-disabled={submitting}
          >
            Share result
            <Share fontSize="small" />
          </button>

          <button
            onClick={() => navigate("/")}
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

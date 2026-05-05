import { useState } from "react";
import { useGame } from "../utils/hooks";
export default function LevelCompletedDialog() {
  const [comment, setComment] = useState("");
  const {complete} = useGame(); 
  if (!complete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[420px] rounded-xl bg-white p-6 shadow-xl">
        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-black">
          🎉 Level Completed!
        </h2>

        {/* Comment box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment (optional)..."
          className="mt-4 placeholder:text-gray-500 border-gray-500/50 w-full h-28 resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Support text */}
        <p className="text-center text-green-600 text-sm font-medium mt-5">
          Like The Game? A Coffee Helps Support Future Maps ☕
        </p>

        {/* Coffee button */}
        <div className="mt-3 flex justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow">
            ☕ Buy me a coffee
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            //onClick={onNext}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
          >
            Submit & Play Next Level
          </button>

          <button
            // onClick={onShare}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            📤 Share Score
          </button>

          <button
            //onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
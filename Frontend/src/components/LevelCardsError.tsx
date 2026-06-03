import { AlertCircle, RefreshCw } from "lucide-react";

type LevelCardsErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export default function LevelCardsError({
  message = "Failed to load levels.",
  onRetry,
}: LevelCardsErrorProps) {
  return (
    <div className="grid place-items-center w-screen min-h-[50vh] px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center space-y-4 border">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Something went wrong
        </h2>

        <p className="text-gray-600">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
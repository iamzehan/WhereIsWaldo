import { AlertCircle, RefreshCw } from "lucide-react";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function GamePageError({
  message = "Failed to load game.",
  onRetry,
}: Props) {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl border p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500 h-12 w-12" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
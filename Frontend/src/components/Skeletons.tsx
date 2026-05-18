export function LevelCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-[80vw] p-10 gap-2 w-screen">
      {[...Array(6)].map((_, index) => (
        <article
          key={index}
          className="w-full shadow-lg rounded-lg overflow-hidden animate-pulse bg-white"
        >
          {/* Main image skeleton */}
          <div className="w-full h-52 bg-gray-300" />

          <div className="p-4 space-y-4">
            {/* Title + badge */}
            <div className="flex items-center gap-3">
              <div className="h-6 w-24 bg-gray-300 rounded" />
              <div className="h-5 w-16 bg-gray-300 rounded-full" />
            </div>

            {/* Character avatars */}
            <div className="flex gap-2 justify-center">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


import { useIsMobile } from "../utils/hooks";

export function GamePageSkeleton() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col w-screen animate-pulse">
      {/* AVAILABLE CHARS */}
      <div
        className={`flex w-full justify-center p-10 gap-10 ${
          isMobile ? "sticky top-0 gap-2" : ""
        }`}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative flex flex-col gap-2 items-center"
          >
            <div className="h-15 w-15 rounded-full bg-gray-300" />
            <div className="h-5 w-14 rounded-full bg-gray-200" />
          </div>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="overflow-x-auto flex md:justify-center px-4">
        <div className="w-full max-w-7xl h-[500px] md:h-[700px] bg-gray-300 rounded-lg" />
      </div>

      {/* LEADERBOARD */}
      <div className="w-full mx-auto flex justify-center bg-white py-10">
        <div className="w-full xl:max-w-7xl md:max-w-5xl px-4 space-y-6">
          <div className="h-8 w-72 bg-gray-300 rounded" />

          {isMobile ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 shadow-sm space-y-3"
                >
                  <div className="h-10 w-10 bg-gray-300 rounded-full mx-auto" />
                  <div className="h-5 w-32 bg-gray-300 rounded mx-auto" />
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl shadow-xl border">
              <div className="space-y-4 p-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 gap-6 items-center"
                  >
                    <div className="h-10 w-10 bg-gray-300 rounded-full" />
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
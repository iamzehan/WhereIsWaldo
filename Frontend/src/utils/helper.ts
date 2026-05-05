import levels from "../data/levels";

// Find the current level info
export const getLevel = (level: number) => {
  const result = levels.find((lvl) => {
    return lvl.level === level;
  });
  return result;
};

// Rank Styles
export function getRankStyle(rank: number) {
  switch (rank) {
    case 1:
      return "bg-yellow-400 text-yellow-900 rounded-full ring-yellow-200 text-2xl";
    case 2:
      return "bg-gray-300 text-gray-800 rounded-full ring-gray-200 text-2xl";
    case 3:
      return "bg-orange-400 text-orange-900 rounded-full ring-orange-200 text-2xl";
    default:
      return "text-gray-500 text-xl";
  }
}

// Rank Labels
export function getRankLabel(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `${rank}`;
}

// Distance Calculator
import { results } from "../data/results";

export function MatchCharacterPosition({
  data,
}: {
  data: { level: number; results: CharacterPositions };
}): boolean {
  const tolerance = 0.02;

  const characterPosition = results
    .find((res) => res.level === data.level)
    ?.results.find((res) => res.name === data.results.name);

  if (!characterPosition) return false;

  const selectedX = data.results.x;
  const selectedY = data.results.y;

  const actualX = characterPosition.x;
  const actualY = characterPosition.y;

  const distX = selectedX - actualX;
  const distY = selectedY - actualY;

  const distSquared = distX * distX + distY * distY;

  return distSquared <= tolerance * tolerance;
}

// sound effects player
export const playSound = (res: string) => {
  const audio = res==="correct" ? new Audio("/sounds/correct.mp3") : new Audio("/sounds/wrong.mp3");
  audio.play();
};

// Time calculation 
export function getDurationInSeconds(start: number, end: number): number {
  return Math.round(((end - start) / 1000) * 10) / 10;
}
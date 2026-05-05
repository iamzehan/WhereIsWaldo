import levels from "../data/levels";

export const createLink = (str: string) => {
  const result = str.replace(/\s+/g, "").toLowerCase();
  return `/${result}`;
};

export const getLevel = (str: string) => {
  const result = levels.find((lvl) => {
    return lvl.level.replace(/\s+/g, "").toLowerCase() === str;
  });
  return result;
};

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

export function getRankLabel(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `${rank}`;
}
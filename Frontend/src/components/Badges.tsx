const styles: Record<Difficulty, string> = {
  Easy: "bg-green-500 text-white",
  Medium: "bg-yellow-500 text-white",
  Hard: "bg-red-500 text-white",
};

export default function Badge({ level }: BadgeProps) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}
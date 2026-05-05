import { useIsMobile } from "../utils/hooks";

export default function AvailableChars({ data }: { data: Level | null}) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex gap-10 w-full justify-center p-10 ${isMobile ? "sticky top-0 gap-2!" : ""}`}
    >
      {data?.characters.map((chars) => {
        return (
          <img
            src={chars.image}
            alt={chars.name}
            className="h-15 rounded-full bg-white shadow-sm"
          />
        );
      })}
    </div>
  );
}

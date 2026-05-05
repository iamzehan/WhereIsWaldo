import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLevel } from "../utils/helper";
import Leaderboard from "../components/LeaderBoard";
import { useIsMobile } from "../utils/hooks";

export default function Page() {
  const [data, setData] = useState<Level | null>(null);
  const { level } = useParams<string>();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (level) {
      const levelData = getLevel(level);
      setData(levelData || null);
    }
  }, [level]);

  return (
    <div className="flex flex-col">
      {/* Characters */}
      <div className={`flex gap-10 w-full justify-center p-10 ${isMobile? "sticky top-0 gap-2!": ""}`}>
        {data?.characters.map((chars) => {
          return <img src={chars.image} alt={chars.name} className="h-15 rounded-full bg-white shadow-sm" />;
        })}
      </div>
      {/* Main Image */}
      <div className="w-full overflow-x-auto flex md:justify-center xl:justify-center">
        <img
          src={data?.image}
          alt={`${level}_image`}
          className="max-w-none md:w-5xl xl:w-7xl sm:w-full border-1 border-gray-200"
        />
      </div>
      {/* Leader board */}
      <Leaderboard />
    </div>
  );
}

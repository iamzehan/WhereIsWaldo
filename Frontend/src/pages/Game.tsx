import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLevel } from "../utils/helper";
import Leaderboard from "../components/LeaderBoard";

export default function Page() {
  const [data, setData] = useState<Level | null>(null);
  const { level } = useParams<string>();

  useEffect(() => {
    if (level) {
      const levelData = getLevel(level);
      setData(levelData || null);
    }
  }, [level]);

  return (
    <div className="flex flex-col w-screen justify-center">
      <div className="flex gap-10 w-full justify-center p-10 shadow-sm">
        {data?.characters.map((chars) => {
          return <img src={chars.image} alt={chars.name} className="h-15" />;
        })}
      </div>
      {/* Main Image */}
      <img src={data?.image} alt={level + "_" + "image"}/>
      {/* Leader board */}
      <Leaderboard/>
    </div>
  );
}

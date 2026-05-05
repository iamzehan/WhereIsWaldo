import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLevel } from "../utils/helper";
import Leaderboard from "../components/LeaderBoard";
import { useIsMobile } from "../utils/hooks";
import MainImage from "../components/MainImage";
import AvailableChars from "../components/AvailableCharacter";

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
      <AvailableChars data={data} />
      {/* Main Image */}
      <MainImage data={data} />
      {/* Leader board */}
      <Leaderboard />
    </div>
  );
}

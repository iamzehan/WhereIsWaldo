import Leaderboard from "../components/LeaderBoard";
import MainImage from "../components/MainImage";
import AvailableChars from "../components/AvailableCharacter";
import { GameProvider } from "../utils/GameContext";
import LevelCompletedDialog from "../components/LevelComplete";

export default function Page() {
  return (
    <GameProvider>
      <div className="flex flex-col w-screen">
        {/* Characters */}
        <AvailableChars  />
        {/* Main Image */}
        <MainImage/>
        {/* Leader board */}
        <Leaderboard />
      </div>
      <LevelCompletedDialog/>
    </GameProvider>
  );
}

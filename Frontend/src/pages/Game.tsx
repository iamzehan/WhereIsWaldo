import Leaderboard from "../components/LeaderBoard";
import MainImage from "../components/MainImage";
import AvailableChars from "../components/AvailableCharacter";
import { GameProvider } from "../utils/GameContext";
import LevelCompletedDialog from "../components/LevelComplete";
import { useGame } from "../utils/hooks";
import { GamePageSkeleton } from "../components/Skeletons";
import GamePageError from "../components/GamePageError";

export default function Page() {
  return (
    <GameProvider>
      <GameComp />
      <LevelCompletedDialog />
    </GameProvider>
  );
}

function GameComp() {
  const {isLoading, isError} = useGame();
  if(isLoading) {
    return <GamePageSkeleton/>
  }
  if(isError) {
    return <GamePageError/>
  }
  return (
    <div className="flex flex-col w-screen">
      {/* Characters */}
      <AvailableChars />
      {/* Main Image */}
      <MainImage />
      {/* Leader board */}
      <Leaderboard />
    </div>
  );
}

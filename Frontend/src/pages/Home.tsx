import LevelCards from "../components/LevelCards";
import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "../utils/requests.game";
import { LevelCardsSkeleton } from "../components/Skeletons";
import LevelCardsError from "../components/LevelCardsError";

export default function Page() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["games"],
    queryFn: getAllGames,
  });
  if (isLoading) {
    return <LevelCardsSkeleton/>
  }

  if (error) {
    return <LevelCardsError/>
  }

  if(data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-[80vw] p-10 gap-2 w-screen">
      <LevelCards levels={data}/>
    </div>
  );
}


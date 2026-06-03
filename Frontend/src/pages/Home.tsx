import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllGames, deleteOpenLogs } from "../utils/requests.game";
import LevelCards from "../components/LevelCards";
import { LevelCardsSkeleton } from "../components/Skeletons";
import LevelCardsError from "../components/LevelCardsError";
import { useAuth } from "../utils/hooks";

export default function Page() {
  const { accessToken } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: getAllGames,
  });

  const cleanupMutation = useMutation({
    mutationFn: deleteOpenLogs,
  });

  useEffect(() => {
    cleanupMutation.mutate(accessToken);
  }, []);

  if (isLoading) return <LevelCardsSkeleton />;
  if (error) return <LevelCardsError />;
  if (data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 w-[80vw] p-10 gap-2 w-screen">
        <LevelCards levels={data} />
      </div>
    );
  }
}

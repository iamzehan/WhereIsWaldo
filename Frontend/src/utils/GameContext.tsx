import { createContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "./requests.game";
import { useAuth } from "./hooks";

type GameContextType = {
  data: Game | null;
  selected: CharSelection[];
  setSelected: Setter<CharSelection[]>;
  complete: boolean;
  start?: Date | null;
  end?: number | null;
  setEnd: Setter<number | null>; 
  isLoading: boolean;
  isError: boolean;
  game_id?: string | null;
  level?: string | null;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Game | null>(null);
  const [selected, setSelected] = useState<CharSelection[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { accessToken } = useAuth();
  const [game_id, setGameId] = useState<string|null>(null)

  // Start end
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<number | null> (null);

  const { level } = useParams();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!level) return;

      setLoading(true);
      setError(false);

      try {
        const lvl = level.split("+")[1];
        if (accessToken) {
          const res = await getOneGame(true, lvl, accessToken);

          if (mounted) {
            setData(res);
            
            setStart(new Date(res.start))
            setGameId(res.id)
          }
        }
      } catch {
        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [level]);

  const complete = useMemo(() => {
    return !!data && data.characters.length === selected.length;
  }, [data, selected]);

  return (
    <GameContext.Provider
      value={{
        data,
        selected,
        setSelected,
        complete,
        start,
        end,
        setEnd,
        isLoading,
        isError,
        game_id,
        level
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;

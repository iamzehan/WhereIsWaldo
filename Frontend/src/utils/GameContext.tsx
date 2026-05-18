import { createContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "./requests.game";

type GameContextType = {
  data: Game | null;
  selected: CharSelection[];
  setSelected: React.Dispatch<React.SetStateAction<CharSelection[]>>;
  complete: boolean;
  start: number;
  isLoading: boolean;
  isError: boolean;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Game | null>(null);
  const [selected, setSelected] = useState<CharSelection[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [start] = useState(Date.now());

  const { level } = useParams();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!level) return;

      setLoading(true);
      setError(false);

      try {
        const lvl = level.split("+")[1];
        
        const res = await getOneGame(true, lvl);

        if (mounted) {
          setData(res);
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
        isLoading,
        isError,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
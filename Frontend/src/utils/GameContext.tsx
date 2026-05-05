import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLevel } from "./helper";

type GameContextType = {
  data: Level | null;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  complete: boolean;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Level | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [complete, setComplete] = useState<boolean>(false);

  const { level } = useParams<string>();

  useEffect(() => {
    if (level) {
      const lvl = parseInt(level.split("+")[1]);
      const levelData = getLevel(lvl);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(levelData || null);
    }
  }, [level]);

  useEffect(()=> {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if(data?.characters.length===selected.length) setComplete(true);
  }, [selected,data])

  return (
    <GameContext.Provider value={{ data, selected, setSelected, complete }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
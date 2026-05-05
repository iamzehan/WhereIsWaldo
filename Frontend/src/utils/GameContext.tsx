/* eslint-disable react-hooks/purity */
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLevel } from "./helper";


type GameContextType = {
  data: Level | null;
  selected: CharSelection[];
  setSelected: React.Dispatch<React.SetStateAction<CharSelection[]>>;
  complete: boolean;
  start: number;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Level | null>(null);
  const [selected, setSelected] = useState<CharSelection[]>([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [start] = useState<number>(Date.now());
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
    <GameContext.Provider value={{ data, selected, setSelected, complete, start }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
import { useParams } from "react-router-dom";
import { MatchCharacterPosition } from "../utils/helper";

interface PropsType {
  point: {
    x: number;
    y: number;
  } | null;
  open: boolean;
  data: Level | null;
  selected: string[];
  setSelected: Setter<string[]>;
  setOpen: Setter<boolean>;
}
export default function CharactersDropDown({ props }: { props: PropsType }) {
  const { point, open, data, selected, setSelected, setOpen } = props;
  const { level } = useParams<string>();
  const handleSelect = (name: string) => {
    if (!point) return;
    const lvl = parseInt(level?.split("+")[1] ?? "0", 10);
    const payload = { level: lvl, results: { name, x: point.x, y: point.y } };
    const match = MatchCharacterPosition({ data: payload });
    if (match) {
      console.log("Match!");
      setSelected([...selected, name]);
      setOpen(false);
      console.log(selected);
      return;
    } else {
      console.log(selected)
      setOpen(false);
      console.log("No match");
    }
  };

  return (
    <>
      {/* Dropdown */}
      {open && point && (
        <div
          className="absolute z-10 bg-white border shadow-md rounded-xl w-45 text-xl"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            transform: "translate(10%, 10%)", // centers & lifts above click
          }}
        >
          {data?.characters.map((char: Character, index: number) => {
            if (!selected.includes(char.name))
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(char.name)}
                  className="px-3 py-1 border-b border-b-gray-200 hover:bg-gray-100 cursor-pointer text-black flex items-center 
              justify-center gap-5"
                >
                  <img
                    src={char.image}
                    className="h-10 rounded-full"
                    alt={char.name}
                  />
                  {char.name}
                </div>
              );
          })}
        </div>
      )}
    </>
  );
}

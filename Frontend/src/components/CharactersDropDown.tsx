import { useParams } from "react-router-dom";
import { MatchCharacterPosition } from "../utils/helper";
import { useIsMobile } from "../utils/hooks";

interface PropsType {
  point: { x: number; y: number } | null;
  open: boolean;
  data: Level | null;
  selected: string[];
  setSelected: Setter<string[]>;
  setOpen: Setter<boolean>;
}

export default function CharactersDropDown({ props }: { props: PropsType }) {
  const { point, open, data, selected, setSelected, setOpen } = props;
  const isMobile = useIsMobile();
  const { level } = useParams<string>();

  const handleSelect = (name: string) => {
    if (!point) return;

    const lvl = parseInt(level?.split("+")[1] ?? "0", 10);
    const payload = {
      level: lvl,
      results: { name, x: point.x, y: point.y },
    };

    const match = MatchCharacterPosition({ data: payload });

    if (match) {
      setSelected([...selected, name]);
    }

    setOpen(false);
  };

  if (!open || !data) return null;

  return (
    <>
      {/* DESKTOP DROPDOWN */}
      {!isMobile && point && (
        <div
          className="absolute z-10 bg-white border shadow-md rounded-xl w-45 text-xl"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            transform: "translate(10%, 10%)",
          }}
        >
          {data.characters.map((char: Character, index: number) =>
            !selected.includes(char.name) ? (
              <div
                key={index}
                onClick={() => handleSelect(char.name)}
                className="px-3 py-1 border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-black flex items-center justify-center gap-5"
              >
                <img
                  src={char.image}
                  className="h-10 rounded-full"
                  alt={char.name}
                />
                {char.name}
              </div>
            ) : null,
          )}
        </div>
      )}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* drawer wrapper */}
          <div
            className={`
        absolute bottom-0 left-0 right-0
        w-full 
        bg-white rounded-t-2xl
        p-4
        h-[50vh] overflow-y-hidden
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-y-0" : "translate-y-full"}
      `}
          >
            {/* handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

            {data.characters.map((char: Character, index: number) =>
              !selected.includes(char.name) ? (
                <div
                  key={index}
                  onClick={() => handleSelect(char.name)}
                  className="px-3 py-3 border-b border-gray-200 active:bg-gray-100 cursor-pointer text-black flex items-center justify-between gap-4"
                >
                  <img
                    src={char.image}
                    className="h-10 w-10 rounded-full"
                    alt={char.name}
                  />
                  <span>{char.name}</span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      )}
    </>
  );
}

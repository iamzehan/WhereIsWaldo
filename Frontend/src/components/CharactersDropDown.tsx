import { getDurationInSeconds, MatchCharacterPosition, playSound } from "../utils/helper";
import { useGame, useIsMobile, useToast } from "../utils/hooks";

interface PropsType {
  point: { x: number; y: number } | null;
  open: boolean;
  data: Game | null;
  selected: CharSelection[];
  setSelected: Setter<CharSelection[]>;
  setOpen: Setter<boolean>;
  onCorrect: (point: { x: number; y: number }) => void;
}

export default function CharactersDropDown({ props }: { props: PropsType }) {
  const {
    point,
    open,
    data,
    selected,
    setSelected,
    setOpen,
    onCorrect,
  } = props;

  const isMobile = useIsMobile();
  const toast = useToast();
  const {start} = useGame();

  const handleSelect = (name: string, char_id:string, img:string, ) => {
    if (!point || !data) return;

    const match = MatchCharacterPosition({
      data: {
        results: { char_id, x: point.x, y: point.y },
        answers: data.results
      },
    });

    if (match) {
      // eslint-disable-next-line react-hooks/purity
      const end = Date.now();
      const time = getDurationInSeconds(start, end);
      setSelected((prev) => [...prev, {name, time}]);

      toast(`You found ${name}`, "success", img);
      playSound("correct");

      // Correct answer shows confetti celebration
      onCorrect(point);
    } else {
      toast(`${name} is not here`, "error", img);
      playSound("wrong");
    }

    setOpen(false);
  };

  if (!open || !data || !point) return null;

  return (
    <>
      {/* DESKTOP dropdown */}
      {!isMobile && (
        <div
          className="absolute z-10 bg-white border shadow-md rounded-xl w-44 text-lg"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`,
            transform: "translate(10%, 10%)",
          }}
        >
          {data.characters.map((char: CharactersOnGame, index: number) =>
            !selected.find(sel=> sel.name===char.character.name) ? (
              <div
                key={index}
                onClick={() => handleSelect(char.character.name, char.char_id, char.character.image)}
                className="px-3 py-2 border-b border-gray-200 first:rounded-t-[inherit] last:rounded-b-[inherit] last:border-b-0 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
              >
                <img
                  src={char.character.image}
                  className="h-10 w-10 rounded-full"
                  alt={char.character.name}
                />
                <span className="text-black">{char.character.name}</span>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* MOBILE Drawer */}
      {isMobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 h-[50vh]">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

            {data.characters.map((char: CharactersOnGame, index: number) =>
              !selected.find(sel=> sel.name===char.character.name) ? (
                <div
                  key={index}
                  onClick={() => handleSelect(char.character.name, char.char_id, char.character.image)}
                  className="px-3 py-3 border-b border-gray-200 last:border-b-0 active:bg-gray-100 cursor-pointer flex items-center justify-between"
                >
                  <img
                    src={char.character.image}
                    className="h-16 w-16 rounded-full"
                    alt={char.character.name}
                  />
                  <span className="text-xl font-semibold text-black">
                    {char.character.name}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </>
  );
}
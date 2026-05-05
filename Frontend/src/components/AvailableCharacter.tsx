import { useGame, useIsMobile } from "../utils/hooks";
import { CheckCircle } from "@mui/icons-material";

export default function AvailableChars() {
  const isMobile = useIsMobile();
  const {selected, data} = useGame();
  return (
    <div
      className={`flex w-full z-10 justify-center p-10 gap-10 ${
        isMobile ? "sticky top-0 gap-2" : ""
      }`}
    >
      {data?.characters.map((chars) => {
        const isSelected = selected.find(sel=> sel.name===chars.name);
        return (
          <div key={chars.name} className="relative flex flex-col gap-1 items-center justify-center">
            <img
              src={chars.image}
              alt={chars.name}
              className={`h-15 bg-white shadow-sm border ${
                isSelected ? "border-2 border-green-500 grayscale rounded-md " : "border-transparent rounded-full"
              }`}
            />

            {isSelected && (
              <CheckCircle
                fontSize="medium"
                className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full"
              />
            )}
            {isSelected && <span className="text-green-500 text-md font-medium">{isSelected.time}s</span>}
          </div>
        );
      })}
    </div>
  );
}
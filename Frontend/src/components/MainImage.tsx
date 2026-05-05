import { useRef, useState, useEffect } from "react";
import CharactersDropDown from "./CharactersDropDown";
import { useGame, useIsMobile } from "../utils/hooks";
import CelebrateSVG from "./CelebrateSVG";

type ClickPoint = {
  x: number;
  y: number;
};

export default function MainImage() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();

  const [point, setPoint] = useState<ClickPoint | null>(null);
  const [open, setOpen] = useState(false);

  // 🔥 celebration state lives HERE
  const [celebratePoint, setCelebratePoint] = useState<ClickPoint | null>(null);

  const { selected, setSelected, data } = useGame();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPoint({ x, y });
    setOpen(true);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="overflow-x-auto flex md:justify-center">
      <div className={`relative ${isMobile? "inline-block" : ""}`}>
        {/* IMAGE */}
        <img
          ref={imgRef}
          onClick={handleClick}
          src={data?.image}
          alt={`Level-${data?.level} image`}
          className="max-w-none md:w-5xl xl:w-7xl sm:w-full cursor-crosshair"
        />

        {/* ✅ OVERLAY now tied to IMAGE */}
        {celebratePoint && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${celebratePoint.x * 100}%`,
              top: `${celebratePoint.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <CelebrateSVG />
          </div>
        )}
      

      {/* DROPDOWN */}
      <CharactersDropDown
        props={{
          open,
          point,
          data,
          selected,
          setSelected,
          setOpen,

          // 🔥 pass handler DOWN
          onCorrect: (p: ClickPoint) => {
            setCelebratePoint(p);

            setTimeout(() => {
              setCelebratePoint(null);
            }, 1500);
          },
        }}
      />
      </div>
    </div>
  );
}

import { useRef, useState, useEffect } from "react";
import CharactersDropDown from "./CharactersDropDown";
import { useGame } from "../utils/hooks";

type ClickPoint = {
  x: number; // normalized (0–1)
  y: number;
};

export default function MainImage() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [point, setPoint] = useState<ClickPoint | null>(null);
  const [open, setOpen] = useState(false);

  const {selected, setSelected, data} = useGame();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top) / rect.height;

    const x = Math.round(rawX * 100) / 100;
    const y = Math.round(rawY * 100) / 100;

    setPoint({ x, y });
    setOpen(true);

    console.log({ x, y });
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // if clicked target is not a node of the container then close the dropdown
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    // Wrapper
    <div
      ref={containerRef}
      className="relative w-full flex md:justify-center xl:justify-center"
    >
      {/* Main Image */}
      <img
        ref={imgRef}
        onClick={handleClick}
        src={data?.image}
        alt={`${data?.level}_image`}
        className="max-w-none md:w-5xl xl:w-7xl sm:w-full border border-gray-200 cursor-crosshair"
      />
      {/* Character matcher dropdown */}
      <CharactersDropDown
        props={{ open, point, data, selected, setSelected, setOpen }}
      />
    </div>
  );
}

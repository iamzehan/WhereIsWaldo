import { useRef } from "react";

export default function MainImage({ data }: { data: Level | null }) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top) / rect.height;

    // round to 2 decimal places (keep as number, not string)
    const x = Math.round(rawX * 100) / 100;
    const y = Math.round(rawY * 100) / 100;

    console.log({ x, y });
  };

  return (
    <div className="w-full cursor-crosshair overflow-x-auto flex md:justify-center xl:justify-center">
      <img
        ref={imgRef}
        onClick={(e) => handleClick(e)}
        src={data?.image}
        alt={`${data?.level}_image`}
        className="max-w-none md:w-5xl xl:w-7xl sm:w-full border-1 border-gray-200"
      />
    </div>
  );
}

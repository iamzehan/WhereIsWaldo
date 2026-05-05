import Badge from "./Badges";
import { createLink } from "../utils/helper";
import { useNavigate } from "react-router-dom";
export default function LevelCards( {levels}: {levels: Level[]}) {
  const navigate = useNavigate();
  return (
    <>
      {levels.map((lvl: Level, index: number) => {
        return (
          <article
            onClick={()=> navigate(createLink(lvl.level))}
            key={index}
            className="level-card w-[33%] max-w-full shadow-lg"
            data-link={`${lvl.level}.html`}
          >
            <img src={lvl.image} alt={lvl.level} className="object-contain rounded-t-[inherit]" />

            <h2 className="text-black font-bold">
              {lvl.level}{" "}
              <Badge level={lvl.difficulty}/>
            </h2>

            <div className="flex w-full gap-2 justify-center items-center">
              {lvl.characters.map((char: Character) => (
                <img
                  key={char.name}
                  src={char.image}
                  alt={char.name}
                  className="h-10 rounded-full border shadow-sm"
                />
              ))}
            </div>
          </article>
        );
      })}
    </>
  );
}

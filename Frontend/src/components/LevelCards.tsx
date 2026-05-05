import Badge from "./Badges";
import { useNavigate } from "react-router-dom";
export default function LevelCards( {levels}: {levels: Level[]}) {
  const navigate = useNavigate();
  return (
    <>
      {levels.map((lvl: Level, index: number) => {
        return (
          <article
            onClick={()=> navigate(`level+${lvl.level}`)}
            key={index}
            className="level-card w-[33%] max-w-full shadow-lg"
            data-link={`${lvl.level}.html`}
          >
            <img src={lvl.image} alt="level" className="object-contain rounded-t-[inherit]" />

            <h2 className="text-black font-bold">
              Level {lvl.level}{" "}
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

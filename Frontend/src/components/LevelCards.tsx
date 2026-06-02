import { useAuth } from "../utils/hooks";
import Badge from "./Badges";
import { useNavigate } from "react-router-dom";
export default function LevelCards( {levels}: {levels: Game[]}) {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();
  
  return (
    <>
      {levels.map((lvl: Game, index: number) => {
        return (
          <article
            onClick={()=> isAuthenticated? navigate(`level+${lvl.level}`) : navigate("/login")}
            key={index}
            className="level-card w-full shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-5"
            data-link={`${lvl.level}.html`}
          >
            <img src={lvl.image?.src} alt="level" className="object-contain rounded-t-[inherit]" />

            <h2 className="text-black font-bold">
              Level {lvl.level}{" "}
              <Badge level={lvl.difficulty}/>
            </h2>

            <div className="flex w-full gap-2 justify-center items-center">
              {lvl.characters.map((char:CharactersOnGame) => (
                <img
                  key={char.character.id}
                  src={char.character.image}
                  alt={char.character.name}
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

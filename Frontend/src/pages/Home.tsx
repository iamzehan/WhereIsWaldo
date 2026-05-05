import levels from "../data/levels";
import LevelCards from "../components/LevelCards";

export default function Page() {
  return (
    <div className="flex flex-wrap w-[80vw] p-10 gap-2">
      <LevelCards levels={levels}/>
    </div>
  );
}
import levels from "../data/levels";
import LevelCards from "../components/LevelCards";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-[80vw] p-10 gap-2 w-screen">
      <LevelCards levels={levels}/>
    </div>
  );
}
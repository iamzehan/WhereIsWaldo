import BurgerMenu from "./BurgerMenu";

export default function TopBar() {
  return (
    <div className="flex flex-wrap items-center justify-center shadow w-screen shadow-b p-5">
      <a href="/" className="flex gap-2 items-center justify-center">
        <img
          src="/favicon.png"
          alt="Waldo Icon"
          className="h-15 md:h-20"
        />
        <h1 className="font-bold text-black text-xl! md:text-4xl! flex flex-wrap gap-2 ">
          <span className="text-blue-600">Where’s</span>
          <span className="text-red-500">Waldo?</span>
          Play Online
        </h1>
      </a>
      <BurgerMenu/>
    </div>
  );
}



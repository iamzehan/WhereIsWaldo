import { useState } from "react";
import Links from "./Links";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full">
      
      {/* Top bar */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="font-bold text-lg">Menu</div>

        {/* Burger Button (mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1 fixed right-5 bg-gray-50 p-2 rounded top-5"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex w-full justify-center">
          <Links />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 duration-200 top-full">
          <Links />
        </div>
      )}
    </nav>
  );
}
import { useIsMobile, useAuth } from "../utils/hooks";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
export default function Links() {
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();

  const baseLink =
    "text-zinc-600 text-lg hover:text-red-600 transition-colors";

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 items-center justify-center text-sm py-10 ${
        isMobile ? "border-t border-gray-300" : ""
      }`}
    >

      {/* STATIC LINKS */}
      <a href="/privacy" className={baseLink}>
        Privacy Policy
      </a>

      <a href="/terms" className={baseLink}>
        Terms
      </a>

      <a href="/disclaimer" className={baseLink}>
        Disclaimer
      </a>

      <a href="/about" className={baseLink}>
        About Us
      </a>

      <a href="/contact" className={baseLink}>
        Contact Us
      </a>

      <a href="/blog" className={baseLink}>
        Blog
      </a>
      {/* AUTH SECTION */}
      {!isAuthenticated ? (
        <>
          <a href="/register" className="w-30 border-1 border-gray-300 py-1 px-2 bg-red-500 text-zinc-100 text-lg rounded-md">
            Sign Up
          </a>
    
          <a
            href="/login"
            className={`${baseLink} w-30 text-blue-500! py-1 px-2 hover:text-red-600! border-1 rounded-md`}
          >
            Log in
          </a>
        </>
      ) : (
          <UserDropdown username={user?.username} onLogout={logout}/>
        )}
    </div>
  );
}


import { useState, useRef, useEffect } from "react";

type UserDropdownProps = {
  username?: string;
  onLogout: () => void;
};

function UserDropdown({
  username,
  onLogout,
}: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-30 border border-gray-400 hover:border-red-600 rounded" ref={dropdownRef}>
      <button
      title="Logout"
        onClick={() => setOpen((prev) => !prev)}
        className="text-zinc-600 text-lg hover:text-red-600 cursor-pointer transition-colors flex justify-center items-center px-2"
      >
        {username} {open? <ArrowDropUp/>: <ArrowDropDown/>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-30 rounded-md border border-gray-200 bg-white shadow-lg z-50">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 cursor-pointer text-left text-zinc-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
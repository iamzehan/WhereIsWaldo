import { useIsMobile } from "../utils/hooks";

export default function Links() {
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-col md:flex-row gap-4 justify-center text-sm py-10
     ${isMobile? "border-t border-t-gray-300" : ""}`}>
      <a href="/privacy" className="hover:text-red-600! text-lg! text-zinc-600!">Privacy Policy</a>
      <a href="/terms" className="hover:text-red-600! text-lg! text-zinc-600!">Terms</a>
      <a href="/disclaimer" className="hover:text-red-600! text-lg! text-zinc-600!">Disclaimer</a>
      <a href="/about" className="hover:text-red-600! text-lg! text-zinc-600!">About Us</a>
      <a href="/contact" className="hover:text-red-600! text-lg! text-zinc-600!">Contact Us</a>
      <a href="/blog" className="hover:text-red-600! text-lg! text-zinc-600!">Blog</a>
    </div>
  );
}
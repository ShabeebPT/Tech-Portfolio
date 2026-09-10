import { useState } from "react";
import { TerminalModal } from "./TerminalModal";

export function TerminalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-24 right-8 bg-[#0a0a0a] border border-[#00ff00] text-[#00ff00] px-5 py-2.5 rounded-full items-center gap-2 shadow-[0_0_15px_rgba(0,255,0,0.15)] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] z-40 transition-all hover:-translate-y-1 font-mono font-bold group"
      >
        <span className="text-lg leading-none group-hover:animate-pulse">
          &gt;_
        </span>
        <span>Open Terminal</span>
      </button>

      <TerminalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

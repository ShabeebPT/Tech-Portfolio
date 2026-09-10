import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { portfolioConfig, skills } from "@/data/portfolioConfig";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { type: "input" | "output"; content: string | React.ReactNode }[]
  >([
    {
      type: "output",
      content: "Type 'help' to see commands.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setHistory((prev) => [...prev, { type: "input", content: cmd }]);
    setInput("");

    let output: string | React.ReactNode = "";
    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 mt-1">
            <p>Available commands:</p>
            <p>
              <span className="text-[#00ff00]">about</span> - Learn about me
            </p>
            <p>
              <span className="text-[#00ff00]">skills</span> - View my technical
              skills
            </p>
            <p>
              <span className="text-[#00ff00]">contact</span> - Get my contact
              info
            </p>
            <p>
              <span className="text-[#00ff00]">clear</span> - Clear terminal
              output
            </p>
          </div>
        );
        break;
      case "about":
        output = portfolioConfig.shortDescription;
        break;
      case "skills":
        output = Object.entries(skills)
          .map(
            ([cat, list]) =>
              `${cat.toUpperCase()}:\n  ${list.map((s: any) => s.name).join(", ")}`,
          )
          .join("\n\n");
        break;
      case "contact":
        output = `Email: ${portfolioConfig.email}\nGitHub: ${portfolioConfig.github}\nLinkedIn: ${portfolioConfig.linkedin}`;
        break;
      case "clear":
        setHistory([]);
        return;
      case "":
        return;
      default:
        output = `Command not found: ${trimmedCmd}. Type 'help' to see available commands.`;
    }

    setHistory((prev) => [...prev, { type: "output", content: output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff00] font-medium text-sm">
                  root@shabeeb-os:~
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 p-5 h-[400px] overflow-y-auto text-gray-300 text-sm md:text-base bg-[#0a0a0a] cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="space-y-2 mb-4">
                {history.map((msg, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {msg.type === "input" ? (
                      <div className="flex gap-2">
                        <span className="text-[#00ff00]">$</span>
                        <span className="text-white">{msg.content}</span>
                      </div>
                    ) : (
                      <div className="text-gray-300">{msg.content}</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-[#00ff00]">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(input);
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 m-0 w-full"
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
              <div ref={endOfMessagesRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

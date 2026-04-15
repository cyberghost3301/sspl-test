import React from "react";
import { m as motion } from "framer-motion";

export type ContextMode = "enterprise" | "residential";

interface ContextToggleProps {
  mode: ContextMode;
  onChange: (mode: ContextMode) => void;
}

export default function ContextToggle({ mode, onChange }: ContextToggleProps) {
  return (
    <div className="flex justify-center w-full my-8">
      <div className="liquid-glass p-1.5 rounded-full flex relative z-10 w-[380px] cursor-pointer border border-white/10 bg-[#05070A]/50 backdrop-blur-md">
        <button
          onClick={() => onChange("enterprise")}
          className={`relative z-20 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${
            mode === "enterprise" ? "text-[#05070A]" : "text-white/60 hover:text-white"
          }`}
        >
          Enterprise
        </button>
        <button
          onClick={() => onChange("residential")}
          className={`relative z-20 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${
            mode === "residential" ? "text-[#05070A]" : "text-white/60 hover:text-white"
          }`}
        >
          Residential
        </button>

        {/* Animated active background pill */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-sc-teal rounded-full z-10 shadow-[0_0_15px_rgba(0,212,200,0.4)]"
          initial={false}
          animate={{
            x: mode === "enterprise" ? 0 : "100%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
}

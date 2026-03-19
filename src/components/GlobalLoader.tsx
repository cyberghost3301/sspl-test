import { m as motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-full border-t-2 border-r-2 border-accent"
      >
        <div className="w-full h-full rounded-full border-t-2 border-l-2 border-accent/50 animate-[spin_2s_linear_infinite]" />
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";

export function KineticText({ text, className = "" }) {
  // We can split by spaces first, then by letters, to keep words from breaking awkwardly, 
  // but for simple names, splitting by characters and preserving spaces is fine.
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
    hover: {
      transition: { staggerChildren: 0.02 },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      fontWeight: 300,
    },
    visible: {
      opacity: 1,
      y: 0,
      fontWeight: 400,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      fontWeight: 800,
      color: "#10b981", // Tailwind Emerald 400
      y: -2,
      scale: 1.1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden cursor-pointer ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="hover"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ 
            whiteSpace: letter === " " ? "pre" : "normal",
            marginRight: letter === " " ? "0.2em" : "0" // Small extra gap for spaces
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

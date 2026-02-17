/* Cyberpunk Glitch - Tile Component */
import { motion } from "framer-motion";
import type { TileData } from "@/lib/gameLogic";

interface TileProps {
  tile: TileData;
  onClick: () => void;
  isHint?: boolean;
}

export default function Tile({ tile, onClick, isHint }: TileProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={tile.isBlocked}
      className={`
        absolute w-16 h-16 rounded-lg text-3xl flex items-center justify-center
        transition-all duration-200 font-bold
        ${tile.isBlocked 
          ? "opacity-40 cursor-not-allowed bg-gray-800" 
          : "cursor-pointer bg-gray-900 hover:scale-110 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        }
        ${isHint ? "animate-pulse border-yellow-400 border-dashed shadow-[0_0_25px_rgba(250,204,21,0.8)]" : ""}
      `}
      style={{
        left: `${tile.x}px`,
        top: `${tile.y}px`,
        zIndex: tile.layer * 10,
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ duration: 0.3 }}
      whileHover={!tile.isBlocked ? { scale: 1.1 } : {}}
      whileTap={!tile.isBlocked ? { scale: 0.95 } : {}}
    >
      {tile.type}
    </motion.button>
  );
}

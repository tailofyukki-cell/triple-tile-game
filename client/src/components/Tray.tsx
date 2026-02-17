/* Cyberpunk Glitch - Tray Component */
import { motion, AnimatePresence } from "framer-motion";
import type { TileData } from "@/lib/gameLogic";

interface TrayProps {
  tiles: TileData[];
  maxSize: number;
}

export default function Tray({ tiles, maxSize }: TrayProps) {
  return (
    <div className="mt-8 p-6 bg-gray-900/80 rounded-xl border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-purple-400 font-mono tracking-wider">
          TRAY
        </h3>
        <span className="text-lg font-mono text-cyan-400">
          {tiles.length}/{maxSize}
        </span>
      </div>
      <div className="flex gap-2 h-20 items-center">
        <AnimatePresence>
          {tiles.map((tile, index) => (
            <motion.div
              key={`${tile.id}-${index}`}
              className="w-16 h-16 rounded-lg bg-gray-800 border-2 border-green-500 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {tile.type}
            </motion.div>
          ))}
        </AnimatePresence>
        {Array.from({ length: maxSize - tiles.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-700 bg-gray-900/50"
          />
        ))}
      </div>
    </div>
  );
}

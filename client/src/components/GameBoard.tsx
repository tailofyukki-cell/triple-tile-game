import { AnimatePresence } from "framer-motion";
import Tile from "./Tile";
import type { TileData } from "@/lib/gameLogic";

interface GameBoardProps {
  tiles: TileData[];
  onTileClick: (id: string) => void;
  hintTileId: string | null;
}

export default function GameBoard({ tiles, onTileClick, hintTileId }: GameBoardProps) {
  return (
    <div className="relative w-full h-[600px] bg-gray-950/50 rounded-xl border-2 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] overflow-hidden">
      <AnimatePresence>
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            onClick={() => onTileClick(tile.id)}
            isHint={tile.id === hintTileId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

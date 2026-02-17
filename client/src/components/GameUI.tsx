import { Button } from "@/components/ui/button";
import type { GameState } from "@/lib/gameLogic";

interface GameUIProps {
  state: GameState;
  onUndo: () => void;
  onShuffle: () => void;
  onHint: () => void;
}

export default function GameUI({ state, onUndo, onShuffle, onHint }: GameUIProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-900/80 rounded-xl border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <div className="text-center">
          <div className="text-sm text-gray-400 font-mono">STAGE</div>
          <div className="text-3xl font-bold text-cyan-400 font-mono">{state.stage}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 font-mono">SCORE</div>
          <div className="text-3xl font-bold text-green-400 font-mono">{state.score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 font-mono">MOVES</div>
          <div className="text-3xl font-bold text-yellow-400 font-mono">{state.moves}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 font-mono">TILES</div>
          <div className="text-3xl font-bold text-purple-400 font-mono">{state.tiles.length}</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          onClick={onUndo}
          disabled={state.undoCount === 0}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-mono border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        >
          UNDO ({state.undoCount})
        </Button>
        <Button
          onClick={onShuffle}
          disabled={state.shuffleCount === 0}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-mono border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        >
          SHUFFLE ({state.shuffleCount})
        </Button>
        <Button
          onClick={onHint}
          disabled={state.hintCount === 0}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-mono border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
        >
          HINT ({state.hintCount})
        </Button>
      </div>
    </div>
  );
}

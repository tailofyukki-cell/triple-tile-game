import { Button } from "@/components/ui/button";
import type { GameState } from "@/lib/gameLogic";

interface ResultScreenProps {
  state: GameState;
  onRestart: () => void;
  onNextStage: () => void;
}

export default function ResultScreen({ state, onRestart, onNextStage }: ResultScreenProps) {
  const isClear = state.status === "clear";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-cyan-950">
      <div className="max-w-2xl p-8 bg-gray-900/90 rounded-2xl border-4 border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.6)]">
        <h1 className={`text-6xl font-bold text-center mb-4 font-mono tracking-wider ${
          isClear 
            ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400" 
            : "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
        }`}>
          {isClear ? "STAGE CLEAR!" : "GAME OVER"}
        </h1>
        
        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-800/80 rounded-xl border-2 border-purple-500/50 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 font-mono">STAGE</div>
            <div className="text-3xl font-bold text-cyan-400 font-mono">{state.stage}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 font-mono">SCORE</div>
            <div className="text-3xl font-bold text-green-400 font-mono">{state.score}</div>
          </div>
          <div className="text-center col-span-2">
            <div className="text-sm text-gray-400 font-mono">MOVES</div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">{state.moves}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isClear && state.stage < 3 && (
            <Button
              onClick={onNextStage}
              className="w-full py-6 text-2xl bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-mono border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.7)]"
            >
              NEXT STAGE
            </Button>
          )}
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full py-4 text-lg bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 font-mono border-2 border-purple-500"
          >
            RESTART
          </Button>
        </div>
      </div>
    </div>
  );
}

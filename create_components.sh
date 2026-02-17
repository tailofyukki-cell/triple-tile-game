#!/bin/bash

# GameBoard.tsx
cat > /home/ubuntu/triple-tile-game/client/src/components/GameBoard.tsx << 'EOF'
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
EOF

# GameUI.tsx
cat > /home/ubuntu/triple-tile-game/client/src/components/GameUI.tsx << 'EOF'
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
EOF

# TitleScreen.tsx
cat > /home/ubuntu/triple-tile-game/client/src/components/TitleScreen.tsx << 'EOF'
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TitleScreenProps {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-cyan-950">
      <div className="max-w-2xl p-8 bg-gray-900/90 rounded-2xl border-4 border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.6)]">
        <h1 className="text-6xl font-bold text-center mb-4 font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
          TRIPLE TILE
        </h1>
        <p className="text-xl text-center text-gray-300 mb-8 font-mono">
          3マッチパズルゲーム
        </p>
        
        <div className="flex flex-col gap-4">
          <Button
            onClick={onStart}
            className="w-full py-6 text-2xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-mono border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.7)]"
          >
            START GAME
          </Button>
          <Button
            onClick={() => setShowRules(!showRules)}
            variant="outline"
            className="w-full py-4 text-lg bg-gray-800/50 hover:bg-gray-700/50 text-cyan-400 font-mono border-2 border-purple-500"
          >
            {showRules ? "HIDE RULES" : "RULES"}
          </Button>
        </div>

        {showRules && (
          <div className="mt-6 p-6 bg-gray-800/80 rounded-xl border-2 border-purple-500/50 text-gray-300 font-mono space-y-3">
            <p>🎯 <strong>目標:</strong> 盤面のタイルをすべて消す</p>
            <p>🎮 <strong>操作:</strong> 選択可能なタイルをクリック</p>
            <p>✨ <strong>マッチ:</strong> 同じ絵柄3枚で自動消去</p>
            <p>📦 <strong>トレイ:</strong> 最大7枠まで保持可能</p>
            <p>🚫 <strong>制限:</strong> 上に重なっているタイルは選択不可</p>
            <p>💀 <strong>ゲームオーバー:</strong> トレイ満杯で詰み</p>
          </div>
        )}
      </div>
    </div>
  );
}
EOF

# ResultScreen.tsx
cat > /home/ubuntu/triple-tile-game/client/src/components/ResultScreen.tsx << 'EOF'
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
EOF

# Game.tsx
cat > /home/ubuntu/triple-tile-game/client/src/pages/Game.tsx << 'EOF'
import { useState, useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import Tray from "@/components/Tray";
import GameUI from "@/components/GameUI";
import TitleScreen from "@/components/TitleScreen";
import ResultScreen from "@/components/ResultScreen";
import {
  createInitialState,
  generateStage,
  selectTile,
  undo,
  shuffle,
  getHint,
  decrementHintCount,
  type GameState,
} from "@/lib/gameLogic";

export default function Game() {
  const [state, setState] = useState<GameState>(createInitialState());
  const [hintTileId, setHintTileId] = useState<string | null>(null);

  const handleStart = () => {
    const newState = createInitialState();
    newState.status = "playing";
    newState.tiles = generateStage(1);
    setState(newState);
  };

  const handleTileClick = (tileId: string) => {
    const newState = selectTile(state, tileId);
    if (newState) {
      setState(newState);
    }
  };

  const handleUndo = () => {
    const newState = undo(state);
    if (newState) {
      setState(newState);
    }
  };

  const handleShuffle = () => {
    const newState = shuffle(state);
    if (newState) {
      setState(newState);
    }
  };

  const handleHint = () => {
    const tileId = getHint(state);
    if (tileId) {
      setHintTileId(tileId);
      setState(decrementHintCount(state));
      setTimeout(() => setHintTileId(null), 3000);
    }
  };

  const handleRestart = () => {
    const newState = createInitialState();
    newState.status = "playing";
    newState.tiles = generateStage(1);
    setState(newState);
  };

  const handleNextStage = () => {
    const nextStage = state.stage + 1;
    const newState = createInitialState();
    newState.status = "playing";
    newState.stage = nextStage;
    newState.score = state.score;
    newState.tiles = generateStage(nextStage);
    setState(newState);
  };

  if (state.status === "title") {
    return <TitleScreen onStart={handleStart} />;
  }

  if (state.status === "clear" || state.status === "gameover") {
    return (
      <ResultScreen
        state={state}
        onRestart={handleRestart}
        onNextStage={handleNextStage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-cyan-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GameBoard
              tiles={state.tiles}
              onTileClick={handleTileClick}
              hintTileId={hintTileId}
            />
            <Tray tiles={state.tray} maxSize={7} />
          </div>
          <div>
            <GameUI
              state={state}
              onUndo={handleUndo}
              onShuffle={handleShuffle}
              onHint={handleHint}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

echo "All components created successfully"

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

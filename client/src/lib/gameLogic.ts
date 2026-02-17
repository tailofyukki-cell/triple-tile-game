// Cyberpunk Glitch Triple Tile Game Logic

export type TileType = "🔷" | "🔶" | "🟢" | "🟣" | "🔴" | "🟡";

export interface TileData {
  id: string;
  type: TileType;
  x: number;
  y: number;
  layer: number;
  isBlocked: boolean;
}

export interface GameState {
  status: "title" | "playing" | "clear" | "gameover";
  stage: number;
  score: number;
  moves: number;
  tiles: TileData[];
  tray: TileData[];
  undoCount: number;
  shuffleCount: number;
  hintCount: number;
  history: {
    tiles: TileData[];
    tray: TileData[];
    score: number;
    moves: number;
  }[];
}

const TILE_TYPES: TileType[] = ["🔷", "🔶", "🟢", "🟣", "🔴", "🟡"];
const TRAY_MAX = 7;

export function createInitialState(): GameState {
  return {
    status: "title",
    stage: 1,
    score: 0,
    moves: 0,
    tiles: [],
    tray: [],
    undoCount: 3,
    shuffleCount: 2,
    hintCount: 3,
    history: [],
  };
}

export function generateStage(stage: number): TileData[] {
  const tileCount = stage === 1 ? 24 : stage === 2 ? 30 : 36;
  const typeCount = stage === 1 ? 4 : stage === 2 ? 5 : 6;
  const types = TILE_TYPES.slice(0, typeCount);
  
  const tiles: TileData[] = [];
  let id = 0;
  
  // Generate tiles (each type appears 6 times)
  for (let i = 0; i < tileCount / 6; i++) {
    for (const type of types) {
      for (let j = 0; j < 6; j++) {
        tiles.push({
          id: `tile-${id++}`,
          type,
          x: 0,
          y: 0,
          layer: 0,
          isBlocked: false,
        });
      }
    }
  }
  
  // Shuffle tiles
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  
  // Position tiles in a pyramid-like layout
  const gridSize = Math.ceil(Math.sqrt(tileCount));
  let tileIndex = 0;
  
  for (let layer = 0; layer < 3; layer++) {
    const tilesInLayer = Math.floor(tileCount / 3);
    for (let i = 0; i < tilesInLayer && tileIndex < tiles.length; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      tiles[tileIndex].x = col * 80 + layer * 10;
      tiles[tileIndex].y = row * 80 + layer * 10;
      tiles[tileIndex].layer = layer;
      tileIndex++;
    }
  }
  
  // Update blocked status
  return updateBlockedStatus(tiles);
}

function updateBlockedStatus(tiles: TileData[]): TileData[] {
  return tiles.map((tile) => {
    const isBlocked = tiles.some((other) => {
      if (other.id === tile.id || other.layer <= tile.layer) return false;
      const dx = Math.abs(other.x - tile.x);
      const dy = Math.abs(other.y - tile.y);
      // Tile size is 64px (w-16 h-16), so overlap threshold should be ~40px
      return dx < 40 && dy < 40;
    });
    return { ...tile, isBlocked };
  });
}

export function selectTile(
  state: GameState,
  tileId: string
): GameState | null {
  const tile = state.tiles.find((t) => t.id === tileId);
  if (!tile || tile.isBlocked) return null;
  if (state.tray.length >= TRAY_MAX) return null;
  
  // Save history
  const history = [
    ...state.history,
    {
      tiles: state.tiles,
      tray: state.tray,
      score: state.score,
      moves: state.moves,
    },
  ];
  
  const newTiles = state.tiles.filter((t) => t.id !== tileId);
  const updatedTiles = updateBlockedStatus(newTiles);
  const newTray = [...state.tray, tile];
  let newScore = state.score;
  
  // Check for matches
  const typeCount: Record<string, number> = {};
  newTray.forEach((t) => {
    typeCount[t.type] = (typeCount[t.type] || 0) + 1;
  });
  
  let finalTray = newTray;
  for (const [type, count] of Object.entries(typeCount)) {
    if (count >= 3) {
      finalTray = finalTray.filter((t, idx) => {
        const isMatch = t.type === type;
        if (isMatch && finalTray.filter((ft) => ft.type === type).length > count - 3) {
          return false;
        }
        return !isMatch || finalTray.slice(0, idx).filter((ft) => ft.type === type).length >= 3;
      });
      
      // Remove exactly 3 tiles of matching type
      let removed = 0;
      finalTray = finalTray.filter((t) => {
        if (t.type === type && removed < 3) {
          removed++;
          return false;
        }
        return true;
      });
      
      newScore += 10;
    }
  }
  
  // Check win condition
  const status = updatedTiles.length === 0 ? "clear" : 
                 finalTray.length >= TRAY_MAX ? "gameover" : "playing";
  
  if (status === "clear") {
    newScore += 100; // Stage clear bonus
  }
  
  return {
    ...state,
    tiles: updatedTiles,
    tray: finalTray,
    score: newScore,
    moves: state.moves + 1,
    status,
    history: history.slice(-10), // Keep last 10 moves
  };
}

export function undo(state: GameState): GameState | null {
  if (state.undoCount <= 0 || state.history.length === 0) return null;
  
  const lastState = state.history[state.history.length - 1];
  return {
    ...state,
    tiles: updateBlockedStatus(lastState.tiles),
    tray: lastState.tray,
    score: lastState.score,
    moves: lastState.moves,
    undoCount: state.undoCount - 1,
    history: state.history.slice(0, -1),
  };
}

export function shuffle(state: GameState): GameState | null {
  if (state.shuffleCount <= 0) return null;
  
  const tiles = [...state.tiles];
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempPos = { x: tiles[i].x, y: tiles[i].y, layer: tiles[i].layer };
    tiles[i].x = tiles[j].x;
    tiles[i].y = tiles[j].y;
    tiles[i].layer = tiles[j].layer;
    tiles[j].x = tempPos.x;
    tiles[j].y = tempPos.y;
    tiles[j].layer = tempPos.layer;
  }
  
  return {
    ...state,
    tiles: updateBlockedStatus(tiles),
    shuffleCount: state.shuffleCount - 1,
  };
}

export function getHint(state: GameState): string | null {
  if (state.hintCount <= 0) return null;
  
  const availableTiles = state.tiles.filter((t) => !t.isBlocked);
  if (availableTiles.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableTiles.length);
  return availableTiles[randomIndex].id;
}

export function decrementHintCount(state: GameState): GameState {
  return {
    ...state,
    hintCount: state.hintCount - 1,
  };
}

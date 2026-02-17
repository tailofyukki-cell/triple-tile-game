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

import type { BoardSize } from "../settings/game-setting-types";
import type { BoardConfig } from "./game-interfaces";

const BOARD_CONFIGS: Record<BoardSize, BoardConfig> = {
  "4x4": {
    columns: 4,
    rows: 4,
    cardCount: 16,
    pairCount: 8
  },
  "4x6": {
    columns: 6,
    rows: 4,
    cardCount: 24,
    pairCount: 12
  },
  "6x6": {
    columns: 6,
    rows: 6,
    cardCount: 36,
    pairCount: 18
  }
};

export function getBoardConfig(boardSize: BoardSize): BoardConfig {
  return BOARD_CONFIGS[boardSize];
}
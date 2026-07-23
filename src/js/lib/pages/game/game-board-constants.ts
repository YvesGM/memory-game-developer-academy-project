// ------------ IMPORTS ------------//
import type { BoardSize } from "../settings/settings-types";
import type { BoardConfig } from "./game-interfaces";

// ------------ CONSTANTS ------------//

/**
 * Maps every supported board size to its dimensions and card counts.
 */
export const BOARD_CONFIGS: Record<BoardSize, BoardConfig> = {
  "4x4": { columns: 4, rows: 4, cardCount: 16, pairCount: 8 },
  "4x6": { columns: 6, rows: 4, cardCount: 24, pairCount: 12 },
  "6x6": { columns: 6, rows: 6, cardCount: 36, pairCount: 18 }
};

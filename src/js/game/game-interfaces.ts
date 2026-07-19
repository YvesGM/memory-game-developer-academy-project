import type { BoardSize, GameTheme, PlayerId } from "../settings/game-setting-types";
import type { CardStatus } from "./game-types";

export interface MemoryCard {
  id: string;
  pairId: string;
  imagePath: string;
  status: CardStatus;
}

export interface PlayerScores {
  blue: number;
  orange: number;
}

export interface GameState {
  theme: GameTheme;
  boardSize: BoardSize;
  activePlayer: PlayerId;
  cards: MemoryCard[];
  scores: PlayerScores;
  selectedCardIds: string[];
  isBoardLocked: boolean;
}

export interface BoardConfig {
  columns: number;
  rows: number;
  cardCount: number;
  pairCount: number;
}

export interface ThemeCardAssets {
  cardBackPath: string;
  exitIconPath: string;
  exitHoverIconPath: string;
  cardFrontPaths: string[];
}
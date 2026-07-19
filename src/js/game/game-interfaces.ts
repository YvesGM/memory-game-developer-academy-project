import type { BoardSize, GameTheme, PlayerId } from "../settings/game-setting-types";
import type { CardStatus, GamePhase, GameResult } from "./game-types";

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
  phase: GamePhase;
  result: GameResult;
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

export interface WinnerAssets {
  bluePlayerImagePath: string;
  orangePlayerImagePath: string;
  confettiImagePath: string | null;
}

export interface DrawAssets {
  scaleImagePath: string;
}

export interface EndScreenAssets {
  winner: WinnerAssets;
  draw: DrawAssets;
}
// ------------ IMPORTS ------------//
import type { BoardSize, GameTheme, PlayerId } from "../settings/settings-types";
import type { CardStatus, GamePhase, GameResult } from "./game-types";

// ------------ INTERFACES ------------//
/**
 * Represents a single card on the memory-game board.
 */
export interface MemoryCard {
  /** Unique identifier of the individual card. */
  id: string;

  /** Shared identifier used to associate two matching cards. */
  pairId: string;

  /** Path to the image displayed on the front of the card. */
  imagePath: string;

  /** Current visibility and match state of the card. */
  status: CardStatus;
}

/**
 * Contains the current scores of both players.
 */
export interface PlayerScores {
  /** Current score of the blue player. */
  blue: number;

  /** Current score of the orange player. */
  orange: number;
}

/**
 * Represents the complete runtime state of a memory game.
 */
export interface GameState {
  /** Theme currently used by the game. */
  theme: GameTheme;

  /** Selected size of the game board. */
  boardSize: BoardSize;

  /** Player whose turn is currently active. */
  activePlayer: PlayerId;

  /** Cards currently contained on the game board. */
  cards: MemoryCard[];

  /** Current scores of both players. */
  scores: PlayerScores;

  /** Identifiers of the cards currently selected by the player. */
  selectedCardIds: string[];

  /** Whether card selection is currently disabled. */
  isBoardLocked: boolean;

  /** Current lifecycle phase of the game. */
  phase: GamePhase;

  /** Final game result or `null` while no result is available. */
  result: GameResult;
}

/**
 * Contains the display data of the currently active player.
 */
export interface CurrentPlayerData {
  /** Translated name of the active player. */
  label: string;

  /** Path to the active player's theme-specific icon. */
  iconPath: string;
}

/**
 * Defines the dimensions and card counts of a game board.
 */
export interface BoardConfig {
  /** Number of columns contained in the board. */
  columns: number;

  /** Number of rows contained in the board. */
  rows: number;

  /** Total number of cards contained in the board. */
  cardCount: number;

  /** Total number of matching card pairs. */
  pairCount: number;
}

/**
 * Defines the theme-specific assets used for both players.
 */
export interface PlayerAssets {
  /** Path to the blue player's score icon. */
  blueScoreIconPath: string;

  /** Path to the orange player's score icon. */
  orangeScoreIconPath: string;

  /** Path to the blue player's active-player icon. */
  blueCurrentPlayerIconPath: string;

  /** Path to the orange player's active-player icon. */
  orangeCurrentPlayerIconPath: string;

  /** Whether player labels should be displayed beside the scores. */
  showScoreLabels: boolean;
}

/**
 * Defines the theme-specific card and exit-button assets.
 */
export interface ThemeCardAssets {
  /** Path to the image displayed on the back of every card. */
  cardBackPath: string;

  /** Path to the default exit-button icon. */
  exitIconPath: string;

  /** Path to the exit-button icon used during hover. */
  exitHoverIconPath: string;

  /** Paths to all available card-front images of the theme. */
  cardFrontPaths: string[];
}

/**
 * Defines the assets used on a winner result screen.
 */
export interface WinnerAssets {
  /** Path to the image representing the blue player. */
  bluePlayerImagePath: string;

  /** Path to the image representing the orange player. */
  orangePlayerImagePath: string;

  /** Optional path to the confetti image. */
  confettiImagePath: string | null;
}

/**
 * Defines the assets used on a draw result screen.
 */
export interface DrawAssets {
  /** Path to the scale image displayed for a draw. */
  scaleImagePath: string;
}

/**
 * Groups all theme-specific assets used on game end screens.
 */
export interface EndScreenAssets {
  /** Assets used when one player wins the game. */
  winner: WinnerAssets;

  /** Assets used when the game ends in a draw. */
  draw: DrawAssets;
}
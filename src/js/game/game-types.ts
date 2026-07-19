export type CardStatus =
  | "hidden"
  | "flipped"
  | "matched";

export type GamePhase =
  | "playing"
  | "game-over"
  | "result";

export type GameResult =
  | "blue"
  | "orange"
  | "draw"
  | null;
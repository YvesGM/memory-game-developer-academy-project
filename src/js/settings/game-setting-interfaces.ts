import type { PlayerId, BoardSize, GameTheme } from "./game-setting-types";

export interface GameSettings {
  startingPlayer: PlayerId;
  boardSize: BoardSize;
  theme: GameTheme;
}
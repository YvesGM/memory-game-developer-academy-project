import type { PlayerId, BoardSize, GameTheme } from "./game-setting-types";

export interface GameSettings {
  startingPlayer: PlayerId;
  boardSize: BoardSize;
  theme: GameTheme;
}

export interface ThemePreviewConfig {
  className: string;
  assetFolder: string;
  scoreMode: "separate-icons" | "combined-icon";
  currentPlayerIconPrefix?: string;
}

export interface SettingsOption {
  value: string;
  label: string;
}

export interface SettingsGroup {
  name: string;
  legend: string;
  iconPath: string;
  selectedValue: string;
  options: SettingsOption[];
  showSelectionMarker?: boolean;
}
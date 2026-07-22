// # CONFIGS
// ## TYPES
import type { PlayerId, BoardSize, GameTheme } from "./game-setting-types";

// ## INTERFACES

/**
 * Defines the selected configuration of a memory game.
 */
export interface GameSettings {
  /** The player who starts the game. */
  startingPlayer: PlayerId;

  /** The selected dimensions of the game board. */
  boardSize: BoardSize;

  /** The visual theme used by the game. */
  theme: GameTheme;
}

/**
 * Defines the visual configuration of a theme preview.
 */
export interface ThemePreviewConfig {
  /** The theme-specific CSS class applied to the preview. */
  className: string;

  /** The public asset folder used by the preview. */
  assetFolder: string;

  /** Determines how the player score icons are rendered. */
  scoreMode: "separate-icons" | "combined-icon";

  /** The preview score displayed for the blue player. */
  blueScore: number;

  /** The preview score displayed for the orange player. */
  orangeScore: number;

  /** The optional filename prefix used for current-player icons. */
  currentPlayerIconPrefix?: string;
}

/**
 * Defines one selectable option inside a settings group.
 */
export interface SettingsOption {
  /** The value submitted by the corresponding form input. */
  value: string;

  /** The translated label displayed to the user. */
  label: string;
}

/**
 * Defines the configuration of one settings fieldset.
 */
export interface SettingsGroup {
  /** The shared form-input name of the settings group. */
  name: string;

  /** The translated fieldset legend. */
  legend: string;

  /** The icon displayed beside the group legend. */
  iconPath: string;

  /** The currently selected option value. */
  selectedValue: string;

  /** The selectable options rendered inside the group. */
  options: SettingsOption[];

  /** Whether the selected option displays an additional marker. */
  showSelectionMarker?: boolean;
}
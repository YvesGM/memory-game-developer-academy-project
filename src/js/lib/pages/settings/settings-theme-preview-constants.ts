// ------------ IMPORTS ------------//
import type { ThemePreviewConfig } from "./settings-interfaces";
import type { GameTheme } from "./settings-types";

// ------------ CONSTANTS ------------//

/**
 * Defines the preview configuration for every available game theme.
 */
export const THEME_PREVIEW_CONFIGS: Record<GameTheme, ThemePreviewConfig> = {
  code: {
    className: "theme-preview--coding",
    assetFolder: "coding",
    scoreMode: "separate-icons",
    blueScore: 0,
    orangeScore: 6
  },

  gaming: {
    className: "theme-preview--gaming",
    assetFolder: "gaming",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  },

  academy: {
    className: "theme-preview--academy",
    assetFolder: "da-projects",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  },

  food: {
    className: "theme-preview--food",
    assetFolder: "food",
    scoreMode: "combined-icon",
    blueScore: 2,
    orangeScore: 6,
    currentPlayerIconPrefix: "mid-chess-pawn"
  }
};
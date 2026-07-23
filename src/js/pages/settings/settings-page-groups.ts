// ------------ IMPORTS ------------//
import type { Translations } from "../../lib/language/language-interfaces";
import type { GameSettings } from "../../lib/pages/settings/settings-interfaces";


import { renderSettingsGroup } from "./settings-options";

// ------------ FUNCTIONS ------------//

/**
 * Renders the selectable theme settings.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The theme-group markup.
 */
export function renderThemeGroup(translation: Translations, settings: GameSettings): string {
  return renderSettingsGroup({
    name: "theme",
    legend: translation.settings.themeTitle,
    iconPath: "/settings/palette.svg",
    selectedValue: settings.theme,
    showSelectionMarker: true,
    options: getThemeOptions(translation)
  });
}

/**
 * Creates the selectable theme options.
 *
 * @param translation - The active translation dictionary.
 * @returns The configured theme options.
 */
function getThemeOptions(translation: Translations) {
  return [
    createOption("code", translation.settings.codeTheme),
    createOption("gaming", translation.settings.gamingTheme),
    createOption("academy", translation.settings.academyTheme),
    createOption("food", translation.settings.foodTheme)
  ];
}

/**
 * Renders the selectable starting-player settings.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The player-group markup.
 */
export function renderPlayerGroup(translation: Translations, settings: GameSettings): string {
  return renderSettingsGroup({
    name: "startingPlayer",
    legend: translation.settings.playerTitle,
    iconPath: "/settings/chess-pawn-icon.svg",
    selectedValue: settings.startingPlayer,
    options: getPlayerOptions(translation)
  });
}

/**
 * Creates the selectable starting-player options.
 *
 * @param translation - The active translation dictionary.
 * @returns The configured player options.
 */
function getPlayerOptions(translation: Translations) {
  return [
    createOption("blue", translation.settings.bluePlayer),
    createOption("orange", translation.settings.orangePlayer)
  ];
}

/**
 * Renders the selectable board-size settings.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The board-size group markup.
 */
export function renderBoardGroup(translation: Translations, settings: GameSettings): string {
  return renderSettingsGroup({
    name: "boardSize",
    legend: translation.settings.boardSizeTitle,
    iconPath: "/settings/style-icon.svg",
    selectedValue: settings.boardSize,
    options: getBoardOptions(translation)
  });
}

/**
 * Creates the selectable board-size options.
 *
 * @param translation - The active translation dictionary.
 * @returns The configured board-size options.
 */
function getBoardOptions(translation: Translations) {
  return [
    createOption("4x4", translation.settings.sixteenCards),
    createOption("4x6", translation.settings.twentyFourCards),
    createOption("6x6", translation.settings.thirtySixCards)
  ];
}

/**
 * Creates one settings option.
 *
 * @param value - The stored option value.
 * @param label - The translated option label.
 * @returns The configured settings option.
 */
function createOption(value: string, label: string) {
  return { value, label };
}
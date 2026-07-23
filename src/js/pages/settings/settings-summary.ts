// ------------ IMPORTS ------------//
import type { Translations } from "../../lib/language/language-interfaces";
import type { GameSettings } from "../../lib/pages/settings/settings-interfaces";
import type { BoardSize, GameTheme, PlayerId } from "../../lib/pages/settings/settings-types";

// ------------ FUNCTIONS ------------//

/**
 * Renders the selected settings and the game-start button.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings-summary markup.
 */
export function renderSettingsSummary(translation: Translations, settings: GameSettings): string {
  return `
    <footer class="settings-summary">
      ${renderSelectedSettings(translation, settings)}
      ${renderStartButton(translation)}
    </footer>
  `;
}

/**
 * Renders the currently selected theme, player, and board size.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The selected-settings markup.
 */
function renderSelectedSettings(translation: Translations, settings: GameSettings): string {
  return [
    renderSummaryValue(getThemeLabel(translation, settings.theme)),
    renderDivider(),
    renderSummaryValue(getPlayerLabel(translation, settings.startingPlayer)),
    renderDivider(),
    renderSummaryValue(getBoardLabel(translation, settings.boardSize))
  ].join("");
}

/**
 * Renders one selected settings value.
 *
 * @param label - The translated settings label.
 * @returns The summary-value markup.
 */
function renderSummaryValue(label: string): string {
  return `
    <span class="settings-summary__value">
      ${label}
    </span>
  `;
}

/**
 * Renders a decorative divider between summary values.
 *
 * @returns The divider markup.
 */
function renderDivider(): string {
  return `
    <span class="settings-summary__divider" aria-hidden="true"></span>
  `;
}

/**
 * Renders the button used to start a new game.
 *
 * @param translation - The active translation dictionary.
 * @returns The start-button markup.
 */
function renderStartButton(translation: Translations): string {
  return `
    <button class="settings-summary__start-button" type="submit">
      <img class="settings-summary__start-button__icon" src="/settings/start-icon.svg" alt="" aria-hidden="true">
      <span>${translation.settings.startButton}</span>
    </button>
  `;
}

/**
 * Resolves the translated label of a game theme.
 *
 * @param translation - The active translation dictionary.
 * @param theme - The selected game theme.
 * @returns The translated theme label.
 */
function getThemeLabel(translation: Translations, theme: GameTheme): string {
  const labels: Record<GameTheme, string> = {
    code: translation.settings.codeTheme,
    gaming: translation.settings.gamingTheme,
    academy: translation.settings.academyTheme,
    food: translation.settings.foodTheme
  };

  return labels[theme];
}

/**
 * Resolves the translated label of the starting player.
 *
 * @param translation - The active translation dictionary.
 * @param player - The selected starting player.
 * @returns The translated player label.
 */
function getPlayerLabel(translation: Translations, player: PlayerId): string {
  return player === "blue" ? translation.settings.bluePlayer : translation.settings.orangePlayer;
}

/**
 * Resolves the translated label of a board size.
 *
 * @param translation - The active translation dictionary.
 * @param boardSize - The selected board size.
 * @returns The translated board-size label.
 */
function getBoardLabel(translation: Translations, boardSize: BoardSize): string {
  const labels: Record<BoardSize, string> = {
    "4x4": translation.settings.sixteenCards,
    "4x6": translation.settings.twentyFourCards,
    "6x6": translation.settings.thirtySixCards
  };

  return labels[boardSize];
}
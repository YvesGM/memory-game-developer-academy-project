// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameSettings, ThemePreviewConfig } from "./game-setting-interfaces";
import type { PlayerId } from "./game-setting-types";

// ## TS - FUNCTION-IMPORTS
import { getPlayerIconPath, getThemePreviewConfig } from "./theme-preview-config";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the preview of the currently selected game theme.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The theme-preview markup.
 */
export function renderThemePreview(translation: Translations, settings: GameSettings): string {
  const config = getThemePreviewConfig(settings.theme);
  const basePath = getThemePreviewBasePath(config);
  const playerIcon = getPlayerIconPath(config, settings.startingPlayer);

  return `
    <article
      class="theme-preview ${config.className} theme-preview--player-${settings.startingPlayer}">
      ${renderPreviewHeader(translation, config, playerIcon, basePath)}
      ${renderPreviewCards(basePath)}
    </article>
  `;
}

/**
 * Creates the asset base path of a theme preview.
 *
 * @param config - The active theme-preview configuration.
 * @returns The theme asset base path.
 */
function getThemePreviewBasePath(config: ThemePreviewConfig): string {
  return `/settings/theme-visuals/${config.assetFolder}`;
}

/**
 * Renders the header of the theme preview.
 *
 * @param translation - The active translation dictionary.
 * @param config - The active theme-preview configuration.
 * @param playerIcon - The current-player icon path.
 * @param basePath - The theme asset base path.
 * @returns The preview-header markup.
 */
function renderPreviewHeader(translation: Translations, config: ThemePreviewConfig, playerIcon: string, basePath: string): string {
  return `
    <header class="theme-preview__header">
      ${renderScoreDisplay(translation, config, basePath)}
      ${renderCurrentPlayer(translation, playerIcon)}
      ${renderExitButton(translation, basePath)}
    </header>
  `;
}

/**
 * Renders the score display matching the configured score mode.
 *
 * @param translation - The active translation dictionary.
 * @param config - The active theme-preview configuration.
 * @param basePath - The theme asset base path.
 * @returns The score-display markup.
 */
function renderScoreDisplay(translation: Translations, config: ThemePreviewConfig, basePath: string): string {
  if (config.scoreMode === "combined-icon") {
    return renderCombinedScoreDisplay(config, basePath);
  }

  return renderSeparateScoreDisplay(translation, config, basePath);
}

/**
 * Renders the current-player section of the preview.
 *
 * @param translation - The active translation dictionary.
 * @param playerIcon - The current-player icon path.
 * @returns The current-player markup.
 */
function renderCurrentPlayer(translation: Translations, playerIcon: string): string {
  return `
    <div class="theme-preview__current-player">
      <span class="theme-preview__current-player-label">
        ${translation.settings.currentPlayer}
      </span>
      <img class="theme-preview__current-player-icon" src="${playerIcon}" alt="" aria-hidden="true">
    </div>
  `;
}

/**
 * Renders the decorative exit button of the preview.
 *
 * @param translation - The active translation dictionary.
 * @param basePath - The theme asset base path.
 * @returns The exit-button markup.
 */
function renderExitButton(translation: Translations, basePath: string): string {
  return `
    <button class="theme-preview__exit-button" type="button" tabindex="-1" aria-hidden="true">
      <img class="theme-preview__exit-icon" src="${basePath}/exit-icon.svg" alt="" aria-hidden="true">
      <span>${translation.settings.exitGame}</span>
    </button>
  `;
}

/**
 * Renders one compact player score.
 *
 * @param basePath - The theme asset base path.
 * @param player - The represented player.
 * @param score - The displayed player score.
 * @returns The compact-score markup.
 */
function renderCompactScore(basePath: string, player: PlayerId, score: number): string {
  return `
    <span class="theme-preview__score theme-preview__score--${player}">
      <img class="theme-preview__score-icon" src="${basePath}/${player}-player-icon.svg" alt="">
      <span class="theme-preview__score-number">
        ${score}
      </span>
    </span>
  `;
}

/**
 * Renders one labeled player score.
 *
 * @param basePath - The theme asset base path.
 * @param player - The represented player.
 * @param label - The translated player label.
 * @param score - The displayed player score.
 * @returns The labeled-score markup.
 */
function renderLabeledScore(basePath: string, player: PlayerId, label: string, score: number): string {
  return `
    <span class="theme-preview__score theme-preview__score--${player}">
      <img class="theme-preview__score-icon" src="${basePath}/${player}-player-icon.svg" alt="">
      <span class="theme-preview__score-label">
        ${label}
      </span>
      <span class="theme-preview__score-number">
        ${score}
      </span>
    </span>
  `;
}

/**
 * Renders both scores in the compact combined layout.
 *
 * @param config - The active theme-preview configuration.
 * @param basePath - The theme asset base path.
 * @returns The combined-score markup.
 */
function renderCombinedScoreDisplay(config: ThemePreviewConfig, basePath: string): string {
  return `
    <div class="theme-preview__scores theme-preview__scores--combined" aria-hidden="true">
      ${renderCompactScore(basePath, "orange", config.orangeScore)}
      ${renderCompactScore(basePath, "blue", config.blueScore)}
    </div>
  `;
}

/**
 * Renders both scores with translated player labels.
 *
 * @param translation - The active translation dictionary.
 * @param config - The active theme-preview configuration.
 * @param basePath - The theme asset base path.
 * @returns The separate-score markup.
 */
function renderSeparateScoreDisplay(translation: Translations, config: ThemePreviewConfig, basePath: string): string {
  return `
    <div class="theme-preview__scores" aria-hidden="true">
      ${renderLabeledScore(basePath, "blue", translation.settings.bluePlayer, config.blueScore)}
      ${renderLabeledScore(basePath, "orange", translation.settings.orangePlayer, config.orangeScore)}
    </div>
  `;
}

/**
 * Renders the decorative cards of the theme preview.
 *
 * @param basePath - The theme asset base path.
 * @returns The preview-card markup.
 */
function renderPreviewCards(basePath: string): string {
  return `
    <div class="theme-preview__cards" aria-hidden="true">
      ${renderPreviewCard(basePath, "first", "first-card.svg")}
      ${renderPreviewCard(basePath, "second", "second-card.svg")}
    </div>
  `;
}

/**
 * Renders one decorative preview card.
 *
 * @param basePath - The theme asset base path.
 * @param position - The card-position modifier.
 * @param fileName - The preview-card filename.
 * @returns The preview-card markup.
 */
function renderPreviewCard(basePath: string, position: "first" | "second", fileName: string): string {
  return `
    <img class="theme-preview__card theme-preview__card--${position}" src="${basePath}/${fileName}" alt="">
  `;
}
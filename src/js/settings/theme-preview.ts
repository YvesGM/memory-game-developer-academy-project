// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameSettings, ThemePreviewConfig } from "./game-setting-interfaces";

// ## TS - FUNCTION-IMPORTS
import { getPlayerIconPath, getThemePreviewConfig } from "./theme-preview-config";

// # FUNCTIONALITY
// ## FUNCTIONS
export function renderThemePreview(translation: Translations, settings: GameSettings): string {
  const config = getThemePreviewConfig(settings.theme);
  const basePath = `/settings/theme-visuals/${config.assetFolder}`;
  const playerIcon = getPlayerIconPath(config, settings.startingPlayer);

  return `
    <article class="theme-preview ${config.className} theme-preview--player-${settings.startingPlayer}">
      ${renderPreviewHeader(
    translation,
    config,
    playerIcon,
    basePath
  )}

      ${renderPreviewCards(basePath)}
    </article>
  `;
}

function renderPreviewHeader(translation: Translations, config: ThemePreviewConfig, playerIcon: string, basePath: string): string {
  return `
    <header class="theme-preview__header">
      ${renderScoreDisplay(translation, config, basePath)}

      <div class="theme-preview__current-player">
        <span class="theme-preview__current-player-label">
          ${translation.settings.currentPlayer}
        </span>

        <img class="theme-preview__current-player-icon" src="${playerIcon}" alt="" aria-hidden="true">
      </div>

      <button class="theme-preview__exit-button" type="button" tabindex="-1" aria-hidden="true">
        <img class="theme-preview__exit-icon" src="${basePath}/exit-icon.svg" alt="" aria-hidden="true">
        <span>${translation.settings.exitGame}</span>
      </button>
    </header>
  `;
}

function renderScoreDisplay(translation: Translations, config: ThemePreviewConfig, basePath: string): string {
  if (config.scoreMode === "combined-icon") {
    return renderCombinedScoreDisplay(config, basePath);
  }

  return renderSeparateScoreDisplay(translation, config, basePath);
}

function renderCompactScore(basePath: string, player: "blue" | "orange", score: number): string {
  return `
    <span class="theme-preview__score theme-preview__score--${player}">
      <img class="theme-preview__score-icon" src="${basePath}/${player}-player-icon.svg" alt="">
      <span class="theme-preview__score-number">${score}</span>
    </span>
  `;
}

function renderLabeledScore(basePath: string, player: "blue" | "orange", label: string, score: number): string {
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

function renderCombinedScoreDisplay(config: ThemePreviewConfig, basePath: string): string {
  return `
    <div class="theme-preview__scores theme-preview__scores--combined" aria-hidden="true">
      ${renderCompactScore(basePath, "orange", config.orangeScore)}
      ${renderCompactScore(basePath, "blue", config.blueScore)}
    </div>
  `;
}

function renderSeparateScoreDisplay(translation: Translations, config: ThemePreviewConfig, basePath: string): string {
  return `
    <div class="theme-preview__scores" aria-hidden="true">
      ${renderLabeledScore(basePath, "blue", translation.settings.bluePlayer, config.blueScore)}
      ${renderLabeledScore(basePath, "orange", translation.settings.orangePlayer, config.orangeScore)}
    </div>
  `;
}

function renderPreviewCards(basePath: string): string {
  return `
    <div class="theme-preview__cards" aria-hidden="true">
      <img class="theme-preview__card theme-preview__card--first" src="${basePath}/first-card.svg" alt="">
      <img class="theme-preview__card theme-preview__card--second" src="${basePath}/second-card.svg" alt="">
    </div>
  `;
}
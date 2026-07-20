import type { Translations } from "../language/language-types";
import type { GameSettings, ThemePreviewConfig } from "./game-setting-interfaces";

import { getPlayerIconPath, getThemePreviewConfig } from "./theme-preview-config";

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
      ${renderScoreDisplay(config, basePath)}

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

function renderScoreDisplay(config: ThemePreviewConfig, basePath: string): string {
  if (config.scoreMode === "combined-icon") {
    return `
      <div class="theme-preview__scores theme-preview__scores--combined" aria-hidden="true">
        <span class="theme-preview__score theme-preview__score--orange">
          <img class="theme-preview__score-icon" src="${basePath}/orange-player-icon.svg" alt="">
          <span class="theme-preview__score-number">0</span>
        </span>

        <span class="theme-preview__score theme-preview__score--blue">
          <img class="theme-preview__score-icon" src="${basePath}/blue-player-icon.svg" alt="">
          <span class="theme-preview__score-number">0</span>
        </span>
      </div>
    `;
  }

  return `
    <div class="theme-preview__scores" aria-hidden="true">
      ${renderScore(basePath, "blue", "Blue")}
      ${renderScore(basePath, "orange", "Orange")}
    </div>
  `;
}

function renderScore(basePath: string, player: "blue" | "orange", label: string): string {
  return `
    <span class="theme-preview__score theme-preview__score--${player}">
      <img class="theme-preview__score-icon" src="${basePath}/${player}-player-icon.svg" alt="">

      <span class="theme-preview__score-label">
        ${label}
      </span>

      <span class="theme-preview__score-number">
        0
      </span>
    </span>
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
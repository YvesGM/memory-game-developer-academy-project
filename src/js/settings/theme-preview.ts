import type { Translations } from "../language/language-types";
import type { GameSettings } from "./game-setting-interfaces";

import { getPlayerIconPath, getThemePreviewConfig } from "./theme-preview-config";

export function renderThemePreview(translation: Translations,settings: GameSettings): string {
  const config = getThemePreviewConfig(settings.theme);
  const basePath = `/settings/theme-visuals/${config.assetFolder}`;
  const playerIcon = getPlayerIconPath(
    config.assetFolder,
    settings.startingPlayer
  );

  return `
    <article class="theme-preview ${config.className}">
      ${renderPreviewHeader(translation, playerIcon, basePath)}
      ${renderPreviewCards(basePath)}
    </article>
  `;
}

function renderPreviewHeader(translation: Translations,playerIcon: string,basePath: string): string {
  return `
    <header class="theme-preview__header">
      ${renderScoreDisplay()}

      <div class="theme-preview__current-player">
        <span>${translation.settings.currentPlayer}</span>
        <img src="${playerIcon}" alt="">
      </div>

      <button class="theme-preview__exit-button" type="button" tabindex="-1">
        <img src="${basePath}/exit-icon.svg" alt="" aria-hidden="true">
        <span>${translation.settings.exitGame}</span>
      </button>
    </header>
  `;
}

function renderScoreDisplay(): string {
  return `
    <div class="theme-preview__scores" aria-hidden="true">
      <span class="theme-preview__score theme-preview__score--blue">
        <img src="/settings/theme-visuals/coding/blue-player-icon.svg" alt="">
        <span>0</span>
      </span>

      <span class="theme-preview__score theme-preview__score--orange">
        <img src="/settings/theme-visuals/coding/orange-player-icon.svg" alt="">
        <span>0</span>
      </span>
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
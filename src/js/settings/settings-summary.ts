// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";
import type { GameSettings } from "./game-setting-interfaces";
import type { BoardSize, GameTheme, PlayerId } from "./game-setting-types";

// # FUNCTIONALITY
// ## FUNCTIONS
export function renderSettingsSummary(translation: Translations, settings: GameSettings): string {
  return `
    <footer class="settings-summary">
      ${renderSummaryValue(getThemeLabel(translation, settings.theme))}
      ${renderDivider()}
      ${renderSummaryValue(getPlayerLabel(translation, settings.startingPlayer))}
      ${renderDivider()}
      ${renderSummaryValue(getBoardLabel(translation, settings.boardSize))}
      ${renderStartButton(translation)}
    </footer>
  `;
}

function renderSummaryValue(label: string): string {
  return `<span class="settings-summary__value">${label}</span>`;
}

function renderDivider(): string {
  return `
    <span class="settings-summary__divider" aria-hidden="true"></span>
  `;
}

function renderStartButton(translation: Translations): string {
  return `
    <button class="settings-summary__start-button" type="submit">
      <img class="settings-summary__start-button__icon" src="/settings/start-icon.svg" alt="" aria-hidden="true">
      <span>${translation.settings.startButton}</span>
    </button>
  `;
}

function getThemeLabel(translation: Translations, theme: GameTheme): string {
  const labels: Record<GameTheme, string> = {
    code: translation.settings.codeTheme,
    gaming: translation.settings.gamingTheme,
    academy: translation.settings.academyTheme,
    food: translation.settings.foodTheme
  };
  return labels[theme];
}

function getPlayerLabel(translation: Translations, player: PlayerId): string {
  return player === "blue" ? translation.settings.bluePlayer : translation.settings.orangePlayer;
}

function getBoardLabel(translation: Translations, boardSize: BoardSize): string {
  const labels: Record<BoardSize, string> = {
    "4x4": translation.settings.sixteenCards,
    "4x6": translation.settings.twentyFourCards,
    "6x6": translation.settings.thirtySixCards
  };

  return labels[boardSize];
}
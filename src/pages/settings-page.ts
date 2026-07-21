// # TYPESCRIPT
// ## TS - TYPES
import type { Language, Translations } from "../js/language/language-types";
import type { GameSettings } from "../js/settings/game-setting-interfaces";

// ## TS - FUNCTION-IMPORTS
import { renderLanguageSwitch } from "../js/components/language-switch";
import { renderSettingsGroup } from "../js/settings/settings-options";
import { renderSettingsSummary } from "../js/settings/settings-summary";
import { renderThemePreview } from "../js/settings/theme-preview";

// # FUNCTIONALITY
// ## FUNCTIONS
export function renderSettingsPage(translation: Translations,language: Language,settings: GameSettings): string {
  return `
    <main class="settings-page">
      <div class="settings-page__language">
        ${renderLanguageSwitch(language, translation)}
      </div>

      <section class="settings-page__content">
        ${renderHeading(translation)}
        <form class="settings-page__form" data-settings-form>
          <div class="settings-page__layout">
            <div class="settings-page__options">
              ${renderThemeGroup(translation, settings)}
              ${renderPlayerGroup(translation, settings)}
              ${renderBoardGroup(translation, settings)}
            </div>

            <div class="settings-page__preview-area">
              ${renderThemePreview(translation, settings)}
              ${renderSettingsSummary(translation, settings)}
            </div>
          </div>
        </form>
      </section>
    </main>
  `;
}

function renderHeading(translation: Translations): string {
  return `
    <header class="settings-page__heading">
      <h1 class="settings-page__title">
        ${translation.settings.title}
      </h1>
    </header>
  `;
}

function renderThemeGroup(translation: Translations,settings: GameSettings): string {
  return renderSettingsGroup({
    name: "theme",
    legend: translation.settings.themeTitle,
    iconPath: "/settings/palette.svg",
    selectedValue: settings.theme,
    showSelectionMarker: true,
    options: [
      {
        value: "code",
        label: translation.settings.codeTheme
      },
      {
        value: "gaming",
        label: translation.settings.gamingTheme
      },
      {
        value: "academy",
        label: translation.settings.academyTheme
      },
      {
        value: "food",
        label: translation.settings.foodTheme
      }
    ]
  });
}

function renderPlayerGroup(translation: Translations,settings: GameSettings): string {
  return renderSettingsGroup({
    name: "startingPlayer",
    legend: translation.settings.playerTitle,
    iconPath: "/settings/chess-pawn-icon.svg",
    selectedValue: settings.startingPlayer,
    options: [
      {
        value: "blue",
        label: translation.settings.bluePlayer
      },
      {
        value: "orange",
        label: translation.settings.orangePlayer
      }
    ]
  });
}

function renderBoardGroup(translation: Translations,settings: GameSettings): string {
  return renderSettingsGroup({
    name: "boardSize",
    legend: translation.settings.boardSizeTitle,
    iconPath: "/settings/style-icon.svg",
    selectedValue: settings.boardSize,
    options: [
      {
        value: "4x4",
        label: translation.settings.sixteenCards
      },
      {
        value: "4x6",
        label: translation.settings.twentyFourCards
      },
      {
        value: "6x6",
        label: translation.settings.thirtySixCards
      }
    ]
  });
}
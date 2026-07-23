// ------------ IMPORTS ------------//
import type { Language } from "./lib/language/language-types";
import type { Translations } from "./lib/language/language-interfaces";
import type { GameSettings } from "./lib/pages/settings/settings-interfaces";

import { renderLanguageSwitch } from "./components/language/language-switch";
import { renderSettingsSummary } from "./pages/settings/settings-summary";
import { renderThemePreview } from "./pages/settings/settings-theme-preview";
import { renderBoardGroup, renderPlayerGroup, renderThemeGroup } from "./pages/settings/settings-page-groups";

// ------------ FUNCTIONS ------------//

/**
 * Renders the complete settings page.
 *
 * @param translation - The active translation dictionary.
 * @param language - The currently selected language.
 * @param settings - The currently selected game settings.
 * @returns The settings-page markup.
 */
export function renderSettingsPage(translation: Translations, language: Language, settings: GameSettings): string {
  return `
    <main class="settings-page">
      ${renderSettingsLanguage(language, translation)}
      ${renderSettingsContent(translation, settings)}
    </main>
  `;
}

/**
 * Renders the language switch of the settings page.
 *
 * @param language - The currently selected language.
 * @param translation - The active translation dictionary.
 * @returns The language-switch container markup.
 */
function renderSettingsLanguage(language: Language, translation: Translations): string {
  return `
    <div class="settings-page__language">
      ${renderLanguageSwitch(language, translation)}
    </div>
  `;
}

/**
 * Renders the main content of the settings page.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings content markup.
 */
function renderSettingsContent(translation: Translations, settings: GameSettings): string {
  return `
    <section class="settings-page__content">
      ${renderHeading(translation)}
      ${renderSettingsForm(translation, settings)}
    </section>
  `;
}

/**
 * Renders the heading of the settings page.
 *
 * @param translation - The active translation dictionary.
 * @returns The settings heading markup.
 */
function renderHeading(translation: Translations): string {
  return `
    <header class="settings-page__heading">
      <h1 class="settings-page__title">
        ${translation.settings.title}
      </h1>
    </header>
  `;
}

/**
 * Renders the complete settings form.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings-form markup.
 */
function renderSettingsForm(translation: Translations, settings: GameSettings): string {
  return `
    <form class="settings-page__form" data-settings-form>
      ${renderSettingsLayout(translation, settings)}
    </form>
  `;
}

/**
 * Renders the two-column layout of the settings form.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings-layout markup.
 */
function renderSettingsLayout(translation: Translations, settings: GameSettings): string {
  return `
    <div class="settings-page__layout">
      ${renderOptionsArea(translation, settings)}
      ${renderPreviewArea(translation, settings)}
    </div>
  `;
}

/**
 * Renders all selectable settings groups.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings-options markup.
 */
function renderOptionsArea(translation: Translations, settings: GameSettings): string {
  return `
    <div class="settings-page__options">
      ${renderThemeGroup(translation, settings)}
      ${renderPlayerGroup(translation, settings)}
      ${renderBoardGroup(translation, settings)}
    </div>
  `;
}

/**
 * Renders the theme preview and settings summary.
 *
 * @param translation - The active translation dictionary.
 * @param settings - The currently selected game settings.
 * @returns The settings preview-area markup.
 */
function renderPreviewArea(translation: Translations, settings: GameSettings): string {
  return `
    <div class="settings-page__preview-area">
      ${renderThemePreview(translation, settings)}
      ${renderSettingsSummary(translation, settings)}
    </div>
  `;
}
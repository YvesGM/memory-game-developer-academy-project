// # TYPESCRIPT
// ## TS - TYPES
import type { Language, Translations } from "../js/language/language-types";

// ## TS - FUNCTION-IMPORTS
import { renderLanguageSwitch } from "../js/components/language-switch";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the complete home page.
 *
 * @param translation - The active translation dictionary.
 * @param language - The currently selected language.
 * @returns The home-page markup.
 */
export function renderHomePage(translation: Translations, language: Language): string {
  return `
    <main class="home-page">
      ${renderBackgroundController()}
      ${renderHomeContent(translation, language)}
    </main>
  `;
}

/**
 * Renders the central content area of the home page.
 *
 * @param translation - The active translation dictionary.
 * @param language - The currently selected language.
 * @returns The home-page content markup.
 */
function renderHomeContent(translation: Translations, language: Language): string {
  return `
    <section class="home-page__content">
      ${renderHomeHeading(translation)}
      ${renderHomeActions(translation, language)}
    </section>
  `;
}

/**
 * Renders the decorative background controller.
 *
 * @returns The background-controller markup.
 */
function renderBackgroundController(): string {
  return `
    <img class="home-page__controller" src="/home/home-controller.svg" alt="" aria-hidden="true">
  `;
}

/**
 * Renders the heading of the home page.
 *
 * @param translation - The active translation dictionary.
 * @returns The home-page heading markup.
 */
function renderHomeHeading(translation: Translations): string {
  return `
    <header class="home-page__heading">
      ${renderHomeEyebrow(translation)}
      ${renderHomeTitle(translation)}
    </header>
  `;
}

/**
 * Renders the introductory home-page text.
 *
 * @param translation - The active translation dictionary.
 * @returns The eyebrow-text markup.
 */
function renderHomeEyebrow(translation: Translations): string {
  return `
    <p class="home-page__eyebrow">
      ${translation.home.eyebrow}
    </p>
  `;
}

/**
 * Renders the main home-page title.
 *
 * @param translation - The active translation dictionary.
 * @returns The title markup.
 */
function renderHomeTitle(translation: Translations): string {
  return `
    <h1 class="home-page__title">
      ${translation.home.title}
    </h1>
  `;
}

/**
 * Renders the interactive home-page controls.
 *
 * @param translation - The active translation dictionary.
 * @param language - The currently selected language.
 * @returns The home-page actions markup.
 */
function renderHomeActions(translation: Translations, language: Language): string {
  return `
    <div class="home-page__actions">
      ${renderPlayButton(translation)}
      ${renderLanguageSwitch(language, translation)}
    </div>
  `;
}

/**
 * Renders the button that opens the settings page.
 *
 * @param translation - The active translation dictionary.
 * @returns The play-button markup.
 */
function renderPlayButton(translation: Translations): string {
  return `
    <button class="primary-button" type="button" data-route="settings">
      ${renderPlayButtonController()}
      ${renderPlayButtonLabel(translation)}
      ${renderPlayButtonArrow()}
    </button>
  `;
}

/**
 * Renders the decorative controller inside the play button.
 *
 * @returns The controller-icon markup.
 */
function renderPlayButtonController(): string {
  return `
    <img class="primary-button__controller" src="/home/home-controller-icon.svg" alt="" aria-hidden="true">
  `;
}

/**
 * Renders the translated play-button label.
 *
 * @param translation - The active translation dictionary.
 * @returns The button-label markup.
 */
function renderPlayButtonLabel(translation: Translations): string {
  return `
    <span class="primary-button__label">
      ${translation.home.playButton}
    </span>
  `;
}

/**
 * Renders the decorative arrow inside the play button.
 *
 * @returns The arrow-icon markup.
 */
function renderPlayButtonArrow(): string {
  return `
    <img class="primary-button__arrow" src="/home/home-arrow.svg" alt="" aria-hidden="true">
  `;
}
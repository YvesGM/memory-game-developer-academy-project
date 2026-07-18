import type { Language, Translations } from "../js/language/language-types";

import { renderLanguageSwitch } from "../js/components/language-switch";

export function renderHomePage(translation: Translations, language: Language): string {
  return `
    <main class="home-page">
      ${renderBackgroundController()}

      <section class="home-page__content">
        <header class="home-page__heading">
          <p class="home-page__eyebrow">
            ${translation.home.eyebrow}
          </p>

          <h1 class="home-page__title">
            ${translation.home.title}
          </h1>
        </header>

        <div class="home-page__actions">
          ${renderPlayButton(translation)}
          ${renderLanguageSwitch(language, translation)}
        </div>
      </section>
    </main>
  `;
}

function renderBackgroundController(): string {
  return `
    <img class="home-page__controller" src="/home/home-controller.svg" alt="" aria-hidden="true">
  `;
}

function renderPlayButton(translation: Translations): string {
  return `
    <button class="primary-button" type="button" data-route="settings">
      <img class="primary-button__controller" src="/home/home-controller-icon.svg" alt="" aria-hidden="true">

      <span class="primary-button__label">
        ${translation.home.playButton}
      </span>

      <img class="primary-button__arrow" src="/home/home-arrow.svg" alt="" aria-hidden="true">
    </button>
  `;
}
// ------------ IMPORTS ------------//
import type { Language } from "../../lib/language/language-types";
import type { Translations } from "../../lib/language/language-interfaces";

// ------------ FUNCTIONS ------------//

/**
 * Renders the language-switch navigation for the active language.
 *
 * @param currentLanguage - The currently selected application language.
 * @param translation - The translated texts for the active language.
 * @returns The HTML markup for the language-switch navigation.
 */
export function renderLanguageSwitch(currentLanguage: Language, translation: Translations): string {
  return `
    <nav class="language-switch" aria-label="${translation.base.langSwitchAriaLabel}">
      ${renderLanguageButton("de", translation.base.germanLanguage, currentLanguage)}
      <span class="language-switch__separator" aria-hidden="true">|</span>
      ${renderLanguageButton("en", translation.base.englishLanguage, currentLanguage)}
    </nav>
  `;
}

/**
 * Renders a language-selection button.
 *
 * @param language - The language represented by the button.
 * @param label - The visible button label.
 * @param currentLanguage - The currently selected application language.
 * @returns The HTML markup for the language button.
 */
function renderLanguageButton(language: Language, label: string, currentLanguage: Language): string {
  const isActive = currentLanguage === language;

  return `<button class="language-switch__button" type="button" data-language="${language}" aria-pressed="${isActive}">${label}</button>`;
}
import type { Language, Translations } from "../language/language-types";

export function renderLanguageSwitch(currentLanguage: Language, translation: Translations): string {
  return `
    <nav class="language-switch" aria-label="${translation.base.langSwitchAriaLabel}">
      ${renderLanguageButton("de", translation.base.germanLanguage, currentLanguage)}
      <span class="language-switch__separator" aria-hidden="true">|</span>
      ${renderLanguageButton("en", translation.base.englishLanguage, currentLanguage)}
    </nav>
  `;
}

function renderLanguageButton(language: Language, label: string, currentLanguage: Language): string {
  return `
    <button class="language-switch__button" type="button" data-language="${language}" aria-pressed="${currentLanguage === language}">
      ${label}
    </button>
  `;
}
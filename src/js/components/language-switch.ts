import type { Language } from "../language/language-types";

import { TRANSLATIONS } from "../language/translations";

export function renderLanguageSwitch(currentLanguage: Language): string {
    return `
        <nav aria-label="${TRANSLATIONS[currentLanguage].base.langSwitchAriaLabel}">

          <button type="button" data-language="de" aria-pressed="${currentLanguage === "de"}">
            DE
          </button>

          <button type="button" data-language="en" aria-pressed="${currentLanguage === "en"}">
            EN
          </button>

        </nav>
    `;
}
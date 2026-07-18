import type { Language, Translations } from "../js/language/language-types";

import { renderLanguageSwitch } from "../js/components/language-switch";

export function renderHomePage(translation: Translations, language: Language): string {
    return `
        <main>

            ${renderLanguageSwitch(language)}
            
            <section>
                <h1>${translation.home.title}</h1>

                <button type="button" data-route="settings">
                    ${translation.home.playButton}
                </button>
            </section>

        </main>
    `;
}
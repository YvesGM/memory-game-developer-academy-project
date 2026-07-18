import type { Language, Translations } from "../js/language/language-types";
import type { GameSettings } from "../js/settings/game-setting-interfaces";

import { renderLanguageSwitch } from "../js/components/language-switch";

export function renderSettingsPage(translation: Translations, language: Language, settings: GameSettings): string {
    return `
        <main>

            ${renderLanguageSwitch(language, translation)}

            <section>
                <h1>${translation.settings.title}</h1>

                <form data-settings-form>
                  ${renderThemeOptions(translation, settings)}
                  ${renderPlayerOptions(translation, settings)}
                  ${renderBoardSizeOptions(translation, settings)}

                  <button type="submit">
                    ${translation.settings.startButton}
                  </button>

                  <button type="button" data-route="home">
                    ${translation.settings.backButton}
                  </button>
                </form>
            </section>
        </main>
  `;
}

function renderThemeOptions(translation: Translations, settings: GameSettings): string {
    return `
        <fieldset>
            <legend>${translation.settings.themeTitle}</legend>

            ${renderRadio("theme", "code", "Code", settings.theme)}
            ${renderRadio("theme", "gaming", "Gaming", settings.theme)}
            ${renderRadio("theme", "academy", "Academy", settings.theme)}
            ${renderRadio("theme", "food", "Food", settings.theme)}
        </fieldset>
    `;
}

function renderPlayerOptions(translation: Translations, settings: GameSettings): string {
    return `
        <fieldset>
            <legend>${translation.settings.playerTitle}</legend>

            ${renderRadio(
        "startingPlayer",
        "blue",
        "Blue Player",
        settings.startingPlayer
    )}

            ${renderRadio(
        "startingPlayer",
        "orange",
        "Orange Player",
        settings.startingPlayer
    )}
        </fieldset>
    `;
}

function renderBoardSizeOptions(translation: Translations, settings: GameSettings): string {
    return `
        <fieldset>
            <legend>${translation.settings.boardSizeTitle}</legend>
    
            ${renderRadio("boardSize", "4x4", "4 × 4", settings.boardSize)}
            ${renderRadio("boardSize", "4x6", "4 × 6", settings.boardSize)}
            ${renderRadio("boardSize", "6x6", "6 × 6", settings.boardSize)}
        </fieldset>
    `;
}

function renderRadio(name: string, value: string, label: string, selectedValue: string): string {
    const isChecked = value === selectedValue ? "checked" : "";

    return `
        <label>
            <input type="radio" name="${name}" value="${value}" ${isChecked}>
            <span>${label}</span>
        </label>
    `;
}
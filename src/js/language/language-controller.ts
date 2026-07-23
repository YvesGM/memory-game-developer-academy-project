// ------------ IMPORTS ------------//
import type { Language } from "../lib/language/language-types";

// ## TS - FUNCTION-IMPORTS
import { appContext } from "../lib/app/app-constants";
import { renderApp } from "../app/app-renderer";
import { isLanguage, saveLanguage } from "./language-service";

// ------------ FUNCTIONS ------------//

/**
 * Handles delegated clicks on language-switch buttons.
 *
 * @param event - The delegated mouse event.
 */
export function handleLanguageClick(event: MouseEvent): void {
    const language = getLanguageFromTarget(event.target);
    
    if (language === null) {
        return;
    }

    activateLanguage(language);
}

/**
 * Extracts a valid language from an event target.
 *
 * @param target - The original event target.
 * @returns The selected language or `null`.
 */
function getLanguageFromTarget(target: EventTarget | null): Language | null {
    if (!(target instanceof Element)) {
        return null;
    }

    const button = target.closest<HTMLButtonElement>(
        "[data-language]"
    );

    return getLanguageFromButton(button);
}

/**
 * Extracts a valid language from a language button.
 *
 * @param button - The language button to evaluate.
 * @returns The selected language or `null`.
 */
function getLanguageFromButton(button: HTMLButtonElement | null): Language | null {
    const language = button?.dataset.language ?? null;
    return isLanguage(language) ? language : null;
}

/**
 * Activates, persists, and renders a language.
 *
 * @param language - The language to activate.
 */
function activateLanguage(language: Language): void {
    appContext.currentLanguage = language;
    saveLanguage(language);
    renderApp();
}
// ------------ IMPORTS ------------//
import { renderRoute } from "../router/app-router";
import { getTranslation } from "../language/language-service";
import { saveGameState } from "../lib/pages/game/game-state-storage";
import { appContext } from "../lib/app/app-constants";
import { appRef } from "../lib/app/app-constants";

// ------------ FUNCTIONS ------------//

/**
 * Renders the currently active route using the current application state.
 *
 * Also synchronizes the language of the root HTML element.
 */
export function renderApp(): void {
    const translation = getTranslation(appContext.currentLanguage);
    document.documentElement.lang = appContext.currentLanguage;
    appRef.innerHTML = renderCurrentRoute(translation);
}

/**
 * Creates the markup for the currently active application route.
 *
 * @param translation - The translations for the active language.
 * @returns The rendered HTML markup for the active route.
 */
function renderCurrentRoute(translation: ReturnType<typeof getTranslation>): string {
    return renderRoute(appContext.currentRoute, translation, appContext.currentLanguage, appContext.currentSettings, appContext.currentGameState);
}

/**
 * Persists the current game state and re-renders the application.
 */
export function persistAndRenderGame(): void {
    saveGameState(appContext.currentGameState);
    renderApp();
}
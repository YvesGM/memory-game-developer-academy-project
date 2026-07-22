// # TYPESCRIPT
// ## TS - FUNCTION-IMPORTS
import { renderRoute } from "../router/app-router";
import { getTranslation } from "../language/language-service";
import { saveGameState } from "../game/game-state-storage";
import { appContext } from "./app-context";
import { appRef } from "./app-dom";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the active route using the current application state.
 *
 * Also synchronizes the language of the HTML document.
 */
export function renderApp(): void {
    const translation = getTranslation(
        appContext.currentLanguage
    );

    document.documentElement.lang =
        appContext.currentLanguage;

    appRef.innerHTML = renderCurrentRoute(translation);
}

/**
 * Creates the markup for the currently active route.
 *
 * @param translation - The active translation dictionary.
 * @returns The rendered route markup.
 */
function renderCurrentRoute(
    translation: ReturnType<typeof getTranslation>
): string {
    return renderRoute(
        appContext.currentRoute,
        translation,
        appContext.currentLanguage,
        appContext.currentSettings,
        appContext.currentGameState
    );
}

/**
 * Persists the current game state and re-renders the application.
 */
export function persistAndRenderGame(): void {
    saveGameState(appContext.currentGameState);
    renderApp();
}
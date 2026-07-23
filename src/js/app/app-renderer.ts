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
    const wasExitDialogOpen = isExitDialogOpen();

    document.documentElement.lang = appContext.currentLanguage;
    appRef.innerHTML = renderCurrentRoute(translation);

    restoreExitDialogState(wasExitDialogOpen);
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
 * Checks whether the currently rendered exit dialog is open.
 *
 * @returns `true` when the exit dialog is visibly open.
 */
function isExitDialogOpen(): boolean {
    const dialog = appRef.querySelector<HTMLElement>("[data-exit-dialog]");

    return (dialog !== null && !dialog.hidden && dialog.classList.contains("exit-dialog-backdrop--open"));
}

/**
 * Restores the open state of the exit dialog after rendering.
 *
 * @param shouldBeOpen - Whether the dialog was open before rendering.
 */
function restoreExitDialogState(shouldBeOpen: boolean): void {
    if (!shouldBeOpen) {
        return;
    }

    const dialog = appRef.querySelector<HTMLElement>("[data-exit-dialog]");
    if (!dialog) {
        return;
    }

    dialog.hidden = false;
    dialog.classList.remove("exit-dialog-backdrop--closing");
    dialog.classList.add("exit-dialog-backdrop--open");
    document.body.classList.add("is-dialog-open");
}

/**
 * Persists the current game state and re-renders the application.
 */
export function persistAndRenderGame(): void {
    saveGameState(appContext.currentGameState);
    renderApp();
}
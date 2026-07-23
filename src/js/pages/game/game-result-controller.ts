// ------------ IMPORTS ------------//
import { GAME_OVER_DURATION } from "../../lib/pages/game/game-constants";
import { GAME_ROUTE, HOME_ROUTE } from "../../lib/router/route-constants";
import { appContext } from "../../lib/app/app-constants";
import { persistAndRenderGame } from "../../app/app-renderer";
import { navigateTo } from "../../router/route-controller";
import { createInitialGameState, showGameOver, showGameResult } from "./game-state";
import { clearGameState, } from "../../lib/pages/game/game-state-storage";

// ------------ FUNCTIONS ------------//

/**
 * Cancels the pending transition to the final game result.
 */
export function clearGameResultTimeout(): void {
    const timeoutId = appContext.gameResultTimeoutId;
    if (timeoutId === null) {
        return;
    }

    window.clearTimeout(timeoutId);
    appContext.gameResultTimeoutId = null;
}

/**
 * Displays the game-over screen and schedules the final result screen.
 */
export function startGameOverSequence(): void {
    clearGameResultTimeout();
    applyGameOverState();
    persistAndRenderGame();
    scheduleGameResult();
}

/**
 * Applies the game-over phase to the current game state.
 */
function applyGameOverState(): void {
    appContext.currentGameState = showGameOver(appContext.currentGameState);
}

/**
 * Schedules the transition from game over to the final result.
 */
function scheduleGameResult(): void {
    appContext.gameResultTimeoutId = window.setTimeout(revealGameResult, GAME_OVER_DURATION);
}

/**
 * Replaces the game-over screen with the final result screen.
 */
function revealGameResult(): void {
    appContext.gameResultTimeoutId = null;
    if (!canRevealGameResult()) {
        return;
    }

    applyFinalGameResult();
}

/**
 * Checks whether the final result may still be displayed.
 *
 * @returns `true` when the game route and game-over phase are active.
 */
function canRevealGameResult(): boolean {
    return (appContext.currentRoute === GAME_ROUTE && appContext.currentGameState.phase === "game-over");
}

/**
 * Applies, persists, and renders the final game result.
 */
function applyFinalGameResult(): void {
    appContext.currentGameState = showGameResult(appContext.currentGameState);

    persistAndRenderGame();
}

/**
 * Handles delegated clicks on the home button of an end screen.
 *
 * @param event - The delegated mouse event.
 */
export function handleEndScreenClick(event: MouseEvent): void {
    if (!isEndScreenHomeClick(event.target)) {
        return;
    }

    event.preventDefault();
    returnToHome();
}

/**
 * Checks whether an end-screen home button was selected.
 *
 * @param target - The original event target.
 * @returns `true` when the home action was selected.
 */
function isEndScreenHomeClick(target: EventTarget | null): boolean {
    return (target instanceof Element && target.closest("[data-end-screen-home]") !== null);
}

/**
 * Resets the completed game and navigates to the home route.
 */
function returnToHome(): void {
    resetCompletedGame();
    navigateTo(HOME_ROUTE);
}

/**
 * Clears the completed game and creates a fresh initial state.
 */
function resetCompletedGame(): void {
    clearGameResultTimeout();
    clearGameState();
    appContext.currentGameState = createInitialGameState(appContext.currentSettings);
}
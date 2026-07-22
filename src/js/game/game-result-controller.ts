// # TYPESCRIPT
// ## TS - CONFIGS
import { GAME_OVER_DURATION } from "./game-constants";
import {
    GAME_ROUTE,
    HOME_ROUTE
} from "../router/route-constants";

// ## TS - FUNCTION-IMPORTS
import { appContext } from "../app/app-context";
import { persistAndRenderGame } from "../app/app-renderer";
import { navigateTo } from "../router/route-controller";
import {
    createInitialGameState,
    showGameOver,
    showGameResult
} from "./game-state";
import {
    clearGameState,
} from "./game-state-storage";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Cancels the pending game-result timeout.
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
 * Displays game over and schedules the final result.
 */
export function startGameOverSequence(): void {
    clearGameResultTimeout();
    applyGameOverState();
    persistAndRenderGame();
    scheduleGameResult();
}

/**
 * Applies the game-over phase to the current game.
 */
function applyGameOverState(): void {
    appContext.currentGameState = showGameOver(
        appContext.currentGameState
    );
}

/**
 * Schedules the transition to the final result.
 */
function scheduleGameResult(): void {
    appContext.gameResultTimeoutId =
        window.setTimeout(
            revealGameResult,
            GAME_OVER_DURATION
        );
}

/**
 * Replaces game over with the final result screen.
 */
function revealGameResult(): void {
    appContext.gameResultTimeoutId = null;

    if (canRevealGameResult()) {
        applyFinalGameResult();
    }
}

/**
 * Checks whether the final result may still be displayed.
 *
 * @returns `true` while the game-over phase is active.
 */
function canRevealGameResult(): boolean {
    return (
        appContext.currentRoute === GAME_ROUTE
        && appContext.currentGameState.phase === "game-over"
    );
}

/**
 * Applies, stores, and renders the final game result.
 */
function applyFinalGameResult(): void {
    appContext.currentGameState = showGameResult(
        appContext.currentGameState
    );

    persistAndRenderGame();
}

/**
 * Handles clicks on the home button of an end screen.
 *
 * @param event - The delegated mouse event.
 */
export function handleEndScreenClick(
    event: MouseEvent
): void {
    if (!isEndScreenHomeClick(event.target)) {
        return;
    }

    event.preventDefault();
    returnToHome();
}

/**
 * Checks whether the end-screen home action was selected.
 *
 * @param target - The original event target.
 * @returns `true` when the home button was clicked.
 */
function isEndScreenHomeClick(
    target: EventTarget | null
): boolean {
    return (
        target instanceof Element
        && target.closest("[data-end-screen-home]") !== null
    );
}

/**
 * Clears the completed game and navigates home.
 */
function returnToHome(): void {
    resetCompletedGame();
    navigateTo(HOME_ROUTE);
}

/**
 * Clears a completed game and creates a fresh state.
 */
function resetCompletedGame(): void {
    clearGameResultTimeout();
    clearGameState();

    appContext.currentGameState = createInitialGameState(
        appContext.currentSettings
    );
}
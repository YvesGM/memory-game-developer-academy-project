// ------------ IMPORTS ------------//
import { EXIT_DIALOG_ANIMATION_DURATION } from "../../lib/pages/game/game-constants";
import { SETTINGS_ROUTE } from "../../lib/router/route-constants";
import { appRef, appContext } from "../../lib/app/app-constants";
import { navigateTo } from "../../router/route-controller";
import { createInitialGameState } from "./game-state";
import { clearGameState } from "../../lib/pages/game/game-state-storage";
import { clearGameResultTimeout } from "./game-result-controller";

// ------------ FUNCTIONS ------------//

/**
 * Handles delegated clicks related to the exit-game dialog.
 *
 * @param event - The delegated mouse event.
 */
export function handleGameDialogClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) {
        return;
    }

    handleDialogClick(event.target);
}

/**
 * Resolves and executes the selected exit-dialog action.
 *
 * @param target - The clicked element.
 */
function handleDialogClick(target: Element): void {
    if (target.closest("[data-open-exit-dialog]")) {
        openExitDialog();
        return;
    }
    if (target.closest("[data-close-exit-dialog]")) {
        closeExitDialog();
        return;
    }

    handleExitAction(target);
}

/**
 * Handles exit confirmation and direct backdrop clicks.
 *
 * @param target - The clicked element.
 */
function handleExitAction(target: Element): void {
    if (target.closest("[data-confirm-exit]")) {
        exitCurrentGame();
        return;
    }

    closeDialogFromBackdrop(target);
}

/**
 * Closes the dialog when its backdrop is clicked directly.
 *
 * @param target - The clicked element.
 */
function closeDialogFromBackdrop(target: Element): void {
    const backdrop = target.closest<HTMLElement>("[data-exit-dialog]");

    if (target === backdrop) {
        closeExitDialog();
    }
}

/**
 * Displays the exit-game dialog and locks page scrolling.
 */
function openExitDialog(): void {
    const dialog = getExitDialog();
    if (!dialog) {
        return;
    }
    dialog.classList.remove("exit-dialog-backdrop--closing");
    dialog.hidden = false;
    document.body.classList.add("is-dialog-open");

    requestDialogOpening(dialog);
}

/**
 * Starts the dialog opening transition in the next animation frame.
 *
 * @param dialog - The dialog backdrop to display.
 */
function requestDialogOpening(dialog: HTMLElement): void {
    window.requestAnimationFrame(() => {
        dialog.classList.add("exit-dialog-backdrop--open");
    });
}

/**
 * Starts the exit-dialog closing transition.
 */
function closeExitDialog(): void {
    const dialog = getExitDialog();
    if (!dialog) {
        return;
    }
    applyDialogClosingState(dialog);
    scheduleDialogClosing(dialog);
}

/**
 * Applies the CSS state used by the closing transition.
 *
 * @param dialog - The dialog backdrop to close.
 */
function applyDialogClosingState(dialog: HTMLElement): void {
    dialog.classList.remove("exit-dialog-backdrop--open");
    dialog.classList.add("exit-dialog-backdrop--closing");
}

/**
 * Schedules the completion of the closing transition.
 *
 * @param dialog - The dialog backdrop to close.
 */
function scheduleDialogClosing(dialog: HTMLElement): void {
    window.setTimeout(() => finishDialogClosing(dialog), EXIT_DIALOG_ANIMATION_DURATION);
}

/**
 * Hides the dialog after its closing transition has finished.
 *
 * @param dialog - The dialog backdrop to hide.
 */
function finishDialogClosing(dialog: HTMLElement): void {
    dialog.hidden = true;
    dialog.classList.remove("exit-dialog-backdrop--closing");
    document.body.classList.remove("is-dialog-open");
}

/**
 * Clears the current game and navigates to the settings page.
 */
function exitCurrentGame(): void {
    resetCurrentGame();
    document.body.classList.remove("is-dialog-open");
    navigateTo(SETTINGS_ROUTE);
}

/**
 * Clears persisted progress and creates a fresh game state.
 */
function resetCurrentGame(): void {
    clearGameResultTimeout();
    clearGameState();
    appContext.currentGameState = createInitialGameState(appContext.currentSettings);
}

/**
 * Retrieves the currently rendered exit-dialog backdrop.
 *
 * @returns The dialog backdrop or `null` when it is not rendered.
 */
function getExitDialog(): HTMLElement | null {
    return appRef.querySelector<HTMLElement>("[data-exit-dialog]");
}
// # TYPESCRIPT
// ## TS - CONFIGS
import { EXIT_DIALOG_ANIMATION_DURATION } from "./game-constants";
import { SETTINGS_ROUTE } from "../router/route-constants";

// ## TS - FUNCTION-IMPORTS
import { appContext } from "../app/app-context";
import { appRef } from "../app/app-dom";
import { navigateTo } from "../router/route-controller";
import { createInitialGameState } from "./game-state";
import { clearGameState } from "./game-state-storage";
import { clearGameResultTimeout } from "./game-result-controller";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Handles delegated interactions with the exit dialog.
 *
 * @param event - The delegated mouse event.
 */
export function handleGameDialogClick(
    event: MouseEvent
): void {
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    handleDialogTarget(target);
}

/**
 * Dispatches a clicked dialog target to its action.
 *
 * @param target - The clicked element.
 */
function handleDialogTarget(target: Element): void {
    if (handleExitDialogButton(target)) {
        return;
    }

    handleExitDialogBackdrop(target);
}

/**
 * Handles buttons belonging to the exit dialog.
 *
 * @param target - The clicked element.
 * @returns `true` when a button action was handled.
 */
function handleExitDialogButton(target: Element): boolean {
    if (target.closest("[data-open-exit-dialog]")) {
        openExitDialog();
        return true;
    }

    return handleClosingDialogButton(target);
}

/**
 * Handles close and confirmation buttons.
 *
 * @param target - The clicked element.
 * @returns `true` when an action was handled.
 */
function handleClosingDialogButton(
    target: Element
): boolean {
    if (target.closest("[data-close-exit-dialog]")) {
        closeExitDialog();
        return true;
    }

    return handleExitConfirmation(target);
}

/**
 * Handles confirmation of the current game exit.
 *
 * @param target - The clicked element.
 * @returns `true` when the exit was confirmed.
 */
function handleExitConfirmation(target: Element): boolean {
    if (!target.closest("[data-confirm-exit]")) {
        return false;
    }

    exitCurrentGame();
    return true;
}

/**
 * Closes the dialog when its backdrop is clicked directly.
 *
 * @param target - The clicked element.
 */
function handleExitDialogBackdrop(target: Element): void {
    const backdrop = target.closest("[data-exit-dialog]");

    if (backdrop && target === backdrop) {
        closeExitDialog();
    }
}

/**
 * Opens the exit dialog and locks page scrolling.
 */
function openExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    prepareExitDialogOpening(dialog);
    lockDialogPage();
    scheduleDialogOpening(dialog);
}

/**
 * Prepares a dialog for its opening transition.
 *
 * @param dialog - The dialog to prepare.
 */
function prepareExitDialogOpening(
    dialog: HTMLElement
): void {
    dialog.classList.remove(
        "exit-dialog-backdrop--closing"
    );

    dialog.hidden = false;
}

/**
 * Adds the global dialog-open page state.
 */
function lockDialogPage(): void {
    document.body.classList.add("is-dialog-open");
}

/**
 * Starts the opening transition in the next animation frame.
 *
 * @param dialog - The dialog to display.
 */
function scheduleDialogOpening(
    dialog: HTMLElement
): void {
    window.requestAnimationFrame(
        () => showExitDialog(dialog)
    );
}

/**
 * Applies the visible dialog state.
 *
 * @param dialog - The dialog to display.
 */
function showExitDialog(dialog: HTMLElement): void {
    dialog.classList.add("exit-dialog-backdrop--open");
}

/**
 * Starts the exit-dialog closing transition.
 */
function closeExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    startExitDialogClosing(dialog);
    scheduleDialogClosing(dialog);
}

/**
 * Applies the closing transition state.
 *
 * @param dialog - The dialog to close.
 */
function startExitDialogClosing(
    dialog: HTMLElement
): void {
    dialog.classList.remove(
        "exit-dialog-backdrop--open"
    );

    dialog.classList.add(
        "exit-dialog-backdrop--closing"
    );
}

/**
 * Schedules completion of the closing transition.
 *
 * @param dialog - The dialog to close.
 */
function scheduleDialogClosing(
    dialog: HTMLElement
): void {
    window.setTimeout(
        () => finishExitDialogClosing(dialog),
        EXIT_DIALOG_ANIMATION_DURATION
    );
}

/**
 * Hides a dialog after its closing transition.
 *
 * @param dialog - The dialog to hide.
 */
function finishExitDialogClosing(
    dialog: HTMLElement
): void {
    dialog.hidden = true;
    removeDialogClosingState(dialog);
    unlockDialogPage();
}

/**
 * Removes the dialog's closing class.
 *
 * @param dialog - The dialog to update.
 */
function removeDialogClosingState(
    dialog: HTMLElement
): void {
    dialog.classList.remove(
        "exit-dialog-backdrop--closing"
    );
}

/**
 * Removes the global dialog-open page state.
 */
function unlockDialogPage(): void {
    document.body.classList.remove("is-dialog-open");
}

/**
 * Clears the current game and opens the settings page.
 */
function exitCurrentGame(): void {
    resetCurrentGame();
    unlockDialogPage();
    navigateTo(SETTINGS_ROUTE);
}

/**
 * Clears stored progress and creates a fresh game state.
 */
function resetCurrentGame(): void {
    clearGameResultTimeout();
    clearGameState();

    appContext.currentGameState = createInitialGameState(
        appContext.currentSettings
    );
}

/**
 * Retrieves the rendered exit-dialog backdrop.
 *
 * @returns The dialog element or `null`.
 */
function getExitDialog(): HTMLElement | null {
    return appRef.querySelector<HTMLElement>(
        "[data-exit-dialog]"
    );
}
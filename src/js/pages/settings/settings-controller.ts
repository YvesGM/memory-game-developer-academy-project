// ------------ IMPORTS ------------//
import type { GameSettings } from "../../lib/pages/settings/settings-interfaces";

import { GAME_ROUTE } from "../../lib/router/route-constants";
import { appContext } from "../../lib/app/app-constants";
import { renderApp } from "../../app/app-renderer";
import { navigateTo } from "../../router/route-controller";
import { createInitialGameState } from "../game/game-state";
import { saveGameState } from "../../lib/pages/game/game-state-storage";
import { readGameSettings } from "../../components/pages/settings/settings-form";
import { saveGameSettings } from "../../lib/pages/settings/settings-storage";

// ------------ FUNCTIONS ------------//

/**
 * Handles changes to radio inputs in the settings form.
 *
 * @param event - The delegated change event.
 */
export function handleSettingsChange(event: Event): void {
    const form = getChangedSettingsForm(event.target);
    if (form) {
        updateSettings(form);
    }
}

/**
 * Retrieves the settings form belonging to a changed radio input.
 *
 * @param target - The original event target.
 * @returns The matching settings form or `null`.
 */
function getChangedSettingsForm(target: EventTarget | null): HTMLFormElement | null {
    if (!(target instanceof HTMLInputElement)) {
        return null;
    }

    if (target.type !== "radio") {
        return null;
    }

    return target.closest<HTMLFormElement>(
        "[data-settings-form]"
    );
}

/**
 * Reads, stores, and renders the current form settings.
 *
 * @param form - The settings form to evaluate.
 */
function updateSettings(form: HTMLFormElement): void {
    const settings = readGameSettings(form);
    if (!settings) {
        return;
    }

    appContext.currentSettings = settings;
    saveGameSettings(settings);
    renderApp();
}

/**
 * Handles submission of the settings form.
 *
 * @param event - The delegated submit event.
 */
export function handleSettingsSubmit(event: SubmitEvent): void {
    const form = getSubmittedSettingsForm(event);
    if (!form) {
        return;
    }

    event.preventDefault();
    startGameFromForm(form);
}

/**
 * Retrieves a valid settings form from a submit event.
 *
 * @param event - The delegated submit event.
 * @returns The submitted settings form or `null`.
 */
function getSubmittedSettingsForm(event: SubmitEvent): HTMLFormElement | null {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
        return null;
    }

    return form.matches("[data-settings-form]") ? form : null;
}

/**
 * Starts a game using the submitted form values.
 *
 * @param form - The submitted settings form.
 */
function startGameFromForm(form: HTMLFormElement): void {
    const settings = readGameSettings(form);
    if (settings) {
        startGame(settings);
    }
}

/**
 * Creates, stores, and opens a new game.
 *
 * @param settings - The settings used for the new game.
 */
function startGame(settings: GameSettings): void {
    applyNewGame(settings);
    persistNewGame(settings);
    navigateTo(GAME_ROUTE);
}

/**
 * Applies new settings and game state to the runtime context.
 *
 * @param settings - The settings used for the new game.
 */
function applyNewGame(settings: GameSettings): void {
    appContext.currentSettings = settings;
    appContext.currentGameState = createInitialGameState(settings);
}

/**
 * Persists the settings and newly created game state.
 *
 * @param settings - The settings used for the new game.
 */
function persistNewGame(settings: GameSettings): void {
    saveGameSettings(settings);
    saveGameState(appContext.currentGameState);
}
// ------------ IMPORTS ------------//
import { handleLanguageClick } from "../language/language-controller";
import { handleRouteClick } from "../router/route-controller";
import { handleSettingsChange, handleSettingsSubmit } from "../pages/settings/settings-controller";
import { handleGameCardClick } from "../pages/game/game-card-controller";
import { handleEndScreenClick } from "../pages/game/game-result-controller";
import { handleGameDialogClick } from "../pages/game/game-exit-controller";
import { appRef } from "../lib/app/app-constants";

// ------------ FUNCTIONS ------------//

/**
 * Registers all delegated application event listeners.
 */
export function initializeListeners(): void {
    initializeClickListeners();
    initializeFormListeners();
}

/**
 * Registers delegated click event listeners.
 */
function initializeClickListeners(): void {
    appRef.addEventListener("click", handleRouteClick);
    appRef.addEventListener("click", handleLanguageClick);
    appRef.addEventListener("click", handleGameDialogClick);
    appRef.addEventListener("click", handleGameCardClick);
    appRef.addEventListener("click", handleEndScreenClick);
}

/**
 * Registers delegated settings-form event listeners.
 */
function initializeFormListeners(): void {
    appRef.addEventListener("change", handleSettingsChange);
    appRef.addEventListener("submit", handleSettingsSubmit);
}
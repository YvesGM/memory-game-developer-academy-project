// # TYPESCRIPT
// ## TS - FUNCTION-IMPORTS
import { handleLanguageClick } from "../language/language-controller";
import { handleRouteClick } from "../router/route-controller";
import {
    handleSettingsChange,
    handleSettingsSubmit
} from "../settings/settings-controller";
import { handleGameCardClick } from "../game/card-selection-controller";
import { handleEndScreenClick } from "../game/game-result-controller";
import { handleGameDialogClick } from "../game/exit-dialog-controller";
import { appRef } from "./app-dom";

// # FUNCTIONALITY
// ## FUNCTIONS

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
    appRef.addEventListener(
        "change",
        handleSettingsChange
    );

    appRef.addEventListener(
        "submit",
        handleSettingsSubmit
    );
}
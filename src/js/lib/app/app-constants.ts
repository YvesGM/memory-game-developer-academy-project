// ------------ IMPORTS ------------//
import type { AppContext } from "./app-interfaces";

import { loadRoute } from "../../router/route-storage";
import { loadLanguage } from "../../language/language-service";
import { loadGameSettings } from "../pages/settings/settings-storage";
import { loadGameState } from "../pages/game/game-state-storage";
import { getAppElement } from "../../app/app-dom";

// ------------ CONSTANTS ------------//

/**
 * Initial game settings loaded from local storage.
 */
const initialSettings = loadGameSettings();

/**
 * Stores the mutable runtime state shared by the application controllers.
 */
export const appContext: AppContext = {
    currentRoute: loadRoute(),
    currentLanguage: loadLanguage(),
    currentSettings: initialSettings,
    currentGameState: loadGameState(initialSettings),
    gameResultTimeoutId: null
};

/**
 * Reference to the main application container.
 */
export const appRef = getAppElement();
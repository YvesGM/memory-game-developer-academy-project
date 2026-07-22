// # TYPESCRIPT
// ## TS - TYPES
import type { Route } from "../router/router-types";
import type { Language } from "../language/language-types";
import type { GameSettings } from "../settings/game-setting-interfaces";
import type { GameState } from "../game/game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { loadRoute } from "../router/route-storage";
import { loadLanguage } from "../language/language-service";
import { loadGameSettings } from "../settings/game-setting-storage";
import { loadGameState } from "../game/game-state-storage";

// # TYPES

/**
 * Contains the mutable runtime state of the application.
 */
export interface AppContext {
    currentRoute: Route;
    currentLanguage: Language;
    currentSettings: GameSettings;
    currentGameState: GameState;
    gameResultTimeoutId: number | null;
}

// # FUNCTIONALITY
// ## CONST
const initialSettings = loadGameSettings();

/**
 * Stores the current runtime state shared by the application
 * controllers.
 */
export const appContext: AppContext = {
    currentRoute: loadRoute(),
    currentLanguage: loadLanguage(),
    currentSettings: initialSettings,
    currentGameState: loadGameState(initialSettings),
    gameResultTimeoutId: null
};
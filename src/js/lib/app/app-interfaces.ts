// ------------ IMPORTS ------------//
import type { Route } from "../router/router-types";
import type { Language } from "../language/language-types";
import type { GameSettings } from "../pages/settings/settings-interfaces";
import type { GameState } from "../pages/game/game-interfaces";

// ------------ INTERFACES ------------//

/**
 * Contains the mutable runtime state shared across the application.
 */
export interface AppContext {
    /** Route currently displayed by the application. */
    currentRoute: Route;

    /** Language currently used by the application. */
    currentLanguage: Language;

    /** Currently selected game configuration. */
    currentSettings: GameSettings;

    /** Current state of the active or persisted game. */
    currentGameState: GameState;

    /**
     * Identifier of the pending game-result timeout,
     * or `null` when no result transition is scheduled.
     */
    gameResultTimeoutId: number | null;
}
// ------------ IMPORTS ------------//
import type { Route } from "./router-types";

// ------------ CONSTANTS ------------//

/**
 * Storage key used to persist the currently active application route.
 */
export const ROUTE_STORAGE_KEY = "memory-game-route";

/**
 * Route identifier for the home page.
 */
export const HOME_ROUTE: Route = "home";

/**
 * Route identifier for the settings page.
 */
export const SETTINGS_ROUTE: Route = "settings";

/**
 * Route identifier for the game page.
 */
export const GAME_ROUTE: Route = "game";
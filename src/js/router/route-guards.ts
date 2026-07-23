// ------------ IMPORTS ------------//
import type { Route } from "../lib/router/router-types";

import { GAME_ROUTE, HOME_ROUTE, SETTINGS_ROUTE } from "../lib/router/route-constants";

// ------------ FUNCTIONS ------------//

/**
 * Checks whether a value represents a valid application route.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported route.
 */
export function isRoute(value: string | null): value is Route {
    return (value === HOME_ROUTE || value === SETTINGS_ROUTE || value === GAME_ROUTE);
}
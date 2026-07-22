// # TYPESCRIPT
// ## TS - TYPES
import type { Route } from "./router-types";

// ## TS - CONFIGS
import {
    GAME_ROUTE,
    HOME_ROUTE,
    SETTINGS_ROUTE
} from "./route-constants";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Checks whether a value represents a valid application route.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported route.
 */
export function isRoute(
    value: string | null
): value is Route {
    return (
        value === HOME_ROUTE
        || value === SETTINGS_ROUTE
        || value === GAME_ROUTE
    );
}
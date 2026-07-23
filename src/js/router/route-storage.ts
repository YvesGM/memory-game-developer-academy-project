// ------------ IMPORTS ------------//
import type { Route } from "../lib/router/router-types";

import { HOME_ROUTE, ROUTE_STORAGE_KEY } from "../lib/router/route-constants";
import { isRoute } from "./route-guards";

// ------------ FUNCTIONS ------------//

/**
 * Loads the last valid application route from local storage.
 *
 * @returns The stored route or the home route as fallback.
 */
export function loadRoute(): Route {
    const storedRoute = localStorage.getItem(ROUTE_STORAGE_KEY);
    return isRoute(storedRoute) ? storedRoute : HOME_ROUTE;
}

/**
 * Persists an application route in local storage.
 *
 * @param route - The route to store.
 */
export function saveRoute(route: Route): void {
    localStorage.setItem(ROUTE_STORAGE_KEY, route);
}
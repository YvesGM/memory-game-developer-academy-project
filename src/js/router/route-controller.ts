// ------------ IMPORTS ------------//
import type { Route } from "../lib/router/router-types";

import { appContext } from "../lib/app/app-constants";
import { renderApp } from "../app/app-renderer";
import { saveRoute } from "./route-storage";
import { isRoute } from "./route-guards";

// ------------ FUNCTIONS ------------//

/**
 * Activates, persists, and renders an application route.
 *
 * @param route - The route to activate.
 */
export function navigateTo(route: Route): void {
    appContext.currentRoute = route;
    saveRoute(route);
    renderApp();
}

/**
 * Handles delegated clicks on elements with a route attribute.
 *
 * @param event - The delegated mouse event.
 */
export function handleRouteClick(event: MouseEvent): void {
    const route = getRouteFromTarget(event.target);
    if (route) {
        navigateTo(route);
    }
}

/**
 * Extracts a valid route from an event target.
 *
 * @param target - The original event target.
 * @returns The selected route or `null`.
 */
function getRouteFromTarget(target: EventTarget | null): Route | null {
    if (!(target instanceof Element)) {
        return null;
    }

    const button = target.closest<HTMLButtonElement>("[data-route]");

    return getRouteFromButton(button);
}

/**
 * Extracts a valid route from a route button.
 *
 * @param button - The route button to evaluate.
 * @returns The selected route or `null`.
 */
function getRouteFromButton(button: HTMLButtonElement | null): Route | null {
    const route = button?.dataset.route ?? null;
    return isRoute(route) ? route : null;
}
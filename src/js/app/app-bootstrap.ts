// ------------ IMPORTS ------------//
import { initializeListeners } from "./app-listeners";
import { renderApp } from "./app-renderer";

// ------------ FUNCTIONS ------------//

/**
 * Initializes the application and performs the initial render.
 */
export function initializeApp(): void {
    initializeListeners();
    renderApp();
}
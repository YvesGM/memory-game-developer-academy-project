// # TYPESCRIPT
// ## TS - FUNCTION-IMPORTS
import { initializeListeners } from "./app-listeners";
import { renderApp } from "./app-renderer";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Initializes the application and performs its first render.
 */
export function initializeApp(): void {
    initializeListeners();
    renderApp();
}
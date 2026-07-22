// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Retrieves the main application container from the DOM.
 *
 * @returns The HTML element with the `app` ID.
 * @throws When the application container cannot be found.
 */
export function getAppElement(): HTMLElement {
    const appElement = document.getElementById("app");

    if (!appElement) {
        throw new Error("App container was not found.");
    }

    return appElement;
}

// ## REFERENCES
export const appRef = getAppElement();
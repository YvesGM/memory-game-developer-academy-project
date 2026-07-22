// # FONTS
import "@fontsource/almarai/400.css";

import "@fontsource/red-rose/700.css";

import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";

import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";

import "@fontsource/klee-one/400.css";
import "@fontsource/klee-one/600.css";

import "@fontsource/delius-unicase/400.css";
import "@fontsource/delius-unicase/700.css";

// # SCSS
import "./assets/scss/main.scss";

// # TYPESCRIPT
// ## TS - TYPES
import type { Route } from "./js/router/router-types";
import type { Language } from "./js/language/language-types";
import type { GameSettings } from "./js/settings/game-setting-interfaces";
import type { GameState } from "./js/game/game-interfaces";

// ## TS - CONFIGS
import { CARD_FLIP_BACK_DELAY, CARD_FLIP_DURATION, GAME_OVER_DURATION, MAX_SELECTED_CARDS, EXIT_DIALOG_ANIMATION_DURATION } from "./js/game/game-constants";

// ## TS - FUNCTION-IMPORTS
import { renderRoute } from "./js/router/app-router";
import { getTranslation, isLanguage, loadLanguage, saveLanguage } from "./js/language/language-service";
import { readGameSettings } from "./js/settings/game-settings-form";
import { saveGameSettings, loadGameSettings } from "./js/settings/game-setting-storage";
import { addPointToActivePlayer, addSelectedCard, createInitialGameState, flipCard, getSelectedCards, hideSelectedCards, isGameFinished, lockBoard, markSelectedCardsAsMatched, showGameOver, showGameResult, unlockBoard } from "./js/game/game-state";
import { clearGameState, loadGameState, saveGameState } from "./js/game/game-state-storage";

// # FUNCTIONALITY
// ## CONST
const ROUTE_STORAGE_KEY = "memory-game-route";
const HOME_ROUTE: Route = "home";
const SETTINGS_ROUTE: Route = "settings";
const appRef = getAppElement();

// ## LET
let currentRoute: Route = loadRoute();
let currentLanguage: Language = loadLanguage();
let currentSettings: GameSettings = loadGameSettings();
let currentGameState: GameState = loadGameState(currentSettings);
let gameResultTimeoutId: number | null = null;

// ## FUNCTIONS

/**
 * Retrieves the main application element from the DOM.
 *
 * @returns The HTML element with the `app` ID.
 * @throws If the application element cannot be found.
 */
function getAppElement(): HTMLElement {
    const appRef = document.getElementById("app");
    if (!appRef) {
        throw new Error("App container was not found.");
    }

    return appRef;
}

/**
 * Loads the last stored application route.
 *
 * Falls back to the home route when no valid route is stored.
 *
 * @returns The stored or default route.
 */
function loadRoute(): Route {
    const storedRoute = localStorage.getItem(ROUTE_STORAGE_KEY);
    return isRoute(storedRoute) ? storedRoute : HOME_ROUTE;
}

/**
 * Checks whether a value represents a valid application route.
 *
 * @param value - The route value to validate.
 * @returns `true` when the value is a valid route.
 */
function isRoute(value: string | null): value is Route {
    return value === HOME_ROUTE || value === SETTINGS_ROUTE || value === "game";
}

/**
 * Navigates to another route and re-renders the application.
 *
 * The selected route is also persisted in local storage.
 *
 * @param route - The target route.
 */
function navigateTo(route: Route): void {
    currentRoute = route;
    localStorage.setItem(ROUTE_STORAGE_KEY, route);
    renderApp();
}

/**
 * Handles clicks on elements with a `data-route` attribute.
 *
 * @param event - The triggered mouse event.
 */
function handleRouteClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest<HTMLButtonElement>("[data-route]");
    const route = button?.dataset.route ?? null;
    if (!isRoute(route)) {
        return;
    }

    navigateTo(route);
}

/**
 * Handles clicks on the language switch.
 *
 * The selected language is persisted before the application
 * is rendered again.
 *
 * @param event - The triggered mouse event.
 */
function handleLanguageClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest<HTMLButtonElement>("[data-language]");
    const language = button?.dataset.language ?? null;
    if (!isLanguage(language)) {
        return;
    }
    currentLanguage = language;

    saveLanguage(language);
    renderApp();
}

/**
 * Handles changes to the game settings form.
 *
 * The updated settings are stored immediately and the
 * application is rendered again.
 *
 * @param event - The triggered change event.
 */
function handleSettingsChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }

    const form = target.closest<HTMLFormElement>("[data-settings-form]");
    if (!form || target.type !== "radio") {
        return;
    }

    const settings = readGameSettings(form);
    if (!settings) {
        return;
    }

    currentSettings = settings;
    saveGameSettings(settings);
    renderApp();
}

/**
 * Handles submission of the game settings form.
 *
 * Creates a new game state, stores the selected settings,
 * and navigates to the game route.
 *
 * @param event - The triggered form submission event.
 */
function handleSettingsSubmit(event: SubmitEvent): void {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
        return;
    }
    if (!form.matches("[data-settings-form]")) {
        return;
    }

    event.preventDefault();

    const settings = readGameSettings(form);
    if (!settings) {
        return;
    }

    currentSettings = settings;
    currentGameState = createInitialGameState(settings);

    saveGameSettings(settings);
    saveGameState(currentGameState);
    navigateTo("game");
}

/**
 * Handles clicks on memory cards.
 *
 * @param event - The triggered mouse event.
 */
function handleGameCardClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }

    const cardButton = target.closest<HTMLButtonElement>(
        "[data-card-id]"
    );
    if (!cardButton) {
        return;
    }

    handleCardSelection(cardButton);
}

/**
 * Processes the selection of a memory card.
 *
 * The selected card is flipped visually, added to the current
 * game state, and evaluated when two cards are selected.
 *
 * @param cardButton - The selected card button.
 */
function handleCardSelection(cardButton: HTMLButtonElement): void {
    const cardId = cardButton.dataset.cardId;
    if (!cardId || !canSelectCard(cardId)) {
        return;
    }

    animateCardFlip(cardButton);
    updateSelectedCardState(cardId);
    evaluateSelectionAfterFlip();
}

/**
 * Starts the visible flip animation of a memory card.
 *
 * @param cardButton - The card button to animate.
 */
function animateCardFlip(cardButton: HTMLButtonElement): void {
    cardButton.classList.add("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "true");
}

/**
 * Updates the game state after a card has been selected.
 *
 * @param cardId - The unique ID of the selected card.
 */
function updateSelectedCardState(cardId: string): void {
    currentGameState = flipCard(currentGameState, cardId);
    currentGameState = addSelectedCard(currentGameState, cardId);
    saveStableGameState();
}

/**
 * Starts evaluating the selected cards once the maximum
 * number of cards has been reached.
 *
 * The board is locked while the selected cards are evaluated.
 */
function evaluateSelectionAfterFlip(): void {
    if (currentGameState.selectedCardIds.length !== MAX_SELECTED_CARDS) {
        return;
    }
    currentGameState = lockBoard(currentGameState);
    window.setTimeout(evaluateSelectedCards, CARD_FLIP_DURATION);
}

/**
 * Persists the game state only while it is stable.
 *
 * A state containing two cards currently being evaluated
 * is intentionally not stored.
 */
function saveStableGameState(): void {
    const selectedCount = currentGameState.selectedCardIds.length;
    if (selectedCount <= 1) {
        saveGameState(currentGameState);
    }
}

/**
 * Checks whether a card can currently be selected.
 *
 * A card cannot be selected while the board is locked,
 * the selection limit has been reached, or the card is
 * already visible.
 *
 * @param cardId - The unique ID of the card.
 * @returns `true` when the card can be selected.
 */
function canSelectCard(cardId: string): boolean {
    if (currentGameState.isBoardLocked) {
        return false;
    }
    if (currentGameState.selectedCardIds.length >= MAX_SELECTED_CARDS) {
        return false;
    }

    const card = currentGameState.cards.find((gameCard) => gameCard.id === cardId);

    return card?.status === "hidden";
}

/**
 * Compares the currently selected cards.
 *
 * Matching cards are processed immediately. Non-matching
 * cards are flipped back after a delay.
 */
function evaluateSelectedCards(): void {
    const selectedCards = getSelectedCards(currentGameState);
    if (selectedCards.length !== MAX_SELECTED_CARDS) {
        return;
    }

    const isMatch = selectedCards[0].pairId === selectedCards[1].pairId;
    if (isMatch) {
        handleMatchedPair();
        return;
    }
    window.setTimeout(handleMismatchedPair, CARD_FLIP_BACK_DELAY);
}

function clearGameResultTimeout(): void {
    if (gameResultTimeoutId === null) {
        return;
    }

    window.clearTimeout(gameResultTimeoutId);
    gameResultTimeoutId = null;
}

/**
 * Processes a matching pair of cards.
 *
 * Awards a point to the active player, marks the cards as
 * matched, and starts the game-over sequence when necessary.
 */
function handleMatchedPair(): void {
    currentGameState = addPointToActivePlayer(currentGameState);
    currentGameState = markSelectedCardsAsMatched(currentGameState);

    if (!isGameFinished(currentGameState)) {
        saveGameState(currentGameState);
        renderApp();
        return;
    }

    clearGameResultTimeout();

    currentGameState = showGameOver(currentGameState);

    saveGameState(currentGameState);
    renderApp();

    gameResultTimeoutId = window.setTimeout(
        revealGameResult,
        GAME_OVER_DURATION
    );
}

/**
 * Replaces the game-over screen with the final result screen.
 */
function revealGameResult(): void {
    gameResultTimeoutId = null;

    if (
        currentRoute !== "game"
        || currentGameState.phase !== "game-over"
    ) {
        return;
    }

    currentGameState = showGameResult(currentGameState);

    saveGameState(currentGameState);
    renderApp();
}

/**
 * Processes a non-matching pair of cards.
 *
 * The selected cards are hidden in the game state and then
 * visually flipped back.
 */
function handleMismatchedPair(): void {
    const selectedIds = [...currentGameState.selectedCardIds];

    currentGameState = hideSelectedCards(currentGameState);

    saveGameState(currentGameState);
    animateCardsToBack(selectedIds);

    window.setTimeout(finishMismatchedPair, CARD_FLIP_DURATION);
}

function finishMismatchedPair(): void {
    currentGameState = unlockBoard(currentGameState);

    saveGameState(currentGameState);
    renderApp();
}

/**
 * Starts the visual flip-back animation for multiple cards.
 *
 * @param cardIds - The IDs of the cards to flip back.
 */
function animateCardsToBack(cardIds: string[]): void {
    cardIds.forEach((cardId) => {
        const cardButton = getCardButton(cardId);
        if (!cardButton) {
            return;
        }
        cardButton.classList.remove("memory-card--flipped");
        cardButton.setAttribute("aria-pressed", "false");
    });
}

/**
 * Retrieves a card button by its card ID.
 *
 * @param cardId - The unique ID of the card.
 * @returns The matching card button or `null`.
 */
function getCardButton(cardId: string): HTMLButtonElement | null {
    return appRef.querySelector<HTMLButtonElement>(`[data-card-id="${cardId}"]`);
}

/**
 * Handles clicks on the home button displayed on an end screen.
 *
 * Clears the completed game state, creates a fresh initial
 * state, and navigates back to the home route.
 *
 * @param event - The triggered mouse event.
 */
function handleEndScreenClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest<HTMLButtonElement>(
        "[data-end-screen-home]"
    );

    if (!button) {
        return;
    }

    event.preventDefault();

    clearGameResultTimeout();
    clearGameState();

    currentGameState = createInitialGameState(currentSettings);

    navigateTo(HOME_ROUTE);
}

/**
 * Handles all interactions with the game exit dialog.
 *
 * Supports opening the dialog, closing it, and confirming
 * the current game exit.
 *
 * @param event - The triggered mouse event.
 */
function handleGameDialogClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }
    if (target.closest("[data-open-exit-dialog]")) {
        openExitDialog();
        return;
    }
    if (target.closest("[data-close-exit-dialog]")) {
        closeExitDialog();
        return;
    }
    if (target.closest("[data-confirm-exit]")) {
        exitCurrentGame();
    }

    const exitDialogBackdrop = target.closest("[data-exit-dialog]");

    if (
        exitDialogBackdrop &&
        target === exitDialogBackdrop
    ) {
        closeExitDialog();
        return;
    }
}

/**
 * Opens the game exit dialog.
 *
 * Page scrolling is disabled while the dialog is open.
 */
function openExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    dialog.classList.remove("exit-dialog-backdrop--closing");
    dialog.hidden = false;

    document.body.classList.add("is-dialog-open");

    window.requestAnimationFrame(() => {
        dialog.classList.add("exit-dialog-backdrop--open");
    });
}

/**
 * Closes the game exit dialog.
 *
 * The page scroll lock is removed after closing the dialog.
 */
function closeExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    dialog.classList.remove("exit-dialog-backdrop--open");
    dialog.classList.add("exit-dialog-backdrop--closing");

    window.setTimeout(() => {
        dialog.hidden = true;
        dialog.classList.remove("exit-dialog-backdrop--closing");

        document.body.classList.remove("is-dialog-open");
    }, EXIT_DIALOG_ANIMATION_DURATION);
}

/**
 * Exits the current game.
 *
 * Clears the stored game state, creates a new initial state,
 * and navigates back to the settings route.
 */
function exitCurrentGame(): void {
    clearGameResultTimeout();
    clearGameState();

    currentGameState = createInitialGameState(
        currentSettings
    );

    document.body.classList.remove(
        "is-dialog-open"
    );

    navigateTo("settings");
}

/**
 * Retrieves the currently rendered game exit dialog.
 *
 * @returns The exit dialog element or `null`.
 */
function getExitDialog(): HTMLElement | null {
    return appRef.querySelector<HTMLElement>("[data-exit-dialog]");
}

/**
 * Renders the current application route.
 *
 * Uses the active language, game settings, and game state.
 * The document language attribute is updated as well.
 */
function renderApp(): void {
    const translation = getTranslation(currentLanguage);
    document.documentElement.lang = currentLanguage;
    appRef.innerHTML = renderRoute(currentRoute, translation, currentLanguage, currentSettings, currentGameState);
}

/**
 * Registers all global application event listeners.
 */
function initListener(): void {
    appRef.addEventListener("click", handleRouteClick);
    appRef.addEventListener("click", handleLanguageClick);
    appRef.addEventListener("click", handleGameDialogClick);
    appRef.addEventListener("click", handleGameCardClick);
    appRef.addEventListener("click", handleEndScreenClick);
    appRef.addEventListener("change", handleSettingsChange);
    appRef.addEventListener("submit", handleSettingsSubmit);
}

/**
 * Initializes the application.
 *
 * Registers the required event listeners and performs
 * the initial render.
 */
function init(): void {
    initListener();
    renderApp();
}

init();
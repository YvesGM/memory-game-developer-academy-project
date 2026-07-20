// FONTS
import "@fontsource/almarai/400.css";

import "@fontsource/red-rose/700.css";

import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";

import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";

import "@fontsource/klee-one/400.css";
import "@fontsource/klee-one/600.css";
import "@fontsource/delius-unicase/700.css";

// SCSS
import "./assets/scss/main.scss";

// TS
import type { Route } from "./js/router/router-types";
import type { Language } from "./js/language/language-types";
import type { GameSettings } from "./js/settings/game-setting-interfaces";
import type { GameState } from "./js/game/game-interfaces";

import { renderRoute } from "./js/router/app-router";
import { getTranslation, isLanguage, loadLanguage, saveLanguage } from "./js/language/language-service";
import { readGameSettings } from "./js/settings/game-settings-form";
import { saveGameSettings, loadGameSettings } from "./js/settings/game-setting-storage";
import { addPointToActivePlayer, addSelectedCard, createInitialGameState, flipCard, getSelectedCards, hideSelectedCards, isGameFinished, lockBoard, markSelectedCardsAsMatched, showGameOver, showGameResult } from "./js/game/game-state";
import { clearGameState, loadGameState, saveGameState } from "./js/game/game-state-storage";

import { CARD_FLIP_BACK_DELAY, CARD_FLIP_DURATION, GAME_OVER_DURATION, MAX_SELECTED_CARDS } from "./js/game/game-constants";

const ROUTE_STORAGE_KEY = "memory-game-route";
const HOME_ROUTE: Route = "home";
const SETTINGS_ROUTE: Route = "settings";

const appRef = getAppElement();

let currentRoute: Route = loadRoute();
let currentLanguage: Language = loadLanguage();
let currentSettings: GameSettings = loadGameSettings();
let currentGameState: GameState = loadGameState(currentSettings);

function getAppElement(): HTMLElement {
    const appRef = document.getElementById("app");

    if (!appRef) {
        throw new Error("App container was not found.");
    }

    return appRef;
}

function loadRoute(): Route {
    const storedRoute = localStorage.getItem(ROUTE_STORAGE_KEY);

    return isRoute(storedRoute) ? storedRoute : HOME_ROUTE;
}

function isRoute(value: string | null): value is Route {
    return value === HOME_ROUTE
        || value === SETTINGS_ROUTE
        || value === "game";
}

function navigateTo(route: Route): void {
    currentRoute = route;
    localStorage.setItem(ROUTE_STORAGE_KEY, route);
    renderApp();
}

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

function handleSettingsChange(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
        return;
    }

    const form = target.closest<HTMLFormElement>(
        "[data-settings-form]"
    );

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

function handleCardSelection(cardButton: HTMLButtonElement): void {
    const cardId = cardButton.dataset.cardId;

    if (!cardId || !canSelectCard(cardId)) {
        return;
    }

    animateCardFlip(cardButton);
    updateSelectedCardState(cardId);
    evaluateSelectionAfterFlip();
}

function animateCardFlip(cardButton: HTMLButtonElement): void {
    cardButton.classList.add("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "true");
}

function updateSelectedCardState(cardId: string): void {
    currentGameState = flipCard(currentGameState, cardId);
    currentGameState = addSelectedCard(currentGameState, cardId);
    saveStableGameState();
}

function evaluateSelectionAfterFlip(): void {
    if (currentGameState.selectedCardIds.length !== MAX_SELECTED_CARDS) {
        return;
    }
    currentGameState = lockBoard(currentGameState);
    window.setTimeout(evaluateSelectedCards, CARD_FLIP_DURATION);
}

function saveStableGameState(): void {
    const selectedCount =
        currentGameState.selectedCardIds.length;

    if (selectedCount <= 1) {
        saveGameState(currentGameState);
    }
}

function canSelectCard(cardId: string): boolean {
    if (currentGameState.isBoardLocked) {
        return false;
    }

    if (
        currentGameState.selectedCardIds.length
        >= MAX_SELECTED_CARDS
    ) {
        return false;
    }

    const card = currentGameState.cards.find(
        (gameCard) => gameCard.id === cardId
    );

    return card?.status === "hidden";
}

function evaluateSelectedCards(): void {
    const selectedCards = getSelectedCards(
        currentGameState
    );

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

function handleMatchedPair(): void {
    currentGameState = addPointToActivePlayer(currentGameState);
    currentGameState = markSelectedCardsAsMatched(currentGameState);

    if (!isGameFinished(currentGameState)) {
        saveGameState(currentGameState);
        renderApp();
        return;
    }

    currentGameState = showGameOver(currentGameState);

    saveGameState(currentGameState);
    renderApp();
    window.setTimeout(revealGameResult, GAME_OVER_DURATION);
}

function revealGameResult(): void {
    currentGameState = showGameResult(
        currentGameState
    );

    saveGameState(currentGameState);
    renderApp();
}

function handleMismatchedPair(): void {
    const selectedIds = [
        ...currentGameState.selectedCardIds
    ];

    currentGameState = hideSelectedCards(
        currentGameState
    );

    saveGameState(currentGameState);
    animateCardsToBack(selectedIds);

    window.setTimeout(
        renderApp,
        CARD_FLIP_DURATION
    );
}

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

function getCardButton(cardId: string): HTMLButtonElement | null {
    return appRef.querySelector<HTMLButtonElement>(
        `[data-card-id="${cardId}"]`
    );
}

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

    clearGameState();
    currentGameState = createInitialGameState(currentSettings);
    navigateTo(HOME_ROUTE);
}

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
}

function openExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    dialog.hidden = false;
    document.body.classList.add("is-dialog-open");
}

function closeExitDialog(): void {
    const dialog = getExitDialog();

    if (!dialog) {
        return;
    }

    dialog.hidden = true;
    document.body.classList.remove("is-dialog-open");
}

function exitCurrentGame(): void {
    clearGameState();

    currentGameState = createInitialGameState(
        currentSettings
    );

    document.body.classList.remove(
        "is-dialog-open"
    );

    navigateTo("settings");
}

function getExitDialog(): HTMLElement | null {
    return appRef.querySelector<HTMLElement>(
        "[data-exit-dialog]"
    );
}

function renderApp(): void {
    const translation = getTranslation(currentLanguage);

    document.documentElement.lang = currentLanguage;
    appRef.innerHTML = renderRoute(currentRoute, translation, currentLanguage, currentSettings, currentGameState);
}

function initListener() {
    appRef.addEventListener("click", handleRouteClick);
    appRef.addEventListener("click", handleLanguageClick);
    appRef.addEventListener("click", handleGameDialogClick);
    appRef.addEventListener("click", handleGameCardClick);
    appRef.addEventListener("click", handleEndScreenClick);
    appRef.addEventListener("change", handleSettingsChange);
    appRef.addEventListener("submit", handleSettingsSubmit);
}

function init() {
    initListener();
    renderApp();
}

init();
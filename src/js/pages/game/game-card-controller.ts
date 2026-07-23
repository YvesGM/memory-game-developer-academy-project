// ------------ IMPORTS ------------//
import { CARD_FLIP_DURATION, MAX_SELECTED_CARDS } from "../../lib/pages/game/game-constants";
import { appContext } from "../../lib/app/app-constants";
import { animateCardFlip } from "./card-dom";
import { evaluateSelectedCards } from "./pair-evaluation-controller";
import { addSelectedCard, flipCard, lockBoard } from "./game-state";
import { saveGameState } from "../../lib/pages/game/game-state-storage";

// ------------ FUNCTIONS ------------//

/**
 * Handles delegated clicks on memory cards.
 *
 * @param event - The delegated mouse event.
 */
export function handleGameCardClick(event: MouseEvent): void {
    const cardButton = getCardButtonFromTarget(event.target);
    if (cardButton === null) {
        return;
    }
    handleCardSelection(cardButton);
}

/**
 * Retrieves a memory-card button from an event target.
 *
 * @param target - The original event target.
 * @returns The matching card button or `null`.
 */
function getCardButtonFromTarget(target: EventTarget | null): HTMLButtonElement | null {
    if (!(target instanceof Element)) {
        return null;
    }
    return target.closest<HTMLButtonElement>(
        "[data-card-id]"
    );
}

/**
 * Validates and processes the selection of a memory card.
 *
 * @param cardButton - The selected card button.
 */
function handleCardSelection(cardButton: HTMLButtonElement): void {
    const cardId = cardButton.dataset.cardId;
    if (!cardId || !canSelectCard(cardId)) {
        return;
    }
    selectCard(cardButton, cardId);
}

/**
 * Applies the visual and state changes of a card selection.
 *
 * @param cardButton - The selected card button.
 * @param cardId - The identifier of the selected card.
 */
function selectCard(cardButton: HTMLButtonElement, cardId: string): void {
    animateCardFlip(cardButton);
    updateSelectedCardState(cardId);
    evaluateSelectionAfterFlip();
}

/**
 * Flips a card, adds it to the selection, and persists stable states.
 *
 * @param cardId - The identifier of the selected card.
 */
function updateSelectedCardState(cardId: string): void {
    appContext.currentGameState = flipCard(appContext.currentGameState,
        cardId);
    addCardToSelection(cardId);
    saveStableGameState();
}

/**
 * Adds a card identifier to the current selection.
 *
 * @param cardId - The identifier of the selected card.
 */
function addCardToSelection(cardId: string): void {
    appContext.currentGameState = addSelectedCard(appContext.currentGameState,
        cardId);
}

/**
 * Starts pair evaluation when two cards have been selected.
 */
function evaluateSelectionAfterFlip(): void {
    if (!hasCompleteSelection()) {
        return;
    }
    lockCurrentBoard();
    schedulePairEvaluation();
}

/**
 * Schedules pair evaluation after the card-flip animation.
 */
function schedulePairEvaluation(): void {
    window.setTimeout(evaluateSelectedCards, CARD_FLIP_DURATION);
}

/**
 * Checks whether the current card selection is complete.
 *
 * @returns `true` when two cards have been selected.
 */
function hasCompleteSelection(): boolean {
    return (appContext.currentGameState.selectedCardIds.length === MAX_SELECTED_CARDS);
}

/**
 * Locks the current game board.
 */
function lockCurrentBoard(): void {
    appContext.currentGameState = lockBoard(appContext.currentGameState
    );
}

/**
 * Persists the game while no pair evaluation is pending.
 */
function saveStableGameState(): void {
    if (!hasStableSelection()) {
        return;
    }
    saveGameState(appContext.currentGameState);
}

/**
 * Checks whether the current selection can safely be persisted.
 *
 * @returns `true` when at most one card is selected.
 */
function hasStableSelection(): boolean {
    return (appContext.currentGameState.selectedCardIds.length <= 1);
}

/**
 * Checks whether a card may currently be selected.
 *
 * @param cardId - The identifier of the card to evaluate.
 * @returns `true` when the card can be selected.
 */
function canSelectCard(cardId: string): boolean {
    return (!appContext.currentGameState.isBoardLocked && hasSelectionCapacity() && isHiddenCard(cardId));
}

/**
 * Checks whether another card may be added to the selection.
 *
 * @returns `true` when the selection limit has not been reached.
 */
function hasSelectionCapacity(): boolean {
    return (appContext.currentGameState.selectedCardIds.length < MAX_SELECTED_CARDS);
}

/**
 * Checks whether a card currently has hidden status.
 *
 * @param cardId - The identifier of the card to evaluate.
 * @returns `true` when the card is hidden.
 */
function isHiddenCard(cardId: string): boolean {
    const card = appContext.currentGameState.cards.find((gameCard) => gameCard.id === cardId);
    return card?.status === "hidden";
}
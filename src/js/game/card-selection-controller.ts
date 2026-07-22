// # TYPESCRIPT
// ## TS - CONFIGS
import {
    CARD_FLIP_DURATION,
    MAX_SELECTED_CARDS
} from "./game-constants";

// ## TS - FUNCTION-IMPORTS
import { appContext } from "../app/app-context";
import { animateCardFlip } from "./card-dom";
import { evaluateSelectedCards } from "./pair-evaluation-controller";
import {
    addSelectedCard,
    flipCard,
    lockBoard
} from "./game-state";
import { saveGameState } from "./game-state-storage";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Handles delegated clicks on memory cards.
 *
 * @param event - The delegated mouse event.
 */
export function handleGameCardClick(
    event: MouseEvent
): void {
    const cardButton = getCardButtonFromTarget(event.target);

    if (cardButton) {
        handleCardSelection(cardButton);
    }
}

/**
 * Retrieves a card button from an event target.
 *
 * @param target - The original event target.
 * @returns The matching card button or `null`.
 */
function getCardButtonFromTarget(
    target: EventTarget | null
): HTMLButtonElement | null {
    if (!(target instanceof Element)) {
        return null;
    }

    return target.closest<HTMLButtonElement>(
        "[data-card-id]"
    );
}

/**
 * Processes the selection of a memory card.
 *
 * @param cardButton - The selected card button.
 */
function handleCardSelection(
    cardButton: HTMLButtonElement
): void {
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
 * @param cardId - The ID of the selected card.
 */
function selectCard(
    cardButton: HTMLButtonElement,
    cardId: string
): void {
    animateCardFlip(cardButton);
    updateSelectedCardState(cardId);
    evaluateSelectionAfterFlip();
}

/**
 * Applies a selected card to the current game state.
 *
 * @param cardId - The ID of the selected card.
 */
function updateSelectedCardState(cardId: string): void {
    appContext.currentGameState = flipCard(
        appContext.currentGameState,
        cardId
    );

    addCardToSelection(cardId);
    saveStableGameState();
}

/**
 * Adds a card to the current selection.
 *
 * @param cardId - The ID of the selected card.
 */
function addCardToSelection(cardId: string): void {
    appContext.currentGameState = addSelectedCard(
        appContext.currentGameState,
        cardId
    );
}

/**
 * Starts pair evaluation after two cards are selected.
 */
function evaluateSelectionAfterFlip(): void {
    if (!hasCompleteSelection()) {
        return;
    }

    lockCurrentBoard();
    window.setTimeout(
        evaluateSelectedCards,
        CARD_FLIP_DURATION
    );
}

/**
 * Checks whether the required cards have been selected.
 *
 * @returns `true` when the selection is complete.
 */
function hasCompleteSelection(): boolean {
    return (
        appContext.currentGameState.selectedCardIds.length
        === MAX_SELECTED_CARDS
    );
}

/**
 * Locks the current game board.
 */
function lockCurrentBoard(): void {
    appContext.currentGameState = lockBoard(
        appContext.currentGameState
    );
}

/**
 * Stores the state while no pair evaluation is pending.
 */
function saveStableGameState(): void {
    if (hasStableSelection()) {
        saveGameState(appContext.currentGameState);
    }
}

/**
 * Checks whether the selection can safely be stored.
 *
 * @returns `true` when at most one card is selected.
 */
function hasStableSelection(): boolean {
    return (
        appContext.currentGameState.selectedCardIds.length <= 1
    );
}

/**
 * Checks whether a card may currently be selected.
 *
 * @param cardId - The ID of the card.
 * @returns `true` when the card can be selected.
 */
function canSelectCard(cardId: string): boolean {
    return (
        !appContext.currentGameState.isBoardLocked
        && hasSelectionCapacity()
        && isHiddenCard(cardId)
    );
}

/**
 * Checks whether another card may be selected.
 *
 * @returns `true` when the selection limit is not reached.
 */
function hasSelectionCapacity(): boolean {
    return (
        appContext.currentGameState.selectedCardIds.length
        < MAX_SELECTED_CARDS
    );
}

/**
 * Checks whether a card is hidden.
 *
 * @param cardId - The ID of the card.
 * @returns `true` when the card has hidden status.
 */
function isHiddenCard(cardId: string): boolean {
    const card = appContext.currentGameState.cards.find(
        (gameCard) => gameCard.id === cardId
    );

    return card?.status === "hidden";
}
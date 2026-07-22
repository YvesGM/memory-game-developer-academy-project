// # TYPESCRIPT
// ## TS - CONFIGS
import {
    CARD_FLIP_BACK_DELAY,
    CARD_FLIP_DURATION,
    MAX_SELECTED_CARDS
} from "./game-constants";

// ## TS - FUNCTION-IMPORTS
import { appContext } from "../app/app-context";
import { persistAndRenderGame } from "../app/app-renderer";
import { animateCardsToBack } from "./card-dom";
import { startGameOverSequence } from "./game-result-controller";
import {
    addPointToActivePlayer,
    getSelectedCards,
    hideSelectedCards,
    isGameFinished,
    markSelectedCardsAsMatched,
    unlockBoard
} from "./game-state";
import { saveGameState } from "./game-state-storage";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Evaluates the currently selected card pair.
 */
export function evaluateSelectedCards(): void {
    const selectedCards = getSelectedCards(
        appContext.currentGameState
    );

    if (selectedCards.length !== MAX_SELECTED_CARDS) {
        return;
    }

    processSelectedPair(
        selectedCards[0].pairId === selectedCards[1].pairId
    );
}

/**
 * Starts the matching or non-matching pair flow.
 *
 * @param isMatch - Whether the selected cards form a pair.
 */
function processSelectedPair(isMatch: boolean): void {
    if (isMatch) {
        handleMatchedPair();
        return;
    }

    window.setTimeout(
        handleMismatchedPair,
        CARD_FLIP_BACK_DELAY
    );
}

/**
 * Processes a matching pair.
 */
function handleMatchedPair(): void {
    applyMatchedPair();

    if (isGameFinished(appContext.currentGameState)) {
        startGameOverSequence();
        return;
    }

    persistAndRenderGame();
}

/**
 * Awards a point and marks the cards as matched.
 */
function applyMatchedPair(): void {
    appContext.currentGameState = addPointToActivePlayer(
        appContext.currentGameState
    );

    markCurrentCardsAsMatched();
}

/**
 * Marks the selected cards as matched.
 */
function markCurrentCardsAsMatched(): void {
    appContext.currentGameState = markSelectedCardsAsMatched(
        appContext.currentGameState
    );
}

/**
 * Hides a non-matching pair and starts its flip-back sequence.
 */
function handleMismatchedPair(): void {
    const selectedIds = [
        ...appContext.currentGameState.selectedCardIds
    ];

    hideCurrentPair();
    saveGameState(appContext.currentGameState);
    animateCardsToBack(selectedIds);
    schedulePairCompletion();
}

/**
 * Applies the hidden state to the selected cards.
 */
function hideCurrentPair(): void {
    appContext.currentGameState = hideSelectedCards(
        appContext.currentGameState
    );
}

/**
 * Schedules completion of the non-matching pair flow.
 */
function schedulePairCompletion(): void {
    window.setTimeout(
        finishMismatchedPair,
        CARD_FLIP_DURATION
    );
}

/**
 * Unlocks, stores, and renders the game after a mismatch.
 */
function finishMismatchedPair(): void {
    appContext.currentGameState = unlockBoard(
        appContext.currentGameState
    );

    persistAndRenderGame();
}
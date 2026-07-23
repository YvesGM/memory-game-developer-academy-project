// ------------ IMPORTS ------------//
import type { GameSettings } from "../../lib/pages/settings/settings-interfaces";
import type { GameState, MemoryCard } from "../../lib/pages/game/game-interfaces";

import { createGameBoard } from "../../components/pages/game/game-board";

// ------------ FUNCTIONS ------------//

/**
 * Creates a new game state from the selected game settings.
 *
 * @param settings - The settings used to initialize the game.
 * @returns The initial state of a new game.
 */
export function createInitialGameState(settings: GameSettings): GameState {
  return {
    theme: settings.theme,
    boardSize: settings.boardSize,
    activePlayer: settings.startingPlayer,
    cards: createGameBoard(settings.theme, settings.boardSize),
    scores: { blue: 0, orange: 0 },
    selectedCardIds: [],
    isBoardLocked: false,
    phase: "playing",
    result: null
  };
}

/**
 * Changes a card to the flipped state.
 *
 * @param state - The current game state.
 * @param cardId - The identifier of the card to flip.
 * @returns A new game state containing the flipped card.
 */
export function flipCard(state: GameState, cardId: string): GameState {
  return updateCardStatus(state, cardId, "flipped");
}

/**
 * Marks all currently selected cards as matched.
 *
 * Also clears the selection and unlocks the board.
 *
 * @param state - The current game state.
 * @returns A new game state containing the matched cards.
 */
export function markSelectedCardsAsMatched(state: GameState): GameState {
  const cards = updateSelectedCardStatuses(state, "matched");
  return completeMatchedSelection(state, cards);
}

/**
 * Hides all currently selected cards after a mismatch.
 *
 * Also clears the selection, keeps the board locked, and changes
 * the active player.
 *
 * @param state - The current game state.
 * @returns A new game state containing the hidden cards.
 */
export function hideSelectedCards(state: GameState): GameState {
  const cards = updateSelectedCardStatuses(state, "hidden");
  return completeMismatchedSelection(state, cards);
}

/**
 * Unlocks the game board.
 *
 * @param state - The current game state.
 * @returns A new game state with an unlocked board.
 */
export function unlockBoard(state: GameState): GameState {
  return {
    ...state,
    isBoardLocked: false
  };
}

/**
 * Adds a card identifier to the current card selection.
 *
 * @param state - The current game state.
 * @param cardId - The identifier of the selected card.
 * @returns A new game state containing the updated selection.
 */
export function addSelectedCard(state: GameState, cardId: string): GameState {
  return {
    ...state,
    selectedCardIds: [
      ...state.selectedCardIds,
      cardId
    ]
  };
}

/**
 * Locks the game board.
 *
 * @param state - The current game state.
 * @returns A new game state with a locked board.
 */
export function lockBoard(state: GameState): GameState {
  return {
    ...state,
    isBoardLocked: true
  };
}

/**
 * Adds one point to the currently active player.
 *
 * @param state - The current game state.
 * @returns A new game state containing the updated score.
 */
export function addPointToActivePlayer(state: GameState): GameState {
  const player = state.activePlayer;

  return {
    ...state,
    scores: {
      ...state.scores,
      [player]: state.scores[player] + 1
    }
  };
}

/**
 * Resolves the cards currently stored in the selection.
 *
 * Invalid or missing card identifiers are ignored.
 *
 * @param state - The current game state.
 * @returns The currently selected memory cards.
 */
export function getSelectedCards(state: GameState): MemoryCard[] {
  return state.selectedCardIds.map((cardId) => findCardById(state.cards, cardId)).filter(isMemoryCard);
}

/**
 * Checks whether every card has been matched.
 *
 * @param state - The current game state.
 * @returns `true` when the complete board has been matched.
 */
export function isGameFinished(state: GameState): boolean {
  return state.cards.every((card) => card.status === "matched");
}

/**
 * Changes the game to its game-over phase.
 *
 * @param state - The current game state.
 * @returns A locked game state in the game-over phase.
 */
export function showGameOver(state: GameState): GameState {
  return {
    ...state,
    phase: "game-over",
    isBoardLocked: true,
    selectedCardIds: []
  };
}

/**
 * Changes the game to its result phase and determines the result.
 *
 * @param state - The current game state.
 * @returns A locked game state containing the final result.
 */
export function showGameResult(state: GameState): GameState {
  return {
    ...state,
    phase: "result",
    result: determineGameResult(state.scores),
    isBoardLocked: true,
    selectedCardIds: []
  };
}

/**
 * Applies the completed state of a matching selection.
 *
 * @param state - The current game state.
 * @param cards - The cards containing the updated statuses.
 * @returns A state with cleared selection and unlocked board.
 */
function completeMatchedSelection(state: GameState, cards: MemoryCard[]): GameState {
  return {
    ...state,
    cards,
    selectedCardIds: [],
    isBoardLocked: false
  };
}

/**
 * Applies the completed state of a non-matching selection.
 *
 * @param state - The current game state.
 * @param cards - The cards containing the updated statuses.
 * @returns A state prepared for the flip-back animation.
 */
function completeMismatchedSelection(state: GameState, cards: MemoryCard[]): GameState {
  return {
    ...state,
    cards,
    selectedCardIds: [],
    isBoardLocked: true,
    activePlayer: getOtherPlayer(state.activePlayer)
  };
}

/**
 * Updates the status of every currently selected card.
 *
 * @param state - The current game state.
 * @param status - The status applied to the selected cards.
 * @returns A new collection containing the updated cards.
 */
function updateSelectedCardStatuses(state: GameState, status: MemoryCard["status"]): MemoryCard[] {
  const selectedIds = new Set(state.selectedCardIds);

  return state.cards.map((card) => updateCardWhenSelected(card, selectedIds, status)
  );
}

/**
 * Updates a card when its identifier belongs to the selection.
 *
 * @param card - The card to evaluate.
 * @param selectedIds - The currently selected card identifiers.
 * @param status - The status applied to selected cards.
 * @returns The updated or unchanged memory card.
 */
function updateCardWhenSelected(card: MemoryCard, selectedIds: ReadonlySet<string>, status: MemoryCard["status"]): MemoryCard {
  return selectedIds.has(card.id) ? { ...card, status } : card;
}

/**
 * Finds a memory card by its identifier.
 *
 * @param cards - The available game cards.
 * @param cardId - The identifier of the requested card.
 * @returns The matching card or `undefined`.
 */
function findCardById(cards: MemoryCard[], cardId: string): MemoryCard | undefined {
  return cards.find((card) => card.id === cardId);
}

/**
 * Checks whether a value is a resolved memory card.
 *
 * @param card - The value to validate.
 * @returns `true` when the value is a memory card.
 */
function isMemoryCard(card: MemoryCard | undefined): card is MemoryCard {
  return card !== undefined;
}

/**
 * Determines the final result from both player scores.
 *
 * @param scores - The final player scores.
 * @returns The winning player or `draw`.
 */
function determineGameResult(scores: GameState["scores"]): GameState["result"] {
  if (scores.blue > scores.orange) {
    return "blue";
  }
  if (scores.orange > scores.blue) {
    return "orange";
  }

  return "draw";
}

/**
 * Changes the status of one card.
 *
 * @param state - The current game state.
 * @param cardId - The identifier of the card to update.
 * @param status - The new card status.
 * @returns A new game state containing the updated card.
 */
function updateCardStatus(state: GameState, cardId: string, status: MemoryCard["status"]): GameState {
  return {
    ...state,
    cards: state.cards.map((card) => updateCardById(card, cardId, status)
    )
  };
}

/**
 * Updates a card when its identifier matches the requested identifier.
 *
 * @param card - The card to evaluate.
 * @param cardId - The identifier of the card to update.
 * @param status - The new card status.
 * @returns The updated or unchanged memory card.
 */
function updateCardById(card: MemoryCard, cardId: string, status: MemoryCard["status"]): MemoryCard {
  return card.id === cardId ? { ...card, status } : card;
}

/**
 * Resolves the player following the currently active player.
 *
 * @param player - The currently active player.
 * @returns The other player.
 */
function getOtherPlayer(player: GameState["activePlayer"]): GameState["activePlayer"] {
  return player === "blue" ? "orange" : "blue";
}
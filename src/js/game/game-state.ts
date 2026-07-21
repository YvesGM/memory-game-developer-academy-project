// # TYPESCRIPT
// ## TS - TYPES
import type { GameSettings } from "../settings/game-setting-interfaces";
import type { GameState, MemoryCard } from "./game-interfaces";

// ## TS - FUNCTION-IMPORTS
import { createGameBoard } from "./game-board";

// # FUNCTIONALITY
// ## FUNCTIONS
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

export function flipCard(state: GameState, cardId: string): GameState {
  return updateCardStatus(state, cardId, "flipped");
}

export function markSelectedCardsAsMatched(state: GameState): GameState {
  const selectedIds = new Set(state.selectedCardIds);

  return {
    ...state,
    cards: state.cards.map((card) => {
      return selectedIds.has(card.id) ? { ...card, status: "matched" } : card;
    }),
    selectedCardIds: [],
    isBoardLocked: false
  };
}

export function hideSelectedCards(state: GameState): GameState {
  const selectedIds = new Set(state.selectedCardIds);

  return {
    ...state,
    cards: state.cards.map((card) => {
      return selectedIds.has(card.id) ? { ...card, status: "hidden" } : card;
    }),
    selectedCardIds: [],
    isBoardLocked: true,
    activePlayer: getOtherPlayer(state.activePlayer)
  };
}

export function unlockBoard(state: GameState): GameState {
  return {
    ...state,
    isBoardLocked: false
  };
}

export function addSelectedCard(state: GameState, cardId: string): GameState {
  return {
    ...state,
    selectedCardIds: [
      ...state.selectedCardIds,
      cardId
    ]
  };
}

export function lockBoard(state: GameState): GameState {
  return { ...state, isBoardLocked: true };
}

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

export function getSelectedCards(state: GameState): MemoryCard[] {
  return state.selectedCardIds.map((cardId) => {
    return state.cards.find((card) => {
      return card.id === cardId;
    });
  }).filter((card): card is MemoryCard => {
    return card !== undefined;
  });
}

export function isGameFinished(state: GameState): boolean {
  return state.cards.every((card) => {
    return card.status === "matched";
  });
}

export function showGameOver(state: GameState): GameState {
  return { ...state, phase: "game-over", isBoardLocked: true, selectedCardIds: [] };
}

export function showGameResult(state: GameState): GameState {
  return { ...state, phase: "result", result: determineGameResult(state.scores), isBoardLocked: true, selectedCardIds: [] };
}

function determineGameResult(scores: GameState["scores"]): GameState["result"] {
  if (scores.blue > scores.orange) {
    return "blue";
  }
  if (scores.orange > scores.blue) {
    return "orange";
  }
  return "draw";
}

function updateCardStatus(state: GameState, cardId: string, status: MemoryCard["status"]): GameState {
  return {
    ...state, cards: state.cards.map((card) => {
      return card.id === cardId ? { ...card, status } : card;
    })
  };
}

function getOtherPlayer(player: GameState["activePlayer"]): GameState["activePlayer"] {
  return player === "blue" ? "orange" : "blue";
}
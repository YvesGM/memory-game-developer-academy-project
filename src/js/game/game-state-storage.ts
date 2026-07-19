import type { GameState, MemoryCard } from "./game-interfaces";
import type { CardStatus, GamePhase, GameResult } from "./game-types"; 
import type { GameSettings } from "../settings/game-setting-interfaces";

import { isBoardSize, isGameTheme, isPlayerId } from "../settings/game-setting-guards";
import { createInitialGameState } from "./game-state";
import { getBoardConfig } from "./board-config";

const GAME_STATE_STORAGE_KEY = "memory-game-state";

export function loadGameState(settings: GameSettings): GameState {
    const storedState = localStorage.getItem(GAME_STATE_STORAGE_KEY);

    if (!storedState) {
        return createInitialGameState(settings);
    }

    return parseGameState(storedState, settings);
}

export function saveGameState(state: GameState): void {
    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
}

export function clearGameState(): void {
    localStorage.removeItem(GAME_STATE_STORAGE_KEY);
}

function parseGameState(storedState: string, settings: GameSettings): GameState {
    try {
        const parsedState: unknown = JSON.parse(storedState);

        return isValidGameState(parsedState, settings)
            ? normalizeGameState(parsedState)
            : createInitialGameState(settings);
    } catch {
        return createInitialGameState(settings);
    }
}

function isValidGameState(value: unknown, settings: GameSettings): value is GameState {
    if (!isRecord(value)) {
        return false;
    }

    return hasValidBaseState(value, settings)
        && hasValidScores(value.scores)
        && hasValidCards(value.cards, settings)
        && hasValidSelectedCards(value)
        && isGamePhase(value.phase)
        && isGameResult(value.result);
}

function hasValidBaseState(value: Record<string, unknown>, settings: GameSettings): boolean {
    return isGameTheme(value.theme)
        && isBoardSize(value.boardSize)
        && isPlayerId(value.activePlayer)
        && value.theme === settings.theme
        && value.boardSize === settings.boardSize;
}

function hasValidScores(value: unknown): boolean {
    if (!isRecord(value)) {
        return false;
    }

    return isValidScore(value.blue)
        && isValidScore(value.orange);
}

function isValidScore(value: unknown): boolean {
    return Number.isInteger(value)
        && typeof value === "number"
        && value >= 0;
}

function hasValidCards(value: unknown, settings: GameSettings): value is MemoryCard[] {
    if (!Array.isArray(value)) {
        return false;
    }

    const expectedCount = getBoardConfig(settings.boardSize).cardCount;

    return value.length === expectedCount
        && value.every(isMemoryCard)
        && hasUniqueCardIds(value);
}

function isMemoryCard(value: unknown): value is MemoryCard {
    if (!isRecord(value)) {
        return false;
    }

    return typeof value.id === "string"
        && typeof value.pairId === "string"
        && typeof value.imagePath === "string"
        && isCardStatus(value.status);
}

function isCardStatus(value: unknown): value is CardStatus {
    return value === "hidden"
        || value === "flipped"
        || value === "matched";
}

function isGamePhase(value: unknown): value is GamePhase {
    return value === "playing"
        || value === "game-over"
        || value === "result";
}

function isGameResult(value: unknown): value is GameResult {
    return value === null
        || value === "blue"
        || value === "orange"
        || value === "draw";
}

function hasUniqueCardIds(cards: MemoryCard[]): boolean {
    const ids = cards.map((card) => card.id);

    return new Set(ids).size === ids.length;
}

function hasValidSelectedCards(value: Record<string, unknown>): boolean {
    if (!Array.isArray(value.selectedCardIds)) {
        return false;
    }

    return value.selectedCardIds.every(
        (cardId) => typeof cardId === "string"
    );
}

function normalizeGameState(state: GameState): GameState {
    const selectedCardIds = getStableSelectedIds(state);

    return {
        ...state,
        cards: normalizeCards(state.cards, selectedCardIds),
        selectedCardIds,
        isBoardLocked: false
    };
}

function getStableSelectedIds(state: GameState): string[] {
    if (state.selectedCardIds.length !== 1) {
        return [];
    }

    return state.selectedCardIds;
}

function normalizeCards(cards: MemoryCard[], selectedCardIds: string[]): MemoryCard[] {
    const selectedIds = new Set(selectedCardIds);

    return cards.map((card) => {
        return normalizeCard(card, selectedIds);
    });
}

function normalizeCard(card: MemoryCard, selectedIds: Set<string>): MemoryCard {
    if (card.status !== "flipped") {
        return card;
    }

    return {
        ...card,
        status: selectedIds.has(card.id) ? "flipped" : "hidden"
    };
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object"
        && value !== null;
}
// ------------ IMPORTS ------------//
import type { GameState, MemoryCard } from "./game-interfaces";
import type { CardStatus, GamePhase, GameResult } from "./game-types";
import type { GameSettings } from "../settings/settings-interfaces";

import { isBoardSize, isGameTheme, isPlayerId } from "../../../pages/settings/settings-guards";
import { createInitialGameState } from "../../../pages/game/game-state";
import { getBoardConfig } from "./game-board-constants";
import { GAME_STATE_STORAGE_KEY } from "./game-constants";

// ------------ FUNCTIONS ------------//

/**
 * Loads and validates the persisted game state.
 *
 * @param settings - The currently selected game settings.
 * @returns The restored game state or a newly created initial state.
 */
export function loadGameState(settings: GameSettings): GameState {
    const storedState = localStorage.getItem(GAME_STATE_STORAGE_KEY);
    return storedState ? parseGameState(storedState, settings) : createInitialGameState(settings);
}

/**
 * Persists the current game state in local storage.
 *
 * @param state - The game state to persist.
 */
export function saveGameState(state: GameState): void {
    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
}

/**
 * Removes the persisted game state from local storage.
 */
export function clearGameState(): void {
    localStorage.removeItem(GAME_STATE_STORAGE_KEY);
}

/**
 * Parses and validates a serialized game state.
 *
 * @param storedState - The serialized game state.
 * @param settings - The currently selected game settings.
 * @returns The normalized stored state or a new initial state.
 */
function parseGameState(storedState: string, settings: GameSettings): GameState {
    try {
        return resolveParsedGameState(JSON.parse(storedState), settings);
    } catch {
        return createInitialGameState(settings);
    }
}

/**
 * Resolves a parsed value to a valid game state.
 *
 * @param value - The parsed storage value.
 * @param settings - The currently selected game settings.
 * @returns The normalized state or a new initial state.
 */
function resolveParsedGameState(value: unknown, settings: GameSettings): GameState {
    return isValidGameState(value, settings) ? normalizeGameState(value) : createInitialGameState(settings);
}

/**
 * Checks whether a value represents a valid persisted game state.
 *
 * @param value - The value to validate.
 * @param settings - The currently selected game settings.
 * @returns `true` when the value is a valid game state.
 */
function isValidGameState(value: unknown, settings: GameSettings): value is GameState {
    if (!isRecord(value)) {
        return false;
    }

    return hasValidStateSections(value, settings);
}

/**
 * Validates all required sections of a persisted game state.
 *
 * @param value - The game-state record to validate.
 * @param settings - The currently selected game settings.
 * @returns `true` when every required section is valid.
 */
function hasValidStateSections(value: Record<string, unknown>, settings: GameSettings): boolean {
    return (hasValidBaseState(value, settings) && hasValidScores(value.scores) && hasValidCards(value.cards, settings) && hasValidSelectedCards(value) && isGamePhase(value.phase) && isGameResult(value.result));
}

/**
 * Validates the theme, board size, and active player.
 *
 * @param value - The game-state record to validate.
 * @param settings - The currently selected game settings.
 * @returns `true` when the base state matches the settings.
 */
function hasValidBaseState(value: Record<string, unknown>, settings: GameSettings): boolean {
    return (hasValidBaseTypes(value) && hasMatchingSettings(value, settings));
}

/**
 * Validates the basic game-state property types.
 *
 * @param value - The game-state record to validate.
 * @returns `true` when the base property types are valid.
 */
function hasValidBaseTypes(value: Record<string, unknown>): boolean {
    return (
        isGameTheme(value.theme) && isBoardSize(value.boardSize) && isPlayerId(value.activePlayer));
}

/**
 * Checks whether the stored theme and board size match the settings.
 *
 * @param value - The game-state record to compare.
 * @param settings - The currently selected game settings.
 * @returns `true` when both configurations match.
 */
function hasMatchingSettings(value: Record<string, unknown>, settings: GameSettings): boolean {
    return (value.theme === settings.theme && value.boardSize === settings.boardSize);
}

/**
 * Checks whether both player scores are valid.
 *
 * @param value - The score value to validate.
 * @returns `true` when both scores are valid.
 */
function hasValidScores(value: unknown): boolean {
    if (!isRecord(value)) {
        return false;
    }

    return (isValidScore(value.blue) && isValidScore(value.orange));
}

/**
 * Checks whether a value is a non-negative integer score.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a valid score.
 */
function isValidScore(value: unknown): boolean {
    return (typeof value === "number" && Number.isInteger(value) && value >= 0);
}

/**
 * Checks whether a value contains the expected memory cards.
 *
 * @param value - The card collection to validate.
 * @param settings - The currently selected game settings.
 * @returns `true` when the complete card collection is valid.
 */
function hasValidCards(value: unknown, settings: GameSettings): value is MemoryCard[] {
    if (!Array.isArray(value)) {
        return false;
    }
    return hasValidCardCollection(value, settings);
}

/**
 * Validates the size, entries, and identifiers of a card collection.
 *
 * @param cards - The card collection to validate.
 * @param settings - The currently selected game settings.
 * @returns `true` when the card collection is valid.
 */
function hasValidCardCollection(cards: unknown[], settings: GameSettings): cards is MemoryCard[] {
    return (hasExpectedCardCount(cards, settings) && cards.every(isMemoryCard) && hasUniqueCardIds(cards));
}

/**
 * Checks whether a card collection has the expected length.
 *
 * @param cards - The card collection to evaluate.
 * @param settings - The currently selected game settings.
 * @returns `true` when the card count matches the board configuration.
 */
function hasExpectedCardCount(cards: unknown[], settings: GameSettings): boolean {
    const config = getBoardConfig(settings.boardSize);
    return cards.length === config.cardCount;
}

/**
 * Checks whether a value represents a memory card.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a valid memory card.
 */
function isMemoryCard(value: unknown): value is MemoryCard {
    if (!isRecord(value)) {
        return false;
    }
    return hasValidCardProperties(value);
}

/**
 * Validates all required properties of a memory card.
 *
 * @param value - The memory-card record to validate.
 * @returns `true` when every required property is valid.
 */
function hasValidCardProperties(value: Record<string, unknown>): boolean {
    return (typeof value.id === "string" && typeof value.pairId === "string" && typeof value.imagePath === "string" && isCardStatus(value.status));
}

/**
 * Checks whether a value is a supported card status.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported card status.
 */
function isCardStatus(value: unknown): value is CardStatus {
    return (value === "hidden" || value === "flipped" || value === "matched");
}

/**
 * Checks whether a value is a supported game phase.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported game phase.
 */
function isGamePhase(value: unknown): value is GamePhase {
    return (value === "playing" || value === "game-over" || value === "result");
}

/**
 * Checks whether a value is a supported game result.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a supported game result.
 */
function isGameResult(value: unknown): value is GameResult {
    return (value === null || value === "blue" || value === "orange" || value === "draw");
}

/**
 * Checks whether every memory card has a unique identifier.
 *
 * @param cards - The memory cards to evaluate.
 * @returns `true` when no card identifier occurs more than once.
 */
function hasUniqueCardIds(cards: MemoryCard[]): boolean {
    const ids = cards.map((card) => card.id);
    return new Set(ids).size === ids.length;
}

/**
 * Checks whether the selected-card identifiers are valid strings.
 *
 * @param value - The game-state record to validate.
 * @returns `true` when the selected-card collection is valid.
 */
function hasValidSelectedCards(value: Record<string, unknown>): boolean {
    if (!Array.isArray(value.selectedCardIds)) {
        return false;
    }

    return value.selectedCardIds.every(
        isString
    );
}

/**
 * Checks whether a value is a string.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is a string.
 */
function isString(value: unknown): value is string {
    return typeof value === "string";
}

/**
 * Normalizes a restored game state after a page reload.
 *
 * @param state - The valid persisted game state.
 * @returns The normalized game state.
 */
function normalizeGameState(state: GameState): GameState {
    const selectedCardIds = getStableSelectedIds(state);
    return createNormalizedState(state, selectedCardIds);
}

/**
 * Creates the normalized game state.
 *
 * @param state - The persisted game state.
 * @param selectedCardIds - The stable selected-card identifiers.
 * @returns The normalized game state.
 */
function createNormalizedState(state: GameState, selectedCardIds: string[]): GameState {
    return {
        ...state,
        cards: normalizeCards(state.cards, selectedCardIds),
        selectedCardIds,
        isBoardLocked: false
    };
}

/**
 * Keeps a single stable selection and clears incomplete pairs.
 *
 * @param state - The game state to evaluate.
 * @returns The stable selection or an empty collection.
 */
function getStableSelectedIds( state: GameState ): string[] {
    return state.selectedCardIds.length === 1 ? state.selectedCardIds : [];
}

/**
 * Normalizes all flipped cards after restoring a game.
 *
 * @param cards - The memory cards to normalize.
 * @param selectedCardIds - The stable selected-card identifiers.
 * @returns The normalized memory cards.
 */
function normalizeCards(cards: MemoryCard[], selectedCardIds: string[]): MemoryCard[] {
    const selectedIds = new Set(selectedCardIds);
    return cards.map((card) => normalizeCard(card, selectedIds));
}

/**
 * Normalizes the status of a restored memory card.
 *
 * @param card - The memory card to normalize.
 * @param selectedIds - The stable selected-card identifiers.
 * @returns The normalized or unchanged memory card.
 */
function normalizeCard(card: MemoryCard, selectedIds: ReadonlySet<string>): MemoryCard {
    if (card.status !== "flipped") {
        return card;
    }

    return createNormalizedFlippedCard(card, selectedIds);
}

/**
 * Resolves the restored status of a flipped memory card.
 *
 * @param card - The flipped card to normalize.
 * @param selectedIds - The stable selected-card identifiers.
 * @returns The normalized memory card.
 */
function createNormalizedFlippedCard(card: MemoryCard, selectedIds: ReadonlySet<string>): MemoryCard {
    return {...card, status: selectedIds.has(card.id) ? "flipped" : "hidden"};
}

/**
 * Checks whether a value is a non-null object record.
 *
 * @param value - The value to validate.
 * @returns `true` when the value is an object record.
 */
function isRecord(value: unknown): value is Record<string, unknown> {
    return (typeof value === "object" && value !== null);
}
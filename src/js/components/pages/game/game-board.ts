// ------------ IMPORTS ------------//
import type { MemoryCard, BoardConfig } from "../../../lib/pages/game/game-interfaces";
import type { BoardSize, GameTheme } from "../../../lib/pages/settings/settings-types";

import { getThemeCardAssets } from "./assets/theme-card-assets";
import { BOARD_CONFIGS } from "../../../lib/pages/game/game-board-constants"

// ------------ FUNCTIONS ------------//

/**
 * Creates and shuffles the memory cards for a new game board.
 *
 * @param theme - The selected game theme.
 * @param boardSize - The selected board size.
 * @returns The shuffled memory cards for the new board.
 */
export function createGameBoard(theme: GameTheme, boardSize: BoardSize): MemoryCard[] {
  const pairCount = getBoardConfig(boardSize).pairCount;
  const assets = getThemeCardAssets(theme);
  const imagePaths = assets.cardFrontPaths.slice(0, pairCount);

  return shuffleCards(createCardPairs(imagePaths));
}

/**
 * Creates two matching memory cards for every image path.
 *
 * @param imagePaths - The selected card-front image paths.
 * @returns The complete collection of memory-card pairs.
 */
function createCardPairs(imagePaths: readonly string[]): MemoryCard[] {
  return imagePaths.flatMap((imagePath, pairIndex) => createPair(imagePath, pairIndex));
}

/**
 * Creates two cards that share the same pair identifier.
 *
 * @param imagePath - The card-front image path.
 * @param pairIndex - The index used to create the pair identifier.
 * @returns The two matching memory cards.
 */
function createPair(imagePath: string, pairIndex: number): MemoryCard[] {
  const pairId = `pair-${pairIndex}`;
  return [createCard(pairId, imagePath, 1), createCard(pairId, imagePath, 2)];
}

/**
 * Creates a hidden memory card.
 *
 * @param pairId - The identifier shared by both cards of a pair.
 * @param imagePath - The card-front image path.
 * @param copyNumber - The card's number within its pair.
 * @returns The created hidden memory card.
 */
function createCard(pairId: string, imagePath: string, copyNumber: number): MemoryCard {
  return { id: `${pairId}-card-${copyNumber}`, pairId, imagePath, status: "hidden" };
}

/**
 * Creates and shuffles a copy of a card collection.
 *
 * @param cards - The cards to shuffle.
 * @returns A newly created shuffled card collection.
 */
function shuffleCards(cards: readonly MemoryCard[]): MemoryCard[] {
  const shuffledCards = [...cards];
  shuffleCardEntries(shuffledCards);

  return shuffledCards;
}

/**
 * Randomizes a mutable card collection in place.
 *
 * Uses the Fisher-Yates shuffle algorithm.
 *
 * @param cards - The mutable card collection to shuffle.
 */
function shuffleCardEntries(cards: MemoryCard[]): void {
  for (let index = cards.length - 1; index > 0; index -= 1) {
    swapCards(cards, index);
  }
}

/**
 * Swaps the current card with a randomly selected preceding card.
 *
 * @param cards - The mutable card collection.
 * @param currentIndex - The index currently processed by the shuffle.
 */
function swapCards(cards: MemoryCard[], currentIndex: number): void {
  const randomIndex = getRandomIndex(currentIndex);
  [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
}

/**
 * Creates a random index within the current shuffle range.
 *
 * @param maximumIndex - The highest permitted index.
 * @returns An integer between zero and the maximum index.
 */
function getRandomIndex(maximumIndex: number): number {
  return Math.floor(Math.random() * (maximumIndex + 1));
}

/**
 * Returns the configuration assigned to a board size.
 *
 * @param boardSize - The board size whose configuration should be returned.
 * @returns The dimensions and card counts of the selected board.
 */
export function getBoardConfig(boardSize: BoardSize): BoardConfig {
  return BOARD_CONFIGS[boardSize];
}
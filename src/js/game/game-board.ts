// # TYPESCRIPT
// ## TS - TYPES
import type { MemoryCard } from "./game-interfaces";
import type {
  BoardSize,
  GameTheme
} from "../settings/game-setting-types";

// ## TS - FUNCTION-IMPORTS
import { getBoardConfig } from "./board-config";
import { getThemeCardAssets } from "./theme-card-assets";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Creates and shuffles the cards for a new game board.
 *
 * @param theme - The selected game theme.
 * @param boardSize - The selected board size.
 * @returns The shuffled memory cards.
 */
export function createGameBoard(
  theme: GameTheme,
  boardSize: BoardSize
): MemoryCard[] {
  const pairCount = getBoardConfig(boardSize).pairCount;
  const assets = getThemeCardAssets(theme);
  const imagePaths = assets.cardFrontPaths.slice(0, pairCount);

  return shuffleCards(createCardPairs(imagePaths));
}

/**
 * Creates two memory cards for every provided image.
 *
 * @param imagePaths - The selected card-front image paths.
 * @returns The created memory-card pairs.
 */
function createCardPairs(
  imagePaths: string[]
): MemoryCard[] {
  return imagePaths.flatMap(createPairFromEntry);
}

/**
 * Creates one card pair from an image-path entry.
 *
 * @param imagePath - The card-front image path.
 * @param pairIndex - The index used to create the pair ID.
 * @returns The created pair of memory cards.
 */
function createPairFromEntry(
  imagePath: string,
  pairIndex: number
): MemoryCard[] {
  return createPair(imagePath, pairIndex);
}

/**
 * Creates a pair of cards sharing the same pair ID.
 *
 * @param imagePath - The card-front image path.
 * @param pairIndex - The index used to create the pair ID.
 * @returns The two matching cards.
 */
function createPair(
  imagePath: string,
  pairIndex: number
): MemoryCard[] {
  const pairId = `pair-${pairIndex}`;

  return [
    createCard(pairId, imagePath, 1),
    createCard(pairId, imagePath, 2)
  ];
}

/**
 * Creates one hidden memory card.
 *
 * @param pairId - The shared pair ID.
 * @param imagePath - The card-front image path.
 * @param copyNumber - The card number inside the pair.
 * @returns The created memory card.
 */
function createCard(
  pairId: string,
  imagePath: string,
  copyNumber: number
): MemoryCard {
  return {
    id: `${pairId}-card-${copyNumber}`,
    pairId,
    imagePath,
    status: "hidden"
  };
}

/**
 * Creates a shuffled copy of a card collection.
 *
 * @param cards - The cards to shuffle.
 * @returns The shuffled cards.
 */
function shuffleCards(
  cards: MemoryCard[]
): MemoryCard[] {
  const shuffledCards = [...cards];

  shuffleCardEntries(shuffledCards);

  return shuffledCards;
}

/**
 * Shuffles a card collection in place.
 *
 * @param cards - The mutable cards to shuffle.
 */
function shuffleCardEntries(
  cards: MemoryCard[]
): void {
  for (
    let index = cards.length - 1;
    index > 0;
    index -= 1
  ) {
    swapCards(cards, index);
  }
}

/**
 * Swaps one card with a randomly selected earlier card.
 *
 * @param cards - The mutable card collection.
 * @param currentIndex - The currently processed card index.
 */
function swapCards(
  cards: MemoryCard[],
  currentIndex: number
): void {
  const randomIndex = getRandomIndex(currentIndex);

  [cards[currentIndex], cards[randomIndex]] = [
    cards[randomIndex],
    cards[currentIndex]
  ];
}

/**
 * Creates a random index within the current shuffle range.
 *
 * @param maximumIndex - The highest allowed index.
 * @returns A random index between zero and the maximum index.
 */
function getRandomIndex(
  maximumIndex: number
): number {
  return Math.floor(
    Math.random() * (maximumIndex + 1)
  );
}
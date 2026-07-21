// # TYPESCRIPT
// ## TS - TYPES
import type { MemoryCard } from "./game-interfaces";
import type { BoardSize, GameTheme } from "../settings/game-setting-types";

// ## TS - FUNCTION-IMPORTS
import { getBoardConfig } from "./board-config";
import { getThemeCardAssets } from "./theme-card-assets";

// # FUNCTIONALITY
// ## FUNCTIONS
export function createGameBoard(theme: GameTheme, boardSize: BoardSize): MemoryCard[] {
  const pairCount = getBoardConfig(boardSize).pairCount;
  const assets = getThemeCardAssets(theme);
  const selectedPaths = assets.cardFrontPaths.slice(0, pairCount);
  const cards = createCardPairs(selectedPaths);

  return shuffleCards(cards);
}

function createCardPairs(imagePaths: string[]): MemoryCard[] {
  return imagePaths.flatMap((imagePath, index) => {
    return createPair(imagePath, index);
  });
}

function createPair(imagePath: string, pairIndex: number): MemoryCard[] {
  const pairId = `pair-${pairIndex}`;

  return [
    createCard(pairId, imagePath, 1),
    createCard(pairId, imagePath, 2)
  ];
}

function createCard(pairId: string, imagePath: string, copyNumber: number): MemoryCard {
  return {
    id: `${pairId}-card-${copyNumber}`,
    pairId,
    imagePath,
    status: "hidden"
  };
}

function shuffleCards(cards: MemoryCard[]): MemoryCard[] {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    swapCards(shuffledCards, index);
  }

  return shuffledCards;
}

function swapCards(cards: MemoryCard[], currentIndex: number): void {
  const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
  [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
}
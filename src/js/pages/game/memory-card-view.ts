// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../../lib/language/language-interfaces";
import type { MemoryCard } from "../../lib/pages/game/game-interfaces";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders all memory cards of a game board.
 *
 * @param translation - The active translation dictionary.
 * @param cards - The cards to render.
 * @param cardBackPath - The active card-back image path.
 * @returns The rendered card markup.
 */
export function renderMemoryCards(translation: Translations, cards: MemoryCard[], cardBackPath: string): string {
  return cards.map((card) => renderMemoryCard(translation, card, cardBackPath)).join("");
}

/**
 * Renders one memory card.
 *
 * @param translation - The active translation dictionary.
 * @param card - The card to render.
 * @param cardBackPath - The active card-back image path.
 * @returns The memory-card markup.
 */
function renderMemoryCard(translation: Translations, card: MemoryCard, cardBackPath: string): string {
  return `
    <button
      class="memory-card ${getCardStateClass(card)}" type="button" data-card-id="${card.id}" aria-label="${getCardAriaLabel(translation, card)}" aria-pressed="${card.status !== "hidden"}" ${getDisabledAttribute(card)}>
      <span class="memory-card__inner">
        ${renderCardBack(cardBackPath)}
        ${renderCardFront(card.imagePath)}
      </span>
    </button>
  `;
}

/**
 * Renders the back face of a memory card.
 *
 * @param cardBackPath - The card-back image path.
 * @returns The card-back markup.
 */
function renderCardBack(cardBackPath: string): string {
  return `
    <span class="memory-card__face memory-card__face--back">
      <img src="${cardBackPath}" alt="" aria-hidden="true">
    </span>
  `;
}

/**
 * Renders the front face of a memory card.
 *
 * @param imagePath - The card-front image path.
 * @returns The card-front markup.
 */
function renderCardFront(imagePath: string): string {
  return `
    <span class="memory-card__face memory-card__face--front">
      <img src="${imagePath}" alt="" aria-hidden="true">
    </span>
  `;
}

/**
 * Creates the disabled attribute for a matched card.
 *
 * @param card - The card to evaluate.
 * @returns The disabled attribute or an empty string.
 */
function getDisabledAttribute(card: MemoryCard): string {
  return card.status === "matched" ? "disabled" : "";
}

/**
 * Resolves the CSS state class of a memory card.
 *
 * @param card - The card to evaluate.
 * @returns The matching state class or an empty string.
 */
function getCardStateClass(card: MemoryCard): string {
  if (card.status === "matched") {
    return "memory-card--matched";
  }

  return getFlippedStateClass(card);
}

/**
 * Resolves the flipped CSS state of a card.
 *
 * @param card - The card to evaluate.
 * @returns The flipped state class or an empty string.
 */
function getFlippedStateClass(card: MemoryCard): string {
  return card.status === "flipped" ? "memory-card--flipped" : "";
}

/**
 * Resolves the accessible card-state label.
 *
 * @param translation - The active translation dictionary.
 * @param card - The card to evaluate.
 * @returns The translated card-state label.
 */
function getCardAriaLabel(translation: Translations, card: MemoryCard): string {
  if (card.status === "matched") {
    return translation.game.matchedCardLabel;
  }

  return getVisibleCardAriaLabel(translation, card);
}

/**
 * Resolves the accessible label of a non-matched card.
 *
 * @param translation - The active translation dictionary.
 * @param card - The card to evaluate.
 * @returns The translated hidden or flipped card label.
 */
function getVisibleCardAriaLabel(translation: Translations, card: MemoryCard): string {
  return card.status === "flipped" ? translation.game.flippedCardLabel : translation.game.hiddenCardLabel;
}
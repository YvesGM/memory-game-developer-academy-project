// # TYPESCRIPT
// ## TS - FUNCTION-IMPORTS
import { appRef } from "../app/app-dom";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Applies the visible front-side state to a card.
 *
 * @param cardButton - The card button to update.
 */
export function animateCardFlip(
    cardButton: HTMLButtonElement
): void {
    cardButton.classList.add("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "true");
}

/**
 * Applies the hidden-side state to multiple cards.
 *
 * @param cardIds - The IDs of the cards to update.
 */
export function animateCardsToBack(
    cardIds: string[]
): void {
    cardIds.forEach(animateCardToBack);
}

/**
 * Applies the hidden-side state to one card.
 *
 * @param cardId - The ID of the card to update.
 */
function animateCardToBack(cardId: string): void {
    const cardButton = getCardButton(cardId);

    if (!cardButton) {
        return;
    }

    hideCardFront(cardButton);
}

/**
 * Removes the visible front-side state from a card.
 *
 * @param cardButton - The card button to update.
 */
function hideCardFront(
    cardButton: HTMLButtonElement
): void {
    cardButton.classList.remove("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "false");
}

/**
 * Retrieves a rendered card button by its card ID.
 *
 * @param cardId - The ID of the card.
 * @returns The matching button or `null`.
 */
function getCardButton(
    cardId: string
): HTMLButtonElement | null {
    return appRef.querySelector<HTMLButtonElement>(
        `[data-card-id="${cardId}"]`
    );
}
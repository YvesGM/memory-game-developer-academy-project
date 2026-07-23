// ------------ IMPORTS ------------//
import { appRef } from "../../lib/app/app-constants";

// ------------ FUNCTIONS ------------//

/**
 * Applies the visible front-side state to a memory card.
 *
 * @param cardButton - The card button to update.
 */
export function animateCardFlip(cardButton: HTMLButtonElement): void {
    cardButton.classList.add("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "true");
}

/**
 * Applies the hidden back-side state to multiple memory cards.
 *
 * @param cardIds - The identifiers of the cards to update.
 */
export function animateCardsToBack(cardIds: readonly string[]): void {
    cardIds.forEach(animateCardToBack);
}

/**
 * Applies the hidden back-side state to one memory card.
 *
 * @param cardId - The identifier of the card to update.
 */
function animateCardToBack(cardId: string): void {
    const cardButton = getCardButton(cardId);
    if (cardButton === null) {
        return;
    }
    hideCardFront(cardButton);
}

/**
 * Removes the visible front-side state from a memory card.
 *
 * @param cardButton - The card button to update.
 */
function hideCardFront(cardButton: HTMLButtonElement): void {
    cardButton.classList.remove("memory-card--flipped");
    cardButton.setAttribute("aria-pressed", "false");
}

/**
 * Retrieves a rendered card button by its identifier.
 *
 * @param cardId - The identifier of the requested card.
 * @returns The matching card button or `null` when it is not rendered.
 */
function getCardButton(cardId: string): HTMLButtonElement | null {
    return appRef.querySelector<HTMLButtonElement>(`[data-card-id="${cardId}"]`);
}
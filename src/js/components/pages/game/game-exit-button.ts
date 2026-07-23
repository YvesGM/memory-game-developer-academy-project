// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";

// ------------ FUNCTIONS ------------//

/**
 * Renders the button used to open the exit-game dialog.
 *
 * @param translation - The translations for the active language.
 * @param iconPath - The path of the default exit icon.
 * @param hoverIconPath - The path of the exit icon used during hover.
 * @returns The complete HTML markup for the exit button.
 */
export function renderExitButton(translation: Translations, iconPath: string, hoverIconPath: string): string {
  return `
    <button class="game-exit-button" type="button" data-open-exit-dialog>
      ${renderExitIcons(iconPath, hoverIconPath)}
      <span class="game-exit-button__text">${translation.game.exitGame}</span>
    </button>
  `;
}

/**
 * Renders the default and hover states of the exit icon.
 *
 * @param iconPath - The path of the default exit icon.
 * @param hoverIconPath - The path of the exit icon used during hover.
 * @returns The HTML markup for both exit-icon states.
 */
function renderExitIcons(iconPath: string, hoverIconPath: string): string {
  return `
    <span class="game-exit-button__icons" aria-hidden="true">
      <img class="game-exit-button__icon game-exit-button__icon--default" src="${iconPath}" alt="">
      <img class="game-exit-button__icon game-exit-button__icon--hover" src="${hoverIconPath}" alt="">
    </span>
  `;
}
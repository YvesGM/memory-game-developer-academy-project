// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";

// # FUNCTIONALITY
// ## FUNCTIONS

/**
 * Renders the button that opens the exit-game dialog.
 *
 * @param translation - The active translation dictionary.
 * @param iconPath - The default exit-icon path.
 * @param hoverIconPath - The hovered exit-icon path.
 * @returns The exit-button markup.
 */
export function renderExitButton(
  translation: Translations,
  iconPath: string,
  hoverIconPath: string
): string {
  return `
    <button class="game-exit-button" type="button" data-open-exit-dialog>
      ${renderExitIcons(iconPath, hoverIconPath)}
      <span class="game-exit-button__text">${translation.game.exitGame}</span>
    </button>
  `;
}

/**
 * Renders the default and hovered exit icons.
 *
 * @param iconPath - The default exit-icon path.
 * @param hoverIconPath - The hovered exit-icon path.
 * @returns The exit-icons markup.
 */
function renderExitIcons(
  iconPath: string,
  hoverIconPath: string
): string {
  return `
    <span class="game-exit-button__icons" aria-hidden="true">
      <img class="game-exit-button__icon game-exit-button__icon--default" src="${iconPath}" alt="">
      <img class="game-exit-button__icon game-exit-button__icon--hover" src="${hoverIconPath}" alt="">
    </span>
  `;
}
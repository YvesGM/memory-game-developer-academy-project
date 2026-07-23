// ------------ IMPORTS ------------//
import type { Translations } from "../../../lib/language/language-interfaces";

// ------------ FUNCTIONS ------------//

/**
 * Renders the confirmation dialog used to leave the current game.
 *
 * @param translation - The translations for the active language.
 * @returns The complete HTML markup for the exit-game dialog.
 */
export function renderExitGameDialog(translation: Translations): string {
  return `
    <div class="exit-dialog-backdrop" data-exit-dialog hidden>
      <section class="exit-dialog" role="dialog" aria-modal="true" aria-labelledby="exit-dialog-title">
        <h2 class="exit-dialog__title" id="exit-dialog-title">
          ${translation.game.exitDialogTitle}
        </h2>
        ${renderDialogActions(translation)}
      </section>
    </div>
  `;
}

/**
 * Renders the available actions of the exit-game dialog.
 *
 * @param translation - The translations for the active language.
 * @returns The HTML markup for both dialog buttons.
 */
function renderDialogActions(translation: Translations): string {
  return `
    <div class="exit-dialog__actions">
      ${renderBackButton(translation)}
      ${renderConfirmButton(translation)}
    </div>
  `;
}

/**
 * Renders the button used to close the dialog and resume the game.
 *
 * @param translation - The translations for the active language.
 * @returns The HTML markup for the back-to-game button.
 */
function renderBackButton(translation: Translations): string {
  return `
    <button class="exit-dialog__button exit-dialog__button--back" type="button" data-close-exit-dialog>
      ${translation.game.backToGame}
    </button>
  `;
}

/**
 * Renders the button used to confirm leaving the current game.
 *
 * @param translation - The translations for the active language.
 * @returns The HTML markup for the confirmation button.
 */
function renderConfirmButton(translation: Translations): string {
  return `
    <button class="exit-dialog__button exit-dialog__button--confirm" type="button" data-confirm-exit>
      ${translation.game.confirmExit}
    </button>
  `;
}
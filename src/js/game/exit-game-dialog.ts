// # TYPESCRIPT
// ## TS - TYPES
import type { Translations } from "../language/language-types";

// # FUNCTIONALITY
// ## FUNCTIONS
export function renderExitGameDialog(translation: Translations): string {
    return `
    <div class="exit-dialog-backdrop" data-exit-dialog hidden>
        <section class="exit-dialog" role="dialog" aria-modal="true" aria-labelledby="exit-dialog-title">
            <h2 class="exit-dialog__title" id="exit-dialog-title">${translation.game.exitDialogTitle}</h2>
            <div class="exit-dialog__actions">
                <button class="exit-dialog__button exit-dialog__button--back" type="button" data-close-exit-dialog>
                    ${translation.game.backToGame}
                </button>

                <button class="exit-dialog__button exit-dialog__button--confirm" type="button" data-confirm-exit>
                    ${translation.game.confirmExit}
                </button>
            </div>
        </section>
      </div>
  `;
}
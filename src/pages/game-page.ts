import type { Translations } from "../js/language/language-types";
import type { GameSettings } from "../js/settings/game-setting-interfaces";

export function renderGamePage(
  translation: Translations,
  settings: GameSettings
): string {
  return `
    <main>

      <section>
        <h1>${translation.game.title}</h1>

        <p>Theme: ${settings.theme}</p>
        <p>Board: ${settings.boardSize}</p>
        <p>Player: ${settings.startingPlayer}</p>

        <button type="button" data-route="settings">
          ${translation.settings.backButton}
        </button>
      </section>
    
      </main>
  `;
}
// ------------ IMPORTS ------------//
import type { Route } from "../lib/router/router-types";
import type { Language } from "../lib/language/language-types";
import type { Translations } from "../lib/language/language-interfaces";
import type { GameSettings } from "../lib/pages/settings/settings-interfaces";
import type { GameState } from "../lib/pages/game/game-interfaces";

import { renderHomePage } from "../home-page";
import { renderSettingsPage } from "../settings-page";
import { renderGamePage } from "../game-page";

// ------------ FUNCTIONS ------------//

/**
 * Renders the page markup for the requested application route.
 *
 * @param route - Route that should currently be displayed.
 * @param translation - Translated texts for the active language.
 * @param language - Currently selected application language.
 * @param settings - Current game settings.
 * @param gameState - Current state of the running game.
 * @returns The complete HTML markup for the selected route.
 */
export function renderRoute(route: Route, translation: Translations, language: Language, settings: GameSettings, gameState: GameState): string {
  switch (route) {
    case "game":
      return renderGamePage(translation, gameState);
    case "settings":
      return renderSettingsPage(translation, language, settings);
    case "home":
    default:
      return renderHomePage(translation, language);
  }
}
import type { Route } from "./router-types";
import type { Language, Translations } from "../language/language-types";
import type { GameSettings } from "../settings/game-setting-interfaces";

import { renderHomePage } from "../../pages/home-page";
import { renderSettingsPage } from "../../pages/settings-page";
import { renderGamePage } from "../../pages/game-page";

export function renderRoute(route: Route, translation: Translations, language: Language, settings: GameSettings): string {
  if (route === "game") {
    return renderGamePage(translation, settings);
  }

  if (route === "settings") {
    return renderSettingsPage(translation, language, settings);
  }

  return renderHomePage(translation, language);
}
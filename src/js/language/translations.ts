import type {
  Language,
  Translations
} from "./language-types";

export const TRANSLATIONS: Record<Language, Translations> = {
  de: {
    base: {
      langSwitchAriaLabel: "Sprachauswahl"
    },
    home: {
      title: "Bereit zu spielen?",
      playButton: "Spielen"
    },
    settings: {
      title: "Einstellungen",
      themeTitle: "Theme",
      playerTitle: "Startender Spieler",
      boardSizeTitle: "Spielfeldgröße",
      startButton: "Spiel starten",
      backButton: "Zurück"
    },
    game: {
      title: "Memory Spiel"
    }
  },

  en: {
    base: {
      langSwitchAriaLabel: "Language choice"
    },
    home: {
      title: "Ready to play?",
      playButton: "Play"
    },
    settings: {
      title: "Settings",
      themeTitle: "Theme",
      playerTitle: "Starting player",
      boardSizeTitle: "Board size",
      startButton: "Start game",
      backButton: "Back"
    },
    game: {
      title: "Memory Game"
    }
  }
};
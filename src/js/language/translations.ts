import type {
  Language,
  Translations
} from "./language-types";

export const TRANSLATIONS: Record<Language, Translations> = {
  de: {
    base: {
      langSwitchAriaLabel: "Sprachauswahl",
      germanLanguage: "Deutsch",
      englishLanguage: "Englisch"
    },
    home: {
      eyebrow: "Es ist Spielzeit.",
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
      langSwitchAriaLabel: "Language choice",
      germanLanguage: "German",
      englishLanguage: "English"
    },
    home: {
      eyebrow: "It’s play time.",
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
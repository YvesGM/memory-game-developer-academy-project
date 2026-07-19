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
      themeTitle: "Spiel-Themes",
      playerTitle: "Spieler wählen",
      boardSizeTitle: "Spielfeldgröße",
      startButton: "Start",
      backButton: "Zurück",
      codeTheme: "Coding Vibes",
      gamingTheme: "Gaming",
      academyTheme: "DA Projekte",
      foodTheme: "Essen",
      bluePlayer: "Blau",
      orangePlayer: "Orange",
      sixteenCards: "16 Karten",
      twentyFourCards: "24 Karten",
      thirtySixCards: "36 Karten",
      currentPlayer: "Aktueller Spieler:",
      exitGame: "Spiel verlassen",
      selectedTheme: "Theme",
      selectedPlayer: "Spieler",
      selectedBoardSize: "Spielfeld"
    },
    game: {
      title: "Memory Spiel",
      currentPlayer: "Aktueller Spieler:",
      exitGame: "Spiel verlassen",
      bluePlayer: "Blauer Spieler",
      orangePlayer: "Oranger Spieler",
      hiddenCardLabel: "Verdeckte Memory-Karte",
      flippedCardLabel: "Aufgedeckte Memory-Karte",
      matchedCardLabel: "Gefundenes Memory-Paar",
      exitDialogTitle: "Möchtest du das Spiel verlassen?",
      backToGame: "Zurück zum Spiel",
      confirmExit: "Spiel verlassen"
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
      themeTitle: "Game themes",
      playerTitle: "Choose player",
      boardSizeTitle: "Board size",
      startButton: "Start",
      backButton: "Back",
      codeTheme: "Code vibes theme",
      gamingTheme: "Gaming theme",
      academyTheme: "DA Projects theme",
      foodTheme: "Foods theme",
      bluePlayer: "Blue",
      orangePlayer: "Orange",
      sixteenCards: "16 cards",
      twentyFourCards: "24 cards",
      thirtySixCards: "36 cards",
      currentPlayer: "Current player:",
      exitGame: "Exit game",
      selectedTheme: "Game theme",
      selectedPlayer: "Player",
      selectedBoardSize: "Board size"
    },
    game: {
      title: "Memory Game",
      currentPlayer: "Current player:",
      exitGame: "Exit game",
      bluePlayer: "Blue player",
      orangePlayer: "Orange player",
      hiddenCardLabel: "Hidden memory card",
      flippedCardLabel: "Revealed memory card",
      matchedCardLabel: "Matched memory card",
      exitDialogTitle: "Do you want to leave the game?",
      backToGame: "Back to game",
      confirmExit: "Exit game"
    }
  }
};
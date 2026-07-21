// # TYPESCRIPT
// ## TS - TYPES
import type {Language, Translations} from "./language-types";

// # CONFIGS
// ## CONST
export const TRANSLATIONS: Record<Language, Translations> = {
  de: {
    base: {
      langSwitchAriaLabel: "Sprachauswahl",
      germanLanguage: "Deutsch",
      englishLanguage: "Englisch"
    },
    home: {
      eyebrow: "Es ist Spielzeit.",
      title: "Bist du bereit?",
      playButton: "Los"
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
      exitDialogTitle: "Sicher, dass du das Spiel verlassen möchtest?",
      backToGame: "Zurück zum Spiel",
      confirmExit: "Spiel verlassen",
      gameOver: "Spiel beendet",
      finalScore: "Endstand",
      winnerIs: "Gewonnen hat",
      drawIntro: "Es ist ein",
      drawTitle: "UNENTSCHIEDEN",
      backToStart: "Zurück zum Start"
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
      bluePlayer: "Blue",
      orangePlayer: "Orange",
      hiddenCardLabel: "Hidden memory card",
      flippedCardLabel: "Revealed memory card",
      matchedCardLabel: "Matched memory card",
      exitDialogTitle: "Are you sure you want to quit the game?",
      backToGame: "NO, BACK TO GAME",
      confirmExit: "EXIT GAME",
      gameOver: "Game over",
      finalScore: "Final score",
      winnerIs: "The winner is",
      drawIntro: "It’s a",
      drawTitle: "DRAW",
      backToStart: "Back to start"
    }
  }
};
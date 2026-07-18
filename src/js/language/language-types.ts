export type Language = "de" | "en";

export interface Translations {
  base: {
    langSwitchAriaLabel: string;
    germanLanguage: string;
    englishLanguage: string;
  };
  home: {
    eyebrow: string;
    title: string;
    playButton: string;
  };
  settings: {
    title: string;
    themeTitle: string;
    playerTitle: string;
    boardSizeTitle: string;
    startButton: string;
    backButton: string;
    codeTheme: string;
    gamingTheme: string;
    academyTheme: string;
    foodTheme: string;
    bluePlayer: string;
    orangePlayer: string;
    sixteenCards: string;
    twentyFourCards: string;
    thirtySixCards: string;
    currentPlayer: string;
    exitGame: string;
    selectedTheme: string;
    selectedPlayer: string;
    selectedBoardSize: string;
  };
  game: {
    title: string;
  };
}
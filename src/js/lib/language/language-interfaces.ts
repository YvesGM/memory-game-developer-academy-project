// ------------ INTERFACES ------------//

/**
 * Defines all translated texts used throughout the application.
 */
export interface Translations {
  /**
   * Contains translations shared across multiple pages and components.
   */
  base: {
    /** Accessible label for the language switch control. */
    langSwitchAriaLabel: string;

    /** Display name of the German language. */
    germanLanguage: string;

    /** Display name of the English language. */
    englishLanguage: string;
  };

  /**
   * Contains translations used on the home page.
   */
  home: {
    /** Introductory text displayed above the main title. */
    eyebrow: string;

    /** Main title of the home page. */
    title: string;

    /** Label of the button that starts the setup flow. */
    playButton: string;
  };

  /**
   * Contains translations used on the settings page.
   */
  settings: {
    /** Main title of the settings page. */
    title: string;

    /** Heading for the theme selection. */
    themeTitle: string;

    /** Heading for the starting-player selection. */
    playerTitle: string;

    /** Heading for the board-size selection. */
    boardSizeTitle: string;

    /** Label of the button that starts the game. */
    startButton: string;

    /** Label of the button that returns to the previous page. */
    backButton: string;

    /** Display name of the code theme. */
    codeTheme: string;

    /** Display name of the gaming theme. */
    gamingTheme: string;

    /** Display name of the academy theme. */
    academyTheme: string;

    /** Display name of the food theme. */
    foodTheme: string;

    /** Display name of the blue player. */
    bluePlayer: string;

    /** Display name of the orange player. */
    orangePlayer: string;

    /** Label for the board configuration containing sixteen cards. */
    sixteenCards: string;

    /** Label for the board configuration containing twenty-four cards. */
    twentyFourCards: string;

    /** Label for the board configuration containing thirty-six cards. */
    thirtySixCards: string;

    /** Label describing the currently selected starting player. */
    currentPlayer: string;

    /** Label of the game-exit control shown in the theme preview. */
    exitGame: string;

    /** Label describing the selected theme in the settings summary. */
    selectedTheme: string;

    /** Label describing the selected player in the settings summary. */
    selectedPlayer: string;

    /** Label describing the selected board size in the settings summary. */
    selectedBoardSize: string;
  };

  /**
   * Contains translations used during and after a game.
   */
  game: {
    /** Main title of the game page. */
    title: string;

    /** Label identifying the player whose turn is active. */
    currentPlayer: string;

    /** Label of the button used to leave the current game. */
    exitGame: string;

    /** Display name of the blue player. */
    bluePlayer: string;

    /** Display name of the orange player. */
    orangePlayer: string;

    /** Accessible label for a hidden memory card. */
    hiddenCardLabel: string;

    /** Accessible label for a currently revealed memory card. */
    flippedCardLabel: string;

    /** Accessible label for an already matched memory card. */
    matchedCardLabel: string;

    /** Title of the confirmation dialog shown before leaving a game. */
    exitDialogTitle: string;

    /** Label of the button that closes the exit dialog. */
    backToGame: string;

    /** Label of the button that confirms leaving the current game. */
    confirmExit: string;

    /** Heading displayed when the game has ended. */
    gameOver: string;

    /** Label displayed above the final score. */
    finalScore: string;

    /** Introductory text displayed before the winner's name. */
    winnerIs: string;

    /** Introductory text displayed when both players have equal scores. */
    drawIntro: string;

    /** Main heading displayed for a draw. */
    drawTitle: string;

    /** Label of the button that returns to the home page. */
    backToStart: string;
  };
}
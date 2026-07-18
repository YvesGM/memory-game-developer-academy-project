export type Language = "de" | "en";

export interface Translations {
    base: {
        langSwitchAriaLabel: string;
    };
    home: {
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
    };
    game: {
        title: string;
    };
}
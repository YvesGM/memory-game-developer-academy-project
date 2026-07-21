// # TYPESCRIPT
// ## TS - TYPES
import type { GameTheme } from "../settings/game-setting-types";
import type { ThemeCardAssets } from "./game-interfaces";

// # CONFIGS
// ## CONST
const CODING_CARD_PATH = "/game/coding/cards/";
const GAMING_CARD_PATH = "/game/games/cards/";
const ACADEMY_CARD_PATH = "/game/da-projects/cards/";
const FOOD_CARD_PATH = "/game/food/cards/";
const THEME_CARD_ASSETS: Record<GameTheme, ThemeCardAssets> = {
  code: {
    cardBackPath: "/game/coding/card-back.svg",
    exitIconPath: "/game/coding/exit-icon.svg",
    exitHoverIconPath: "/game/coding/exit-icon-hovered.svg",
    cardFrontPaths: [
      `${CODING_CARD_PATH}angular-carrd.svg`,
      `${CODING_CARD_PATH}b-card.svg`,
      `${CODING_CARD_PATH}cmd-card.svg`,
      `${CODING_CARD_PATH}css-card.svg`,
      `${CODING_CARD_PATH}dj-card.svg`,
      `${CODING_CARD_PATH}firebase-card.svg`,
      `${CODING_CARD_PATH}git-card.svg`,
      `${CODING_CARD_PATH}github-card.svg`,
      `${CODING_CARD_PATH}html-card.svg`,
      `${CODING_CARD_PATH}javascript-card.svg`,
      `${CODING_CARD_PATH}node-card.svg`,
      `${CODING_CARD_PATH}python-card.svg`,
      `${CODING_CARD_PATH}react-card.svg`,
      `${CODING_CARD_PATH}sass-card.svg`,
      `${CODING_CARD_PATH}typescript-card.svg`,
      `${CODING_CARD_PATH}unknown-card.svg`,
      `${CODING_CARD_PATH}unknown-card2.svg`,
      `${CODING_CARD_PATH}vscode-card.svg`
    ]
  },

  gaming: {
    cardBackPath: "/game/games/card-back2.svg",
    exitIconPath: "/game/games/exit-icon2.svg",
    exitHoverIconPath: "/game/games/exit-icon2-hovered.svg",
    cardFrontPaths: [
      `${GAMING_CARD_PATH}circle-card.svg`,
      `${GAMING_CARD_PATH}coin-card.svg`,
      `${GAMING_CARD_PATH}controller-card.svg`,
      `${GAMING_CARD_PATH}cool-banana-card.svg`,
      `${GAMING_CARD_PATH}creeper-card.svg`,
      `${GAMING_CARD_PATH}game-card.svg`,
      `${GAMING_CARD_PATH}gameboy-card.svg`,
      `${GAMING_CARD_PATH}labyrinth-card.svg`,
      `${GAMING_CARD_PATH}level-up-card.svg`,
      `${GAMING_CARD_PATH}mario-mushroom-card.svg`,
      `${GAMING_CARD_PATH}pacman-card.svg`,
      `${GAMING_CARD_PATH}pacman-ghost-card.svg`,
      `${GAMING_CARD_PATH}play-button-card.svg`,
      `${GAMING_CARD_PATH}puzzle-card.svg`,
      `${GAMING_CARD_PATH}quadrat-card.svg`,
      `${GAMING_CARD_PATH}snake-card.svg`,
      `${GAMING_CARD_PATH}triangle-card.svg`,
      `${GAMING_CARD_PATH}würfel-card.svg`
    ]
  },

  academy: {
    cardBackPath: "/game/da-projects/card-back3.svg",
    exitIconPath: "/game/da-projects/exit-icon3.svg",
    exitHoverIconPath: "/game/da-projects/exit-icon3-hovered.svg",
    cardFrontPaths: [
      `${ACADEMY_CARD_PATH}3-wins-card.svg`,
      `${ACADEMY_CARD_PATH}code-a-cuisine-card.svg`,
      `${ACADEMY_CARD_PATH}coderr-card.svg`,
      `${ACADEMY_CARD_PATH}coin-flip-card.svg`,
      `${ACADEMY_CARD_PATH}community-card.svg`,
      `${ACADEMY_CARD_PATH}cooking-world-logo-card.svg`,
      `${ACADEMY_CARD_PATH}da-bubble-card.svg`,
      `${ACADEMY_CARD_PATH}el-polo-loco-card.svg`,
      `${ACADEMY_CARD_PATH}join-logo-card.svg`,
      `${ACADEMY_CARD_PATH}kan-mind-card.svg`,
      `${ACADEMY_CARD_PATH}order-app-logo-card.svg`,
      `${ACADEMY_CARD_PATH}pokedex-api-project-card.svg`,
      `${ACADEMY_CARD_PATH}sakura-bowl-card.svg`,
      `${ACADEMY_CARD_PATH}sakura-egg-card.svg`,
      `${ACADEMY_CARD_PATH}sakura-logo-card.svg`,
      `${ACADEMY_CARD_PATH}sakura-noodles-card.svg`,
      `${ACADEMY_CARD_PATH}sharky-card.svg`,
      `${ACADEMY_CARD_PATH}videoflix-card.svg`
    ]
  },

  food: {
    cardBackPath: "/game/food/card-back4.svg",
    exitIconPath: "/game/food/exit-icon4.svg",
    exitHoverIconPath: "/game/food/exit-icon4-hovered.svg",
    cardFrontPaths: [
      `${FOOD_CARD_PATH}baguette-card.svg`,
      `${FOOD_CARD_PATH}brezel-card.svg`,
      `${FOOD_CARD_PATH}burger-card.svg`,
      `${FOOD_CARD_PATH}chicken-bowl-card.svg`,
      `${FOOD_CARD_PATH}chocolate-card.svg`,
      `${FOOD_CARD_PATH}corn-dog-card.svg`,
      `${FOOD_CARD_PATH}dessert-card.svg`,
      `${FOOD_CARD_PATH}donut-card.svg`,
      `${FOOD_CARD_PATH}ice-cream-card.svg`,
      `${FOOD_CARD_PATH}muffin-card.svg`,
      `${FOOD_CARD_PATH}pizza-card.svg`,
      `${FOOD_CARD_PATH}pommes-card.svg`,
      `${FOOD_CARD_PATH}pudding-card.svg`,
      `${FOOD_CARD_PATH}salad-card.svg`,
      `${FOOD_CARD_PATH}sushi-card.svg`,
      `${FOOD_CARD_PATH}taco-card.svg`,
      `${FOOD_CARD_PATH}tar-tar-card.svg`,
      `${FOOD_CARD_PATH}wrap-card.svg`
    ]
  }
};

// # FUNCTIONALITY
// ## FUNCTIONS
export function getThemeCardAssets(theme: GameTheme): ThemeCardAssets {
  return THEME_CARD_ASSETS[theme];
}
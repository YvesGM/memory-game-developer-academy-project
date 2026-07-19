import type { Translations } from "../js/language/language-types";
import type { GameState, MemoryCard } from "../js/game/game-interfaces";

import { getBoardConfig } from "../js/game/board-config";
import { getThemeCardAssets } from "../js/game/theme-card-assets";
import { renderExitGameDialog } from "../js/game/exit-game-dialog";
import { getEndScreenAssets } from "../js/game/end-screen-assets";

export function renderGamePage(
  translation: Translations,
  gameState: GameState
): string {
  if (gameState.phase === "game-over") {
    return renderGameOverScreen(
      translation,
      gameState
    );
  }

  if (gameState.phase === "result") {
    return renderResultScreen(
      translation,
      gameState
    );
  }

  const boardConfig = getBoardConfig(
    gameState.boardSize
  );

  const themeAssets = getThemeCardAssets(
    gameState.theme
  );

  return `
    <main class="game-page game-page--${gameState.theme}" data-game-theme="${gameState.theme}">
      <section class="game-page__content">
        ${renderGameHeader(
    translation,
    gameState,
    themeAssets.exitIconPath,
    themeAssets.exitHoverIconPath
  )}

        ${renderGameBoard(
    translation,
    gameState.cards,
    themeAssets.cardBackPath,
    boardConfig.columns
  )}
      </section>

      ${renderExitGameDialog(translation)}
    </main>
  `;
}

function renderGameOverScreen(
  translation: Translations,
  gameState: GameState
): string {
  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--game-over
      "
      data-game-theme="${gameState.theme}"
    >
      <section class="end-screen__content">
        <h1 class="end-screen__game-over-title">
          <span class="end-screen__title-shadow">
            ${translation.game.gameOver}
          </span>

          <span class="end-screen__title-front">
            ${translation.game.gameOver}
          </span>
        </h1>

        <div class="end-screen__final-score">
          <p class="end-screen__score-label">
            ${translation.game.finalScore}
          </p>

          ${renderScores(gameState)}
        </div>
      </section>
    </main>
  `;
}

function renderResultScreen(
  translation: Translations,
  gameState: GameState
): string {
  const assets = getEndScreenAssets(
    gameState.theme
  );

  if (gameState.result === "draw") {
    return renderDrawScreen(
      translation,
      gameState,
      assets.draw.scaleImagePath
    );
  }

  if (
    gameState.result === "blue"
    || gameState.result === "orange"
  ) {
    const winnerImagePath =
      gameState.result === "blue"
        ? assets.winner.bluePlayerImagePath
        : assets.winner.orangePlayerImagePath;

    return renderWinnerScreen(
      translation,
      gameState,
      gameState.result,
      winnerImagePath,
      assets.winner.confettiImagePath
    );
  }

  return "";
}

function renderWinnerScreen(
  translation: Translations,
  gameState: GameState,
  winner: "blue" | "orange",
  winnerImagePath: string,
  confettiImagePath: string | null
): string {
  const winnerLabel =
    winner === "blue"
      ? translation.game.bluePlayer
      : translation.game.orangePlayer;

  const confettiMarkup = confettiImagePath
    ? `
      <img
        class="end-screen__confetti"
        src="${confettiImagePath}"
        alt=""
        aria-hidden="true"
      >
    `
    : "";

  return `
    <main
      class="
        game-page
        game-page--${gameState.theme}
        end-screen
        end-screen--winner
        end-screen--winner-${winner}
      "
      data-game-theme="${gameState.theme}"
    >
      ${confettiMarkup}

      <section class="end-screen__content end-screen__content--result">
        <div class="end-screen__winner-text">
          <p>${translation.game.winnerIs}</p>

          <h1 class="end-screen__winner-name">
            ${winnerLabel}
          </h1>
        </div>

        <img
          class="end-screen__result-icon end-screen__winner-icon"
          src="${winnerImagePath}"
          alt=""
          aria-hidden="true"
        >

        ${renderBackToStartButton(translation)}
      </section>
    </main>
  `;
}

function renderDrawScreen(
  translation: Translations,
  gameState: GameState,
  scaleImagePath: string
): string {
  return `
    <main
      class="game-page game-page--${gameState.theme} end-screen end-screen--draw" data-game-theme="${gameState.theme}">
        <section class="end-screen__content end-screen__content--result">
          <div class="end-screen__draw-text">
            <p>${translation.game.drawIntro}</p>

            <h1 class="end-screen__draw-title">
              <span class="end-screen__title-shadow">
                ${translation.game.drawTitle}
              </span>

              <span class="end-screen__title-front">
                ${translation.game.drawTitle}
              </span>
            </h1>
          </div>

          <img class="end-screen__result-icon end-screen__draw-icon" src="${scaleImagePath}" alt="" aria-hidden="true">
          ${renderBackToStartButton(translation)}
        </section>
    </main>
  `;
}

function renderBackToStartButton(translation: Translations): string {
  return `
    <button class="end-screen__back-button" type="button" data-end-screen-home>
      ${translation.game.backToStart}
    </button>
  `;
}

function renderGameHeader(translation: Translations, gameState: GameState, exitIconPath: string, exitHoverIconPath: string): string {
  return `
    <header class="game-header">
      ${renderScores(gameState)}
      ${renderCurrentPlayer(translation, gameState)}
      ${renderExitButton(translation, exitIconPath, exitHoverIconPath)}
    </header>
  `;
}

function renderScores(gameState: GameState): string {
  return `
    <div class="game-score" aria-label="Score">
      ${renderScore("blue", gameState.scores.blue)}
      ${renderScore("orange", gameState.scores.orange)}
    </div>
  `;
}

function renderScore(player: "blue" | "orange", score: number): string {
  return `
    <span class="game-score__player game-score__player--${player}">
      <span class="game-score__flag" aria-hidden="true"></span>
      <span>${score}</span>
    </span>
  `;
}

function renderCurrentPlayer(translation: Translations, gameState: GameState): string {
  const label = gameState.activePlayer === "blue"
    ? translation.game.bluePlayer
    : translation.game.orangePlayer;

  return `
    <div class="game-header__current-player">
      <span>${translation.game.currentPlayer}</span>
      <span class="game-header__active-flag game-header__active-flag--${gameState.activePlayer}" role="img" aria-label="${label}"></span>
    </div>
  `;
}

function renderExitButton(translation: Translations, iconPath: string, hoverIconPath: string): string {
  return `
    <button class="game-exit-button" type="button" data-open-exit-dialog>
      <span class="game-exit-button__icons" aria-hidden="true">
        <img class="game-exit-button__icon game-exit-button__icon--default" src="${iconPath}" alt="">
        <img class="game-exit-button__icon game-exit-button__icon--hover" src="${hoverIconPath}" alt="">
      </span>
      <span>${translation.game.exitGame}</span>
    </button>
  `;
}

function renderGameBoard(translation: Translations, cards: MemoryCard[], cardBackPath: string, columns: number): string {
  return `
    <section class="game-board" aria-label="${translation.game.title}" style="--game-board-columns: ${columns};">
      ${cards
      .map((card) => {
        return renderMemoryCard(translation, card, cardBackPath);
      }).join("")}
    </section>
  `;
}

function renderMemoryCard(translation: Translations, card: MemoryCard, cardBackPath: string): string {
  const stateClass = getCardStateClass(card);
  const isDisabled = card.status === "matched";

  return `
    <button class="memory-card ${stateClass}" type="button" data-card-id="${card.id}" aria-label="${getCardAriaLabel(translation, card)}" aria-pressed="${card.status !== "hidden"}" ${isDisabled ? "disabled" : ""}>
      <span class="memory-card__inner">
        <span class="memory-card__face memory-card__face--back">
          <img src="${cardBackPath}" alt="" aria-hidden="true">
        </span>

        <span class="memory-card__face memory-card__face--front">
          <img src="${card.imagePath}" alt="" aria-hidden="true">
        </span>
      </span>
    </button>
  `;
}

function getCardStateClass(card: MemoryCard): string {
  if (card.status === "matched") {
    return "memory-card--matched";
  }

  if (card.status === "flipped") {
    return "memory-card--flipped";
  }

  return "";
}

function getCardAriaLabel(translation: Translations, card: MemoryCard): string {
  if (card.status === "matched") {
    return translation.game.matchedCardLabel;
  }

  if (card.status === "flipped") {
    return translation.game.flippedCardLabel;
  }

  return translation.game.hiddenCardLabel;
}
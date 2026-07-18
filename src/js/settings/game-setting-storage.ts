import type { BoardSize, GameTheme, PlayerId } from "./game-setting-types";
import type { GameSettings } from "./game-setting-interfaces";

import { DEFAULT_GAME_SETTINGS } from "./game-settings";

const SETTINGS_STORAGE_KEY = "memory-game-settings";

export function loadGameSettings(): GameSettings {
    const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!storedSettings) {
        return DEFAULT_GAME_SETTINGS;
    }

    return parseGameSettings(storedSettings);
}

export function saveGameSettings(settings: GameSettings): void {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

function parseGameSettings(value: string): GameSettings {
    try {
        const parsedValue: unknown = JSON.parse(value);

        return isGameSettings(parsedValue) ? parsedValue : DEFAULT_GAME_SETTINGS;
    } catch {
        return DEFAULT_GAME_SETTINGS;
    }
}

function isGameSettings(value: unknown): value is GameSettings {
    if (!isRecord(value)) {
        return false;
    }

    return isPlayerId(value.startingPlayer)
        && isBoardSize(value.boardSize)
        && isGameTheme(value.theme);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object"
        && value !== null;
}

function isPlayerId(value: unknown): value is PlayerId {
    return value === "blue"
        || value === "orange";
}

function isBoardSize(value: unknown): value is BoardSize {
    return value === "4x4"
        || value === "4x6"
        || value === "6x6";
}

function isGameTheme(value: unknown): value is GameTheme {
    return value === "code"
        || value === "gaming"
        || value === "academy"
        || value === "food";
}
import "@fontsource/almarai/400.css";
import "@fontsource/red-rose/700.css";

import "./assets/scss/main.scss";

import type { Route } from "./js/router/router-types";
import type { Language } from "./js/language/language-types";
import type { GameSettings } from "./js/settings/game-setting-interfaces";

import { renderRoute } from "./js/router/app-router";
import { getTranslation, isLanguage, loadLanguage, saveLanguage } from "./js/language/language-service";
import { readGameSettings } from "./js/settings/game-settings-form";
import { saveGameSettings, loadGameSettings } from "./js/settings/game-setting-storage";

const ROUTE_STORAGE_KEY = "memory-game-route";
const HOME_ROUTE: Route = "home";
const SETTINGS_ROUTE: Route = "settings";

const appRef = getAppElement();

let currentRoute: Route = loadRoute();
let currentLanguage: Language = loadLanguage();
let currentSettings: GameSettings = loadGameSettings();

function getAppElement(): HTMLElement {
    const appRef = document.getElementById("app");

    if (!appRef) {
        throw new Error("App container was not found.");
    }

    return appRef;
}

function loadRoute(): Route {
    const storedRoute = localStorage.getItem(ROUTE_STORAGE_KEY);

    return isRoute(storedRoute) ? storedRoute : HOME_ROUTE;
}

function isRoute(value: string | null): value is Route {
    return value === HOME_ROUTE
        || value === SETTINGS_ROUTE
        || value === "game";
}

function renderApp(): void {
    const translation = getTranslation(currentLanguage);

    document.documentElement.lang = currentLanguage;
    appRef.innerHTML = renderRoute(currentRoute, translation, currentLanguage, currentSettings);
}

function navigateTo(route: Route): void {
    currentRoute = route;
    localStorage.setItem(ROUTE_STORAGE_KEY, route);
    renderApp();
}

function handleRouteClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest<HTMLButtonElement>("[data-route]");
    const route = button?.dataset.route ?? null;

    if (!isRoute(route)) {
        return;
    }

    navigateTo(route);
}

function handleLanguageClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
        return;
    }

    const button = target.closest<HTMLButtonElement>("[data-language]");
    const language = button?.dataset.language ?? null;

    if (!isLanguage(language)) {
        return;
    }

    currentLanguage = language;
    saveLanguage(language);

    renderApp();
}

function handleSettingsChange(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
        return;
    }

    const form = target.closest<HTMLFormElement>(
        "[data-settings-form]"
    );

    if (!form || target.type !== "radio") {
        return;
    }

    const settings = readGameSettings(form);

    if (!settings) {
        return;
    }

    currentSettings = settings;
    saveGameSettings(settings);
    renderApp();
}

function handleSettingsSubmit(event: SubmitEvent): void {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
        return;
    }

    if (!form.matches("[data-settings-form]")) {
        return;
    }

    event.preventDefault();

    const settings = readGameSettings(form);

    if (!settings) {
        return;
    }

    currentSettings = settings;
    saveGameSettings(settings);
    navigateTo("game");
}

appRef.addEventListener("click", handleRouteClick);
appRef.addEventListener("click", handleLanguageClick);
appRef.addEventListener("change", handleSettingsChange);
appRef.addEventListener("submit", handleSettingsSubmit);

renderApp();
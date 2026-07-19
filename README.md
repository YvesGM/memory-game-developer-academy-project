# Memory Game
Ein responsives Memory-Spiel, das im Rahmen der Developer Akademie umgesetzt wird.
Das Projekt basiert auf TypeScript, Vite und SCSS. Spieler können zwischen verschiedenen Themes, Spielfeldgrößen und Startspielern wählen. Zusätzlich unterstützt die Anwendung Deutsch und Englisch.

## Aktueller Entwicklungsstand
Die technische Grundlage sowie die Figma-basierte Gestaltung der Home- und Settings-Seite sind abgeschlossen.

Aktuell umgesetzt:
- Vite-Projekt mit TypeScript
- SCSS-Unterstützung
- lokale Einbindung der Schriftarten Red Rose und Almarai
- typisierte Navigation zwischen den Seiten
- responsive Home-Seite nach Figma-Vorlage
- animierte Controller-Illustration auf der Home-Seite
- responsive Settings-Seite nach Figma-Vorlage
- technische Game-Seite zur Prüfung der übernommenen Einstellungen
- Deutsch-/Englisch-Umschaltung
- Speicherung der aktuellen Sprache
- Speicherung der aktuellen Route
- Speicherung der gewählten Spieleinstellungen
- Auswahl des startenden Spielers
- Auswahl der Spielfeldgröße
- Auswahl des Themes
- dynamische Theme-Vorschau
- dynamischer Wechsel des Spieler-Icons in der Vorschau
- dynamische Zusammenfassung der aktuellen Auswahl
- zentrale Verwaltung der Theme-Assets
- zentrale Type-Guards für gespeicherte Einstellungen
- TypeScript-Type-Check
- Produktions-Build mit Vite

## Home-Seite
Die Home-Seite wurde anhand der Figma-Vorlage umgesetzt.

Enthalten sind:
- responsive Überschrift
- lokalisierter Einleitungstext
- Play-Button
- Controller- und Pfeil-SVGs
- animierte Hintergrundgrafik
- dezenter Sprachumschalter
- Unterstützung von `prefers-reduced-motion`

## Settings-Seite
Die Settings-Seite enthält drei typisierte Auswahlgruppen:
- Theme
- startender Spieler
- Spielfeldgröße

Änderungen werden direkt verarbeitet und im Local Storage gespeichert.

Die rechte Vorschau reagiert dynamisch auf die Auswahl:
- das gewählte Theme verändert Farben und Motive
- die Karten-SVGs werden ausgetauscht
- das Spieler-Icon in der Statusleiste wird aktualisiert
- die Zusammenfassung unterhalb der Vorschau zeigt die aktuelle Auswahl

## Themes
Aktuell auswählbar sind vier Themes:
- Coding Vibes
- Gaming
- Developer Academy
- Food

Die Themes besitzen jeweils eigene:
- Vorschauhintergründe
- Kartenmotive
- Kartenfarben
- Spieler-Icons
- Exit-Icons
- Akzentfarben

Die Theme-Assets befinden sich unter:
```text
public/settings/theme-visuals/
├── coding/
├── gaming/
├── da-projects/
└── food/
´´´

Spielfeldgrößen
Aktuell auswählbar:
4 × 4
4 × 6
6 × 6

Zusätzlich vorgemerkt:
6 × 8
8 × 8

Die größeren Spielfelder werden ergänzt, wenn genügend unterschiedliche Kartenmotive aus dem Figma-Projekt vorhanden sind.

## Geplante Spielfunktionen
- Memory-Karten aus den Figma-Assets
- Kartenmischung passend zur Spielfeldgröße
- Karten-Drehanimation
- Vergleich von jeweils zwei Karten
- Eingabesperre während der Kartenprüfung
- automatische Rückdrehung bei einem falschen Paar
- Punktevergabe bei einem richtigen Paar
- Spielerwechsel nach einem falschen Paar
- aktiver Spieler bleibt nach einem Treffer am Zug
- Speicherung eines laufenden Spiels
- Wiederherstellung des Spiels nach einem Reload
- Exit-Game-Dialog
- Game-over-Anzeige
- Gewinner-Anzeige
- Unentschieden-Anzeige
- Neustart einer Runde
- Technologien
- HTML5
- TypeScript
- SCSS
- Vite
- Node.js
- Local Storage
- SVG-Assets
- Fontsource
- Projekt starten

Abhängigkeiten installieren:
npm install

Entwicklungsserver starten:
npm run dev

TypeScript prüfen:
npm run type-check

Produktions-Build erstellen:
npm run build

Der fertige Build wird im Ordner dist erzeugt.

Produktions-Build lokal testen:
npm run preview
Persistierte Daten

Die Anwendung speichert aktuell folgende Informationen im Local Storage:
- aktuelle Sprache
- aktuelle Seite
- gewähltes Theme
- gewählte Spielfeldgröße
- gewählter Startspieler

Änderungen der Spieleinstellungen werden unmittelbar nach der Auswahl gespeichert.

In Phase 3 wird zusätzlich der vollständige Zustand eines laufenden Spiels gespeichert.

```
Projektstruktur
public/
├── home/
│   ├── home-arrow.svg
│   ├── home-controller-icon.svg
│   └── home-controller.svg
│
└── settings/
    ├── chess-pawn-icon.svg
    ├── palette.svg
    ├── start-icon.svg
    ├── style-icon.svg
    └── theme-visuals/
        ├── coding/
        ├── gaming/
        ├── da-projects/
        └── food/

src/
├── assets/
│   └── scss/
│       ├── abstracts/
│       │   └── _tokens.scss
│       │
│       ├── base/
│       │   └── _global.scss
│       │
│       ├── components/
│       │   ├── _language-switch.scss
│       │   ├── _primary-button.scss
│       │   ├── _settings-options.scss
│       │   ├── _settings-summary.scss
│       │   └── _theme-preview.scss
│       │
│       ├── pages/
│       │   ├── _home-page.scss
│       │   └── _settings-page.scss
│       │
│       └── main.scss
│
├── js/
│   ├── components/
│   │   ├── settings/
│   │   │   ├── settings-options.ts
│   │   │   ├── settings-summary.ts
│   │   │   └── theme-preview.ts
│   │   │
│   │   └── language-switch.ts
│   │
│   ├── language/
│   │   ├── language-service.ts
│   │   ├── language-types.ts
│   │   └── translations.ts
│   │
│   ├── router/
│   │   ├── app-router.ts
│   │   └── router-types.ts
│   │
│   └── settings/
│       ├── game-setting-guards.ts
│       ├── game-setting-interfaces.ts
│       ├── game-setting-storage.ts
│       ├── game-setting-types.ts
│       ├── game-settings-form.ts
│       ├── game-settings.ts
│       └── theme-preview-config.ts
│
├── pages/
│   ├── game-page.ts
│   ├── home-page.ts
│   └── settings-page.ts
│
└── init.ts
```

Die Struktur wird nur erweitert, wenn neue Verantwortlichkeiten tatsächlich benötigt werden.

## Entwicklungsphasen

### Phase 1 – Technische Grundlage
Abgeschlossen:
- Projektinitialisierung
- TypeScript- und SCSS-Konfiguration
- Navigation
- Lokalisierung
- Settings-Modell
- Local-Storage-Persistenz
- Type-Check und Build

### Phase 2 – Design und Figma-Integration
Abgeschlossen:
- Home-Seite nach Figma
- Settings-Seite nach Figma
- Figma-Farben
- Typografie
- responsive Layouts
- Buttons
- SVG-Illustrationen
- dynamische Theme-Darstellungen
- dynamische Spieleranzeige
- zentrale Theme-Asset-Konfiguration
- lokalisierte Settings-Inhalte

### Phase 3 – Spiellogik
Geplant:
- Board-Erstellung
- Kartenmischung
- Karten-Drehanimation
- Matching-Logik
- Eingabesperre während der Prüfung
- Spielerzustand
- Punktevergabe
- Spielerwechsel
- Exit-Game-Dialog
- Game-over-Zustand
- Gewinner- und Unentschieden-Anzeige
- Persistenz laufender Spiele

### Phase 4 – Deployment
Geplant:
- Deployment auf All-Inkl
- GitHub-Actions-Workflow
- automatischer Produktions-Build
- automatischer FTP- oder FTPS-Upload
- Deployment in die Portfolio-Projektstruktur

## Autor
Entwickler: Yves Gildemeister
Alias: Schnief
Projektquelle: Developer Akademie
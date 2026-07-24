# Memory Game
Ein responsives Memory-Spiel, das im Rahmen der Developer Akademie umgesetzt wurde.
Das Projekt basiert auf TypeScript, Vite und SCSS. Zwei Spieler treten lokal gegeneinander an und können zwischen verschiedenen Themes, Spielfeldgrößen und Startspielern wählen. Die Anwendung unterstützt Deutsch und Englisch und speichert Einstellungen sowie laufende Spielstände im Local Storage.

## Projektstatus
Das Projekt ist fertiggestellt und wurde zur Bewertung eingereicht.

Umgesetzt wurden:
- vollständige Spiellogik für zwei lokale Spieler
- responsive Umsetzung nach Figma-Vorlage
- vier unterschiedliche Spiel-Themes
- drei verschiedene Spielfeldgrößen
- Kartenmischung und dynamische Board-Erstellung
- animiertes Aufdecken und Zurückdrehen der Karten
- Punktevergabe und Spielerwechsel
- Erkennung von passenden Kartenpaaren
- Game-over-Auswertung
- Gewinner- und Unentschieden-Anzeige
- Neustart einer abgeschlossenen Runde
- Exit-Game-Dialog
- Speicherung und Wiederherstellung laufender Spiele
- Deutsch-/Englisch-Umschaltung
- Speicherung der Sprache, Route und Spieleinstellungen
- TypeScript-Type-Check
- Produktions-Build mit Vite

## Funktionen

### Lokaler Zwei-Spieler-Modus
Das Spiel wird von zwei Spielern abwechselnd auf demselben Gerät gespielt.
Der aktive Spieler wird während des Spiels angezeigt. Für beide Spieler werden die bereits gefundenen Kartenpaare beziehungsweise Punkte dargestellt.

### Spielregeln
- Pro Zug werden zwei Karten aufgedeckt.
- Stimmen die Karten überein, erhält der aktive Spieler einen Punkt.
- Bei einem Treffer bleibt derselbe Spieler am Zug.
- Stimmen die Karten nicht überein, werden sie automatisch zurückgedreht.
- Nach einem falschen Paar wechselt der aktive Spieler.
- Während der Kartenprüfung ist das Spielfeld gesperrt.
- Das Spiel endet, sobald alle Kartenpaare gefunden wurden.
- Der Spieler mit den meisten Punkten gewinnt.
- Bei gleicher Punktzahl wird ein Unentschieden angezeigt.

## Home-Seite
Die Home-Seite wurde anhand der Figma-Vorlage umgesetzt.

Enthalten sind:
- responsive Überschrift
- lokalisierter Einleitungstext
- animierter Start-Button
- Controller- und Pfeil-SVGs
- animierte Hintergrundillustrationen
- Sprachumschalter
- Unterstützung von `prefers-reduced-motion`

## Settings-Seite
Vor dem Spiel können drei Einstellungen ausgewählt werden:
- Spiel-Theme
- startender Spieler
- Spielfeldgröße

Änderungen werden direkt verarbeitet und im Local Storage gespeichert.

Die Vorschau reagiert dynamisch auf die Auswahl:
- Farben und Motive wechseln passend zum Theme
- die dargestellten Karten werden ausgetauscht
- das Symbol des startenden Spielers wird aktualisiert
- die Zusammenfassung zeigt die aktuelle Auswahl
- der Start-Button übernimmt die ausgewählten Einstellungen

## Game-Seite
Die Game-Seite enthält:
- Punktestand beider Spieler
- Anzeige des aktuell aktiven Spielers
- dynamisch erzeugtes Kartenfeld
- animierte Karten
- themeabhängige Kartenrückseiten und Motive
- Markierung gefundener Kartenpaare
- Exit-Game-Button
- Exit-Game-Dialog
- automatische Spielerwechsel
- automatische Spielauswertung

Während laufender Animationen und Kartenprüfungen wird das Spielfeld gesperrt, damit keine weiteren Karten ausgewählt werden können.

## Ergebnisanzeige
Nach dem letzten gefundenen Kartenpaar wird eine Ergebnisanimation gestartet.

Angezeigt werden:
- Gewinner des Spiels
- Endpunktestand
- Unentschieden
- Möglichkeit zum Start einer neuen Runde
- Möglichkeit zur Rückkehr zu den Einstellungen

## Themes
Es stehen vier Themes zur Verfügung:
- Coding Vibes
- Gaming
- Developer Academy
- Food

Jedes Theme besitzt eigene:
- Hintergründe
- Farben
- Kartenmotive
- Kartenrückseiten
- Spieler-Symbole
- Exit-Symbole
- Ergebnisgrafiken
- Typografie
- Akzentfarben

Die Theme-Assets befinden sich unter anderem in:
```text
public/
├── game/
├── home/
├── results/
└── settings/
    └── theme-visuals/
        ├── coding/
        ├── gaming/
        ├── da-projects/
        └── food/
```
Spielfeldgrößen

Folgende Spielfeldgrößen sind verfügbar:
Auswahl	Raster	Kartenpaare
- 16 Karten	    4 × 4	8
- 24 Karten	    4 × 6	12
- 36 Karten 	6 × 6	18

Das Spielfeld wird abhängig von der Auswahl dynamisch erzeugt und mit zufällig gemischten Kartenpaaren befüllt.

## Persistierte Daten
Die Anwendung speichert folgende Informationen im Local Storage:
- aktuelle Sprache
- aktuelle Route
- gewähltes Theme
- gewählte Spielfeldgröße
- gewählter Startspieler
- aktiver Spieler
- Punktestand
- Kartenstatus
- bereits gefundene Kartenpaare
- Zustand eines laufenden Spiels

Ein begonnenes Spiel kann nach dem Neuladen der Seite fortgesetzt werden.
Instabile Zwischenzustände während einer laufenden Kartenanimation werden nicht als dauerhafter Spielstand gespeichert.

## Technische Umsetzung
Das Projekt wurde ohne Frontend-Framework umgesetzt.

Die Anwendung verwendet eine modulare TypeScript-Struktur mit getrennten Verantwortlichkeiten für:
- Rendering
- Routing
- Spiellogik
- DOM-Animationen
- Zustandsverwaltung
- Persistenz
- Übersetzungen
- Spieleinstellungen
- Ergebnisanzeige
- Dialogsteuerung

Der zentrale App-Kontext hält den aktuellen Zustand der Anwendung. Änderungen am Spielzustand werden über reine Zustandsfunktionen verarbeitet und anschließend gespeichert beziehungsweise neu gerendert.

## Technologien
- HTML5
- TypeScript
- SCSS
- Vite
- Node.js
- Local Storage
- SVG- und Bild-Assets
- Fontsource
- Projektstruktur

Die folgende Darstellung zeigt die wichtigsten Bereiche des Projekts:
```
public/
├── game/
├── home/
├── results/
└── settings/
    └── theme-visuals/
src/
├── app/
│   ├── app-dom.ts
│   └── app-renderer.ts
│
├── assets/
│   └── scss/
│       ├── abstracts/
│       ├── base/
│       ├── components/
│       ├── pages/
│       └── main.scss
│
├── components/
│   ├── game/
│   ├── home/
│   ├── results/
│   └── settings/
│
├── controllers/
│   └── game/
│       ├── card-dom.ts
│       ├── game-card-controller.ts
│       ├── game-exit-controller.ts
│       ├── game-result-controller.ts
│       ├── game-state.ts
│       └── pair-evaluation-controller.ts
│
├── language/
│   ├── language-interfaces.ts
│   ├── language-service.ts
│   └── translations.ts
│
├── lib/
│   ├── app/
│   ├── pages/
│   │   ├── game/
│   │   └── settings/
│   └── router/
│
├── pages/
│   ├── game-page.ts
│   ├── home-page.ts
│   ├── result-page.ts
│   └── settings-page.ts
│
├── router/
│   ├── app-router.ts
│   ├── route-controller.ts
│   └── route-storage.ts
│
└── init.ts
```

Die einzelnen Module sind nach Verantwortlichkeiten getrennt. UI-Rendering, Spiellogik und Datenpersistenz werden nicht innerhalb derselben Funktionen vermischt.

## Projekt lokal starten

### Voraussetzungen
- Benötigt werden:
- Node.js
- npm
- Abhängigkeiten installieren
- npm install
- Entwicklungsserver starten
- npm run dev
- TypeScript prüfen
- npm run type-check
- Produktions-Build erstellen
- npm run build

Der fertige Build wird im Ordner dist erzeugt.

## Produktions-Build lokal testen
- npm run preview

## Entwicklungsphasen

### Phase 1 – Technische Grundlage
Abgeschlossen:
- Projektinitialisierung
- Vite- und TypeScript-Konfiguration
- SCSS-Struktur
- App-Kontext
- Navigation und Routing
- Lokalisierung
- Settings-Modell
- Local-Storage-Persistenz
- Type-Check und Build

### Phase 2 – Design und Figma-Integration
Abgeschlossen:
- Home-Seite nach Figma
- Settings-Seite nach Figma
- Game-Seite nach Figma
- Ergebnisanzeige nach Figma
- responsive Layouts
- Typografie
- SVG-Illustrationen
- Theme-spezifische Darstellungen
- dynamische Spieleranzeige
- zentrale Asset-Konfiguration

### Phase 3 – Spiellogik
Abgeschlossen:
- dynamische Board-Erstellung
- Kartenmischung
- Karten-Drehanimation
- Matching-Logik
- Eingabesperre
- Spielerzustand
- Punktevergabe
- Spielerwechsel
- Trefferlogik
- Spielende-Erkennung
- Exit-Game-Dialog
- Gewinner- und Unentschieden-Anzeige
- Persistenz laufender Spiele

### Phase 4 – Finalisierung
Abgeschlossen:
- responsive Anpassungen
- themeabhängige Darstellung
- Animationen
- zentrale SCSS-Komponenten
- Refactoring der TypeScript-Module
- Fehlerbehebungen
- TypeScript-Type-Check
- Produktions-Build
- Projektabgabe

## Autor
Entwickler: Yves Gildemeister
Alias: Schnief
Projektquelle: Developer Akademie
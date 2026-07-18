# Memory Game
Ein responsives Memory-Spiel, das im Rahmen der Developer Akademie umgesetzt wird.

Das Projekt basiert auf TypeScript, Vite und SCSS. Spieler können verschiedene Themes, Spielfeldgrößen und einen startenden Spieler auswählen. Zusätzlich unterstützt die Anwendung Deutsch und Englisch.

## Aktueller Entwicklungsstand
Die technische Grundlage der Anwendung wurde eingerichtet.

Aktuell umgesetzt:
- Vite-Projekt mit TypeScript
- SCSS-Unterstützung
- typisierte Navigation zwischen den Seiten
- Home-Seite
- Settings-Seite
- technische Game-Seite
- Deutsch-/Englisch-Umschaltung
- Speicherung der aktuellen Sprache
- Speicherung der aktuellen Route
- Speicherung der gewählten Spieleinstellungen
- Auswahl des startenden Spielers
- Auswahl der Spielfeldgröße
- Auswahl des Themes
- TypeScript-Type-Check
- Produktions-Build mit Vite

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
- Neustart einer Runde

## Themes
Vorgesehen sind vier Themes:
- Code
- Gaming
- Developer Academy
- Food

Die Auswahl beeinflusst später sowohl das Farbschema als auch die Memory-Motive.

## Spielfeldgrößen
Aktuell auswählbar:
- 4 × 4
- 4 × 6
- 6 × 6

Zusätzlich vorgemerkt:
- 6 × 8
- 8 × 8

Die größeren Spielfelder werden ergänzt, wenn genügend unterschiedliche Kartenmotive aus dem Figma-Projekt vorhanden sind.

## Technologien
- HTML5
- TypeScript
- SCSS
- Vite
- Node.js
- Local Storage

## Projekt starten
Abhängigkeiten installieren:
- npm install

Entwicklungsserver starten:
- npm run dev

TypeScript prüfen
- npm run type-check

Produktions-Build erstellen
- npm run build

Der fertige Build wird im Ordner dist erzeugt.

Produktions-Build lokal testen
- npm run preview

Persistierte Daten
Die Anwendung speichert aktuell folgende Informationen im Local Storage:
- aktuelle Sprache
- aktuelle Seite
- gewähltes Theme
- gewählte Spielfeldgröße
- gewählter Startspieler

In einer späteren Phase wird zusätzlich der vollständige Zustand eines laufenden Spiels gespeichert.

Projektstruktur
```
src/
├── assets/
│   └── scss/
│       └── main.scss
├── components/
│   └── language-switch.ts
├── localization/
│   ├── language-service.ts
│   ├── language-types.ts
│   └── translations.ts
├── pages/
│   ├── game-page.ts
│   ├── home-page.ts
│   └── settings-page.ts
├── router/
│   └── app-router.ts
├── settings/
│   ├── game-settings.ts
│   ├── settings-form.ts
│   └── settings-storage.ts
└── init.ts
```

Die Struktur wird im weiteren Projektverlauf nur erweitert, wenn neue Verantwortlichkeiten tatsächlich benötigt werden.

## Entwicklungsphasen

### Phase 1 – Technische Grundlage
Abgeschlossen:
- Projektinitialisierung
- Navigation
- Lokalisierung
- Settings-Modell
- Local-Storage-Persistenz
- Type-Check und Build

### Phase 2 – Design und Figma-Integration
Geplant:
- Figma-Farben
- Typografie
- responsive Layouts
- Buttons
- Illustrationen
- Theme-Darstellungen
- Karten-Assets

### Phase 3 – Spiellogik
Geplant:
- Board-Erstellung
- Kartenmischung
- Matching-Logik
- Spielerzustand
- Punkte
- Spielende
- Persistenz laufender Spiele

### Phase 4 – Deployment
Geplant:
- Deployment auf All-Inkl
- GitHub-Actions-Workflow
- automatischer Build
- automatischer FTP- oder FTPS-Upload

## Autor
Entwickler: "Yves Gildemeister"
Alias: "Schnief"
Projektquelle: "Developer Akademie"
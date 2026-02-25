# Krišs & Alise Wedding Guest Guide (MVP)

Mobile-first React + TypeScript web app for wedding guests to quickly find:
- where to sit (table/seat)
- where to sleep (guest house/room)

Designed for QR-code landing usage on phones.

## Project structure

```text
.
├── public/
│   └── maps/
│       ├── seating-map.svg
│       └── sleeping-map.svg
├── src/
│   ├── components/
│   │   ├── AssignmentCard.tsx
│   │   ├── GuestSelectionList.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── MapWithMarker.tsx
│   │   └── SearchForm.tsx
│   ├── data/
│   │   ├── config.json
│   │   └── guests.json
│   ├── utils/
│   │   └── search.ts
│   ├── App.tsx
│   ├── i18n.ts
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Replace wedding data

### 1) Guest list
Edit `src/data/guests.json`.
Each guest has:
- `name`, `surname`
- `seating.table`, `seating.seat`, `seating.direction`, optional `seating.marker`
- `sleeping.house`, `sleeping.roomBed`, `sleeping.direction`, optional `sleeping.marker`

`marker` coordinates are percentages:
```json
"marker": { "x": 53, "y": 57 }
```

### 2) Map images
Put your files into `public/maps/`, then update paths in `src/data/config.json`:
- `seatingMap.image`
- `sleepingMap.image`

### 3) Marker coordinates
Set `seating.marker` and `sleeping.marker` per guest in `src/data/guests.json`.
If marker is omitted, the UI automatically shows fallback legend + text directions.

## Run locally

```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Deploy

### Vercel
1. Push this repo to GitHub.
2. Import project in Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`, output dir: `dist`.

### Netlify
1. Connect repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

## Notes
- Latvian diacritics are supported in names.
- Search is case-insensitive and space-normalized.
- Small typo tolerance is included with lightweight fuzzy matching.

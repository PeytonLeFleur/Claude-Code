# new-app

A starter web app built with [Vite](https://vite.dev/), [React 19](https://react.dev/),
[TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/).

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`).

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with hot reload.       |
| `npm run build`   | Type-check (`tsc -b`) and build for production.  |
| `npm run preview` | Preview the production build locally.            |
| `npm run lint`    | Lint the source with [oxlint](https://oxc.rs/).  |

## Structure

```
new-app/
├── index.html          # HTML entry point
├── public/             # Static assets served as-is
│   └── favicon.svg
└── src/
    ├── main.tsx        # App bootstrap / React root
    ├── App.tsx         # Root component — start here
    └── index.css       # Global styles + Tailwind import
```

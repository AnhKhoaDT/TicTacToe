# Tic Tac Toe

This is a small React tic-tac-toe app implementing the requested features:

- For the current move only, show “You are at move #…” instead of a button.
- Board is rendered using two loops (no hardcoded squares).
- Toggle button to sort moves ascending/descending.
- When someone wins, the three winning squares are highlighted. If the board fills with no winner, a draw message is shown.
- Each move in the history shows the location in the format (row, col) where rows/cols are 1-based.

How to run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm start
```

Deploying / Uploading to a public host

- GitHub Pages: add `homepage` to `package.json` and install `gh-pages`, then add deploy scripts. See https://create-react-app.dev/docs/deployment/#github-pages for steps.
- Vercel or Netlify: connect this repository and deploy automatically; both work well with React apps.

Notes

This project uses a minimal Create React App style structure. If you prefer Vite, I can convert it and provide deployment steps.

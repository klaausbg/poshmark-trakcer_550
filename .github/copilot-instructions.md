/*
  Repository: poshmark-trakcer_550
  Purpose: Short, focused instructions for AI coding agents (Copilot/Code Assistants)
  Keep this file concise (~20-50 lines). Only include discoverable, actionable patterns.
*/

# Copilot instructions — poshmark-trakcer_550

Summary
- This is a small Node.js scraper that uses Puppeteer to find Poshmark listings for "550" jackets,
  filter out unwanted titles, and send matches to a Telegram chat. Results are persisted in Postgres
  (table: `seen_links_550`) to avoid duplicate notifications.

Key files
- `550.js` — main entrypoint. Launches Puppeteer, scrolls search results, opens product pages,
  extracts title/price/size, filters by keywords, sends Telegram messages, and marks links as seen.
- `db_550.js` — Postgres helper using `pg`. Exposes `ensureTable()`, `isSeen(url)`, `markAsSeen(url)`.
- `package.json` — scripts and dependencies. Run with `npm start` (executes `node 550.js`).

Environment & run
- Required env vars: `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`, `DATABASE_URL`. Put them in a `.env` file.
- Start locally: `npm install` then `npm start` (this runs `node 550.js`).
- Puppeteer runs in headless mode. When debugging, set `headless: false` in `550.js` and increase timeouts.

Patterns & conventions for edits
- Minimal, single-purpose scripts. Keep changes scoped to `550.js` and `db_550.js` unless adding features.
- DB: `db_550.js` uses `pg.Pool` with `ssl.rejectUnauthorized = false` (for Railway). Keep that setting
  unless migrating environments — tests or local Postgres may need adjustment.
- Message sending: `sendTelegramMessage()` logs API responses; preserve that behaviour when modifying.

Common tasks (examples)
- Add a new filter keyword: update the `flaws` array in `550.js` (lowercased checks used).
- Increase scroll depth: change `maxScrolls` in `550.js` to load more results.
- Change max notifications per run: modify `maxMatches` in `550.js`.

Testing & debugging tips
- No test framework is present. For quick validation, run `node 550.js` with a local `.env` and watch console logs.
- To reproduce network/API issues, temporarily log `response.status` in `sendTelegramMessage()`.

Safety & rate limits
- Puppeteer visits many pages; avoid aggressive looping during development. Use small `maxScrolls` and
  `maxMatches` to limit external requests.

If you edit files
- Keep exports from `db_550.js` unchanged (`ensureTable`, `isSeen`, `markAsSeen`) unless updating all usages.
- When adding dependencies, update `package.json` and run `npm install` locally; prefer stable versions.

When unsure, check these lines
- Start logic: top-level call to `main()` in `550.js` (search for `main()`).
- DB table creation: `ensureTable()` in `db_550.js`.

Questions for the repo owner
- Preferred deployment (Heroku/Railway/other)? This affects DB SSL and env config.
- Any plans to add tests or containerization?

End of file

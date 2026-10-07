# Smart Factory Gateway Monitor

A standalone, browser-rendered Windows 98-style gateway monitoring interface. The files require no installation, package manager, build step, or configuration.

## Run locally

Open `index.html` in a modern browser. The interface and all interactions run in the browser.

## Files

- `index.html` — application structure and local stylesheet/script references.
- `style.css` — Windows 98-inspired appearance and responsive layout.
- `script.js` — application behavior, configured device and alert records, archive generation, filtering, and detail rendering.
- `README.md` — project notes and customization guide.

## Data and archive customization

The editable configuration is at the top of `script.js`: `FACTORY_NAME`, `GATEWAY_LABEL`, `DEVICE_LIST`, `ALERT_LIST`, and `EVENT_TEMPLATES`. `ARCHIVE_RECORDS` expands the event templates into 30 dated records; adjust the generator length and date logic if you change the archive size. Record filters search timestamp, event ID, source, category, severity, description, status, diagnostic code, and archive reference.

The historical diagnostic record is the 16th entry (event ID `009184`). Its reference is represented in three separate encoded archive properties and assembled by `resolveArchiveReference()` when its detail panel opens. The detail is inserted with `textContent` through DOM nodes.

The reference is client-side data and cannot be considered cryptographically secret from someone inspecting browser code. The encoding only keeps the complete value out of the initial page source and data object.

## Editing application text

Most fixed labels are in `index.html`; record data and view text are in `script.js`; presentation is in `style.css`. Keep identifiers in the `views` list, `viewTitles`, and render-function map aligned when adding a view. This project has no backend or network functionality and does not send data to external services.

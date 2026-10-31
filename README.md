# Pradeep's Horologue

A static watch guide: explore watches by category, learn about movements, dials, complications, straps, vintage and luxury, see a personal collection, and get a buying guide.

Plain HTML, CSS and JavaScript — no build step.

- `index.html` – page structure
- `css/style.css` – styles
- `js/data.js` – all content (watches, movements, dials, straps, glossary, collection, stores)
- `js/app.js` – rendering, filters, dialogs
- `img/` – photos of the collection

Edit `js/data.js` to add watches or categories. Open `index.html` directly, or serve the folder with any static server.

## Offers data

`data/deals.json` holds every watch from the shops that publish a Shopify `/products.json` catalogue. It is rebuilt by `scripts/scrape_offers.py` (standard-library Python) and refreshed daily by the GitHub Action in `.github/workflows/refresh-offers.yml`. Run it by hand with `python scripts/scrape_offers.py`.

Shops that block automated reading (Helios, Tata CLiQ, Swiss Time House, Hour Studio) keep a small hand-picked snapshot in `js/data.js`.

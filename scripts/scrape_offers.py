#!/usr/bin/env python3
"""Pull full watch catalogues from shops that publish Shopify /products.json
and write them to data/deals.json for the site.

Usage:  python scripts/scrape_offers.py
Standard library only. Polite: one request at a time, a pause between pages.
"""
import json, os, re, subprocess, sys, time, urllib.error, urllib.request
from datetime import datetime, timezone

UA = "Mozilla/5.0 (compatible; PradeepWatchGuide/1.0; personal hobby site)"
PAUSE = 1.2          # seconds between requests
MAX_PAGES = 160      # safety cap: 160 x 250 products per shop
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "deals.json")

# kind: "all"   -> every product except straps/accessories/boxes/bags
#       "watch" -> only products whose type mentions "watch"
SITES = [
    {"name": "Just In Time",        "base": "https://justintime.in",              "kind": "all",   "group": "Retailer"},
    {"name": "Kamal Watch Co.",     "base": "https://www.kamalwatch.com",         "kind": "watch", "group": "Retailer"},
    {"name": "Zeus Kicks",          "base": "https://www.zeuskicks.com",          "kind": "watch", "group": "Luxury reseller"},
    {"name": "Vintage Watcholic",   "base": "https://vintagewatcholic.in",        "kind": "all",   "group": "Vintage", "brands": ["HMT", "Seiko", "Citizen", "Roamer", "Ricoh", "Le Montres", "Titan", "Casio", "Timex", "Orient", "Technos", "Favre Leuba", "Rado", "Omega", "Tissot", "Sonata"]},
    {"name": "Sylvi",               "base": "https://sylvi.in",                   "kind": "all",   "group": "Indian brand", "brand": "Sylvi"},
    {"name": "Meridian Watches",    "base": "https://meridianwatches.in",         "kind": "all",   "group": "Indian brand", "brand": "Meridian"},
    {"name": "Franklord",           "base": "https://franklord.in",               "kind": "all",   "group": "Indian brand", "brand": "Franklord"},
    {"name": "Coromandel Watch Co.", "base": "https://coromandelwatchco.com",     "kind": "all",   "group": "Indian brand", "brand": "Coromandel"},
    {"name": "Bangalore Watch Co.", "base": "https://www.bangalorewatchco.in",    "kind": "all",   "group": "Indian brand", "brand": "Bangalore Watch Co."},
    {"name": "Jaipur Watch Co.",    "base": "https://jaipur.watch",               "kind": "all",   "group": "Indian brand", "brand": "Jaipur Watch Co."},
]

NOT_WATCH = re.compile(r"strap|band|accessor|box|tool|bag|gift|cleaning|spring ?bar|bracelet link|gift card|sunglass|shoe|slide|sneaker|belt|wallet|perfume|pen\b|case$", re.I)


NOT_WATCH_TITLE = re.compile(r"(movement service|servicing|repair service|extended warranty|insurance|gift card|watch box|watch winder|cleaning kit|battery replacement|strap only)", re.I)


STRAP_WORD = re.compile(r"\bstraps?\b", re.I)
WATCH_WORD = re.compile(r"\bwatch(es)?\b(?!\s*straps?)", re.I)


MOVEMENT_WORD = re.compile(r"quartz|automatic|analog|digital|chronograph|multifunction|multi-function|mechanical|solar|dial|hand.?wound|\d+ ?mm case", re.I)


def strap_only(title):
    """True for 'Leather Strap 20mm' / 'Watch Strap', False for 'Analog Strap Watch'."""
    return bool(STRAP_WORD.search(title)) and not WATCH_WORD.search(title) and not MOVEMENT_WORD.search(title)


def get_json(url):
    """GET url and parse JSON. Retries on 429/5xx; falls back to curl if Python's CA store is broken."""
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(int(e.headers.get("Retry-After", 0) or 0) or 8 * (attempt + 1))
                continue
            return None
        except urllib.error.URLError as e:
            if "CERTIFICATE" in str(e):
                out = subprocess.run(["curl", "-s", "-m", "40", "-A", UA, url], capture_output=True).stdout
                try:
                    return json.loads(out)
                except ValueError:
                    return None
            time.sleep(5 * (attempt + 1))
        except ValueError:
            return None
    raise RuntimeError(f"giving up on {url}")


def money(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0


def clean(s):
    return re.sub(r"\s+", " ", (s or "").replace("™", "").replace("�", "")).strip()


def pick_brand(site, p):
    if site.get("brand"):
        return site["brand"]
    if site.get("brands"):
        t = p.get("title", "").lower()
        for b in site["brands"]:
            if b.lower() in t:
                return b
        return "Vintage (other)"
    return clean(p.get("vendor")) or "Unknown"


def wanted(site, p):
    ptype = p.get("product_type", "") or ""
    if site["kind"] == "watch":
        return bool(re.search("watch", ptype, re.I)) and not re.search(r"strap|accessor|box|tool", ptype, re.I)
    if NOT_WATCH.search(ptype):
        return False
    return not NOT_WATCH_TITLE.search(p.get("title", "")) and not strap_only(p.get("title", ""))


def to_item(idx, site, p):
    variants = p.get("variants") or []
    if not variants:
        return None
    avail = [v for v in variants if v.get("available")]
    pool = avail or variants
    price = min(money(v.get("price")) for v in pool)
    if price <= 0:
        return None
    mrp = max([money(v.get("compare_at_price")) for v in pool] + [0])
    if mrp <= price:
        mrp = 0
    return [idx, pick_brand(site, p), clean(p.get("title")), round(price), round(mrp), 1 if avail else 0,
            "/products/" + p["handle"]]


def scrape(site):
    items, seen, page = [], set(), 1
    while page <= MAX_PAGES:
        data = get_json(f"{site['base']}/products.json?limit=250&page={page}")
        products = (data or {}).get("products") or []
        if not products:
            break
        for p in products:
            if p["handle"] in seen or not wanted(site, p):
                continue
            seen.add(p["handle"])
            yield p
        if len(products) < 250:
            break
        page += 1
        time.sleep(PAUSE)


def main():
    only = set(sys.argv[1:])
    result = {"updated": datetime.now(timezone.utc).isoformat(timespec="seconds"), "sites": [], "items": []}
    try:
        with open(OUT, encoding="utf-8") as f:
            prev = json.load(f)
    except (OSError, ValueError):
        prev = {"sites": [], "items": []}
    prev_idx = {s["name"]: i for i, s in enumerate(prev["sites"])}
    for idx, site in enumerate(SITES):
        if only and site["name"] not in only:
            continue
        new_items = []
        try:
            for p in scrape(site):
                it = to_item(idx, site, p)
                if it:
                    new_items.append(it)
        except RuntimeError as e:
            print(f"{site['name']}: FAILED ({e})", file=sys.stderr)
            new_items = None
        old = [i for i in prev["items"] if i[0] == prev_idx.get(site["name"], -1)]
        # A failed or suspiciously short scrape must not wipe out good data: keep the previous items.
        if new_items is None or (old and len(new_items) < 0.7 * len(old)):
            print(f"{site['name']}: keeping {len(old)} previous items", flush=True)
            new_items = [[idx] + i[1:] for i in old]
        n = len(new_items)
        result["items"].extend(new_items)
        print(f"{site['name']}: {n} watches", flush=True)
        result["sites"].append({"name": site["name"], "url": site["base"], "group": site["group"], "count": n})
        time.sleep(PAUSE)
    # keep site indexes stable: sites list is positional, so pad skipped ones
    if only:
        print("partial run; not writing", file=sys.stderr)
        return
    if not result["items"]:
        sys.exit("nothing scraped; keeping the previous file")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, separators=(",", ":"))
    print(f"wrote {len(result['items'])} items, {os.path.getsize(OUT) // 1024} KB")


if __name__ == "__main__":
    main()

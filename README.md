# mfers Community Dashboard

Real-time pulse check of the mfers ecosystem.

## What It Shows

- **Collection Stats:** Floor price, holders, supply, market cap
- **24h Activity:** Volume, sales, price changes
- **Recent Sales:** Latest mfer transactions
- **Builders:** Who's actively building in the ecosystem

## Tech Stack

- **Frontend:** Static HTML/CSS/JavaScript (vanilla, no dependencies)
- **Data:** Static JSON (will integrate live OpenSea API)
- **Deployment:** Net Protocol on Base (planned)

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

## Project Status

**Current:** MVP with static data  
**Next:** Integrate live OpenSea API (need to solve auth)  
**Goal:** Deploy to Net Protocol for permanent onchain hosting

## Files

- `index.html` - Main dashboard page
- `static-data.json` - MVP data source
- `builders.json` - Curated builders list
- `fetch-data.js` - Data fetching script (WIP - OpenSea API access issue)
- `SPEC.md` - Full project specification

## Design Philosophy

- **Minimal:** Stick figure aesthetic, mfers vibe
- **Fast:** No bloat, loads instantly
- **Useful:** Real data, not hype
- **cc0:** Open source, anyone can fork/remix

## Contributing

This is a community project. If you want to:
- Add yourself to builders list → PR to `builders.json`
- Improve design → fork and ship
- Solve OpenSea API access → share solution

mfers do what they want 🎩

---

**Built by:** @mferGPT  
**License:** CC0 (public domain)

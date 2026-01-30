# Community Dashboard Specification

## Problem Statement
The mfers ecosystem lacks a single, real-time view of community health and activity. Newcomers don't know where to start. Holders don't have visibility into ecosystem momentum. Builders aren't discoverable. We need a central mfers pulse check.

## Goals
- [x] **Primary:** Real-time dashboard showing mfers ecosystem vitality
- [ ] Floor price, holder count, 24h sales volume
- [ ] Recent sales feed (last 10-20 sales)
- [ ] Community sentiment pulse
- [ ] Active builders and what they're building
- [ ] Links to key resources (discord, twitter, marketplace)
- [ ] Deployed onchain via Net Protocol (permanent, censorship-resistant)

## Non-Goals
- NOT trying to replace OpenSea or marketplaces (just aggregate data)
- NOT building a trading interface
- NOT storing user data or requiring login
- NOT trying to monetize or capture value (cc0, public good)

## Approach

### Technology Stack
- **Frontend:** Static HTML/CSS/JS (simple, fast, works onchain)
- **Data Sources:**
  - OpenSea API for mfers collection data
  - Twitter API or manual curated list for builders
  - Maybe Rarit

y Sniper for rarity data
- **Deployment:** Net Protocol storage on Base
- **Updates:** Regenerate and redeploy periodically (daily? manual for now)

### Architecture
```
┌─────────────────┐
│  Data Fetching  │  Fetch from OpenSea, curate builders list
│   (Node script) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Static Site    │  Generate index.html with all data embedded
│   Generator     │  (or fetch client-side for truly real-time)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Net Protocol   │  Upload to Base (permanent, onchain)
│   Deployment    │
└─────────────────┘
```

### Design Approach
- **Aesthetic:** Stick figure minimalism (true to mfers vibe)
- **Color scheme:** Black/white + maybe green accent
- **Layout:** Single-page dashboard, mobile-responsive
- **Vibe:** Clean, fast, useful. Not busy. Not hype. Just data.

## Milestones

### Milestone 1: MVP Data Collection ✓
- [x] Set up project structure
- [ ] Script to fetch OpenSea mfers collection stats (floor, holders, volume)
- [ ] Script to fetch recent sales (last 20)
- [ ] Curated list of active builders (manual JSON for now)
- [ ] Test data fetching locally

### Milestone 2: Static Site Generation
- [ ] HTML template with mfers branding
- [ ] CSS for clean dashboard layout
- [ ] JavaScript to render data dynamically (or embed in HTML)
- [ ] Test locally (open in browser, verify data displays)

### Milestone 3: Net Protocol Deployment
- [ ] Read NETP.md for deployment process
- [ ] Test upload to Net Protocol testnet (if available)
- [ ] Deploy to Base mainnet
- [ ] Get onchain URL (e.g., web3://...)
- [ ] Test access via browser with ERC-4804 support

### Milestone 4: Automation & Updates
- [ ] Cron job to regenerate dashboard daily
- [ ] Update mechanism (redeploy to Net Protocol)
- [ ] Monitor for failures, alert if broken

### Milestone 5: Launch & Announce
- [ ] Tweet about it (simple, authentic)
- [ ] Share in mfers Discord
- [ ] Add to TOOLS.md as reference
- [ ] Document in SHIPPED.md

## Success Criteria
- Dashboard loads in <3 seconds
- Data is accurate (cross-check with OpenSea manually)
- Accessible via onchain URL
- Mobile-responsive (works on phone)
- Community finds it useful (feedback on Twitter/Discord)
- No costs to maintain (static, onchain storage)

## Data Sources

### Primary: OpenSea API
```bash
# Collection stats
GET https://api.opensea.io/api/v1/collection/mfer

# Recent sales (events)
GET https://api.opensea.io/api/v1/events?collection_slug=mfer&event_type=successful&only_opensea=false&limit=20
```

### Builders List (Manual Curation)
```json
{
  "builders": [
    {
      "name": "HeresMyEth",
      "twitter": "@HeresMyEth",
      "building": "mferGPT, MferbuilderDAO contributor"
    },
    {
      "name": "Sartoshi",
      "twitter": "@sartoshi_rip",
      "building": "Original creator, Sartoshi's Garden merch"
    }
    // ... more builders
  ]
}
```

### Additional Nice-to-Haves
- Dune Analytics queries for deeper metrics?
- Snapshot voting data?
- Treasury balance (unofficialmfers.eth)?

## Open Questions
- [ ] How often to update? Daily auto vs manual trigger?
- [ ] Do we fetch data client-side (real-time) or server-side (embedded)?
  - **Decision:** Start with server-side (simpler, faster load), add client-side later if needed
- [ ] Net Protocol pricing - how much does storage cost?
  - **Check:** NETP.md documentation
- [ ] Do we need rarity data? Or keep it simple for MVP?
  - **Decision:** Skip rarity for MVP, add later if requested

## Timeline
- **Tonight (Fri Jan 30 12am-6am):** Milestone 1 + 2 (data collection + static site)
- **Weekend:** Milestone 3 (Net Protocol deployment)
- **Next week:** Milestones 4-5 (automation + launch)

## Notes
- Keep it cc0 - all code open source
- Embody mfer ethos: simple, useful, not flashy
- This is a public good, not a product
- If successful, could template for other NFT communities

---

**Status:** ✅ Spec complete, ready to build  
**Next:** Start Milestone 1 - data collection scripts

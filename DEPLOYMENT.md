# Community Dashboard - Deployment Plan

## Current Status
✅ MVP Complete - fully functional static dashboard  
⏸️ **Blocked:** Awaiting wallet setup for Net Protocol deployment

## Deployment Requirements

### Technical
- Net Protocol CLI (`netp`) ✅ Installed
- Dashboard files ready ✅ Complete
- File size: ~10KB (single transaction) ✅ Confirmed

### Financial
- **Estimated Cost:** ~$5-20 (single transaction on Base)
- **Payment:** Requires ETH on Base for gas
- **Wallet:** Need private key access for deployment wallet

### Options

**Option 1: Use Cold Storage Wallet (Recommended)**
- Address: `0x3b54621FE962ee8E5283f2429B800e2E212c9a02`
- Balance: 0.0116 ETH on Base (~$32)
- Access: heresmy controlled
- **Action needed:** heresmy provides private key OR deploys directly

**Option 2: Create Dedicated Deployment Wallet**
- New wallet specifically for Net Protocol uploads
- Fund with small amount (~0.01 ETH)
- Give mferGPT access via env var
- **Pros:** Separation of concerns, limited risk
- **Cons:** Needs setup and funding

**Option 3: Use Trading Wallet (NOT Recommended)**
- Would work technically
- Bad practice (mixing trading capital with infrastructure)
- Against wallet security model

## Deployment Steps (Once Funded)

### 1. Set Environment Variables
```bash
export NET_PRIVATE_KEY="0x..."
export NET_CHAIN_ID="8453"  # Base
```

### 2. Preview Upload (Dry Run - No Cost)
```bash
cd ~/clawd/builds/community-dashboard

netp storage preview \
  --file index.html \
  --key "mfergpt-dashboard-v1" \
  --text "mfers community dashboard - real-time ecosystem pulse" \
  --chain-id 8453
```

This shows exact cost before spending gas.

### 3. Upload Dashboard
```bash
netp storage upload \
  --file index.html \
  --key "mfergpt-dashboard-v1" \
  --text "mfers community dashboard - real-time ecosystem pulse"
```

### 4. Upload Static Data
```bash
netp storage upload \
  --file static-data.json \
  --key "mfergpt-dashboard-data-v1" \
  --text "mfers dashboard data snapshot"
```

### 5. Verify Storage
```bash
netp storage read \
  --key "mfergpt-dashboard-v1" \
  --operator <wallet-address> \
  --chain-id 8453
```

### 6. Update HTML to Load Data from Storage
Modify index.html to fetch data from Net Protocol storage instead of static-data.json.

### 7. Re-upload Updated HTML
Upload final version with onchain data loading.

## Access Methods

### After Deployment

**Method 1: Direct Storage Read**
```bash
netp storage read \
  --key "mfergpt-dashboard-v1" \
  --operator <address> \
  --chain-id 8453 > dashboard.html
```

Then open dashboard.html in browser.

**Method 2: ERC-4804 (web3:// URLs)**
- Requires ERC-4804 compatible browser/extension
- URL format: `web3://<contract>/<operator>/<key>`
- **Need to research:** Exact syntax for Net Protocol

**Method 3: Gateway Service**
- Third-party services that translate web3:// to https://
- Examples: ethfs.xyz, web3url.io
- Not decentralized but improves accessibility

## Next Steps

1. **Immediate:** Get heresmy approval for deployment approach
2. **Setup:** Create/fund deployment wallet OR get access to cold storage
3. **Deploy:** Run deployment steps above
4. **Test:** Verify dashboard loads from storage
5. **Document:** Update README with access instructions
6. **Launch:** Tweet about it, share in Discord

## Cost Estimate Detail

**Base Gas Price:** ~0.001-0.01 Gwei (Base is cheap)  
**Storage Transaction:** Single transaction for ~10KB file  
**Estimated:** $5-20 depending on network congestion  
**Funds Needed:** 0.005-0.01 ETH to be safe

## Alternative: Defer Onchain Deployment

**Could launch on traditional hosting first:**
- Deploy to GitHub Pages (free, instant)
- Get community feedback
- Iterate on features
- Deploy to Net Protocol later as "permanent archive"

**Pros:**
- No upfront cost
- Easier to update during MVP phase
- Can test with real users first

**Cons:**
- Not truly decentralized
- Misses the "onchain" narrative
- Delays the permanent storage goal

## Recommendation

**Best path forward:**
1. Set up dedicated deployment wallet (0.01 ETH)
2. Deploy MVP to Net Protocol
3. Tweet about fully onchain dashboard
4. Iterate on features
5. Re-deploy updated versions as needed

This balances innovation (onchain first) with practicality (small controlled risk).

---

**Status:** Ready to deploy pending wallet setup  
**Blocker:** Need deployment wallet with ~0.01 ETH on Base  
**Next:** Discuss with heresmy

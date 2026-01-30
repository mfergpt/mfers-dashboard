#!/usr/bin/env node
/**
 * fetch-data.js - Fetch mfers ecosystem data
 * 
 * Fetches:
 * - Collection stats (floor, holders, volume)
 * - Recent sales
 * - Combines with curated builders list
 * 
 * Output: data.json (all dashboard data)
 */

const fs = require('fs');
const https = require('https');

// OpenSea API endpoint (v1, no key required for public data)
const OPENSEA_API = 'https://api.opensea.io/api/v1';
const COLLECTION_SLUG = 'mfer';

/**
 * Helper: Make HTTPS GET request
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'mferGPT Dashboard/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch mfers collection stats from OpenSea
 */
async function fetchCollectionStats() {
  console.log('Fetching collection stats...');
  const url = `${OPENSEA_API}/collection/${COLLECTION_SLUG}`;
  
  try {
    const data = await httpsGet(url);
    const stats = data.collection.stats;
    
    return {
      floor_price: stats.floor_price,
      total_supply: stats.total_supply,
      num_owners: stats.num_owners,
      total_volume: stats.total_volume,
      one_day_volume: stats.one_day_volume,
      one_day_change: stats.one_day_change,
      one_day_sales: stats.one_day_sales,
      seven_day_volume: stats.seven_day_volume,
      seven_day_change: stats.seven_day_change,
      thirty_day_volume: stats.thirty_day_volume,
      market_cap: stats.market_cap,
      average_price: stats.average_price,
    };
  } catch (error) {
    console.error('Error fetching collection stats:', error.message);
    return null;
  }
}

/**
 * Fetch recent sales events
 */
async function fetchRecentSales() {
  console.log('Fetching recent sales...');
  const url = `${OPENSEA_API}/events?collection_slug=${COLLECTION_SLUG}&event_type=successful&only_opensea=false&limit=20`;
  
  try {
    const data = await httpsGet(url);
    
    return data.asset_events.map(event => ({
      token_id: event.asset?.token_id,
      price_eth: event.total_price ? (parseFloat(event.total_price) / 1e18).toFixed(4) : 'N/A',
      seller: event.seller?.address,
      buyer: event.winner_account?.address,
      timestamp: event.created_date,
      transaction: event.transaction?.transaction_hash,
    }));
  } catch (error) {
    console.error('Error fetching recent sales:', error.message);
    return [];
  }
}

/**
 * Load curated builders list
 */
function loadBuilders() {
  console.log('Loading builders list...');
  try {
    const buildersData = fs.readFileSync(__dirname + '/builders.json', 'utf8');
    return JSON.parse(buildersData).builders;
  } catch (error) {
    console.error('Error loading builders:', error.message);
    return [];
  }
}

/**
 * Main: Fetch all data and write to data.json
 */
async function main() {
  console.log('🎩 mfers Dashboard Data Fetcher\n');
  
  const [collectionStats, recentSales, builders] = await Promise.all([
    fetchCollectionStats(),
    fetchRecentSales(),
    Promise.resolve(loadBuilders()),
  ]);
  
  const dashboardData = {
    updated_at: new Date().toISOString(),
    collection: collectionStats,
    recent_sales: recentSales,
    builders: builders,
  };
  
  // Write to data.json
  const outputPath = __dirname + '/data.json';
  fs.writeFileSync(outputPath, JSON.stringify(dashboardData, null, 2));
  console.log(`\n✅ Data written to ${outputPath}`);
  
  // Summary
  if (collectionStats) {
    console.log(`\n📊 Summary:`);
    console.log(`   Floor: ${collectionStats.floor_price} ETH`);
    console.log(`   Holders: ${collectionStats.num_owners}`);
    console.log(`   24h Volume: ${collectionStats.one_day_volume} ETH`);
    console.log(`   24h Sales: ${collectionStats.one_day_sales}`);
    console.log(`   Recent Sales Fetched: ${recentSales.length}`);
    console.log(`   Builders Listed: ${builders.length}`);
  }
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

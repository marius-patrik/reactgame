#!/usr/bin/env node

/**
 * Supabase Database Seeding Script
 * 
 * Usage:
 *   bun scripts/seed.ts              # Run seed
 *   bun scripts/seed.ts --clear      # Clear seed data
 */

import { seedDatabase, clearSeedData } from "../src/lib/seed";

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "--clear") {
    console.log("\n⚠️  WARNING: This will delete all seeded data!\n");
    const result = await clearSeedData();
    process.exit(result.success ? 0 : 1);
  } else {
    const result = await seedDatabase();
    process.exit(result.success ? 0 : 1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

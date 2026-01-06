import { createClient } from "@supabase/supabase-js";

// Use service role key for admin operations (bypasses RLS)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing environment variables:");
  console.error("   REACT_APP_SUPABASE_URL:", supabaseUrl ? "✓" : "✗");
  console.error("   SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✓" : "✗");
  console.error("\n💡 Get SUPABASE_SERVICE_ROLE_KEY from Supabase Dashboard → Settings → API → service_role key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Seed data configuration
const SEED_USER = {
  email: "test@example.com",
  password: "password123",
};

const SEED_WALLET = {
  coins: 1000,
  gems: 50,
  stars: 10,
};

const SEED_GAME_STATS = {
  eggs: 3,
  hp: 85,
  max_hp: 100,
  mp: 40,
  max_mp: 50,
  xp: 250,
};

/**
 * Seed the database with a test user and data
 */
export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...\n");

    // 1. Create auth user
    console.log("Creating auth user...");
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: SEED_USER.email,
      password: SEED_USER.password,
      email_confirm: true, // Auto-confirm email
    });

    if (authError) {
      if (authError.message.includes("already been registered")) {
        console.log("⚠️  User already exists, fetching existing user...");
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users?.users.find(u => u.email === SEED_USER.email);
        if (existingUser) {
          await seedUserData(existingUser.id);
          return { success: true };
        }
      }
      throw authError;
    }

    if (!authData.user) {
      throw new Error("Failed to create user");
    }

    console.log("✅ Auth user created:", authData.user.email);

    // Wait a moment for the trigger to create account
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2. Seed user data
    await seedUserData(authData.user.id);

    console.log("\n✅ Database seed completed!");
    console.log("\n📝 Login credentials:");
    console.log(`   Email: ${SEED_USER.email}`);
    console.log(`   Password: ${SEED_USER.password}`);

    return { success: true };
  } catch (error) {
    console.error("❌ Seed failed:", error);
    return { success: false, error };
  }
}

/**
 * Seed wallet and game stats for a user
 */
async function seedUserData(authId: string) {
  // Get account ID
  const { data: account, error: accountError } = await supabase
    .from("accounts")
    .select("id")
    .eq("auth_id", authId)
    .single();

  if (accountError) {
    console.log("⚠️  Account not found, creating manually...");
    const { data: newAccount, error: createError } = await supabase
      .from("accounts")
      .insert({ auth_id: authId, email: SEED_USER.email, role: "player" })
      .select()
      .single();
    
    if (createError) throw createError;
    await seedAccountData(newAccount.id);
  } else {
    await seedAccountData(account.id);
  }
}

async function seedAccountData(accountId: string) {
  // Update wallet
  console.log("Updating wallet...");
  const { error: walletError } = await supabase
    .from("wallets")
    .upsert({
      account_id: accountId,
      ...SEED_WALLET,
    });

  if (walletError) {
    console.log("⚠️  Wallet not found, creating...");
    await supabase.from("wallets").insert({ account_id: accountId, ...SEED_WALLET });
  }
  console.log(`✅ Wallet: ${SEED_WALLET.coins} coins, ${SEED_WALLET.gems} gems, ${SEED_WALLET.stars} stars`);

  // Update game stats
  console.log("Updating game stats...");
  const { error: statsError } = await supabase
    .from("game_stats")
    .upsert({
      account_id: accountId,
      ...SEED_GAME_STATS,
    });

  if (statsError) {
    console.log("⚠️  Game stats not found, creating...");
    await supabase.from("game_stats").insert({ account_id: accountId, ...SEED_GAME_STATS });
  }
  console.log(`✅ Stats: ${SEED_GAME_STATS.hp}/${SEED_GAME_STATS.max_hp} HP, ${SEED_GAME_STATS.mp}/${SEED_GAME_STATS.max_mp} MP, ${SEED_GAME_STATS.xp} XP`);
}

/**
 * Clear all seeded data
 */
export async function clearSeedData() {
  try {
    console.log("🗑️  Clearing seed data...\n");

    // Find and delete the seed user
    const { data: users } = await supabase.auth.admin.listUsers();
    const seedUser = users?.users.find(u => u.email === SEED_USER.email);

    if (seedUser) {
      // Delete auth user (cascades to accounts, wallet, stats via FK)
      const { error } = await supabase.auth.admin.deleteUser(seedUser.id);
      if (error) throw error;
      console.log("✅ Seed user deleted:", SEED_USER.email);
    } else {
      console.log("⚠️  Seed user not found");
    }

    console.log("\n✅ Seed data cleared!");
    return { success: true };
  } catch (error) {
    console.error("❌ Clear failed:", error);
    return { success: false, error };
  }
}

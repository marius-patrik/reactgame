import { supabase } from "./supabase";

/**
 * Seed the database with initial data
 * Run this after creating tables in your database
 */
export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Example: Seed users table
    // Uncomment and modify based on your schema
    /*
    const { data: users, error: usersError } = await supabase
      .from("users")
      .insert([
        {
          email: "user1@example.com",
          name: "User One",
        },
        {
          email: "user2@example.com",
          name: "User Two",
        },
      ])
      .select();

    if (usersError) {
      console.error("❌ Error seeding users:", usersError);
      throw usersError;
    }

    console.log("✅ Users seeded:", users?.length || 0);
    */

    // Example: Seed game scores table
    // Uncomment and modify based on your schema
    /*
    const { data: scores, error: scoresError } = await supabase
      .from("game_scores")
      .insert([
        {
          user_id: users?.[0]?.id,
          score: 1000,
        },
        {
          user_id: users?.[1]?.id,
          score: 1500,
        },
      ])
      .select();

    if (scoresError) {
      console.error("❌ Error seeding scores:", scoresError);
      throw scoresError;
    }

    console.log("✅ Scores seeded:", scores?.length || 0);
    */

    console.log("✅ Database seed completed!");
    return { success: true };
  } catch (error) {
    console.error("❌ Seed failed:", error);
    return { success: false, error };
  }
}

/**
 * Clear all seeded data (for development)
 * Use with caution!
 */
export async function clearSeedData() {
  try {
    console.log("🗑️  Clearing seed data...");

    // Example: Clear users table
    // Uncomment based on your schema
    /*
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.error("❌ Error clearing users:", deleteError);
      throw deleteError;
    }

    console.log("✅ Users cleared");
    */

    console.log("✅ Seed data cleared!");
    return { success: true };
  } catch (error) {
    console.error("❌ Clear failed:", error);
    return { success: false, error };
  }
}

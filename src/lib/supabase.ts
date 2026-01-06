import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || "";

// Log for debugging in development
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Supabase environment variables not set. Please create a .env file with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

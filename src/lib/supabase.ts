import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey = import.meta.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                    import.meta.env.REACT_APP_SUPABASE_ANON_KEY || "";

// Log for debugging in development
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Supabase environment variables not set. Please update .env with REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY or REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

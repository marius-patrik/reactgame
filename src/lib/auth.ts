import { supabase } from "./supabase";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

export interface AuthSession {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return {
      success: true,
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || "",
            user_metadata: data.user.user_metadata,
          }
        : null,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || "Sign up failed",
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return {
      success: true,
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || "",
            user_metadata: data.user.user_metadata,
          }
        : null,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      error: error.message || "Sign in failed",
    };
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message || "Sign out failed" };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    return {
      user: user
        ? {
            id: user.id,
            email: user.email || "",
            user_metadata: user.user_metadata,
          }
        : null,
      error: null,
    };
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "Failed to get user",
    };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
) {
  try {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user
        ? {
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: session.user.user_metadata,
          }
        : null;
      callback(user);
    });

    return subscription;
  } catch (error: any) {
    // If Supabase isn't initialized, return null immediately
    console.warn("Auth state change setup failed:", error.message);
    callback(null);
    return undefined;
  }
}

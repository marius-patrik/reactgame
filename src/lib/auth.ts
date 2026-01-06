import { supabase } from "./supabase";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}

export interface AuthSession {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

const SUPABASE_NOT_CONFIGURED = "Supabase is not configured. Please set environment variables.";

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  if (!supabase) {
    return { success: false, user: null, error: SUPABASE_NOT_CONFIGURED };
  }

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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sign up failed";
    return { success: false, user: null, error: message };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { success: false, user: null, error: SUPABASE_NOT_CONFIGURED };
  }

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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sign in failed";
    return { success: false, user: null, error: message };
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  if (!supabase) {
    return { success: false, error: SUPABASE_NOT_CONFIGURED };
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { success: true, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Sign out failed";
    return { success: false, error: message };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  if (!supabase) {
    return { user: null, error: SUPABASE_NOT_CONFIGURED };
  }

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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to get user";
    return { user: null, error: message };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
) {
  if (!supabase) {
    // If Supabase isn't configured, immediately callback with null user
    callback(null);
    return undefined;
  }

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
  } catch (error: unknown) {
    // If Supabase isn't initialized, return null immediately
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn("Auth state change setup failed:", message);
    callback(null);
    return undefined;
  }
}


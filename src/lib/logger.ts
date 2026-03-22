import { supabase } from "@/lib/supabase";

/**
 * Global Activity Logger — Vanguard OS
 * Inserts a structured audit record into `vanguard_activity_logs`.
 * Silently fails so it never disrupts the caller's flow.
 */
export async function logActivity(
  action: string,
  module: string,
  details: string
): Promise<void> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profileRow } = await supabase
      .from("team_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    await supabase.from("vanguard_activity_logs").insert([
      {
        user_id: user.id,
        user_email: user.email,
        user_role: profileRow?.role ?? "unknown",
        action,
        module,
        details,
      },
    ]);
  } catch {
    // Silent fail — logging must never throw or block the caller
  }
}

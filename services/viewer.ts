import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv } from "@/lib/env";
import { demoViewer } from "@/services/demo-data";
import type { ViewerContext } from "@/types/workspace";

export const getViewerContext = cache(async (): Promise<ViewerContext> => {
  if (!hasPublicSupabaseEnv()) {
    return demoViewer;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const db = supabase as any;
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return demoViewer;
    }

    const { data: profile } = await db
      .from("profiles")
      .select("full_name, role, organization_id")
      .eq("id", session.user.id)
      .maybeSingle();

    const { data: organization } = profile?.organization_id
      ? await db
          .from("organizations")
          .select("name")
          .eq("id", profile.organization_id)
          .maybeSingle()
      : { data: null };

    return {
      displayName: profile?.full_name ?? session.user.email ?? "Workspace user",
      roleLabel: (profile?.role ?? "staff").replaceAll("_", " "),
      organizationName: organization?.name ?? "SpecialtyRx Organization",
      mode: profile?.organization_id ? "live" : "demo",
      hasSession: true
    };
  } catch {
    return demoViewer;
  }
});

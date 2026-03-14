"use server";

import { redirect } from "next/navigation";
import { isRegisterRole } from "@/lib/auth/register";
import {
  createServerSupabaseClient,
  createServiceSupabaseClient
} from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/env";
import { bootstrapRegisteredUser } from "@/services/auth/bootstrap";

export type RegisterActionState = {
  status: "error" | "idle";
  message?: string;
};

export async function registerAction(
  _previousState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return {
      status: "error",
      message:
        "Registration requires both public Supabase keys and the service role key."
    };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const organizationName = String(formData.get("organizationName") ?? "").trim();
  const phone = readOptionalValue(formData, "phone");
  const practiceName = readOptionalValue(formData, "practiceName");
  const providerNpi = readOptionalValue(formData, "providerNpi");
  const specialty = readOptionalValue(formData, "specialty");
  const selectedRole = String(formData.get("role") ?? "").trim();

  if (!fullName || !email || !password || !organizationName || !selectedRole) {
    return {
      status: "error",
      message: "Full name, organization, role, email, and password are required."
    };
  }

  if (!isRegisterRole(selectedRole)) {
    return {
      status: "error",
      message: "Select a valid workspace role."
    };
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters."
    };
  }

  if (selectedRole === "provider" && (!practiceName || !specialty)) {
    return {
      status: "error",
      message: "Providers need a practice name and specialty."
    };
  }

  const serviceClient = createServiceSupabaseClient();
  let createdUserId: string | null = null;

  try {
    const { data, error } = await serviceClient.auth.admin.createUser({
      email,
      email_confirm: true,
      password,
      user_metadata: {
        full_name: fullName,
        role: selectedRole
      }
    });

    if (error || !data.user?.id) {
      return {
        status: "error",
        message: error?.message ?? "Unable to create user."
      };
    }

    createdUserId = data.user.id;

    await bootstrapRegisteredUser({
      client: serviceClient,
      email,
      fullName,
      organizationName,
      phone,
      practiceName,
      providerNpi,
      role: selectedRole,
      specialty,
      userId: data.user.id
    });
  } catch (error) {
    if (createdUserId) {
      await serviceClient.auth.admin.deleteUser(createdUserId);
    }

    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to complete registration right now."
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return {
        status: "error",
        message: "Account created, but automatic sign-in failed. Please log in manually."
      };
    }
  } catch {
    return {
      status: "error",
      message: "Account created, but automatic sign-in failed. Please log in manually."
    };
  }

  redirect("/dashboard");
}

function readOptionalValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value : undefined;
}

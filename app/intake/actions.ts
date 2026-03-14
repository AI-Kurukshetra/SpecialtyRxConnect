"use server";

import { randomUUID } from "node:crypto";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { hasServiceRoleEnv } from "@/lib/env";
import type { IntakeActionState } from "@/types/intake";

type LooseQueryResult = {
  data: Record<string, unknown> | null;
  error?: {
    message?: string;
  } | null;
};

type LooseSupabaseTable = {
  select: (...args: unknown[]) => LooseSupabaseTable;
  insert: (values: Record<string, unknown>) => LooseSupabaseTable;
  limit: (value: number) => LooseSupabaseTable;
  maybeSingle: () => Promise<LooseQueryResult>;
  single: () => Promise<LooseQueryResult>;
};

type LooseSupabaseClient = {
  from: (table: string) => LooseSupabaseTable;
};

function readValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitEnrollmentAction(
  _previousState: IntakeActionState,
  formData: FormData
): Promise<IntakeActionState> {
  const patientFullName = readValue(formData, "patientFullName");
  const phone = readValue(formData, "phone");
  const medicationName = readValue(formData, "medicationName");
  const providerName = readValue(formData, "providerName");
  const payerName = readValue(formData, "payerName");

  if (!patientFullName || !phone || !medicationName || !providerName || !payerName) {
    return {
      status: "error",
      message:
        "Patient name, phone, medication, provider, and payer are required."
    };
  }

  if (!hasServiceRoleEnv()) {
    return {
      status: "success",
      message:
        "Enrollment captured in preview mode. Add a Supabase service role key to persist live submissions.",
      reference: `demo-${randomUUID().slice(0, 8)}`
    };
  }

  try {
    const supabase = createServiceSupabaseClient();
    const db = supabase as unknown as LooseSupabaseClient;
    const { data: organization } = await db
      .from("organizations")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (!organization?.id || typeof organization.id !== "string") {
      return {
        status: "error",
        message:
          "No organization exists yet. Create an organization record before accepting live enrollments."
      };
    }

    const [firstName, ...lastNameParts] = patientFullName.split(" ");
    const lastName = lastNameParts.join(" ") || "Patient";

    const { data: patient, error: patientError } = await db
      .from("patients")
      .insert({
        organization_id: organization.id,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: readValue(formData, "dateOfBirth") || null,
        email: readValue(formData, "email") || null,
        phone,
        preferred_channel: "sms",
        zip_code: readValue(formData, "zipCode") || null
      })
      .select("id")
      .single();

    if (patientError || !patient || typeof patient.id !== "string") {
      return {
        status: "error",
        message: patientError?.message ?? "Unable to create patient record."
      };
    }

    const { data: provider } = await db
      .from("providers")
      .insert({
        organization_id: organization.id,
        full_name: providerName,
        npi: readValue(formData, "providerNpi") || null,
        specialty: readValue(formData, "therapyArea") || null,
        practice_name: readValue(formData, "practiceName") || null
      })
      .select("id")
      .single();

    if (!provider?.id || typeof provider.id !== "string") {
      return {
        status: "error",
        message: "Unable to create provider record."
      };
    }

    const { data: medication } = await db
      .from("medications")
      .insert({
        name: medicationName,
        therapy_area: readValue(formData, "therapyArea") || null,
        requires_prior_auth: true
      })
      .select("id")
      .single();

    if (!medication?.id || typeof medication.id !== "string") {
      return {
        status: "error",
        message: "Unable to create medication record."
      };
    }

    const { data: prescription } = await db
      .from("prescriptions")
      .insert({
        organization_id: organization.id,
        patient_id: patient.id,
        provider_id: provider.id,
        medication_id: medication.id,
        diagnosis: readValue(formData, "diagnosis") || null,
        dosage: readValue(formData, "dosage") || null,
        clinical_notes: readValue(formData, "notes") || null
      })
      .select("id")
      .single();

    if (!prescription?.id || typeof prescription.id !== "string") {
      return {
        status: "error",
        message: "Unable to create prescription record."
      };
    }

    const { data: insurance } = await db
      .from("insurance_policies")
      .insert({
        organization_id: organization.id,
        patient_id: patient.id,
        payer_name: payerName,
        plan_name: readValue(formData, "planName") || null,
        member_id: readValue(formData, "memberId") || randomUUID().slice(0, 12),
        verification_notes: "Submitted from public enrollment portal."
      })
      .select("id")
      .single();

    if (!insurance?.id || typeof insurance.id !== "string") {
      return {
        status: "error",
        message: "Unable to create insurance policy record."
      };
    }

    const { data: patientCase, error: caseError } = await db
      .from("patient_cases")
      .insert({
        organization_id: organization.id,
        patient_id: patient.id,
        provider_id: provider.id,
        prescription_id: prescription.id,
        insurance_policy_id: insurance.id,
        status: "intake",
        priority: "watch",
        next_action: "Run benefits investigation",
        barrier_summary: readValue(formData, "notes") || null
      })
      .select("id")
      .single();

    if (caseError || !patientCase || typeof patientCase.id !== "string") {
      return {
        status: "error",
        message: caseError?.message ?? "Unable to create case record."
      };
    }

    return {
      status: "success",
      message: "Enrollment submitted and routed to the provider workspace.",
      reference: patientCase.id
    };
  } catch {
    return {
      status: "error",
      message: "Unexpected error while submitting enrollment."
    };
  }
}

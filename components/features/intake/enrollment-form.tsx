"use client";

import { useActionState } from "react";
import { submitEnrollmentAction } from "@/app/intake/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useIntakeSteps } from "@/hooks/use-intake-steps";
import {
  emptyIntakeForm,
  supportNeedOptions,
  type IntakeActionState
} from "@/types/intake";

const initialState: IntakeActionState = {
  status: "idle"
};

const steps = [
  "Patient profile",
  "Therapy and coverage",
  "Support and routing"
];

export function EnrollmentForm() {
  const [actionState, formAction, isPending] = useActionState(
    submitEnrollmentAction,
    initialState
  );
  const { stepIndex, isFirstStep, isLastStep, next, previous } = useIntakeSteps(
    steps.length
  );

  return (
    <Card className="p-6 sm:p-8">
      <span className="eyebrow">Digital intake</span>
      <h2 className="mt-3 font-display text-4xl tracking-tight text-slate-950">
        Structured enrollment for faster access operations
      </h2>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            className={`rounded-2xl border px-4 py-4 text-sm ${
              index === stepIndex
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
            key={step}
          >
            <div className="text-[11px] uppercase tracking-[0.24em]">
              Step {index + 1}
            </div>
            <div className="mt-2 font-medium">{step}</div>
          </div>
        ))}
      </div>

      <form action={formAction} className="mt-8 space-y-6">
        {stepIndex === 0 ? (
          <div className="detail-grid">
            <div className="form-field">
              <label htmlFor="patientFullName">Patient full name</label>
              <Input
                defaultValue={emptyIntakeForm.patientFullName}
                id="patientFullName"
                name="patientFullName"
                placeholder="Ava Thompson"
              />
            </div>
            <div className="form-field">
              <label htmlFor="dateOfBirth">Date of birth</label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <Input id="phone" name="phone" placeholder="(555) 867-5309" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" placeholder="patient@example.com" type="email" />
            </div>
            <div className="form-field">
              <label htmlFor="zipCode">Zip code</label>
              <Input id="zipCode" name="zipCode" placeholder="60611" />
            </div>
            <div className="form-field">
              <label htmlFor="preferredChannel">Preferred channel</label>
              <Select defaultValue="sms" id="preferredChannel" name="preferredChannel">
                <option value="sms">SMS</option>
                <option value="email">Email</option>
                <option value="call">Call</option>
                <option value="portal">Portal</option>
              </Select>
            </div>
          </div>
        ) : null}

        {stepIndex === 1 ? (
          <div className="detail-grid">
            <div className="form-field">
              <label htmlFor="medicationName">Medication</label>
              <Input id="medicationName" name="medicationName" placeholder="Dupixent" />
            </div>
            <div className="form-field">
              <label htmlFor="therapyArea">Therapy area</label>
              <Select id="therapyArea" name="therapyArea">
                <option value="">Select therapy area</option>
                <option value="Immunology">Immunology</option>
                <option value="Oncology">Oncology</option>
                <option value="Neurology">Neurology</option>
                <option value="Rare disease">Rare disease</option>
              </Select>
            </div>
            <div className="form-field">
              <label htmlFor="providerName">Provider name</label>
              <Input id="providerName" name="providerName" placeholder="Dr. Priya Patel" />
            </div>
            <div className="form-field">
              <label htmlFor="providerNpi">Provider NPI</label>
              <Input id="providerNpi" name="providerNpi" placeholder="1234567890" />
            </div>
            <div className="form-field">
              <label htmlFor="payerName">Primary payer</label>
              <Input id="payerName" name="payerName" placeholder="Blue Cross Blue Shield" />
            </div>
            <div className="form-field">
              <label htmlFor="memberId">Member ID</label>
              <Input id="memberId" name="memberId" placeholder="XJQ11892045" />
            </div>
            <div className="form-field md:col-span-2">
              <label htmlFor="diagnosis">Diagnosis</label>
              <Input id="diagnosis" name="diagnosis" placeholder="Severe eosinophilic asthma" />
            </div>
          </div>
        ) : null}

        {stepIndex === 2 ? (
          <div className="space-y-6">
            <div className="form-field">
              <span className="text-sm font-medium text-slate-800">
                Support needs
              </span>
              <div className="flex flex-wrap gap-2">
                {supportNeedOptions.map((option) => (
                  <label
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                    key={option}
                  >
                    <input name="supportNeeds" type="checkbox" value={option} />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="detail-grid">
              <div className="form-field">
                <label htmlFor="practiceName">Practice name</label>
                <Input id="practiceName" name="practiceName" placeholder="Lakeview Respiratory Partners" />
              </div>
              <div className="form-field">
                <label htmlFor="planName">Plan name</label>
                <Input id="planName" name="planName" placeholder="PPO Gold 3500" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="notes">Coordinator notes</label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Document referral urgency, known barriers, or clinical requirements that will affect time to therapy."
              />
            </div>
          </div>
        ) : null}

        {actionState.message ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              actionState.status === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {actionState.message}
            {actionState.reference ? ` Reference: ${actionState.reference}` : ""}
          </div>
        ) : null}

        <div className="flex flex-wrap justify-between gap-3">
          <Button disabled={isFirstStep} onClick={previous} type="button" variant="secondary">
            Back
          </Button>

          {isLastStep ? (
            <Button disabled={isPending} type="submit">
              {isPending ? "Submitting..." : "Submit enrollment"}
            </Button>
          ) : (
            <Button onClick={next} type="button">
              Continue
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

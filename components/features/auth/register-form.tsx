"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, type RegisterActionState } from "@/app/register/actions";
import {
  registerRoleDetails,
  registerRoleOptions,
  type RegisterRole
} from "@/lib/auth/register";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const initialState: RegisterActionState = {
  status: "idle"
};

export function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState<RegisterRole>("admin");
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const roleDetail = registerRoleDetails[selectedRole];

  return (
    <Card className="register-card relative overflow-hidden border-slate-200/90 bg-white/95 p-6 sm:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <span className="eyebrow">External registration</span>
      <h1 className="mt-3 max-w-xl font-display text-4xl tracking-tight text-slate-950 sm:text-5xl">
        Open a live workspace without waiting for manual provisioning.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Choose the role you need, create the organization shell, and land in a
        seeded workspace with matching operational records.
      </p>

      <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50/85 p-5">
        <div className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
          Selected role
        </div>
        <div className="mt-2 font-display text-2xl tracking-tight text-slate-950">
          {roleDetail.label}
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">{roleDetail.description}</p>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="fullName">
              Full name
            </label>
            <Input id="fullName" name="fullName" placeholder="Maya Chen" />
          </div>

          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="organizationName">
              Organization
            </label>
            <Input
              id="organizationName"
              name="organizationName"
              placeholder="Northstar Specialty Care"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="role">
              Role
            </label>
            <Select
              id="role"
              name="role"
              onChange={(event) => setSelectedRole(event.target.value as RegisterRole)}
              value={selectedRole}
            >
              {registerRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="phone">
              Phone
            </label>
            <Input id="phone" name="phone" placeholder="(555) 100-1001" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" placeholder="name@clinic.com" type="email" />
          </div>

          <div className="form-field">
            <label className="text-sm font-medium text-slate-800" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" type="password" />
          </div>
        </div>

        {selectedRole === "provider" ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="form-field md:col-span-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="specialty">
                Specialty
              </label>
              <Input id="specialty" name="specialty" placeholder="Pulmonology" />
            </div>

            <div className="form-field md:col-span-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="practiceName">
                Practice
              </label>
              <Input
                id="practiceName"
                name="practiceName"
                placeholder="Lakeview Respiratory Partners"
              />
            </div>

            <div className="form-field md:col-span-1">
              <label className="text-sm font-medium text-slate-800" htmlFor="providerNpi">
                NPI
              </label>
              <Input id="providerNpi" name="providerNpi" placeholder="1234567890" />
            </div>
          </div>
        ) : null}

        {state.message ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {state.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-7 text-slate-600">
            Already provisioned?{" "}
            <Link className="font-medium text-slate-900 underline" href="/login">
              Sign in here
            </Link>
            .
          </div>

          <Button className="w-full sm:w-auto" disabled={isPending} type="submit">
            {isPending ? "Creating account..." : "Create workspace account"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

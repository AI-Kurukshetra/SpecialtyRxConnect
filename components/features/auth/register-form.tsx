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
    <Card className="register-card register-surface relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
      <span className="eyebrow register-kicker">External registration</span>
      <h1 className="register-heading mt-3 max-w-xl font-display text-4xl tracking-tight sm:text-5xl">
        Open a live workspace without waiting for manual provisioning.
      </h1>
      <p className="register-body mt-4 max-w-2xl text-sm leading-7 sm:text-base">
        Choose the role you need, create the organization shell, and land in a
        seeded workspace with matching operational records.
      </p>

      <div className="register-subtle-surface mt-6 rounded-[28px] p-5">
        <div className="register-kicker text-[11px] uppercase tracking-[0.28em]">
          Selected role
        </div>
        <div className="register-heading mt-2 font-display text-2xl tracking-tight">
          {roleDetail.label}
        </div>
        <p className="register-body mt-2 text-sm leading-7">{roleDetail.description}</p>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="register-field-label text-sm font-medium" htmlFor="fullName">
              Full name
            </label>
            <Input className="register-field" id="fullName" name="fullName" placeholder="Maya Chen" />
          </div>

          <div className="form-field">
            <label className="register-field-label text-sm font-medium" htmlFor="organizationName">
              Organization
            </label>
            <Input
              className="register-field"
              id="organizationName"
              name="organizationName"
              placeholder="Northstar Specialty Care"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="register-field-label text-sm font-medium" htmlFor="role">
              Role
            </label>
            <Select
              className="register-field"
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
            <label className="register-field-label text-sm font-medium" htmlFor="phone">
              Phone
            </label>
            <Input
              className="register-field"
              id="phone"
              name="phone"
              placeholder="(555) 100-1001"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="form-field">
            <label className="register-field-label text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              className="register-field"
              id="email"
              name="email"
              placeholder="name@clinic.com"
              type="email"
            />
          </div>

          <div className="form-field">
            <label className="register-field-label text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input className="register-field" id="password" name="password" type="password" />
          </div>
        </div>

        {selectedRole === "provider" ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="form-field md:col-span-1">
              <label className="register-field-label text-sm font-medium" htmlFor="specialty">
                Specialty
              </label>
              <Input className="register-field" id="specialty" name="specialty" placeholder="Pulmonology" />
            </div>

            <div className="form-field md:col-span-1">
              <label className="register-field-label text-sm font-medium" htmlFor="practiceName">
                Practice
              </label>
              <Input
                className="register-field"
                id="practiceName"
                name="practiceName"
                placeholder="Lakeview Respiratory Partners"
              />
            </div>

            <div className="form-field md:col-span-1">
              <label className="register-field-label text-sm font-medium" htmlFor="providerNpi">
                NPI
              </label>
              <Input className="register-field" id="providerNpi" name="providerNpi" placeholder="1234567890" />
            </div>
          </div>
        ) : null}

        {state.message ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {state.message}
          </div>
        ) : null}

        <div className="register-divider flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="register-body text-sm leading-7">
            Already provisioned?{" "}
            <Link className="register-link font-medium underline" href="/login">
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

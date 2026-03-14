export const supportNeedOptions = [
  "Copay assistance",
  "Bridge program",
  "Interpreter services",
  "Transportation support",
  "Injection training",
  "Adherence follow-up"
] as const;

export type SupportNeed = (typeof supportNeedOptions)[number];

export type IntakeFormValues = {
  patientFullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  medicationName: string;
  therapyArea: string;
  providerName: string;
  providerNpi: string;
  payerName: string;
  memberId: string;
  supportNeeds: SupportNeed[];
  notes: string;
};

export type IntakeSubmissionResult = {
  intakeId: string;
  message: string;
  mode: "demo" | "live";
};

export type IntakeActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
};

export const emptyIntakeForm: IntakeFormValues = {
  patientFullName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  medicationName: "",
  therapyArea: "",
  providerName: "",
  providerNpi: "",
  payerName: "",
  memberId: "",
  supportNeeds: [],
  notes: ""
};

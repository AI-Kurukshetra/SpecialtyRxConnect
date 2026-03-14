export type IntakeActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
};

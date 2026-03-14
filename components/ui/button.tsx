import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function buttonStyles(variant: ButtonProps["variant"] = "primary") {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" &&
      "bg-ink text-white shadow-sm hover:bg-slate-800",
    variant === "secondary" &&
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50",
    variant === "ghost" && "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  );
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return <button className={cn(buttonStyles(variant), className)} {...props} />;
}

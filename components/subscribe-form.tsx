"use client";

import { useState, type FormEvent } from "react";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface SubscribeFormProps {
  size?: "md" | "lg";
  cta: string;
  placeholder: string;
  submitting: string;
  finePrint?: string;
  successHeading: string;
  successBody: string;
  errorMsg: string;
  className?: string;
  id?: string;
}

export function SubscribeForm({
  size = "lg",
  cta,
  placeholder,
  submitting,
  finePrint,
  successHeading,
  successBody,
  errorMsg,
  className,
  id,
}: SubscribeFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(SITE_CONFIG.subscribeFormUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className={cn(
          "mx-auto max-w-md rounded-lg border border-(--color-brand)/40 bg-(--color-brand)/10 px-6 py-5 text-center",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <p className="text-base font-semibold text-(--color-foreground)">
          {successHeading}
        </p>
        <p className="mt-1 text-sm text-(--color-muted-foreground)">
          {successBody}
        </p>
      </div>
    );
  }

  const inputSize = size === "lg" ? "h-12 text-base" : "h-10 text-sm";
  const buttonSize =
    size === "lg" ? "h-12 px-6 text-base font-medium" : "h-10 px-4 text-sm";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn("mx-auto max-w-md w-full", className)}
      noValidate={false}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={placeholder}
          disabled={status === "loading"}
          aria-label={placeholder}
          className={cn(
            "flex-1 min-w-0 rounded-md px-4",
            "bg-(--color-muted)/50 border border-(--color-border)",
            "text-(--color-foreground)",
            "placeholder:text-(--color-muted-foreground)",
            "focus:outline-none focus:border-(--color-brand)",
            "transition-colors",
            "disabled:opacity-60",
            inputSize,
          )}
        />
        {/* Honeypot — bots fill this; Formspree drops the submission */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "shrink-0 rounded-md font-medium",
            "bg-(--color-brand) text-white",
            "hover:bg-(--color-brand-hover)",
            "transition-all duration-150 hover:-translate-y-px active:translate-y-0",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none",
            buttonSize,
          )}
        >
          {status === "loading" ? submitting : cta}
        </button>
      </div>
      {status === "error" ? (
        <p
          className="mt-3 text-xs text-red-400 text-center"
          role="alert"
        >
          {errorMsg}
        </p>
      ) : finePrint ? (
        <p className="mt-3 text-xs text-(--color-muted-foreground) text-center">
          {finePrint}
        </p>
      ) : null}
    </form>
  );
}

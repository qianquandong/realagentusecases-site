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
    const email = formData.get("email");

    // Honeypot — if a bot filled this, lie about success and bail.
    if (formData.get("_gotcha")) {
      setStatus("success");
      return;
    }

    if (typeof email !== "string" || !email) {
      setStatus("error");
      return;
    }

    const base = SITE_CONFIG.substackUrl;
    if (!base) {
      // Misconfiguration — no Substack URL set.
      setStatus("error");
      return;
    }

    const apiUrl = `${base}/api/v1/free`;
    const fallbackUrl =
      `${base}/subscribe` +
      `?email=${encodeURIComponent(email)}&utm_source=realagentusecases`;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "web" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        // Substack rejected (CAPTCHA / rate limit / changed API).
        // Fall back to the hosted subscribe page with email prefilled.
        window.location.href = fallbackUrl;
      }
    } catch {
      // Network / CORS — same fallback.
      window.location.href = fallbackUrl;
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
            "bg-(--color-muted) border border-(--color-muted-foreground)/30",
            "text-(--color-foreground)",
            "placeholder:text-(--color-muted-foreground)",
            "focus:outline-none focus:border-(--color-brand)",
            "transition-colors",
            "disabled:opacity-60",
            inputSize,
          )}
        />
        {/* Honeypot — bots fill this; handler short-circuits on submit */}
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

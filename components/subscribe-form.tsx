import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

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
  finePrint,
  className,
  id,
}: SubscribeFormProps) {
  const fieldHeight = size === "lg" ? "h-12" : "h-10";
  const inputTextSize = size === "lg" ? "text-base" : "text-sm";
  const buttonTextSize =
    size === "lg" ? "text-sm sm:text-base font-medium" : "text-sm";
  const buttonPadX = size === "lg" ? "px-4 sm:px-6" : "px-4";

  return (
    <form
      id={id}
      action={
        SITE_CONFIG.substackUrl
          ? `${SITE_CONFIG.substackUrl}/subscribe`
          : "/subscribe"
      }
      method="get"
      className={cn("mx-auto max-w-md w-full", className)}
      noValidate={false}
    >
      <input type="hidden" name="utm_source" value="realagentusecases" />
      <div
        className={cn(
          "flex items-stretch w-full overflow-hidden",
          "rounded-lg border border-(--color-foreground)/15 bg-(--color-muted)",
          "transition-[border-color,box-shadow] duration-150",
          "focus-within:border-(--color-brand) focus-within:ring-2 focus-within:ring-(--color-brand)/20",
          fieldHeight,
        )}
      >
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={placeholder}
          aria-label={placeholder}
          className={cn(
            "flex-1 min-w-0 h-full px-4",
            "bg-transparent",
            "text-(--color-foreground)",
            "placeholder:text-(--color-muted-foreground)/80",
            "focus:outline-none",
            inputTextSize,
          )}
        />
        <button
          type="submit"
          className={cn(
            "shrink-0 h-full whitespace-nowrap",
            "bg-(--color-brand) text-white",
            "hover:bg-(--color-brand-hover)",
            "transition-colors",
            buttonPadX,
            buttonTextSize,
          )}
        >
          {cta}
        </button>
      </div>
      {finePrint ? (
        <p className="mt-3 text-xs text-(--color-muted-foreground) text-center">
          {finePrint}
        </p>
      ) : null}
    </form>
  );
}

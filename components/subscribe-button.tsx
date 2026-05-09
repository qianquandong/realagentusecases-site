import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "outline";

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base font-medium",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-hover",
  outline:
    "border border-(--color-border) text-foreground hover:bg-muted hover:border-foreground/20",
};

export function SubscribeButton({
  children,
  size = "md",
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  size?: Size;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={SITE_CONFIG.substackUrl}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium",
        "transition-all duration-150 hover:-translate-y-px active:translate-y-0",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-700 shadow-sm disabled:bg-primary/50",
  secondary:
    "bg-white text-foreground border border-border hover:bg-muted disabled:opacity-50",
  ghost:
    "bg-transparent text-foreground hover:bg-muted disabled:opacity-50",
  outline:
    "bg-transparent border border-primary text-primary-700 hover:bg-primary-50 disabled:opacity-50",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

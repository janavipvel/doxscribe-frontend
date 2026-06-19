import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const COLOR_MAP = {
  blue: {
    bar: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "text-blue-600 bg-blue-50",
  },
  emerald: {
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "text-emerald-600 bg-emerald-50",
  },
  amber: {
    bar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "text-amber-600 bg-amber-50",
  },
  violet: {
    bar: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "text-violet-600 bg-violet-50",
  },
};

export default function SoapSection({ letter, title, color, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const c = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden">
      <div className={cn("h-1 w-full", c.bar)} />
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn("h-9 w-9 rounded-md flex items-center justify-center font-semibold text-sm", c.icon)}>
            {letter}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "text-muted-foreground transition-transform flex-shrink-0",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-4 sm:px-5 pb-5 -mt-1 border-t border-border pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function Field({ label, value }) {
  if (!value) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground leading-relaxed">{value}</p>
    </div>
  );
}

export function FieldList({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-foreground leading-relaxed flex gap-2">
            <span className="text-muted-foreground mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

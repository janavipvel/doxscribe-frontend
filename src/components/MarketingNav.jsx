import { Link, useLocation } from "react-router-dom";
import { Stethoscope, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button.jsx";

const LINKS = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
];

export default function MarketingNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-slate-950 border-b border-white/10 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="text-white" size={18} />
          </div>
          <span className="text-lg tracking-tight">DoxScribe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? "text-white bg-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/app">
            <Button size="md">Launch App</Button>
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-4 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/app" onClick={() => setOpen(false)} className="block pt-2">
            <Button size="md" className="w-full">
              Launch App
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="no-print bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="text-white" size={15} />
          </div>
          <span className="font-semibold text-sm">DoxScribe</span>
        </div>
        <p className="text-xs text-center sm:text-right">
          DoxScribe — AI clinical documentation assistant. Not a substitute for
          clinical judgment. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

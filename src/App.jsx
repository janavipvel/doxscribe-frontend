import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Stethoscope, History, Upload } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import MarketingNav, { MarketingFooter } from "./components/MarketingNav.jsx";

function AppNavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="border-b border-border bg-white/80 backdrop-blur sticky top-0 z-30 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Stethoscope className="h-4.5 w-4.5 text-white" size={18} />
          </div>
          <span className="text-lg tracking-tight">DoxScribe</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/app"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/app")
                ? "bg-primary-50 text-primary-700"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Upload size={16} />
            <span className="hidden sm:inline">New Consultation</span>
          </Link>
          <Link
            to="/app/history"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/app/history")
                ? "bg-primary-50 text-primary-700"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <History size={16} />
            <span className="hidden sm:inline">History</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppNavBar />
      <main className="flex-1">{children}</main>
      <footer className="no-print py-6 text-center text-xs text-muted-foreground">
        DoxScribe — AI clinical documentation assistant. Not a substitute for clinical judgment.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Marketing site */}
      <Route path="/" element={<MarketingLayout><HomePage /></MarketingLayout>} />
      <Route path="/how-it-works" element={<MarketingLayout><HowItWorksPage /></MarketingLayout>} />
      <Route path="/pricing" element={<MarketingLayout><PricingPage /></MarketingLayout>} />

      {/* App */}
      <Route path="/app" element={<AppLayout><UploadPage /></AppLayout>} />
      <Route path="/app/consult/:id" element={<AppLayout><ResultPage /></AppLayout>} />
      <Route path="/app/history" element={<AppLayout><HistoryPage /></AppLayout>} />
    </Routes>
  );
}

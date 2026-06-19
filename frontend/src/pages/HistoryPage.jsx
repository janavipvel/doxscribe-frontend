import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, FileAudio, ChevronRight, Inbox } from "lucide-react";
import { Card } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { getAllConsultations } from "@/services/api.js";
import { formatDate } from "@/lib/utils";

export default function HistoryPage() {
  const [consults, setConsults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getAllConsultations()
      .then((data) => {
        if (active) setConsults(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load history");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
          Consultation History
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          All past consultations processed by DoxScribe.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mb-3" size={26} />
          <p className="text-sm">Loading history…</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="inline-flex h-12 w-12 rounded-full bg-red-50 items-center justify-center mb-4">
            <AlertCircle className="text-red-600" size={22} />
          </div>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      )}

      {!loading && !error && consults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="inline-flex h-12 w-12 rounded-full bg-muted items-center justify-center mb-4">
            <Inbox className="text-muted-foreground" size={22} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">No consultations yet.</p>
          <Link to="/app">
            <Button variant="secondary">Start a new consultation</Button>
          </Link>
        </div>
      )}

      {!loading && !error && consults.length > 0 && (
        <Card className="overflow-hidden">
          <div className="divide-y divide-border">
            {consults.map((c) => (
              <Link
                key={c.id}
                to={`/app/consult/${c.id}`}
                className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <FileAudio className="text-primary-600" size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {c.filename || "Untitled recording"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(c.created_at)}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground max-w-xs truncate text-right">
                  {c.soap_note?.assessment?.diagnosis || "—"}
                </div>
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

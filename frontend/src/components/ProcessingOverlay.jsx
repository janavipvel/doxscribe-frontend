import { useEffect, useState } from "react";
import { Mic, FileText, Brain, CheckCircle2 } from "lucide-react";

const STAGES = [
  { label: "Uploading audio", icon: Mic, duration: 4 },
  { label: "Transcribing consultation", icon: FileText, duration: 22 },
  { label: "Generating SOAP note", icon: Brain, duration: 28 },
  { label: "Finalizing", icon: CheckCircle2, duration: 6 },
];

const TOTAL = STAGES.reduce((a, s) => a + s.duration, 0);

export default function ProcessingOverlay() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  let cumulative = 0;
  let activeIndex = STAGES.length - 1;
  for (let i = 0; i < STAGES.length; i++) {
    cumulative += STAGES[i].duration;
    if (elapsed < cumulative) {
      activeIndex = i;
      break;
    }
  }

  const progressPct = Math.min(98, (elapsed / TOTAL) * 100);

  return (
    <div className="rounded-lg border border-border bg-white p-8 sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 rounded-full bg-primary-50 items-center justify-center mb-4">
            <Brain className="text-primary-600 animate-pulse-soft" size={26} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Generating your SOAP note
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            This usually takes 30–60 seconds. Please don't close this tab.
          </p>
        </div>

        <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-8">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="space-y-4">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isDone = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <div key={stage.label} className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isDone
                      ? "bg-primary-600 text-white"
                      : isActive
                      ? "bg-primary-50 text-primary-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon size={15} className={isActive ? "animate-pulse-soft" : ""} />
                </div>
                <span
                  className={`text-sm ${
                    isDone || isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {stage.label}
                  {isActive ? "…" : isDone ? " — done" : ""}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Elapsed: {elapsed}s
        </p>
      </div>
    </div>
  );
}

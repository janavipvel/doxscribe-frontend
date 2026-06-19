import { Link } from "react-router-dom";
import { Mic, FileText, FileCheck2, ShieldCheck, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";
import { Card } from "@/components/ui/Card.jsx";
import Waveform from "@/components/Waveform.jsx";

const STEPS = [
  {
    icon: Mic,
    title: "Record the Consultation",
    description:
      "Upload audio from any patient visit — in person or via telehealth. DoxScribe supports MP3, WAV, M4A, WEBM, OGG and MP4.",
  },
  {
    icon: FileText,
    title: "AI Transcribes Every Word",
    description:
      "Whisper-powered transcription captures the full conversation accurately, so nothing said in the room gets missed.",
  },
  {
    icon: FileCheck2,
    title: "Structured SOAP Note, Instantly",
    description:
      "Subjective, Objective, Assessment, and Plan are generated automatically and organized for fast clinical review.",
  },
];

const FEATURES = [
  {
    icon: Clock,
    title: "Save Hours Every Day",
    description: "Cut documentation time dramatically so you can focus on patients, not paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Clinical Accuracy",
    description: "Structured SOAP format keeps every note consistent, complete, and easy to review.",
  },
  {
    icon: Sparkles,
    title: "Effortless Workflow",
    description: "Drag, drop, and generate — no templates to fill in, no manual typing required.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="flex justify-center mb-8">
            <Waveform className="w-full max-w-md h-12" color="#60a5fa" />
          </div>
          <p className="text-sm font-medium text-blue-300 mb-3 tracking-wide uppercase">
            AI Medical Scribe
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Turn Consultations into
            <br />
            <span className="text-blue-400">SOAP Notes, Instantly</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            DoxScribe listens to the consultation and writes the note for you —
            transcribed, structured, and ready to review in under a minute.
            Spend the visit with your patient, not your keyboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
            <Link to="/app">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white/5 text-white border-white/15 hover:bg-white/10">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              From audio to note in three steps
            </h2>
            <p className="text-muted-foreground mt-3">
              No more late-night charting. DoxScribe handles the documentation
              while you focus on care.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="p-6 sm:p-7">
                  <div className="h-11 w-11 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="text-primary-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Built for clinicians who'd rather be clinicians
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="text-center px-2">
                  <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-600" size={22} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Ready to reclaim your time?
          </h2>
          <p className="text-slate-300 mt-3 mb-8">
            Upload your first consultation and see your SOAP note generated in
            under a minute.
          </p>
          <Link to="/app">
            <Button size="lg">
              Try DoxScribe Now
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

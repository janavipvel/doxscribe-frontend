import { Link } from "react-router-dom";
import { Mic, MessageSquare, FileSearch, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";
import { Card } from "@/components/ui/Card.jsx";

const STAGES = [
  {
    icon: Mic,
    title: "Captures the Consultation",
    description:
      "Upload a recording of the patient visit. DoxScribe accepts most common audio formats, no special equipment required.",
  },
  {
    icon: MessageSquare,
    title: "Transcribes the Dialogue",
    description:
      "Speech-to-text models built on Whisper convert the conversation into an accurate, readable transcript — capturing what was said by both doctor and patient.",
  },
  {
    icon: FileSearch,
    title: "Extracts Clinical Detail",
    description:
      "The AI identifies chief complaints, symptoms, vitals, exam findings, and diagnosis details directly from the conversation.",
  },
  {
    icon: ClipboardCheck,
    title: "Builds the SOAP Note",
    description:
      "Everything is organized into Subjective, Objective, Assessment, and Plan sections — formatted, structured, and ready for review or EHR entry.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-blue-300 mb-3 tracking-wide uppercase">
            How It Works
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From Conversation to Clinical Note
          </h1>
          <p className="text-slate-300 mt-4 leading-relaxed">
            DoxScribe turns a patient consultation into a structured, reviewable
            SOAP note — no manual charting, no templates to fill in by hand.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-5">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <Card key={stage.title} className="p-6 sm:p-7 flex items-start gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Icon className="text-primary-600" size={22} />
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-3 hidden sm:block" style={{ minHeight: "1.5rem" }} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary-600 mb-1">
                      Step {i + 1}
                    </p>
                    <h3 className="font-semibold text-foreground text-lg mb-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            See it for yourself
          </h2>
          <p className="text-muted-foreground mt-2 mb-7">
            Upload a recording and get a structured SOAP note in under a minute.
          </p>
          <Link to="/app">
            <Button size="lg">
              Get Started
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";
import { Card } from "@/components/ui/Card.jsx";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    period: "/ user / month",
    description: "For solo practitioners getting started with AI documentation.",
    features: [
      "Up to 40 consultations / month",
      "Audio transcription (all formats)",
      "Structured SOAP note generation",
      "PDF export",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/ user / month",
    description: "For clinics that need volume, speed, and reliability.",
    features: [
      "Unlimited consultations",
      "Priority transcription processing",
      "Full consultation history & search",
      "PDF export & print formatting",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For hospital systems and multi-provider practices.",
    features: [
      "Everything in Professional",
      "EHR integration",
      "Team & role management",
      "Dedicated onboarding",
      "Custom SLA & support",
    ],
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-blue-300 mb-3 tracking-wide uppercase">
            Pricing
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-300 mt-4 leading-relaxed">
            Choose the plan that fits your practice. No hidden fees, no long-term
            contracts.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "p-6 sm:p-7 flex flex-col h-full",
                  plan.highlighted && "border-primary ring-1 ring-primary shadow-md relative"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 mb-5 min-h-[2.5rem]">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/app">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "primary" : "secondary"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">
            Not sure which plan fits?
          </h2>
          <p className="text-muted-foreground mt-2 mb-7">
            Try DoxScribe with your own consultation recording — no commitment.
          </p>
          <Link to="/app">
            <Button size="lg">
              Try It Free
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

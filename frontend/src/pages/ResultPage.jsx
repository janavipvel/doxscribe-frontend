import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Printer, Plus, AlertCircle, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import SoapSection, { Field, FieldList } from "@/components/SoapSection.jsx";
import { getConsultation } from "@/services/api.js";
import { formatDate } from "@/lib/utils";

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consult, setConsult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getConsultation(id)
      .then((data) => {
        if (active) setConsult(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load consultation");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="animate-spin mb-3" size={28} />
        <p className="text-sm">Loading consultation…</p>
      </div>
    );
  }

  if (error || !consult) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="inline-flex h-12 w-12 rounded-full bg-red-50 items-center justify-center mb-4">
          <AlertCircle className="text-red-600" size={22} />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Consultation not found</h2>
        <p className="text-sm text-muted-foreground mt-1.5 mb-5">{error}</p>
        <Link to="/app">
          <Button variant="secondary">Back to Upload</Button>
        </Link>
      </div>
    );
  }

  const soap = consult.soap_note || {};
  const subjective = soap.subjective || {};
  const objective = soap.objective || {};
  const assessment = soap.assessment || {};
  const plan = soap.plan || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {consult.filename}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {formatDate(consult.created_at)} · ID: {consult.id?.slice(0, 8)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer size={16} />
            Download as PDF
          </Button>
          <Button variant="outline" onClick={() => navigate("/app")}>
            <Plus size={16} />
            New Consultation
          </Button>
        </div>
      </div>

      <div id="print-area" className="space-y-5">
        <div className="hidden print:block mb-4">
          <h1 className="text-xl font-bold">DoxScribe — Consultation Note</h1>
          <p className="text-sm text-muted-foreground">{consult.filename} · {formatDate(consult.created_at)}</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-muted-foreground" />
              <CardTitle>Transcript</CardTitle>
            </div>
            <CardDescription>Raw transcription of the consultation audio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
              {consult.transcript || "No transcript available."}
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
            SOAP Note
          </h2>
          <div className="space-y-4">
            <SoapSection letter="S" title="Subjective" color="blue">
              <Field label="Chief Complaint" value={subjective.chief_complaint} />
              <Field
                label="History of Present Illness"
                value={subjective.history_of_present_illness}
              />
              <FieldList label="Symptoms" items={subjective.symptoms} />
            </SoapSection>

            <SoapSection letter="O" title="Objective" color="emerald">
              <Field label="Vitals" value={objective.vitals} />
              <Field label="Physical Exam" value={objective.physical_exam} />
              <Field label="Observations" value={objective.observations} />
            </SoapSection>

            <SoapSection letter="A" title="Assessment" color="amber">
              <Field label="Diagnosis" value={assessment.diagnosis} />
              <FieldList
                label="Differential Diagnosis"
                items={assessment.differential_diagnosis}
              />
            </SoapSection>

            <SoapSection letter="P" title="Plan" color="violet">
              <FieldList label="Medications" items={plan.medications} />
              <FieldList label="Tests Ordered" items={plan.tests_ordered} />
              <Field label="Follow-up" value={plan.follow_up} />
              <Field label="Patient Instructions" value={plan.patient_instructions} />
            </SoapSection>
          </div>
        </div>
      </div>
    </div>
  );
}

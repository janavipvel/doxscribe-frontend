import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Sparkles } from "lucide-react";
import FileDropzone from "@/components/FileDropzone.jsx";
import ProcessingOverlay from "@/components/ProcessingOverlay.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card.jsx";
import { createConsultation } from "@/services/api.js";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!file) return;
    setError("");
    setIsProcessing(true);
    try {
      const result = await createConsultation(file);
      navigate(`/app/consult/${result.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong while processing the recording.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-4">
          <Sparkles size={12} />
          AI-Powered Clinical Documentation
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
          New Consultation
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Upload an audio recording of the patient consultation. We'll transcribe it
          and generate a structured SOAP note automatically.
        </p>
      </div>

      {isProcessing ? (
        <ProcessingOverlay />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Upload recording</CardTitle>
            <CardDescription>
              Accepted formats: MP3, WAV, M4A, WEBM, OGG, MP4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileDropzone file={file} onFileSelect={setFile} disabled={isProcessing} />

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              className="w-full mt-5"
              size="lg"
              disabled={!file}
              onClick={handleGenerate}
            >
              Generate SOAP Note
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Processing typically takes 30–60 seconds depending on recording length.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

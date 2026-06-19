import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileAudio, X } from "lucide-react";
import { formatBytes, cn } from "@/lib/utils";

const ACCEPTED_TYPES = [".mp3", ".wav", ".m4a", ".webm", ".ogg", ".mp4"];

export default function FileDropzone({ file, onFileSelect, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateAndSet = useCallback(
    (selected) => {
      if (!selected) return;
      const ext = "." + selected.name.split(".").pop().toLowerCase();
      if (!ACCEPTED_TYPES.includes(ext)) {
        setError(`Unsupported format. Use: ${ACCEPTED_TYPES.join(", ")}`);
        return;
      }
      setError("");
      onFileSelect(selected);
    },
    [onFileSelect]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0];
    validateAndSet(dropped);
  };

  const handleChange = (e) => {
    const selected = e.target.files?.[0];
    validateAndSet(selected);
  };

  if (file) {
    return (
      <div className="rounded-lg border border-border bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-md bg-primary-50 flex items-center justify-center flex-shrink-0">
            <FileAudio className="text-primary-600" size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
        </div>
        {!disabled && (
          <button
            onClick={() => onFileSelect(null)}
            className="flex-shrink-0 h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "rounded-lg border-2 border-dashed cursor-pointer transition-colors px-6 py-12 flex flex-col items-center justify-center text-center",
          isDragging
            ? "border-primary bg-primary-50"
            : "border-border bg-white hover:border-primary-600/50 hover:bg-slate-50"
        )}
      >
        <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-3">
          <UploadCloud className="text-primary-600" size={24} />
        </div>
        <p className="text-sm font-medium text-foreground">
          Drag and drop an audio file, or{" "}
          <span className="text-primary-600 underline">browse</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1.5">
          Supports MP3, WAV, M4A, WEBM, OGG, MP4
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}

const BASE_URL = "http://localhost:8000";

export async function createConsultation(audioFile) {
  const formData = new FormData();
  formData.append("file", audioFile);
  const response = await fetch(`${BASE_URL}/consult`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to create consultation");
  }
  return response.json();
}

export async function getConsultation(id) {
  const response = await fetch(`${BASE_URL}/consult/${id}`);
  if (!response.ok) throw new Error("Consultation not found");
  return response.json();
}

export async function getAllConsultations() {
  const response = await fetch(`${BASE_URL}/consults`);
  if (!response.ok) throw new Error("Failed to fetch consultations");
  return response.json();
}

export async function checkHealth() {
  const response = await fetch(`${BASE_URL}/health`);
  if (!response.ok) throw new Error("Service unavailable");
  return response.json();
}

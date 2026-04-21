const API = "http://localhost:3001/api";

export async function fetchHealth() {
  const r = await fetch(`${API}/health`);
  return r.json();
}

export async function fetchFiles() {
  const r = await fetch(`${API}/files`);
  return r.json();
}

export async function uploadFilesRequest(form: FormData) {
  const r = await fetch(`${API}/upload`, {
    method: "POST",
    body: form,
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error);
  return d;
}

export async function deleteFile(id: string) {
  await fetch(`${API}/files/${id}`, {
    method: "DELETE",
  });
}

export async function searchRequest(query: string) {
  const r = await fetch(`${API}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, size: 10 }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error);
  return d;
}

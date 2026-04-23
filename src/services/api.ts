import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:5000/logs";

const client = axios.create({
  baseURL: API_BASE_URL,
})

export interface HealthStatus {
  documents: number;
  status: "yellow" | "green";
}

export async function fetchHealth(): Promise<HealthStatus> {
  const { data } = await client.get<HealthStatus>("/health");

  return data;
}

export interface FileData {
    filename: string;
    line_count: number;
    uploaded_at: Date;
}

export async function fetchFiles(): Promise<{ files: FileData[] }> {
  const { data } = await client.get<{ files: FileData[] }>("/files");
  return data;
}

interface UploadResponse {
  success: boolean;
  files: {
    action: "indexed",
    filename: string;
    lineCount: number;
  }[]
}

export async function uploadFilesRequest(form: FormData): Promise<UploadResponse> {
  const r = await client.post("/upload", {
    files: form.get("files"),
  }, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });  

  console.log(r.data);
  

  return r.data;
}

export async function deleteFile(id: string) {
  await client.delete(`/files/${id}`);
}

export async function searchRequest(query: string) {
  const r = await client.post("/search", { query, size: 10 });
  return r.data;
}

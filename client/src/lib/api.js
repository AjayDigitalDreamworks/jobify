import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function getAuthConfig() {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}

export async function getFrontendData() {
  const { data } = await api.get("/frontend");
  return data.data;
}

export async function getJobs() {
  const { data } = await api.get("/jobs");
  return data.jobs || [];
}

export async function getJobDetail(jobId) {
  const { data } = await api.get(`/jobs/${jobId}`);
  return data.job;
}

export async function closeJob(jobId) {
  const { data } = await api.patch(`/jobs/${jobId}/close`, {}, getAuthConfig());
  return data.job;
}

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = window.localStorage.getItem("refreshToken");

      if (!refreshToken || originalRequest.url.includes("/auth/")) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        window.localStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth_logout"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ----------------- HEALTH & BOOTSTRAP -----------------
export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}

export async function getFrontendData() {
  const { data } = await api.get("/frontend");
  return data.data;
}

// ----------------- AUTHENTICATION -----------------
export async function loginUser(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  if (data.accessToken) {
    window.localStorage.setItem("accessToken", data.accessToken);
    window.localStorage.setItem("refreshToken", data.refreshToken);
    window.localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth_change"));
  }
  return data;
}

export async function registerUser({ name, email, password, role = "jobSeeker" }) {
  const { data } = await api.post("/auth/register", { name, email, password, role });
  if (data.accessToken) {
    window.localStorage.setItem("accessToken", data.accessToken);
    window.localStorage.setItem("refreshToken", data.refreshToken);
    window.localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth_change"));
  }
  return data;
}

export async function logoutUser() {
  const refreshToken = window.localStorage.getItem("refreshToken");
  try {
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } catch (e) {
    // Ignore network errors on logout
  } finally {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth_change"));
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get("/auth/me");
    if (data.user) {
      window.localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data.user;
  } catch (error) {
    return null;
  }
}

export function getStoredUser() {
  try {
    const userStr = window.localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

// ----------------- DASHBOARD APIS -----------------
export async function getSeekerDashboard() {
  const { data } = await api.get("/dashboard/seeker");
  return data.data;
}

export async function getRecruiterDashboard() {
  const { data } = await api.get("/dashboard/recruiter");
  return data.data;
}

export async function getRecruiterApplicants({ jobId, status, sortBy = "match_desc", search = "" } = {}) {
  const params = new URLSearchParams();
  if (jobId) params.append("jobId", jobId);
  if (status && status !== "all") params.append("status", status);
  if (sortBy) params.append("sortBy", sortBy);
  if (search) params.append("search", search);

  const { data } = await api.get(`/dashboard/recruiter/applicants?${params.toString()}`);
  return data.candidates || [];
}

// ----------------- APPLICATIONS -----------------
export async function getMyApplications() {
  const { data } = await api.get("/applications/my");
  return data.applications || [];
}

export async function applyForJob(jobId, applicationData = {}) {
  const { data } = await api.post(`/applications/apply/${jobId}`, applicationData);
  return data.application;
}

export async function updateApplicationStatus(applicationId, status) {
  const { data } = await api.patch(`/applications/${applicationId}/status`, { status });
  return data.application;
}

export async function withdrawApplication(applicationId) {
  const { data } = await api.delete(`/applications/${applicationId}`);
  return data.application;
}

// ----------------- JOBS -----------------
export async function getJobs(params = {}) {
  const { data } = await api.get("/jobs", { params });
  return data.jobs || [];
}

export async function getJobDetail(jobId) {
  const { data } = await api.get(`/jobs/${jobId}`);
  return data.job;
}

export async function getMyJobs() {
  const { data } = await api.get("/jobs/my-jobs");
  return data.jobs || [];
}

export async function createJob(jobData) {
  const { data } = await api.post("/jobs", jobData);
  return data.job;
}

export async function closeJob(jobId) {
  const { data } = await api.patch(`/jobs/${jobId}/close`);
  return data.job;
}

export async function getRecruiterInsights() {
  const { data } = await api.get("/jobs/insights");
  return data.insights || [];
}

// ----------------- PROFILE & AI -----------------
export async function getJobRecommendations(limit = 10) {
  const { data } = await api.get(`/profile/recommendations?limit=${limit}`);
  return data.recommendations || [];
}

export async function getProfileScore() {
  const { data } = await api.get("/profile/score");
  return data.score;
}

export async function getMyProfile() {
  const { data } = await api.get("/profile/me");
  return data.profile;
}

export default api;

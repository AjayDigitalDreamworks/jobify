import { useEffect, useMemo, useState } from "react";
import ApplicationsTracker from "../pages/ApplicationsTracker";
import JobifyDashboard from "../pages/Dashboard";
import JobDetails from "../pages/JobDetails";
import JobListings from "../pages/JobListings";
import JobifyMessages from "../pages/Messages";
import NetworkPage from "../pages/Network";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import ResumeAnalyzer from "../pages/ResumeAnalyser";
import { getFrontendData, getHealth, getJobDetail, getJobs } from "./lib/api";
import { getRouteFromHash, navigateTo, ROUTES } from "./lib/navigation";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [route, setRoute] = useState(getRouteFromHash());
  const [bootstrapData, setBootstrapData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [health, frontendData, jobsData] = await Promise.all([
          getHealth(),
          getFrontendData(),
          getJobs(),
        ]);

        setBackendStatus(health?.status || "Backend connected");
        setBootstrapData(frontendData);
        setJobs(jobsData);
      } catch (requestError) {
        setBackendStatus("Backend not connected");
        setError("Unable to load backend data. Please make sure the API is running.");
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadJobPage() {
      if (!route.startsWith("/jobs/")) {
        setJobDetail(null);
        return;
      }

      const jobId = route.split("/")[2];

      try {
        setRouteLoading(true);
        const data = await getJobDetail(jobId);
        setJobDetail(data);
      } catch (requestError) {
        setError("Unable to load this job right now.");
      } finally {
        setRouteLoading(false);
      }
    }

    loadJobPage();
  }, [route]);

  const currentPage = useMemo(() => {
    if (route.startsWith("/jobs/")) {
      return "job-details";
    }

    switch (route) {
      case ROUTES.jobs:
        return "jobs";
      case ROUTES.applications:
        return "applications";
      case ROUTES.network:
        return "network";
      case ROUTES.messages:
        return "messages";
      case ROUTES.recruiter:
        return "recruiter";
      case ROUTES.resumeAnalyzer:
        return "resume";
      case ROUTES.dashboard:
      default:
        return "dashboard";
    }
  }, [route]);

  const commonPageProps = {
    backendStatus,
    onNavigate: navigateTo,
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-4">Jobify</p>
          <h1 className="text-3xl font-bold mb-3">Syncing frontend with backend</h1>
          <p className="text-gray-300">Loading application data and page connections from the API.</p>
        </div>
      </main>
    );
  }

  if (error && !bootstrapData) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <div className="max-w-lg bg-white/5 border border-white/10 rounded-3xl p-8">
          <h1 className="text-2xl font-bold mb-3">Backend connection required</h1>
          <p className="text-gray-300 mb-2">{error}</p>
          <p className="text-sm text-gray-400">Expected API base URL: {import.meta.env.VITE_API_URL}</p>
        </div>
      </main>
    );
  }

  switch (currentPage) {
    case "jobs":
      return <JobListings {...commonPageProps} data={{ ...bootstrapData?.jobListings, jobs }} />;
    case "job-details":
      return <JobDetails {...commonPageProps} data={jobDetail} loading={routeLoading} />;
    case "applications":
      return <ApplicationsTracker {...commonPageProps} data={bootstrapData?.applications} />;
    case "network":
      return <NetworkPage {...commonPageProps} data={bootstrapData?.network} />;
    case "messages":
      return <JobifyMessages {...commonPageProps} data={bootstrapData?.messages} />;
    case "recruiter":
      return <RecruiterDashboard {...commonPageProps} data={bootstrapData?.recruiter} />;
    case "resume":
      return <ResumeAnalyzer {...commonPageProps} data={bootstrapData?.resumeAnalyzer} />;
    case "dashboard":
    default:
      return <JobifyDashboard {...commonPageProps} data={bootstrapData?.dashboard} />;
  }
}

export default App;

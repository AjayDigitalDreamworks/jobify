export const ROUTES = {
  dashboard: "/dashboard",
  jobs: "/jobs",
  applications: "/applications",
  network: "/network",
  messages: "/messages",
  recruiter: "/recruiter",
  resumeAnalyzer: "/resume-analyzer",
};

export const LABEL_TO_ROUTE = {
  Dashboard: ROUTES.dashboard,
  Jobs: ROUTES.jobs,
  Applications: ROUTES.applications,
  Network: ROUTES.network,
  Messages: ROUTES.messages,
  "Resume Analyzer": ROUTES.resumeAnalyzer,
};

export function getRouteForLabel(label) {
  return LABEL_TO_ROUTE[label];
}

export function getRouteFromHash() {
  const hashRoute = window.location.hash.replace(/^#/, "");
  return hashRoute || ROUTES.dashboard;
}

export function navigateTo(route) {
  window.location.hash = route;
}

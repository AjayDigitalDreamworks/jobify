import { useState } from "react";
import { getRouteForLabel, ROUTES } from "../src/lib/navigation";

const navItems = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Jobs", icon: "💼" },
  { label: "Applications", icon: "✓" },
  { label: "Network", icon: "👤" },
  { label: "Messages", icon: "✉" },
  { label: "Resume Analyzer", icon: "⊙" },
  { label: "Skill Gap", icon: "↗" },
  { label: "Settings", icon: "⚙" },
];

const defaultTabs = [
  { label: "Applied", count: 12 },
  { label: "Shortlisted", count: 4 },
  { label: "Interviewing", count: 2 },
  { label: "Rejected", count: 8 },
];

const defaultApplications = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "Stripe",
    location: "Remote",
    status: "Interviewing",
    updated: "2 hours ago",
    logoBg: "bg-blue-100",
    logoColor: "text-blue-600",
    logoIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 5h18v2H3V5zm0 4h18v2H3V9zm0 4h12v2H3v-2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Product Lead",
    company: "Figma",
    location: "San Francisco",
    status: "Shortlisted",
    updated: "Yesterday",
    logoBg: "bg-green-100",
    logoColor: "text-green-600",
    logoIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Vercel",
    location: "Hybrid",
    status: "Applied",
    updated: "3 days ago",
    logoBg: "bg-gray-100",
    logoColor: "text-gray-700",
    logoIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L1 21h22L12 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Cloud Architect",
    company: "Snowflake",
    location: "Remote",
    status: "Rejected",
    updated: "1 week ago",
    logoBg: "bg-red-100",
    logoColor: "text-red-500",
    logoIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5z" />
      </svg>
    ),
  },
];

const statusStyles = {
  Interviewing: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Shortlisted: "bg-blue-100 text-blue-700 border border-blue-200",
  Applied: "bg-gray-100 text-gray-600 border border-gray-200",
  Rejected: "bg-red-100 text-red-600 border border-red-200",
};

const defaultRecentActivity = [
  {
    icon: "✉",
    iconBg: "bg-purple-600",
    iconColor: "text-white",
    title: "Interview Invite",
    desc: "Stripe sent a calendar invite for Technical Round 1.",
    time: "TODAY, 10:45 AM",
    timeColor: "text-purple-600",
  },
  {
    icon: "👍",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Application Shortlisted",
    desc: "Your profile matches 94% of Figma's requirements.",
    time: "YESTERDAY, 4:20 PM",
    timeColor: "text-blue-500",
  },
  {
    icon: "✓",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-500",
    title: "Application Submitted",
    desc: "Successfully applied for Full Stack Engineer at Vercel.",
    time: "OCT 24, 2023",
    timeColor: "text-gray-400",
  },
];

export default function ApplicationsTracker({ data = {}, onNavigate = () => {} }) {
  const [activeNav, setActiveNav] = useState("Applications");
  const [activeTab, setActiveTab] = useState("Applied");
  const tabs = data.tabs || defaultTabs;
  const applications = data.applications || defaultApplications;
  const recentActivity = data.recentActivity || defaultRecentActivity;

  const handleNavClick = (label) => {
    setActiveNav(label);
    const route = getRouteForLabel(label);
    if (route) {
      onNavigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-50">
        <div className="text-purple-600 font-extrabold text-xl tracking-tight mr-4">Jobify</div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-56 md:w-72">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search applications..."
            className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
          />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
              <img src="https://i.pravatar.cc/40?img=12" alt="Alex" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Alex Chen</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 min-h-screen sticky top-[57px] h-[calc(100vh-57px)]">
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="text-purple-600 font-bold text-sm">Jobify AI</div>
            <div className="text-gray-400 text-xs mt-0.5">Premium Career Concierge</div>
          </div>
          <nav className="flex-1 py-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors text-left ${
                  activeNav === item.label
                    ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Applications</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and track your active job pursuits</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="border border-gray-200 bg-white text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                Export Report
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm" onClick={() => onNavigate(ROUTES.jobs)}>
                Find New Jobs
              </button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left: Table + Stats */}
            <div className="flex-1 min-w-0">
              {/* Tabs */}
              <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-5 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === tab.label
                        ? "bg-white text-purple-700 shadow-sm border border-gray-100"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.label
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Applications Table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
                  <div className="col-span-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Company & Role</div>
                  <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</div>
                  <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Updated</div>
                  <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-50">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      {/* Company & Role */}
                      <div className="col-span-5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${app.logoBg} ${app.logoColor} flex items-center justify-center shrink-0`}>
                          {app.logoIcon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 leading-tight">{app.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{app.company} • {app.location}</div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-3">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[app.status]}`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Updated */}
                      <div className="col-span-2 text-sm text-gray-500">{app.updated}</div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Average Response */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Average Response</div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-gray-900">4.2 Days</span>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Interview Rate */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Interview Rate</div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-gray-900">18.5%</span>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Profile Views */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Profile Views</div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-gray-900">1,402</span>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full xl:w-72 shrink-0 space-y-5">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Recent Activity</h3>
                  <button className="text-xs font-bold text-purple-600 hover:underline uppercase tracking-wide">Full Log</button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-9 h-9 rounded-full ${act.iconBg} ${act.iconColor} flex items-center justify-center text-sm shrink-0 mt-0.5`}>
                        {act.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-900">{act.title}</div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{act.desc}</p>
                        <div className={`text-xs font-bold mt-1 ${act.timeColor}`}>{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Coach Insight */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-purple-500 text-base">✦</span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">AI Coach Insight</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Based on your Stripe application status, you should brush up on{" "}
                  <span className="font-bold text-gray-900">System Design for Scalability</span>. We've updated your learning path.
                </p>
                <button className="w-full border border-purple-200 text-purple-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                  Prepare for Stripe Interview
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors z-50">
        +
      </button>
    </div>
  );
}

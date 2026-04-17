import { useState } from "react";

function Icon({ name, className = "w-5 h-5" }) {
  const icons = {
    sparkle: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
      </svg>
    ),
    grid: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
      </svg>
    ),
    briefcase: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeWidth="2" />
      </svg>
    ),
    "check-square": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2" />
        <circle cx="9" cy="7" r="4" strokeWidth="2" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeWidth="2" />
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" />
        <polyline points="22,6 12,13 2,6" strokeWidth="2" />
      </svg>
    ),
    "settings-gear": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2" />
      </svg>
    ),
    "trending-up": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeWidth="2" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chat: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    export: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
      </svg>
    ),
    "more-horizontal": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    "map-pin": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" />
        <circle cx="12" cy="10" r="3" strokeWidth="2" />
      </svg>
    ),
    "dollar-sign": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bookmark: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "arrow-right": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
        <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "badge-check": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "trending-up-small": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    minus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    logout: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="16 17 21 12 16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[name] || null;
}

const sidebarNav = [
  { icon: "grid", label: "Dashboard", active: true },
  { icon: "briefcase", label: "Jobs" },
  { icon: "check-square", label: "Applications" },
  { icon: "users", label: "Network" },
  { icon: "mail", label: "Messages" },
];

const sidebarAI = [
  { icon: "settings-gear", label: "Resume Analyzer" },
  { icon: "trending-up", label: "Skill Gap" },
  { icon: "settings", label: "Settings" },
];

const stats = [
  {
    label: "ACTIVE JOB POSTS",
    value: "12",
    sub: "+2 this week",
    subIcon: "trending-up-small",
    subColor: "text-green-500",
    icon: (
      <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="12" x2="12" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "TOTAL APPLICANTS",
    value: "1,284",
    sub: "85 new matches",
    subIcon: "zap",
    subColor: "text-indigo-500",
    icon: (
      <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "HIRING RATE",
    value: "18.4%",
    sub: "+1.2% vs avg",
    subIcon: "trending-up-small",
    subColor: "text-green-500",
    icon: (
      <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "AVG. TIME TO FILL",
    value: "22d",
    sub: "Steady pace",
    subIcon: "minus",
    subColor: "text-gray-400",
    icon: (
      <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const candidates = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Senior UX Designer",
    exp: "8 yrs exp",
    score: 98,
    tags: ["Figma Expert", "Design Systems", "Stakeholder Mgmt"],
    extraTag: "+2 Critical Skills Match",
    location: "Austin, TX (Remote)",
    salary: "$145k - $160k",
    avatar: "SJ",
    avatarBg: "bg-teal-600",
    online: true,
  },
  {
    id: 2,
    name: "David Miller",
    title: "Lead Data Scientist",
    exp: "12 yrs exp",
    score: 94,
    tags: ["Python", "PyTorch", "Team Leadership"],
    extraTag: null,
    location: "New York, NY",
    salary: "$180k - $210k",
    avatar: "DM",
    avatarBg: "bg-slate-600",
    online: false,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Product Manager",
    exp: "5 yrs exp",
    score: 89,
    tags: ["Agile", "Roadmapping"],
    extraTag: null,
    location: "San Francisco, CA",
    salary: "$155k - $175k",
    avatar: "ER",
    avatarBg: "bg-blue-700",
    online: false,
  },
];

const chartBars = [
  { day: "MON", height: 40 },
  { day: "TUE", height: 55 },
  { day: "WED", height: 65 },
  { day: "THU", height: 75 },
  { day: "FRI", height: 100 },
  { day: "SAT", height: 60 },
  { day: "SUN", height: 50 },
];

const pipeline = [
  { label: "Applied", count: 842, pct: 100 },
  { label: "Phone Screen", count: 124, pct: 50 },
  { label: "On-site Interview", count: 42, pct: 28 },
  { label: "Offers Extended", count: 12, pct: 10 },
];

export default function RecruiterDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 lg:z-auto
          w-52 bg-white border-r border-gray-100 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Icon name="sparkle" className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-none">Jobify AI</div>
              <div className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5">Recruiter Mode</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {sidebarNav.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${item.active
                  ? "text-indigo-600 border-l-2 border-indigo-600 bg-indigo-50 rounded-l-none"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              <Icon name={item.icon} className="w-[18px] h-[18px] flex-shrink-0" />
              {item.label}
            </button>
          ))}

          {/* AI Intelligence section */}
          <div className="pt-5 pb-2 px-3">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">AI Intelligence</span>
          </div>
          {sidebarAI.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
            >
              <Icon name={item.icon} className="w-[18px] h-[18px] flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            MC
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">Marcus Chen</div>
            <div className="text-[10px] text-gray-400">Premium Career Concierge</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-3 flex-shrink-0">
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 relative max-w-sm">
            <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidates, jobs, or analytics..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
              <Icon name="bell" className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
              <Icon name="chat" className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
              <Icon name="plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Post a Job</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Welcome back, Marcus. Your AI matches are ready for review.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition bg-white">
                  <Icon name="export" className="w-4 h-4" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition bg-white">
                  <Icon name="calendar" className="w-4 h-4" />
                  Last 30 Days
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-100 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-2">{stat.label}</div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${stat.subColor}`}>
                      <Icon name={stat.subIcon} className="w-3 h-3" />
                      {stat.sub}
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-30">{stat.icon}</div>
                </div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
              {/* Left: Candidates */}
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-gray-900">Top AI-Ranked Candidates</h2>
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Live Rank
                    </span>
                  </div>
                  <button className="text-sm text-indigo-600 font-medium hover:underline hidden sm:block">
                    View All Applications
                  </button>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-4">
                  {candidates.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5">
                      {/* Top row */}
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full ${c.avatarBg} flex items-center justify-center text-white text-sm font-bold`}>
                            {c.avatar}
                          </div>
                          {c.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-base font-bold text-gray-900">{c.name}</div>
                              <div className="text-sm text-gray-500">{c.title} • {c.exp}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-lg font-bold text-indigo-600">+: {c.score}%</div>
                              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Match Score</div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {c.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                {tag}
                              </span>
                            ))}
                            {c.extraTag && (
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full">
                                {c.extraTag}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 gap-3">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Icon name="map-pin" className="w-3.5 h-3.5 text-gray-400" />
                            {c.location}
                          </span>
                          <span className="flex items-center gap-1.5 hidden sm:flex">
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2" />
                              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeWidth="2" />
                            </svg>
                            {c.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            <Icon name="bookmark" className="w-4 h-4" />
                          </button>
                          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition">
                            Review Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-5">
                {/* Application Flow Chart */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Application Flow</div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Icon name="more-horizontal" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bar Chart */}
                  <div className="flex items-end gap-1.5 h-28 mb-3">
                    {chartBars.map((bar) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t-sm transition-all ${bar.day === "FRI" ? "bg-indigo-600" : "bg-indigo-200"}`}
                          style={{ height: `${bar.height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {chartBars.map((bar) => (
                      <div key={bar.day} className="flex-1 text-center">
                        <span className="text-[9px] text-gray-400 font-medium">{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Peak Performance</div>
                      <div className="text-base font-bold text-gray-900 mt-1">Friday</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Growth</div>
                      <div className="text-base font-bold text-green-500 mt-1">+24%</div>
                    </div>
                  </div>
                </div>

                {/* Hiring Pipeline */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Hiring Pipeline</div>
                  <div className="space-y-4">
                    {pipeline.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                          <span className="text-sm font-bold text-gray-900">{item.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Smart Insights */}
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                      <Icon name="sparkle" className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-800 uppercase tracking-widest">AI Smart Insights</div>
                    <div className="ml-auto">
                      <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Candidates with{" "}
                    <span className="font-bold text-gray-900">Design System</span>{" "}
                    experience are currently seeing 40% higher retention in your department.
                  </p>
                  <button className="flex items-center gap-1 mt-3 text-sm text-indigo-600 font-medium hover:underline">
                    Review AI Analysis
                    <Icon name="arrow-right" className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
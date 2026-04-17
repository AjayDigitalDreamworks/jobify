import { useState } from "react";
import { getRouteForLabel, ROUTES } from "../src/lib/navigation";

const navItems = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Jobs", icon: "💼" },
  { label: "Applications", icon: "✓" },
  { label: "Resume Analyzer", icon: "⊙" },
  { label: "Skill Gap", icon: "↗" },
  { label: "Settings", icon: "⚙" },
];

const defaultSkills = [
  { name: "Product Strategy", score: 98, color: "border-gray-300 text-gray-700" },
  { name: "UX Research", score: 85, color: "border-gray-300 text-gray-700" },
  { name: "Figma Mastery", score: 92, color: "border-purple-400 text-purple-700 bg-purple-50" },
  { name: "Data Analytics", score: 64, color: "border-gray-300 text-gray-700" },
  { name: "Stakeholder Management", score: 77, color: "border-gray-300 text-gray-700" },
  { name: "React Native", score: 42, color: "border-gray-300 text-gray-700" },
];

const scoreColor = (score) => {
  if (score >= 90) return "bg-purple-600 text-white";
  if (score >= 75) return "bg-blue-500 text-white";
  if (score >= 60) return "bg-yellow-500 text-white";
  return "bg-red-400 text-white";
};

const defaultImprovements = [
  {
    icon: "✕",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    title: "Quantify Impact",
    desc: 'Your experience at Google lacks metrics. Add data like "Reduced churn by 12% through redesigned onboarding."',
  },
  {
    icon: "⚡",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    title: "Keyword Density",
    desc: '"Systems Thinking" is a key requirement for this role but only appears once in your summary.',
  },
  {
    icon: "✏",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "Formatting Alert",
    desc: "Our ATS parser struggled with your sidebar layout. Consider a linear single-column format.",
  },
];

export default function ResumeAnalyzer({ data = {}, onNavigate = () => {} }) {
  const [activeNav, setActiveNav] = useState("Resume Analyzer");
  const [activeSkillTab, setActiveSkillTab] = useState("Core Skills");
  const [dragging, setDragging] = useState(false);
  const skills = data.skills || defaultSkills;
  const improvements = data.improvements || defaultImprovements;
  const savedJobs = data.savedJobs || ["Senior Product Designer @ Meta"];
  const [savedJob, setSavedJob] = useState(savedJobs[0]);

  const handleNavClick = (label) => {
    setActiveNav(label);
    const route = getRouteForLabel(label);
    if (route) {
      onNavigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-50">
        <div className="text-purple-600 font-extrabold text-xl tracking-tight mr-2">Jobify</div>
        <nav className="hidden md:flex items-center gap-6 mr-4">
          {["Home", "Resume Analyzer", "Jobs"].map((item) => (
            <button
              key={item}
              className={`text-sm font-medium transition-colors ${
                item === "Resume Analyzer"
                  ? "text-purple-600 font-semibold border-b-2 border-purple-600 pb-0.5"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-48">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search insights..." className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400" />
          </div>
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
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
            <img src="https://i.pravatar.cc/40?img=12" alt="Alex" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 min-h-screen sticky top-[57px] h-[calc(100vh-57px)]">
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="text-gray-400 text-xs uppercase tracking-widest">Premium Career Concierge</div>
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
        <div className="flex-1 flex flex-col lg:flex-row gap-0">
          {/* Center */}
          <main className="flex-1 p-4 md:p-8 max-w-3xl">
            {/* Page Title */}
            <div className="mb-7">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Resume Analyzer</h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Leverage neural-network analysis to optimize your professional narrative and close the gap between your experience and your dream role.
              </p>
            </div>

            {/* Upload Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className={`border-2 border-dashed rounded-2xl py-14 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  dragging ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Drag & drop your resume</h3>
                <p className="text-sm text-gray-400 mb-5">PDF, DOCX, or RTF supported (Max 5MB)</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-colors">
                  Browse Files
                </button>
              </div>
            </div>

            {/* Target Job Matching */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 text-lg">⊙</span>
                  <h2 className="font-bold text-gray-900 text-base">Target Job Matching</h2>
                </div>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  AI Enabled
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Saved Job</label>
                  <div className="relative">
                    <select
                      value={savedJob}
                      onChange={(e) => setSavedJob(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium outline-none cursor-pointer focus:border-purple-400 transition-colors"
                    >
                      {savedJobs.map((job) => (
                        <option key={job}>{job}</option>
                      ))}
                    </select>
                    <svg className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Or Paste URL</label>
                  <input
                    type="text"
                    placeholder="LinkedIn or Greenhouse link..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 outline-none focus:border-purple-400 transition-colors placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Skill Extraction & Density */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 text-base">Skill Extraction & Density</h2>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  {["Core Skills", "Tools"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSkillTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                        activeSkillTab === tab
                          ? "bg-white text-gray-800 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 ${skill.color}`}
                  >
                    <span className="text-sm font-semibold">{skill.name}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${scoreColor(skill.score)}`}>
                      {skill.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate AI Resume Banner */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base">Generate AI Resume Tailored to Meta</h3>
                <p className="text-sm text-gray-500 mt-0.5">We'll rewrite your bullet points to match the job description perfectly.</p>
              </div>
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0" onClick={() => onNavigate(ROUTES.jobs)}>
                Start AI Rewrite
              </button>
            </div>
          </main>

          {/* Right Panel */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 p-4 md:p-6 space-y-5">
            {/* Match Score Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              {/* Circle */}
              <div className="flex justify-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#7c3aed" strokeWidth="3"
                      strokeDasharray="82 18"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-gray-900">82%</span>
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Match Score</span>
                  </div>
                </div>
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg mb-2">High Potential Match</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your profile strongly aligns with the Senior Product Designer role, but some technical gaps exist in AI implementation.
              </p>
            </div>

            {/* AI Improvement Plan */}
            <div className="bg-white rounded-2xl p-5 border-2 border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-purple-500">✦</span>
                <h3 className="font-bold text-gray-900 text-sm">AI Improvement Plan</h3>
              </div>
              <div className="space-y-4 mb-5">
                {improvements.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-7 h-7 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Robot Icon */}
              <div className="flex justify-end mb-3">
                <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Apply Auto-Fixes
              </button>
            </div>

            {/* See How You Rank Globally */}
            <div className="relative rounded-2xl overflow-hidden h-36 cursor-pointer group shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-gray-800 to-gray-900" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-white text-base leading-tight">See How You Rank Globally</h3>
                <p className="text-xs text-gray-300 uppercase tracking-widest font-semibold mt-1">Benchmark Against 1.2K Applicants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

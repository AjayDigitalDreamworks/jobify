import { useState } from "react";
import { getRouteForLabel } from "../src/lib/navigation";

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

const defaultJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Stripe",
    location: "San Francisco, CA (Remote)",
    match: 98,
    posted: "2 hours ago",
    skills: ["Figma", "Design Systems", "React", "+2 more"],
    salary: "$160k - $210k",
    logo: "S",
    logoBg: "bg-gray-900",
  },
  {
    id: 2,
    title: "Full Stack Engineer (AI Team)",
    company: "Spotify",
    location: "Stockholm, SE (Hybrid)",
    match: 92,
    posted: "5 hours ago",
    skills: ["Python", "PyTorch", "TypeScript", "Next.js"],
    salary: "$140k - $185k",
    logo: "S",
    logoBg: "bg-green-600",
  },
  {
    id: 3,
    title: "Cybersecurity Analyst",
    company: "Mastercard",
    location: "New York, NY (On-site)",
    match: 84,
    posted: "1 day ago",
    skills: ["Security Audits", "Network Sec", "Compliance"],
    salary: "$125k - $155k",
    logo: "M",
    logoBg: "bg-orange-500",
  },
];

const preferredSkills = ["React", "Python", "UI Design", "DevOps"];

export default function JobListings({ data = {}, onNavigate = () => {} }) {
  const [activeNav, setActiveNav] = useState("Jobs");
  const [jobType, setJobType] = useState(["Remote Only"]);
  const [salaryRange, setSalaryRange] = useState(50);
  const [savedJobs, setSavedJobs] = useState([]);
  const [skills, setSkills] = useState(data.preferredSkills || preferredSkills);
  const [sortBy, setSortBy] = useState("Best Match");
  const jobs = data.jobs || defaultJobs;

  const handleNavClick = (label) => {
    setActiveNav(label);
    const route = getRouteForLabel(label);
    if (route) {
      onNavigate(route);
    }
  };

  const toggleJobType = (type) => {
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleSaved = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const salaryDisplay = () => {
    const min = Math.round(5 + (salaryRange / 100) * 20);
    return `$${min}k`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-50">
        <div className="flex-1 max-w-lg">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for jobs, roles, or skills..."
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
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
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Nav */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 min-h-screen sticky top-[57px] h-[calc(100vh-57px)]">
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="text-purple-600 font-bold text-base">Jobify AI</div>
            <div className="text-gray-400 text-xs mt-0.5 uppercase tracking-widest">Premium Career Concierge</div>
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

        {/* Filters Panel */}
        <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <div className="p-5 flex-1">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Filters</span>
              <button
                onClick={() => { setJobType([]); setSalaryRange(50); }}
                className="text-xs text-purple-600 font-semibold hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="City or Remote"
                  className="bg-transparent text-sm text-gray-500 outline-none w-full placeholder-gray-400"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Job Type</div>
              <div className="space-y-2.5">
                {["Remote Only", "Hybrid", "On-site"].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleJobType(type)}
                      className={`w-4.5 h-4.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                        jobType.includes(type)
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-300 group-hover:border-purple-400"
                      }`}
                    >
                      {jobType.includes(type) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Salary Range (Monthly)</div>
              <input
                type="range"
                min="0"
                max="100"
                value={salaryRange}
                onChange={(e) => setSalaryRange(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
                <span>$5k</span>
                <span>$25k+</span>
              </div>
            </div>

            {/* Preferred Skills */}
            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Preferred Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSkills((prev) => prev.filter((s) => s !== skill))}
                    className="px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-red-300 hover:text-red-500 transition-colors"
                  >
                    {skill}
                  </button>
                ))}
                <button className="px-3 py-1 rounded-full border border-dashed border-gray-300 text-xs font-medium text-gray-400 hover:border-purple-400 hover:text-purple-500 transition-colors">
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* AI Concierge */}
          <div className="m-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-purple-300 text-sm">✦</span>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-200">AI Concierge</span>
            </div>
            <p className="text-sm text-purple-100 leading-relaxed mb-3">
              Based on your Resume Analysis, you are a{" "}
              <span className="font-bold text-white">94% match</span> for Senior Frontend roles in Fintech.
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold text-sm py-2 rounded-xl transition-colors">
              Optimize My Profile
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <main className="flex-1 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Recommended for You</h1>
              <p className="text-sm text-gray-500 mt-0.5">Found 128 opportunities matching your skill set</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm font-bold text-purple-600 outline-none cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <option>Best Match</option>
                  <option>Latest</option>
                  <option>Salary</option>
                </select>
                <svg className="w-4 h-4 text-purple-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className={`w-12 h-12 rounded-xl ${job.logoBg} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {job.logo}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">{job.title}</h2>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
                          <span className="text-purple-500">✦</span> {job.match}% Match
                        </span>
                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{job.posted}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                      <span className="font-semibold">{job.company}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-gray-900">
                        {job.salary}{" "}
                        <span className="text-gray-400 font-normal">/ year</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleSaved(job.id)}
                          className="transition-colors"
                        >
                          <svg
                            className={`w-6 h-6 transition-colors ${savedJobs.includes(job.id) ? "text-purple-600 fill-purple-600" : "text-gray-300 hover:text-gray-400"}`}
                            fill={savedJobs.includes(job.id) ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors" onClick={() => onNavigate(`/jobs/${job.id}`)}>
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More */}
          <button className="w-full mt-4 bg-white border border-gray-200 rounded-2xl py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
            Show more recommendations
          </button>
        </main>
      </div>
    </div>
  );
}

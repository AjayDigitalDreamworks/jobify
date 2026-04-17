import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Jobs", icon: "💼", active: true },
  { label: "Applications", icon: "✓" },
  { label: "Network", icon: "👤" },
  { label: "Messages", icon: "✉" },
  { label: "Resume Analyzer", icon: "⊙" },
  { label: "Skill Gap", icon: "↗" },
  { label: "Settings", icon: "⚙" },
];

const requirements = [
  "5+ years of experience designing complex SaaS products or data-heavy applications.",
  "Mastery of Figma and modern design system methodologies.",
  "Strong understanding of accessibility (WCAG 2.1) and user-centric design principles.",
  "Ability to communicate design decisions effectively to non-design stakeholders.",
];

const benefits = [
  { icon: "💼", title: "Health & Dental", desc: "Premium family coverage" },
  { icon: "✈️", title: "Unlimited PTO", desc: "Mandatory 2-week break" },
  { icon: "💰", title: "Stock Options", desc: "Early-stage equity grants" },
  { icon: "💪", title: "Wellness Stipend", desc: "$150 monthly credit" },
];

const similarJobs = [
  {
    color: "bg-blue-500",
    letter: "P",
    title: "UI/UX Designer",
    company: "Prism Interactive • Remote",
    salary: "$120K – $160K",
    type: "FULL-TIME",
  },
  {
    color: "bg-rose-500",
    letter: "C",
    title: "Lead Visual Designer",
    company: "CloudScale • NY, USA",
    salary: "$150K – $200K",
    type: "CONTRACT",
  },
  {
    color: "bg-purple-500",
    letter: "V",
    title: "Interaction Architect",
    company: "Velocity AI • Austin, TX",
    salary: "$135K – $175K",
    type: "FULL-TIME",
  },
];

export default function JobDetails() {
  const [activeNav, setActiveNav] = useState("Jobs");
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-50">
        <div className="text-purple-600 font-extrabold text-xl tracking-tight mr-2">Jobify</div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-48 md:w-56">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs, skills..."
            className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
          />
        </div>
        <nav className="hidden md:flex items-center gap-6 ml-auto mr-4">
          {["Dashboard", "Jobs", "Network"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`text-sm font-medium transition-colors ${
                activeNav === item ? "text-purple-600 font-semibold" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 ml-auto md:ml-0">
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
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=12" alt="Alex" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 min-h-screen sticky top-[57px] h-[calc(100vh-57px)]">
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="text-purple-600 font-bold text-sm">Jobify AI</div>
            <div className="text-gray-400 text-xs mt-0.5 uppercase tracking-widest">Premium Career Concierge</div>
          </div>
          <nav className="flex-1 py-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
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

        {/* Main */}
        <div className="flex-1 flex flex-col lg:flex-row gap-0">
          {/* Center Content */}
          <div className="flex-1 p-4 md:p-6 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-5 font-medium uppercase tracking-wide">
              <button className="hover:text-purple-600 transition-colors">Jobs</button>
              <span>›</span>
              <button className="hover:text-purple-600 transition-colors">Design</button>
              <span>›</span>
              <span className="text-gray-500">Senior Product Designer</span>
            </div>

            {/* Job Header Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                    Senior Product Designer
                  </h1>
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🏢</span>
                      <span className="font-medium">Lumina Tech Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📍</span>
                      <span>San Francisco, CA (Remote Friendly)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">🕐</span>
                      <span>Full-time</span>
                    </div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 mt-1">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors ${
                      saved ? "border-purple-600 bg-purple-50 text-purple-600" : "border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* AI Match Circle */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke="#7c3aed" strokeWidth="3"
                        strokeDasharray="92 8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-extrabold text-gray-900">92%</span>
                      <span className="text-xs text-gray-400 font-semibold">AI MATCH</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2 max-w-[110px]">
                    Your skills in <span className="text-purple-600 font-semibold">Figma</span> and{" "}
                    <span className="text-purple-600 font-semibold">Design Systems</span> are a perfect fit.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-4 flex-1">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Salary Range</div>
                    <div className="text-lg font-extrabold text-gray-900">$140k – $185k<span className="text-sm font-medium text-gray-500"> / yr</span></div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Posted</div>
                    <div className="text-lg font-extrabold text-gray-900">2 days ago</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Applicants</div>
                    <div className="text-lg font-extrabold text-gray-900">42 candidates</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Level</div>
                    <div className="text-lg font-extrabold text-gray-900">Senior (5+ yrs)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                <span className="w-1 h-6 bg-purple-600 rounded-full inline-block" />
                Job Description
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  Lumina is looking for an exceptional Senior Product Designer to join our core product team. You will be responsible for defining the user experience of our flagship AI-driven analytics platform, working closely with engineering and product leadership to translate complex data into intuitive, beautiful interfaces.
                </p>
                <p>
                  We are a team of curious, driven individuals who value high-quality craft and empathetic design. In this role, you will lead the end-to-end design process, from foundational research to high-fidelity prototyping and design system maintenance.
                </p>
              </div>
            </div>

            {/* Key Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                <span className="w-1 h-6 bg-purple-600 rounded-full inline-block" />
                Key Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                <span className="w-1 h-6 bg-purple-600 rounded-full inline-block" />
                Benefits
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <span className="text-2xl">{b.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{b.title}</div>
                      <div className="text-xs text-gray-500">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-72 xl:w-80 p-4 md:p-6 space-y-5 shrink-0">
            {/* About Company */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">About Company</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Lumina Tech</div>
                  <div className="text-xs text-gray-500">AI & Analytics SaaS</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Lumina Tech is a venture-backed startup redefining how enterprises interact with their data through generative AI and advanced visualization.
              </p>
              <div className="space-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Size</span>
                  <span className="font-semibold text-gray-800">50-150 employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Website</span>
                  <a href="#" className="text-purple-600 font-semibold hover:underline">lumina.io</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Industry</span>
                  <span className="font-semibold text-gray-800">Technology</span>
                </div>
              </div>
              <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                View Company Profile
              </button>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Similar Jobs</h3>
                <button className="text-purple-600 text-xs font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {similarJobs.map((job, i) => (
                  <div key={i} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`w-9 h-9 rounded-lg ${job.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {job.letter}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{job.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{job.company}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-600 font-medium">{job.salary}</span>
                        <span className="text-xs text-gray-400 font-medium">{job.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Manager */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Hiring Manager</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img src="https://i.pravatar.cc/40?img=5" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">Sarah Jenkins</div>
                  <div className="text-xs text-gray-500">Head of Design at Lumina</div>
                </div>
                <button className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
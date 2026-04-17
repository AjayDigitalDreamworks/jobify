import { useState } from "react";
import { getRouteForLabel } from "../src/lib/navigation";

const Avatar = () => (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
        <img
            src="https://i.pravatar.cc/40?img=12"
            alt="Alex"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
        />
    </div>
);

const CompanyLogo = ({ color, letter }) => (
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center text-white text-sm font-bold`}>
        {letter}
    </div>
);

const Badge = ({ children, color = "gray" }) => {
    const colors = {
        gray: "bg-gray-100 text-gray-600",
        purple: "bg-purple-100 text-purple-700",
        green: "bg-green-100 text-green-700",
        blue: "bg-blue-100 text-blue-700",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
            {children}
        </span>
    );
};

const MatchBadge = ({ percent }) => (
    <span className="absolute top-3 right-3 bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
        {percent}% MATCH
    </span>
);

const navItems = [
    { label: "Dashboard", icon: "⊞", active: true },
    { label: "Jobs", icon: "💼" },
    { label: "Applications", icon: "✓" },
    { label: "Network", icon: "👤" },
    { label: "Messages", icon: "✉" },
    { label: "Resume Analyzer", icon: "⊙" },
    { label: "Skill Gap", icon: "↗" },
    { label: "Settings", icon: "⚙" },
];

export default function JobifyDashboard({ data = {}, onNavigate = () => {} }) {
    const [activeNav, setActiveNav] = useState("Dashboard");
    const userName = data.userName || "Alex";
    const newOpportunities = data.newOpportunities || 12;
    const profileStrength = data.profileStrength || { level: "Intermediate", percent: 75 };

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
            <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-4 sticky top-0 z-50">
                <div className="text-purple-600 font-extrabold text-xl tracking-tight mr-4">Jobify</div>
                <div className="flex-1 max-w-md">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search careers, skills, or companies..."
                            className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
                        />
                    </div>
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
                    <Avatar />
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
                        {/* Go Premium */}
          <div className="m-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 text-white">
            <div className="font-bold text-sm mb-1">GO PREMIUM</div>
            <div className="text-purple-200 text-xs mb-3">Unlock advanced AI analysis and priority applications.</div>
            <button className="w-full bg-white text-purple-700 font-bold text-xs py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome back, {userName}.</h1>
            <p className="text-gray-500 text-sm">
              Your AI Career Assistant has found <span className="font-semibold text-gray-700">{newOpportunities} new opportunities</span> that match your expertise in Product Design and React development.
            </p>
          </div>

          {/* Top Row: Profile Strength + AI Matches */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Profile Strength */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-1">Profile Strength</h2>
              <p className="text-sm text-gray-500 mb-4">Complete your profile to unlock premium matches.</p>
              <div className="mb-1">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${profileStrength.percent}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-purple-600 font-semibold">{profileStrength.level}</span>
                  <span className="text-xs font-bold text-gray-700">{profileStrength.percent}%</span>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <button className="w-full flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <span className="text-purple-500 font-bold text-base">+</span> Add Portfolio Links
                </button>
                <button className="w-full flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <span className="text-purple-500">🛡</span> Verify Skills
                </button>
              </div>
            </div>

            {/* Top AI Matches */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-900">Top AI Matches</h2>
                <button className="text-purple-600 text-sm font-semibold hover:underline">View all matches →</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Match Card 1 */}
                <div className="relative border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <MatchBadge percent={98} />
                  <CompanyLogo color="bg-gray-800" letter="V" />
                  <div className="mt-3">
                    <div className="font-bold text-sm text-gray-900">Senior Product Designer</div>
                    <div className="text-xs text-gray-500 mt-0.5">Vortex Interactive • San Francisco, CA</div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Badge>Figma</Badge>
                      <Badge>Prototyping</Badge>
                    </div>
                  </div>
                </div>
                {/* Match Card 2 */}
                <div className="relative border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <MatchBadge percent={94} />
                  <CompanyLogo color="bg-rose-600" letter="L" />
                  <div className="mt-3">
                    <div className="font-bold text-sm text-gray-900">UI/UX Engineer</div>
                    <div className="text-xs text-gray-500 mt-0.5">Lumina Systems • Remote</div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Badge>Tailwind</Badge>
                      <Badge>React</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Skill Gap + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {/* Skill Gap Analysis */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-600 text-lg">⊙</span>
                <h2 className="font-bold text-gray-900">Skill Gap Analysis</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You're missing these key skills for <strong>Design Lead</strong> roles:
              </p>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-800">Strategic Planning</span>
                  </div>
                  <button className="text-xs font-bold text-purple-600 hover:underline">LEARN NOW</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-800">Budget Management</span>
                  </div>
                  <button className="text-xs font-bold text-purple-600 hover:underline">LEARN NOW</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-medium text-gray-400 line-through">A/B Testing</span>
                  </div>
                  <span className="text-xs font-bold text-green-500">MASTERED</span>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="text-sm text-purple-800 italic">
                  "Alex, candidates with Strategic Planning skills see a 24% increase in salary offers."
                </p>
                <p className="text-xs text-purple-500 mt-2">— Jobify AI Insight</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-5">
                {/* Activity 1 */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-gray-900">Applied to Google</span>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Senior UX Researcher • Mountain View, CA</p>
                    <span className="inline-block mt-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">IN REVIEW</span>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-gray-900">Profile Viewed by Meta</span>
                      <span className="text-xs text-gray-400">Yesterday</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">A recruiter from the Infrastructure Team viewed your portfolio.</p>
                  </div>
                </div>
                {/* Activity 3 */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-gray-900">New "Super Match" Found</span>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Airbnb just posted a role that matches 99% of your profile.</p>
                    <button className="text-xs font-semibold text-purple-600 hover:underline mt-1">View Job</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Career Forecasting */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-extrabold mb-2">AI Career Forecasting</h2>
              <p className="text-purple-200 text-sm mb-5">
                Our neural network predicts a 15% growth in "Design Systems Engineering" roles over the next quarter. Would you like to adjust your job alerts?
              </p>
              <div className="flex gap-3 flex-wrap">
                <button className="bg-white text-purple-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                  Update Alerts
                </button>
                <button className="border border-purple-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-purple-800 transition-colors">
                  Read Full Report
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 min-w-[180px]">
              <div className="text-xs text-purple-300 font-semibold mb-3 tracking-widest uppercase">Trending Skills</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-medium">AI Integration</span>
                    <span className="text-green-400 font-bold">+4%</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-medium">Spatial Design</span>
                    <span className="text-green-400 font-bold">+8%</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-1.5">
                    <div className="bg-white h-1.5 rounded-full" style={{ width: "55%" }} />
                  </div>
                </div>
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

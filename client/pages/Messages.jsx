import { useState } from "react";

const sidebarNav = [
  { icon: "grid", label: "Dashboard" },
  { icon: "briefcase", label: "Jobs" },
  { icon: "check-square", label: "Applications" },
  { icon: "users", label: "Network" },
  { icon: "mail", label: "Messages", active: true },
  { icon: "settings-gear", label: "Resume Analyzer" },
  { icon: "trending-up", label: "Skill Gap" },
  { icon: "settings", label: "Settings" },
];

const conversations = [
  {
    id: 1,
    name: "Jordan Davies",
    time: "10:42 AM",
    preview: "That sounds like a great plan for the ...",
    avatar: "JD",
    avatarColor: "bg-blue-500",
    online: true,
    active: true,
  },
  {
    id: 2,
    name: "Sarah Kempler",
    time: "Yesterday",
    preview: "Sent an attachment: Resume_Revise...",
    avatar: "SK",
    avatarColor: "bg-orange-400",
    online: false,
    active: false,
  },
  {
    id: 3,
    name: "Jobify AI Concierge",
    time: "",
    preview: "I've analyzed your latest mock inter...",
    avatar: "AI",
    avatarColor: "bg-indigo-600",
    online: false,
    active: false,
    isAI: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "jordan",
    text: "Hi Alex! I reviewed your portfolio and the Case Study you sent over. The team was particularly impressed with the Accessibility section.",
    time: "10:40 AM",
    avatar: "JD",
  },
  {
    id: 2,
    sender: "me",
    text: "Thank you, Jordan! I really enjoyed working on that project. Are we still on for the technical deep-dive tomorrow afternoon?",
    time: "10:41 AM",
  },
  {
    id: 3,
    sender: "jordan",
    text: "Yes, absolutely. I've invited our Head of Design, Marcus, to join us. I'll send over the meeting brief now.",
    time: "10:42 AM",
    avatar: "JD",
    attachment: { name: "Interview_Brief_Jobify.pdf", size: "1.2 MB" },
  },
];

const quickReplies = [
  "Sounds great, I'll review it now!",
  "Who else will be attending?",
  "Should I prepare any slides?",
];

function Icon({ name, className = "w-5 h-5" }) {
  const icons = {
    grid: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
      </svg>
    ),
    briefcase: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeWidth="2"/>
      </svg>
    ),
    "check-square": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="9 11 12 14 22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2"/>
        <circle cx="9" cy="7" r="4" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeWidth="2"/>
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
        <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
      </svg>
    ),
    "settings-gear": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2"/>
      </svg>
    ),
    "trending-up": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17 6 23 6 23 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2"/>
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" strokeWidth="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chat: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2"/>
        <circle cx="12" cy="7" r="4" strokeWidth="2"/>
      </svg>
    ),
    video: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polygon points="23 7 16 12 23 17 23 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeWidth="2"/>
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.14a16 16 0 006 6l1.06-1.06a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeWidth="2"/>
      </svg>
    ),
    "more-vertical": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="1" fill="currentColor"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
        <circle cx="12" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
    paperclip: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
        <polyline points="21 15 16 10 5 21" strokeWidth="2"/>
      </svg>
    ),
    smile: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="2" strokeLinecap="round"/>
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    "pencil-edit": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    download: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    logout: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 17 21 12 16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    sparkle: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
      </svg>
    ),
  };
  return icons[name] || null;
}

export default function JobifyMessages() {
  const [inputValue, setInputValue] = useState("");
  const [activeConv, setActiveConv] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [convPanelOpen, setConvPanelOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
      {/* Mobile overlay */}
      {(sidebarOpen || convPanelOpen) && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => { setSidebarOpen(false); setConvPanelOpen(false); }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 lg:z-auto
          w-56 bg-white border-r border-gray-100 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Icon name="sparkle" className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-none">Jobify AI</div>
              <div className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase mt-0.5">Premium Career Concierge</div>
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
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
            >
              <Icon name={item.icon} className="w-[18px] h-[18px] flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">Alex Rivera</div>
            <div className="text-xs text-gray-400">Pro Member</div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Icon name="logout" className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Search */}
          <div className="flex-1 relative max-w-sm">
            <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition"
            />
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
              <Icon name="bell" className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
              <Icon name="chat" className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
              <Icon name="user" className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations Panel */}
          <div
            className={`
              fixed lg:static inset-y-0 left-0 z-30 lg:z-auto
              w-72 bg-white border-r border-gray-100 flex flex-col
              transform transition-transform duration-300
              ${convPanelOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Messages Header */}
            <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Messages</h2>
              <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                <Icon name="pencil-edit" className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto py-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => { setActiveConv(conv.id); setConvPanelOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition relative
                    ${activeConv === conv.id ? "bg-indigo-50/60" : ""}`}
                >
                  {/* Active indicator */}
                  {activeConv === conv.id && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-10 bg-indigo-600 rounded-r-full" />
                  )}

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {conv.isAI ? (
                      <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Icon name="sparkle" className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className={`w-11 h-11 rounded-full ${conv.avatarColor} flex items-center justify-center text-white text-sm font-bold`}>
                        {conv.avatar}
                      </div>
                    )}
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                    {conv.isAI && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-500 border border-white rounded-full flex items-center justify-center">
                        <span className="text-[7px] text-white font-bold">AI</span>
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900 truncate">{conv.name}</span>
                      {conv.time && <span className="text-[11px] text-gray-400 ml-2 flex-shrink-0">{conv.time}</span>}
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${conv.isAI ? "text-indigo-500" : "text-gray-500"}`}>
                      {conv.preview}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-gray-100 bg-white">
              {/* Mobile: open conv panel */}
              <button
                className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 mr-1"
                onClick={() => setConvPanelOpen(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Jordan Davies</div>
                <div className="text-xs text-green-500 font-medium">● Online Now</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                  <Icon name="video" className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                  <Icon name="phone" className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition">
                  <Icon name="more-vertical" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
              {/* Date separator */}
              <div className="flex items-center justify-center">
                <span className="text-[11px] text-gray-400 bg-gray-100 px-4 py-1 rounded-full font-medium tracking-wide uppercase">
                  Today
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  {msg.sender !== "me" && (
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-1">
                      JD
                    </div>
                  )}

                  <div className={`flex flex-col gap-1 max-w-[75%] sm:max-w-[60%] ${msg.sender === "me" ? "items-end" : "items-start"}`}>
                    {/* Bubble */}
                    {msg.text && (
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                          ${msg.sender === "me"
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                          }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    {/* Attachment */}
                    {msg.attachment && (
                      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 w-full sm:w-72 shadow-sm mt-1">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{msg.attachment.name}</div>
                          <div className="text-xs text-gray-400">{msg.attachment.size}</div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                          <Icon name="download" className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Time */}
                    <span className="text-[11px] text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 sm:px-6 pb-2 flex items-center gap-2 flex-wrap">
              <button className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Icon name="sparkle" className="w-3.5 h-3.5" />
              </button>
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => setInputValue(reply)}
                  className="text-xs text-gray-700 border border-gray-200 rounded-full px-4 py-1.5 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
              <div className="bg-gray-50 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600 transition">
                      <Icon name="paperclip" className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                      <Icon name="image" className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                      <Icon name="smile" className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition">
                    Send
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" strokeWidth="2" strokeLinecap="round"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
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
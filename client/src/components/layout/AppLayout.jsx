import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  ScanText,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../utils/auth";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout Successful");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },
    {
      title: "Applications",
      icon: FileText,
      path: "/applications",
    },
    {
      title: "Network",
      icon: Users,
      path: "/network",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/messages",
    },
    {
      title: "Resume Analyzer",
      icon: ScanText,
      path: "/resume-analyzer",
    },
    {
      title: "Skill Gap",
      icon: TrendingUp,
      path: "/skill-gap",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="px-6 py-8 border-b">
            <h1 className="text-3xl font-bold text-violet-700">Jobify</h1>

            <p className="text-sm text-gray-500 mt-1">
              Premium Career Concierge
            </p>
          </div>

          {/* Navigation */}

          <nav className="mt-5 px-3 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200
                    ${
                      isActive
                        ? "bg-violet-100 text-violet-700 font-semibold border-l-4 border-violet-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}

        <div className="p-5">
          {/* Premium Card */}

          <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 text-white shadow-lg">
            <h3 className="font-semibold text-lg">Go Premium</h3>

            <p className="text-sm opacity-90 mt-2">
              Unlock AI Resume Analysis, Smart Matching & Priority Applications.
            </p>

            <button className="mt-5 w-full rounded-lg bg-white py-2 text-sm font-semibold text-violet-700 hover:bg-gray-100">
              Upgrade Now
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <main className="flex-1 overflow-auto">
        <Navbar />

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

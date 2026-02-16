import React, { useState } from "react";
import {
  LayoutDashboardIcon,
  Package,
  PanelLeft,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboardIcon,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: Package,
      label: "Insurance Plans",
      path: "/admin/plans",
    },
  ];

  const MenuLinks = ({ close }) => (
    <div className="mt-6 space-y-1">
      {menuItems.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;

        return (
          <Link
            key={path}
            to={path}
            onClick={close}
            className={`
              group relative flex items-center gap-3
              rounded-xl px-4 py-3 text-sm font-medium
              transition-all duration-200
              ${
                active
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
          >
            {/* Active Dot */}
            <span
              className={`
                absolute left-2 h-2 w-2 rounded-full
                ${active ? "bg-blue-600" : "bg-transparent"}
              `}
            />

            {/* Icon */}
            <Icon
              size={18}
              className={`
                ml-3 transition-transform duration-200
                ${active ? "text-blue-600" : "text-gray-400"}
                group-hover:translate-x-0.5
              `}
            />

            <span className="tracking-wide">{label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* 📱 Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-xl p-2 hover:scale-105 transition"
      >
        <PanelLeft size={22} />
      </button>

      {/* 📱 Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          className={`
            absolute left-0 top-0 h-full w-72 bg-white
            shadow-2xl transform transition-all duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div
              onClick={() => {
                navigate("/admin/dashboard");
                setOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <PanelLeft size={20} />
              </div>
              <span className="text-lg font-bold">LIC Admin</span>
            </div>

            <X
              onClick={() => setOpen(false)}
              className="cursor-pointer text-gray-500 hover:rotate-90 transition"
            />
          </div>

          <div className="px-4">
            <MenuLinks close={() => setOpen(false)} />
          </div>
        </aside>
      </div>

      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col bg-white border-r px-6 py-6">
        {/* Brand */}
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="mb-10 flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <PanelLeft size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-tight">
              LIC Admin
            </h1>
            <p className="text-xs text-gray-500">
              Management Panel
            </p>
          </div>
        </div>

        <MenuLinks />
      </aside>
    </>
  );
}

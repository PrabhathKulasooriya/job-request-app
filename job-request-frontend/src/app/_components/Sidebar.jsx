"use client";

import React, { useState } from "react";
import { Menu, X, BriefcaseBusiness, CheckCircle } from "lucide-react";

const navItems = [
  { key: "my-jobs", label: "My Jobs", icon: BriefcaseBusiness },
  { key: "accepted-jobs", label: "Accepted Jobs", icon: CheckCircle },
];

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (key) => {
    setActiveComponent(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger — mobile only */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="md:hidden fixed top-12 left-3 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar panel */}
      <div
        className={[
          " z-40  bg-white border-r border-gray-200 flex flex-col justify-start pt-24 md:pt-20 px-3 transition-all duration-300 ease-in-out w-64 md:w-56",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2 mb-3">
          Jobs
        </p>

        <nav className="flex flex-col gap-4">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-full text-left",
                activeComponent === key
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              ].join(" ")}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

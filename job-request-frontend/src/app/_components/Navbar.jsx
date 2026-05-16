"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { AppContext } from "@/app/_context/AppContext.jsx";
import {User,LogOut} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "My Jobs", href: "/myjobs" },
];

const Navbar = () => {
  const { token, user, logout } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg bg-white/80">
      <div className="flex items-center w-full px-4 py-1">
        {/* Left — Logo */}
        <div className="flex w-1/3 justify-start">
          <Link href="/">
            <Image src={logo} alt="logo" className="h-auto w-40 md:w-60 p-1" />
          </Link>
        </div>

        {/* Center — Nav links (hidden on mobile) */}
        <div className="hidden md:flex w-1/3 justify-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                pathname === href
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right — Auth buttons (hidden on mobile) */}

        {token ? (
          <div className="hidden md:flex w-1/3 justify-end gap-3 pr-1">
            <p className="text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 group flex items-center transition-all duration-300 gap-2">
              <User className="inline-block" />
              <span className="  group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
                {user?.name?.split(" ")[0] || "User"}
              </span>
            </p>
            <button
              onClick={logout}
              className="text-sm font-medium px-4 py-1.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 group flex items-center"
            >
              <LogOut className="inline-block" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
                Logout
              </span>
            </button>
          </div>
        ) : (
          <div className="hidden md:flex w-1/3 justify-end gap-3 pr-1">
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium px-4 py-1.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        )}

        {/* Hamburger — visible on mobile only */}
        <div className="flex md:hidden w-2/3 justify-end pr-1">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              /* X icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-md">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}

          <hr className="border-gray-200" />

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

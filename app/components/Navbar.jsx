'use client';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load theme configuration from browser window
  useEffect(() => {
    const savedTheme = localStorage.getItem('jira_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Handle systemic theme state transitions
  const toggleThemeMode = () => {
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(targetTheme);
    localStorage.setItem('jira_theme', targetTheme);
    document.documentElement.classList.toggle('dark', targetTheme === 'dark');
  };
  return (
    <>
      <nav className="h-14 w-full bg-white dark:bg-[#1d2125] border-b border-slate-200 dark:border-[#22272b] px-4 flex items-center justify-between text-slate-600 dark:text-[#9fadbc] text-sm font-medium sticky top-0 z-50 select-none transition-colors duration-200">

        {/* Left Node Brand Logo Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer text-slate-900 dark:text-white font-bold tracking-tight text-base">
            <span className="bg-blue-600 p-1.5 rounded text-xs text-white">⧉</span>
            <span>Board UI</span>
          </div>

          {/* Desktop Links Matrix */}

        </div>

        {/* Right Core Action Tools */}
        <div className="flex items-center gap-3">


          <button
            onClick={toggleThemeMode}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#2c333a] text-slate-500 dark:text-[#9fadbc] transition-colors border border-slate-200 dark:border-[#30363d] flex items-center justify-center"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <span className="text-xs">🌙 Dark</span>
            ) : (
              <span className="text-xs text-amber-400">☀️ Light</span>
            )}
          </button>



          {/* Responsive Mobile Drawer Handler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 hover:bg-slate-100 dark:hover:bg-[#2c333a] rounded text-slate-700 dark:text-white transition"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Popover Context Box List */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-[#1d2125] border-b border-slate-200 dark:border-[#22272b] p-4 flex flex-col gap-2 md:hidden shadow-lg z-50">

          </div>
        )}
      </nav>
    </>
  );
}
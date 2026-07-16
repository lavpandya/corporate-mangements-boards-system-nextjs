'use client';
import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-slate-50 border-r border-slate-200 p-4 text-slate-700 select-none dark:bg-[#1d2125] dark:border-[#22272b] dark:text-[#9fadbc] transition-colors duration-200">

      {/* Scope Identity Descriptor */}
      <div className="flex items-center gap-3 px-2 py-3 mb-5 border-b border-slate-200 dark:border-[#22272b] pb-4">
        <div className="w-9 h-9 bg-purple-600 text-white rounded-md flex items-center justify-center font-bold text-base shadow-sm shrink-0">
          MB
        </div>
        <div>
       
          <h2 className="text-slate-900 dark:text-white font-bold text-base tracking-tight leading-tight">
            Management Board
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Software project
          </span>
        </div>
      </div>

   
      <div className="space-y-6">
        <div>

          <h4 className="px-2 font-bold text-xs uppercase text-slate-400 dark:text-zinc-500 tracking-wider mb-2">
            Planning
          </h4>
      
        </div>

      </div>
   
      <div className="mt-auto border-t border-slate-200 dark:border-[#22272b] pt-3 px-2 text-slate-500 dark:text-zinc-400 font-bold hover:text-slate-800 dark:hover:text-white cursor-pointer text-xs transition-colors">
        ⚙ Project settings
      </div>
    </aside>

  );
}
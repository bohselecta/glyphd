'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, Settings } from 'lucide-react';

interface UnifiedHeaderProps {
  showDashboardActions?: boolean;
}

export default function UnifiedHeader({ showDashboardActions = false }: UnifiedHeaderProps) {
  const router = useRouter();

  return (
    <header className="w-full bg-slate-950 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo - always visible */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[#f632b3] to-[#f632b3] rounded-lg flex items-center justify-center">
            <img src="/GLYPHD-FRACTAL.png" alt="GLYPHD" className="w-6 h-6 object-contain" />
          </div>
          <span className="text-xl font-bold text-[#67dcf1]">GLYPHD</span>
        </div>

        {/* Center navigation - only on landing page */}
        {!showDashboardActions && (
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-slate-300 hover:text-[#67dcf1] transition-colors"
            >
              Capture
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-slate-300 hover:text-[#67dcf1] transition-colors"
            >
              Analyze
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-slate-300 hover:text-[#67dcf1] transition-colors"
            >
              Synthesize
            </button>
          </nav>
        )}

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {showDashboardActions ? (
            // Dashboard actions
            <>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </>
          ) : (
            // Landing page actions
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

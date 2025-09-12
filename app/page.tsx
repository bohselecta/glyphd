'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
// Note: Using a simple header for landing page instead of the dashboard UnifiedHeader

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Sci-fi grid overlay */}
      <div className="absolute inset-0 -z-5 opacity-25">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(103, 220, 241, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(246, 50, 179, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8 mb-20">
          {/* Floating fractal tree icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f632b3] to-[#f632b3] rounded-2xl flex items-center justify-center shadow-2xl animate-float overflow-hidden">
                <img src="/GLYPHD-FRACTAL.png" alt="GLYPHD Fractal Logo" className="w-16 h-16 object-contain" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#f632b3] to-[#f632b3] rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Project Memory
            </span>
            <br />
            <span className="text-white">
              Infrastructure
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Purpose-built for complex AI workflows. Maintain project context, track decisions,
            and preserve memory across large-scale AI-guided projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight className="inline ml-2" size={20} />
            </button>

            <button
              onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              See Demo
            </button>
          </div>
        </div>

        {/* Demo Section */}
        <section id="demo-section" className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Project Memory in Action</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See how GLYPHD maintains context and memory across complex AI-guided projects
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Simulated Device Frame */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
              {/* Device Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-slate-400 text-sm font-mono">dashboard.glyphd.com</div>
              </div>

              {/* Fractal Tree Visualization */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                {/* Animated fractal tree structure */}
                <div className="relative">
                  {/* Root node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                  </div>

                  {/* Branch lines */}
                  <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="300" height="200" viewBox="0 0 300 200">
                    <defs>
                      <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                      </linearGradient>
                    </defs>

                    {/* Main branches */}
                    <line x1="150" y1="100" x2="100" y2="60" stroke="url(#branchGradient)" strokeWidth="2" className="animate-draw-line"/>
                    <line x1="150" y1="100" x2="200" y2="60" stroke="url(#branchGradient)" strokeWidth="2" className="animate-draw-line"/>
                    <line x1="150" y1="100" x2="120" y2="140" stroke="url(#branchGradient)" strokeWidth="2" className="animate-draw-line"/>
                    <line x1="150" y1="100" x2="180" y2="140" stroke="url(#branchGradient)" strokeWidth="2" className="animate-draw-line"/>

                    {/* Sub-branches */}
                    <line x1="100" y1="60" x2="80" y2="30" stroke="url(#branchGradient)" strokeWidth="1" className="animate-draw-line-delay"/>
                    <line x1="100" y1="60" x2="120" y2="30" stroke="url(#branchGradient)" strokeWidth="1" className="animate-draw-line-delay"/>
                    <line x1="200" y1="60" x2="180" y2="30" stroke="url(#branchGradient)" strokeWidth="1" className="animate-draw-line-delay"/>
                    <line x1="200" y1="60" x2="220" y2="30" stroke="url(#branchGradient)" strokeWidth="1" className="animate-draw-line-delay"/>
                  </svg>

                  {/* Node indicators */}
                  <div className="absolute top-8 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute top-8 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute bottom-8 left-24 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute bottom-8 right-24 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-1200"></div>
                </div>

                {/* Floating data indicators */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium">
                  Goals: 12
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs font-medium">
                  Tasks: 47
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
                  Decisions: 8
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-medium">
                  Active: 23
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 rounded-lg font-medium transition-all duration-200 bg-[#FF8C00] hover:bg-[#ff9c26] text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                >
                  Launch Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/GLYPHD-FRACTAL.png" alt="GLYPHD Fractal Logo" className="w-6 h-6"/>
              </div>
              <span className="text-slate-400">GLYPHD</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 GLYPHD. AI Project Memory Infrastructure.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

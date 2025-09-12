'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Import the GLYPHD Fractal Auditor component
const GLYPHDFractalAuditor = dynamic(() => import('../../glyphd_fractal_auditor.tsx'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Fractal Auditor...</p>
      </div>
    </div>
  )
});

export default function FractalAuditorPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Fractal Auditor</h1>
        <p className="text-gray-400">Self-healing code architecture (Project Context Setup Required)</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Setup Required</h3>
        <div className="text-sm text-yellow-200">
          <p>To enable full health monitoring and auditing:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Add Supabase environment variables to .env.local</li>
            <li>Configure project database and health tracking</li>
            <li>Enable fractal auditing and global coherence checks</li>
          </ul>
        </div>
      </div>

      {/* Render the GLYPHD Fractal Auditor component with basic functionality */}
      <GLYPHDFractalAuditor />
    </div>
  );
}

'use client';

import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { PrerequisitesCheck } from '../types/project';

interface PrerequisiteGateProps {
  prerequisites: PrerequisitesCheck | null;
  isChecking?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
}

export default function PrerequisiteGate({
  prerequisites,
  isChecking = false,
  onRetry,
  children
}: PrerequisiteGateProps) {
  // Show loading state while checking prerequisites
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Checking Prerequisites</h2>
          <p className="text-gray-400">Verifying project readiness...</p>
        </div>
      </div>
    );
  }

  // Show error state if no prerequisites data
  if (!prerequisites) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold mb-2">Prerequisites Check Failed</h2>
          <p className="text-gray-400 mb-6">Unable to verify project prerequisites</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Show blocking state if prerequisites not met
  if (!prerequisites.all_clear) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h1 className="text-3xl font-bold mb-2">Prerequisites Not Met</h1>
            <p className="text-gray-400">Please resolve the following issues before proceeding:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PrerequisiteItem
              title="Health Score"
              status={prerequisites.health_score_ok}
              description="Project health score must be ≥ 95%"
              icon={<Shield className="w-5 h-5" />}
            />

            <PrerequisiteItem
              title="Goal Structure"
              status={prerequisites.goals_structure_ok}
              description="Project must have at least one root goal"
              icon={<CheckCircle className="w-5 h-5" />}
            />

            <PrerequisiteItem
              title="Token Budget"
              status={prerequisites.token_budget_ok}
              description="API token budget must be configured and sufficient"
              icon={<AlertTriangle className="w-5 h-5" />}
            />

            <PrerequisiteItem
              title="Storage Configuration"
              status={prerequisites.storage_configured}
              description="Storage location must be configured"
              icon={<CheckCircle className="w-5 h-5" />}
            />
          </div>

          {prerequisites.issues.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-400 mb-3">Issues to Resolve:</h3>
              <ul className="space-y-2">
                {prerequisites.issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-red-300">
                    <span className="text-red-400 mt-1">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {onRetry && (
            <div className="text-center">
              <button
                onClick={onRetry}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
              >
                Check Prerequisites Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show success state and render children
  return (
    <>
      {/* Optional: Show success indicator briefly */}
      <div className="fixed top-4 right-4 z-50 bg-green-500/10 border border-green-500/20 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Prerequisites Met</span>
        </div>
      </div>
      {children}
    </>
  );
}

interface PrerequisiteItemProps {
  title: string;
  status: boolean;
  description: string;
  icon: React.ReactNode;
}

function PrerequisiteItem({ title, status, description, icon }: PrerequisiteItemProps) {
  return (
    <div className={`p-6 rounded-lg border transition-all ${
      status
        ? 'bg-green-500/10 border-green-500/30'
        : 'bg-red-500/10 border-red-500/30'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-full ${
          status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <div className={`text-sm ${status ? 'text-green-400' : 'text-red-400'}`}>
            {status ? '✓ Passed' : '✗ Failed'}
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}

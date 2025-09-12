'use client';

import React from 'react';
import { Plus, FolderOpen } from 'lucide-react';

export default function ProjectHub() {
  // Mock data for now - replace with actual project context when Supabase is configured
  const projects = [
    {
      project: { id: '1', name: 'Demo Project', health_score: 85, description: 'A sample project' },
      total_goals: 3,
      completed_goals: 1,
      total_files: 5,
      completion_rate: 33
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage your AI-assisted development projects</p>
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          New Project (Setup Required)
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400 mb-6">Create your first project to get started</p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors opacity-50 cursor-not-allowed"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((projectSummary) => (
            <div
              key={projectSummary.project.id}
              className="p-6 rounded-lg border border-gray-700 bg-gray-800/50"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {projectSummary.project.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {projectSummary.project.description || 'No description'}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">
                    {projectSummary.project.health_score}%
                  </div>
                  <div className="text-xs text-gray-500">Health</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    {projectSummary.total_goals}
                  </div>
                  <div className="text-xs text-gray-500">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">
                    {projectSummary.total_files}
                  </div>
                  <div className="text-xs text-gray-500">Files</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

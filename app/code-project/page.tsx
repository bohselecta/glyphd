'use client';

import React, { useState } from 'react';
import { Code, Download, Upload, Play, Settings, FileText, Folder } from 'lucide-react';

export default function CodeProjectPage() {
  // Mock data for now - replace with actual project context when Supabase is configured
  const currentProject = { name: 'Demo Project', health_score: 85 };
  const files = [];
  const goals = [];
  const prerequisites = { all_clear: true, issues: [] };
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'react-app',
      name: 'React Application',
      description: 'Modern React app with TypeScript and Tailwind',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      icon: '⚛️'
    },
    {
      id: 'nextjs-app',
      name: 'Next.js Application',
      description: 'Full-stack Next.js app with API routes',
      tech: ['Next.js', 'React', 'TypeScript', 'Prisma'],
      icon: '▲'
    },
    {
      id: 'api-backend',
      name: 'API Backend',
      description: 'RESTful API with authentication and database',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      icon: '🚀'
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      description: 'React Native mobile app with navigation',
      tech: ['React Native', 'Expo', 'TypeScript'],
      icon: '📱'
    }
  ];

  if (!currentProject) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Code className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-2">No Project Selected</h2>
          <p className="text-gray-400">Select a project to start generating code</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Code Project Generator</h1>
          <p className="text-gray-400">Generate complete project structures with intelligent orchestration</p>
        </div>

        {/* Project Status */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Project: {currentProject.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs ${
                currentProject.health_score >= 90 ? 'bg-green-500/20 text-green-400' :
                currentProject.health_score >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                Health: {currentProject.health_score}%
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                {goals.length} Goals
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Files Generated</p>
              <p className="text-white font-semibold">{files.length}</p>
            </div>
            <div>
              <p className="text-gray-400">Goals Completed</p>
              <p className="text-white font-semibold">
                {goals.filter(g => g.status === 'completed').length}/{goals.length}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Prerequisites</p>
              <p className={`font-semibold ${
                prerequisites?.all_clear ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {prerequisites?.all_clear ? 'Ready' : 'Check Issues'}
              </p>
            </div>
          </div>
        </div>

        {/* Prerequisites Check */}
        {prerequisites && !prerequisites.all_clear && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-yellow-400 font-semibold mb-2">Prerequisites Not Met</h4>
            <ul className="text-sm text-yellow-200 space-y-1">
              {prerequisites.issues.map((issue, index) => (
                <li key={index}>• {issue}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Template Selection */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Choose Project Template</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-6 rounded-lg border cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex gap-1">
                    {template.tech.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {template.tech.length} technologies
                  </span>
                  {selectedTemplate === template.id && (
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generation Controls */}
        {selectedTemplate && (
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Generate Project</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Preview
                </button>
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-sm text-gray-400">Files to Generate</div>
                <div className="text-xl font-bold text-white">24</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <Folder className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-sm text-gray-400">Folders Created</div>
                <div className="text-xl font-bold text-white">8</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <Settings className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-sm text-gray-400">Configurations</div>
                <div className="text-xl font-bold text-white">6</div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Files Preview */}
        {files.length > 0 && (
          <div className="bg-white/5 rounded-lg border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Files</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{file.filename}</span>
                    <span className="text-xs text-gray-500">{file.language}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {(file.size_bytes / 1024).toFixed(1)}KB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

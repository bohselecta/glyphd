'use client';

import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import type { Project, ProjectSummary, CreateProjectForm } from '@/types/project';

// =============================================================================
// PROJECT CARD COMPONENT
// =============================================================================

interface ProjectCardProps {
  projectSummary: ProjectSummary;
  isActive: boolean;
  onSelect: (project: Project) => void;
  onDelete: (id: string) => void;
}

function ProjectCard({ projectSummary, isActive, onSelect, onDelete }: ProjectCardProps) {
  const { project } = projectSummary;
  
  const getHealthColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div 
      className={`p-6 rounded-lg border cursor-pointer transition-all hover:border-blue-500/50 ${
        isActive 
          ? 'border-blue-500 bg-blue-500/5' 
          : 'border-gray-700 bg-gray-800/50'
      }`}
      onClick={() => onSelect(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.description || 'No description'}
          </p>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="text-gray-500 hover:text-red-400 transition-colors p-1"
            title="Delete project"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-xl font-bold ${getHealthColor(project.health_score)}`}>
            {project.health_score}%
          </div>
          <div className="text-xs text-gray-500">Health</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-blue-400">
            {projectSummary.total_goals}
          </div>
          <div className="text-xs text-gray-500">Goals</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-cyan-400">
            {projectSummary.total_files}
          </div>
          <div className="text-xs text-gray-500">Files</div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-purple-400">
            {Math.round(projectSummary.completion_rate)}%
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Tech Stack */}
      {project.tech_stack && Object.keys(project.tech_stack).length > 0 && (
        <div className="flex flex-wrap gap-1">
          {Object.entries(project.tech_stack).map(([key, value]) => (
            <span 
              key={key}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
            >
              {typeof value === 'string' ? value : key}
            </span>
          ))}
        </div>
      )}

      {/* Last Activity */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          Last activity: {new Date(projectSummary.last_activity).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CREATE PROJECT MODAL
// =============================================================================

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectForm) => Promise<void>;
}

function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<CreateProjectForm>({
    name: '',
    description: '',
    tech_stack: {},
    settings: {
      api_provider: 'ollama',
      token_budget: 1000,
      storage_location: 'download',
      notifications_enabled: true,
      auto_audit: true,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        tech_stack: {},
        settings: {
          api_provider: 'ollama',
          token_budget: 1000,
          storage_location: 'download',
          notifications_enabled: true,
          auto_audit: true,
        },
      });
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-white mb-4">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of your project..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Frontend Technology
            </label>
            <select
              value={formData.tech_stack.frontend || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tech_stack: { ...prev.tech_stack, frontend: e.target.value }
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select frontend...</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
              <option value="Angular">Angular</option>
              <option value="Vanilla JS">Vanilla JS</option>
              <option value="Next.js">Next.js</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              AI Provider
            </label>
            <select
              value={formData.settings.api_provider}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                settings: { ...prev.settings, api_provider: e.target.value as any }
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ollama">Ollama (Free, Local)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PROJECT HUB COMPONENT
// =============================================================================

export default function ProjectHub() {
  const {
    projects,
    currentProject,
    loading,
    error,
    setCurrentProject,
    createProject,
    deleteProject,
    refreshProjects,
  } = useProject();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateProject = async (data: CreateProjectForm) => {
    const project = await createProject(data);
    setCurrentProject(project);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      await deleteProject(id);
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage your AI-assisted development projects</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={refreshProjects}
            disabled={loading}
            className="px-4 py-2 text-gray-300 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + New Project
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Current Project Banner */}
      {currentProject && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 font-medium">Active Project</p>
              <p className="text-white text-lg">{currentProject.name}</p>
            </div>
            <button
              onClick={() => setCurrentProject(null)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {loading && projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a1 1 0 011-1h6a1 1 0 011 1v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
          <p className="text-gray-400 mb-6">Create your first project to get started with AI-assisted development</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((projectSummary) => (
            <ProjectCard
              key={projectSummary.project.id}
              projectSummary={projectSummary}
              isActive={currentProject?.id === projectSummary.project.id}
              onSelect={setCurrentProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
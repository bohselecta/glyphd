import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, Plus, Search, Filter, MoreVertical, Edit3, Trash2, 
  Star, Users, Calendar, Tag, TrendingUp, Clock, CheckCircle,
  AlertTriangle, Target, Code, Shield, ArrowRight, Eye, Archive,
  Download, Share2, GitBranch, Zap, Brain, TreePine, Settings
} from 'lucide-react';

// Mock data - replace with your actual data source
const mockProjects = [
  {
    id: 'proj_001',
    name: 'Q2 SaaS Marketing Campaign',
    description: 'Complete marketing strategy for product launch targeting enterprise customers',
    status: 'active',
    priority: 'high',
    created: '2024-01-15T10:00:00Z',
    updated: '2024-01-20T15:30:00Z',
    goals: 12,
    completedGoals: 8,
    codeFiles: 15,
    healthScore: 94,
    team: ['alex', 'sarah', 'mike'],
    tags: ['marketing', 'saas', 'q2', 'enterprise'],
    timeline: {
      start: '2024-01-15T00:00:00Z',
      end: '2024-03-31T23:59:59Z',
      milestones: 4
    },
    starred: true
  },
  {
    id: 'proj_002',
    name: 'Product Dashboard Redesign',
    description: 'Complete UX overhaul with new analytics features and improved user experience',
    status: 'planning',
    priority: 'medium',
    created: '2024-01-18T09:00:00Z',
    updated: '2024-01-20T11:15:00Z',
    goals: 8,
    completedGoals: 2,
    codeFiles: 0,
    healthScore: null,
    team: ['alex', 'lisa'],
    tags: ['product', 'ux', 'dashboard', 'analytics'],
    timeline: {
      start: '2024-02-01T00:00:00Z',
      end: '2024-04-15T23:59:59Z',
      milestones: 3
    },
    starred: false
  },
  {
    id: 'proj_003',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application using React Native for iOS and Android',
    status: 'active',
    priority: 'high',
    created: '2024-01-10T14:00:00Z',
    updated: '2024-01-21T09:45:00Z',
    goals: 25,
    completedGoals: 18,
    codeFiles: 42,
    healthScore: 98,
    team: ['alex', 'david', 'emma', 'carlos'],
    tags: ['mobile', 'react-native', 'ios', 'android'],
    timeline: {
      start: '2024-01-10T00:00:00Z',
      end: '2024-05-30T23:59:59Z',
      milestones: 6
    },
    starred: true
  },
  {
    id: 'proj_004',
    name: 'API Documentation Portal',
    description: 'Interactive documentation site with code examples and SDK generation',
    status: 'paused',
    priority: 'low',
    created: '2024-01-05T16:30:00Z',
    updated: '2024-01-19T14:20:00Z',
    goals: 6,
    completedGoals: 3,
    codeFiles: 8,
    healthScore: 76,
    team: ['mike', 'lisa'],
    tags: ['documentation', 'api', 'sdk'],
    timeline: {
      start: '2024-01-05T00:00:00Z',
      end: '2024-03-15T23:59:59Z',
      milestones: 2
    },
    starred: false
  },
  {
    id: 'proj_005',
    name: 'E-commerce Integration',
    description: 'Payment processing and inventory management system integration',
    status: 'completed',
    priority: 'medium',
    created: '2023-11-01T10:00:00Z',
    updated: '2024-01-15T16:00:00Z',
    goals: 15,
    completedGoals: 15,
    codeFiles: 28,
    healthScore: 96,
    team: ['sarah', 'david', 'emma'],
    tags: ['ecommerce', 'payments', 'integration'],
    timeline: {
      start: '2023-11-01T00:00:00Z',
      end: '2024-01-15T23:59:59Z',
      milestones: 5
    },
    starred: false
  }
];

const ProjectManager = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectMenu, setShowProjectMenu] = useState(null);

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    priority: 'medium',
    tags: '',
    timeline: {
      start: new Date().toISOString().split('T')[0],
      end: ''
    }
  });

  // Filter and search logic
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(project => project.priority === priorityFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 'updated':
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'health':
          return (b.healthScore || 0) - (a.healthScore || 0);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter, priorityFilter, sortBy]);

  const createProject = () => {
    const project = {
      id: `proj_${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      status: 'planning',
      priority: newProject.priority,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      goals: 0,
      completedGoals: 0,
      codeFiles: 0,
      healthScore: null,
      team: ['current_user'],
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
      timeline: {
        start: newProject.timeline.start + 'T00:00:00Z',
        end: newProject.timeline.end ? newProject.timeline.end + 'T23:59:59Z' : null,
        milestones: 0
      },
      starred: false
    };
    
    setProjects(prev => [project, ...prev]);
    setShowCreateModal(false);
    setNewProject({
      name: '',
      description: '',
      priority: 'medium',
      tags: '',
      timeline: { start: new Date().toISOString().split('T')[0], end: '' }
    });
  };

  const toggleStar = (projectId) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, starred: !p.starred } : p
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setShowProjectMenu(null);
  };

  const duplicateProject = (project) => {
    const duplicate = {
      ...project,
      id: `proj_${Date.now()}`,
      name: `${project.name} (Copy)`,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      status: 'planning',
      completedGoals: 0,
      codeFiles: 0,
      healthScore: null,
      starred: false
    };
    setProjects(prev => [duplicate, ...prev]);
    setShowProjectMenu(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'planning': return 'text-blue-400 bg-blue-400/20';
      case 'paused': return 'text-yellow-400 bg-yellow-400/20';
      case 'completed': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getHealthColor = (healthScore) => {
    if (!healthScore) return 'text-gray-400';
    if (healthScore >= 90) return 'text-green-400';
    if (healthScore >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCompletionPercentage = (project) => {
    return project.goals > 0 ? Math.round((project.completedGoals / project.goals) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-indigo-400" />
              Project Manager
            </h1>
            <p className="text-gray-400 mt-2">Organize and track your strategic initiatives</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-indigo-400" />
              <div>
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(projects.reduce((acc, p) => acc + getCompletionPercentage(p), 0) / projects.length) || 0}%
                </div>
                <div className="text-sm text-gray-400">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all" className="bg-gray-800">All Status</option>
              <option value="planning" className="bg-gray-800">Planning</option>
              <option value="active" className="bg-gray-800">Active</option>
              <option value="paused" className="bg-gray-800">Paused</option>
              <option value="completed" className="bg-gray-800">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all" className="bg-gray-800">All Priority</option>
              <option value="high" className="bg-gray-800">High</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="low" className="bg-gray-800">Low</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="updated" className="bg-gray-800">Recently Updated</option>
              <option value="created" className="bg-gray-800">Recently Created</option>
              <option value="name" className="bg-gray-800">Name</option>
              <option value="priority" className="bg-gray-800">Priority</option>
              <option value="health" className="bg-gray-800">Health Score</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group relative"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-indigo-400 transition-colors">
                        {project.name}
                      </h3>
                      {project.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowProjectMenu(showProjectMenu === project.id ? null : project.id)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {showProjectMenu === project.id && (
                      <div className="absolute right-0 top-8 bg-gray-900 border border-white/20 rounded-lg shadow-xl z-10 min-w-48">
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowProjectMenu(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => toggleStar(project.id)}
                          className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <Star className="w-4 h-4" />
                          {project.starred ? 'Unstar' : 'Star'}
                        </button>
                        <button
                          onClick={() => duplicateProject(project)}
                          className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <GitBranch className="w-4 h-4" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => {/* Export functionality */}}
                          className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        <div className="border-t border-white/10 mt-1">
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="w-full text-left px-4 py-2 hover:bg-red-600/20 text-red-400 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status and Priority Badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-indigo-400">{project.completedGoals}/{project.goals}</div>
                    <div className="text-xs text-gray-400">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getHealthColor(project.healthScore)}`}>
                      {project.healthScore || '--'}/100
                    </div>
                    <div className="text-xs text-gray-400">Health</div>
                  </div>
                </div>

                {/* Progress Bar */}
                {project.goals > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{getCompletionPercentage(project)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getCompletionPercentage(project)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.team.length}
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {project.codeFiles}
                    </div>
                  </div>
                  <div>Updated {formatDate(project.updated)}</div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-600/30 transition-all text-xs font-medium flex items-center justify-center gap-1">
                    <TreePine className="w-3 h-3" />
                    Goals
                  </button>
                  <button className="flex-1 px-3 py-2 bg-purple-600/20 border border-purple-500/30 rounded text-purple-400 hover:bg-purple-600/30 transition-all text-xs font-medium flex items-center justify-center gap-1">
                    <Brain className="w-3 h-3" />
                    AI
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600/20 border border-green-500/30 rounded text-green-400 hover:bg-green-600/30 transition-all text-xs font-medium flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm font-medium text-gray-400">
              <div className="col-span-4">Project</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Progress</div>
              <div className="col-span-1">Health</div>
              <div className="col-span-2">Updated</div>
              <div className="col-span-1">Team</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {filteredProjects.map(project => (
              <div key={project.id} className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors">
                <div className="col-span-4">
                  <div className="flex items-center gap-3">
                    {project.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-400 truncate">{project.description}</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="col-span-1">
                  <div className="text-sm">{getCompletionPercentage(project)}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                    <div 
                      className="bg-indigo-500 h-1 rounded-full"
                      style={{ width: `${getCompletionPercentage(project)}%` }}
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <span className={`${getHealthColor(project.healthScore)}`}>
                    {project.healthScore || '--'}
                  </span>
                </div>
                
                <div className="col-span-2 text-sm text-gray-400">
                  {formatDate(project.updated)}
                </div>
                
                <div className="col-span-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-3 h-3" />
                    {project.team.length}
                  </div>
                </div>
                
                <div className="col-span-1">
                  <button
                    onClick={() => setShowProjectMenu(showProjectMenu === project.id ? null : project.id)}
                    className="p-1 hover:bg-white/10 rounded transition-colors relative"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' 
                ? 'No projects match your filters' 
                : 'No projects yet'
              }
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first project to get started'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Create First Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Project</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter project name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Describe the project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newProject.priority}
                  onChange={(e) => setNewProject(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low" className="bg-gray-800">Low Priority</option>
                  <option value="medium" className="bg-gray-800">Medium Priority</option>
                  <option value="high" className="bg-gray-800">High Priority</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newProject.timeline.start}
                    onChange={(e) => setNewProject(prev => ({ 
                      ...prev, 
                      timeline: { ...prev.timeline, start: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={newProject.timeline.end}
                    onChange={(e) => setNewProject(prev => ({ 
                      ...prev, 
                      timeline: { ...prev.timeline, end: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="project, development, frontend..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!newProject.name.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
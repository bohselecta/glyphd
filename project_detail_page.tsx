import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Edit3, Share2, Star, MoreVertical, Target, Code, Shield, 
  Users, Calendar, Tag, TrendingUp, Clock, CheckCircle, AlertTriangle,
  TreePine, Brain, Wand2, Rocket, Activity, GitBranch, Download,
  Plus, Play, Pause, Archive, Trash2, Settings, Eye, Send,
  FileText, Folder, Terminal, Database, Cloud, Zap, Award,
  Sparkles, Network, Globe, Lock, Key, Bell, MessageSquare
} from 'lucide-react';

// Mock project data - this would come from your data source
const mockProject = {
  id: 'proj_001',
  name: 'Q2 SaaS Marketing Campaign',
  description: 'Complete marketing strategy for product launch targeting enterprise customers with focus on North American market expansion',
  status: 'active',
  priority: 'high',
  created: '2024-01-15T10:00:00Z',
  updated: '2024-01-20T15:30:00Z',
  goals: 12,
  completedGoals: 8,
  codeFiles: 15,
  healthScore: 94,
  team: [
    { id: 'alex', name: 'Alex Chen', role: 'Product Manager', avatar: 'AC', status: 'online' },
    { id: 'sarah', name: 'Sarah Kim', role: 'Marketing Lead', avatar: 'SK', status: 'online' },
    { id: 'mike', name: 'Mike Rodriguez', role: 'Developer', avatar: 'MR', status: 'away' },
    { id: 'lisa', name: 'Lisa Wang', role: 'Designer', avatar: 'LW', status: 'offline' }
  ],
  tags: ['marketing', 'saas', 'q2', 'enterprise', 'campaigns'],
  timeline: {
    start: '2024-01-15T00:00:00Z',
    end: '2024-03-31T23:59:59Z',
    milestones: [
      { id: 1, name: 'Market Research Complete', date: '2024-02-01', completed: true },
      { id: 2, name: 'Campaign Strategy Finalized', date: '2024-02-15', completed: true },
      { id: 3, name: 'Content Creation Phase', date: '2024-03-01', completed: false },
      { id: 4, name: 'Launch Campaign', date: '2024-03-15', completed: false }
    ]
  },
  starred: true,
  budget: 75000,
  spent: 28500,
  recentActivity: [
    {
      id: 1,
      type: 'goal_completed',
      user: 'Sarah Kim',
      action: 'completed goal "Content Strategy Framework"',
      timestamp: '2024-01-20T14:30:00Z'
    },
    {
      id: 2,
      type: 'file_added',
      user: 'Mike Rodriguez',
      action: 'added 3 new code files to landing page components',
      timestamp: '2024-01-20T11:15:00Z'
    },
    {
      id: 3,
      type: 'health_improved',
      user: 'System',
      action: 'project health score improved from 91 to 94',
      timestamp: '2024-01-20T09:45:00Z'
    },
    {
      id: 4,
      type: 'team_joined',
      user: 'Lisa Wang',
      action: 'joined the project team',
      timestamp: '2024-01-19T16:20:00Z'
    }
  ],
  integrations: {
    github: { connected: true, repo: 'company/marketing-campaign', commits: 23 },
    slack: { connected: true, channel: '#q2-marketing', messages: 156 },
    jira: { connected: false, tickets: 0 },
    figma: { connected: true, files: 8 }
  }
};

const ProjectDetailPage = () => {
  const [project] = useState(mockProject);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'goals', name: 'Goals', icon: TreePine, badge: `${project.completedGoals}/${project.goals}` },
    { id: 'code', name: 'Code', icon: Code, badge: project.codeFiles },
    { id: 'health', name: 'Health', icon: Shield, badge: project.healthScore },
    { id: 'team', name: 'Team', icon: Users, badge: project.team.length },
    { id: 'activity', name: 'Activity', icon: Activity }
  ];

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCompletionPercentage = () => {
    return project.goals > 0 ? Math.round((project.completedGoals / project.goals) * 100) : 0;
  };

  const getBudgetPercentage = () => {
    return Math.round((project.spent / project.budget) * 100);
  };

  const renderOverviewTab = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-indigo-400" />
              <div>
                <div className="text-xl font-bold">{project.completedGoals}/{project.goals}</div>
                <div className="text-sm text-gray-400">Goals Progress</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Code className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-xl font-bold">{project.codeFiles}</div>
                <div className="text-sm text-gray-400">Code Files</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-xl font-bold">{project.healthScore}/100</div>
                <div className="text-sm text-gray-400">Health Score</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-xl font-bold">{project.team.length}</div>
                <div className="text-sm text-gray-400">Team Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Project Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Goals Completion</span>
                <span className="text-sm font-medium">{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Budget Utilization</span>
                <span className="text-sm font-medium">{getBudgetPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getBudgetPercentage()}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>${project.spent.toLocaleString()} spent</span>
                <span>${project.budget.toLocaleString()} budget</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Milestones */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Timeline & Milestones
          </h3>
          
          <div className="space-y-3">
            {project.timeline.milestones.map(milestone => (
              <div key={milestone.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  milestone.completed ? 'bg-green-400' : 'bg-gray-600'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{milestone.name}</div>
                  <div className="text-sm text-gray-400">Due: {formatDate(milestone.date)}</div>
                </div>
                {milestone.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button className="p-4 bg-emerald-600/20 border border-emerald-500/30 rounded-lg text-left hover:bg-emerald-600/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <TreePine className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">Open Memory Tree</span>
              </div>
              <div className="text-sm text-gray-400">Plan and visualize project goals</div>
            </button>
            
            <button className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg text-left hover:bg-purple-600/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="font-medium">AI Analysis</span>
              </div>
              <div className="text-sm text-gray-400">Get superintelligent insights</div>
            </button>
            
            <button className="p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-left hover:bg-indigo-600/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Wand2 className="w-5 h-5 text-indigo-400" />
                <span className="font-medium">Canvas Writer</span>
              </div>
              <div className="text-sm text-gray-400">Enhanced AI code generation</div>
            </button>
            
            <button className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-left hover:bg-green-600/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-medium">Health Audit</span>
              </div>
              <div className="text-sm text-gray-400">Run fractal auditor analysis</div>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Project Info */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4">Project Information</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Created:</span>
              <span>{formatDate(project.created)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated:</span>
              <span>{formatDate(project.updated)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timeline:</span>
              <span>{formatDate(project.timeline.start)} - {formatDate(project.timeline.end)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Budget:</span>
              <span>${project.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Members</h3>
            <button 
              onClick={() => setShowTeamModal(true)}
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Manage
            </button>
          </div>
          
          <div className="space-y-3">
            {project.team.map(member => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  member.status === 'online' ? 'bg-green-400' :
                  member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-600'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Network className="w-4 h-4" />
            Integrations
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span className="text-sm">GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                {project.integrations.github.connected && (
                  <span className="text-xs text-green-400">{project.integrations.github.commits} commits</span>
                )}
                <div className={`w-2 h-2 rounded-full ${
                  project.integrations.github.connected ? 'bg-green-400' : 'bg-gray-600'
                }`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Slack</span>
              </div>
              <div className="flex items-center gap-2">
                {project.integrations.slack.connected && (
                  <span className="text-xs text-green-400">{project.integrations.slack.messages} messages</span>
                )}
                <div className={`w-2 h-2 rounded-full ${
                  project.integrations.slack.connected ? 'bg-green-400' : 'bg-gray-600'
                }`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Jira</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                project.integrations.jira.connected ? 'bg-green-400' : 'bg-gray-600'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      {project.recentActivity.map(activity => (
        <div key={activity.id} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
            {activity.user.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(activity.timestamp).toLocaleString()}
            </div>
          </div>
          <div className={`w-2 h-2 rounded-full mt-2 ${
            activity.type === 'goal_completed' ? 'bg-green-400' :
            activity.type === 'file_added' ? 'bg-blue-400' :
            activity.type === 'health_improved' ? 'bg-yellow-400' : 'bg-purple-400'
          }`} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              {project.starred && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
            </div>
            <p className="text-gray-400">{project.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProjectMenu(!showProjectMenu)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              {showProjectMenu && (
                <div className="absolute right-0 top-10 bg-gray-900 border border-white/20 rounded-lg shadow-xl z-10 min-w-48">
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Project
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <div className="border-t border-white/10 mt-1">
                    <button className="w-full text-left px-4 py-2 hover:bg-red-600/20 text-red-400 transition-colors flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-4">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {getCompletionPercentage()}% Complete
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-400 text-indigo-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                  {tab.badge && (
                    <span className="px-2 py-1 bg-white/10 rounded text-xs">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && renderOverviewTab()}
          
          {activeTab === 'goals' && (
            <div className="text-center py-20">
              <TreePine className="w-16 h-16 mx-auto mb-4 text-emerald-400 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Goals Management</h3>
              <p className="text-gray-400 mb-6">View and manage project goals with Memory Tree integration</p>
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                Open Memory Tree
              </button>
            </div>
          )}
          
          {activeTab === 'code' && (
            <div className="text-center py-20">
              <Code className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Code Management</h3>
              <p className="text-gray-400 mb-6">AI-enhanced code generation and management</p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  Canvas Writer
                </button>
                <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                  Code Project
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'health' && (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-400 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Project Health: {project.healthScore}/100</h3>
              <p className="text-gray-400 mb-6">Fractal auditing and self-healing architecture monitoring</p>
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                Run Full Audit
              </button>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.team.map(member => (
                <div key={member.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-lg font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      member.status === 'online' ? 'bg-green-400' :
                      member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-600/30 transition-all text-sm">
                      Message
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-gray-400 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 border-dashed flex flex-col items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400 mb-2" />
                <button className="text-gray-400 hover:text-white transition-colors">
                  Add Team Member
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'activity' && renderActivityTab()}
        </div>

        {/* Code Project CTA */}
        {activeTab === 'overview' && (
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Rocket className="w-10 h-10 text-orange-400" />
                <Zap className="w-8 h-8 text-yellow-400" />
                <Code className="w-10 h-10 text-red-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                Ready to Code This Project?
              </h2>
              
              <p className="text-gray-300 text-lg mb-6 max-w-md mx-auto">
                Use an LLM to generate the complete codebase for this project with superintelligent orchestration
              </p>
              
              <button className="px-8 py-4 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 hover:from-orange-700 hover:via-red-700 hover:to-yellow-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Launch Code Project
              </button>
              
              <div className="mt-4 text-sm text-gray-400">
                Health Score: {project.healthScore}/100 • Goals: {project.completedGoals}/{project.goals} • Ready for Generation
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
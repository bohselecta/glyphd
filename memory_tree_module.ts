'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { 
  TreePine, Target, Zap, Settings, Eye, Plus, Search, Brain,
  ChevronDown, ChevronUp, Edit3, Trash2, CheckCircle, Clock,
  AlertTriangle, Lightbulb, Sparkles, Network, Layers, Move,
  ZoomIn, ZoomOut, RotateCcw, Save, Download, Share2, 
  ArrowRight, ArrowDown, Minimize2, Maximize2, Smartphone,
  Globe, Crown, Shield, Activity, TrendingUp, Award, Star
} from 'lucide-react';
import type { ProjectGoal, GoalTree } from '@/types/project';

// Enhanced goal patterns with fractal intelligence
const FRACTAL_PATTERNS = {
  business_growth: {
    name: 'Business Growth Strategy',
    icon: TrendingUp,
    color: 'from-emerald-500 to-emerald-700',
    patterns: [
      'Market Expansion', 'Product Innovation', 'Customer Acquisition', 
      'Revenue Optimization', 'Operational Excellence', 'Strategic Partnerships'
    ],
    fractalDepth: 4,
    branchingFactor: 3,
    subPatterns: {
      'Market Expansion': [
        'Geographic Analysis', 'Competitive Research', 'Entry Strategy',
        'Local Partnerships', 'Regulatory Compliance', 'Market Testing'
      ],
      'Product Innovation': [
        'Customer Research', 'Feature Development', 'MVP Creation',
        'User Testing', 'Iteration Cycles', 'Launch Strategy'
      ]
    }
  },
  
  saas_launch: {
    name: 'SaaS Product Launch',
    icon: Globe,
    color: 'from-blue-500 to-blue-700',
    patterns: [
      'Product Strategy', 'Technical Development', 'Marketing Campaign',
      'Sales Operations', 'Customer Success', 'Analytics & Optimization'
    ],
    fractalDepth: 5,
    branchingFactor: 4,
    subPatterns: {
      'Product Strategy': [
        'Market Positioning', 'Feature Prioritization', 'Pricing Strategy',
        'Competitive Differentiation', 'Go-to-Market Plan'
      ],
      'Technical Development': [
        'Architecture Design', 'Core Features', 'API Development',
        'Security Implementation', 'Performance Optimization', 'Testing Strategy'
      ]
    }
  },
  
  campaign_execution: {
    name: 'Marketing Campaign',
    icon: Target,
    color: 'from-purple-500 to-purple-700',
    patterns: [
      'Campaign Strategy', 'Creative Development', 'Channel Management',
      'Audience Targeting', 'Performance Tracking', 'Optimization'
    ],
    fractalDepth: 4,
    branchingFactor: 3,
    subPatterns: {
      'Campaign Strategy': [
        'Objective Definition', 'Target Audience', 'Message Framework',
        'Channel Selection', 'Budget Allocation', 'Timeline Planning'
      ],
      'Creative Development': [
        'Brand Guidelines', 'Asset Creation', 'Content Strategy',
        'Visual Design', 'Copy Writing', 'Asset Testing'
      ]
    }
  }
};

interface MemoryTreeProps {
  projectId?: string;
  embedded?: boolean;
}

export default function MemoryTree({ projectId, embedded = false }: MemoryTreeProps) {
  const { 
    currentProject, 
    goals, 
    goalTree, 
    addGoal, 
    updateGoal, 
    deleteGoal,
    prerequisites 
  } = useProject();

  // Memory Tree State
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [granularity, setGranularity] = useState(3);
  const [focusedBranch, setFocusedBranch] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  
  // AI Enhancement State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // UI State
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-expand root nodes
  useEffect(() => {
    if (goalTree.length > 0) {
      const rootIds = goalTree.map(tree => tree.goal.id);
      setExpandedNodes(new Set(rootIds));
    }
  }, [goalTree]);

  // Detect goal pattern from project context
  const detectProjectPattern = useCallback(() => {
    if (!currentProject) return null;
    
    const name = currentProject.name.toLowerCase();
    const description = currentProject.description?.toLowerCase() || '';
    const techStack = currentProject.tech_stack;
    
    // Pattern detection logic
    if (name.includes('saas') || name.includes('product launch') || techStack?.frontend) {
      return FRACTAL_PATTERNS.saas_launch;
    }
    if (name.includes('campaign') || name.includes('marketing')) {
      return FRACTAL_PATTERNS.campaign_execution;
    }
    if (name.includes('growth') || name.includes('expansion') || name.includes('business')) {
      return FRACTAL_PATTERNS.business_growth;
    }
    
    // Default to business growth
    return FRACTAL_PATTERNS.business_growth;
  }, [currentProject]);

  // Generate AI-enhanced goal suggestions
  const generateAISuggestions = useCallback(async (parentGoal?: ProjectGoal) => {
    if (!currentProject) return;
    
    setIsAnalyzing(true);
    
    try {
      const pattern = detectProjectPattern();
      const context = {
        projectName: currentProject.name,
        projectGoal: parentGoal?.content || 'Main project objective',
        techStack: currentProject.tech_stack,
        industry: pattern?.name || 'Business',
        currentGoals: goals.length
      };
      
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const suggestions = generateFractalSuggestions(context, pattern, parentGoal);
      setAiSuggestions(suggestions);
      setShowSuggestions(true);
      
    } catch (error) {
      console.error('AI suggestion generation failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [currentProject, goals, detectProjectPattern]);

  const generateFractalSuggestions = (context: any, pattern: any, parentGoal?: ProjectGoal) => {
    const level = parentGoal ? parentGoal.level + 1 : 0;
    const maxSuggestions = Math.max(3, granularity);
    
    let suggestions: string[] = [];
    
    if (level === 0) {
      // Root level - use main pattern branches
      suggestions = pattern?.patterns.slice(0, maxSuggestions) || [
        'Strategic Planning', 'Implementation', 'Quality Assurance'
      ];
    } else if (level === 1 && pattern?.subPatterns && parentGoal) {
      // Second level - use sub-patterns
      const parentText = parentGoal.content;
      const matchingPattern = Object.keys(pattern.subPatterns).find(key => 
        parentText.toLowerCase().includes(key.toLowerCase())
      );
      
      if (matchingPattern) {
        suggestions = pattern.subPatterns[matchingPattern].slice(0, maxSuggestions);
      } else {
        suggestions = generateGenericSuggestions(parentGoal.content, maxSuggestions);
      }
    } else {
      // Deeper levels - generate contextual suggestions
      suggestions = generateGenericSuggestions(parentGoal?.content || '', maxSuggestions);
    }
    
    return suggestions.map((suggestion, index) => ({
      id: `suggestion_${Date.now()}_${index}`,
      content: suggestion,
      priority: Math.floor(Math.random() * 3) + 1,
      estimatedTime: generateTimeEstimate(level),
      confidence: 0.8 + Math.random() * 0.2,
      parentId: parentGoal?.id || null,
      level: level
    }));
  };

  const generateGenericSuggestions = (parentContent: string, count: number) => {
    const actionWords = ['Develop', 'Create', 'Implement', 'Optimize', 'Analyze', 'Execute'];
    const suggestions = [];
    
    for (let i = 0; i < count; i++) {
      const action = actionWords[i % actionWords.length];
      suggestions.push(`${action} ${parentContent.toLowerCase()} component ${i + 1}`);
    }
    
    return suggestions;
  };

  const generateTimeEstimate = (level: number) => {
    const timeRanges = [
      ['8-12 weeks', '12-16 weeks', '16-24 weeks'], // Root level
      ['2-4 weeks', '3-6 weeks', '4-8 weeks'],     // Level 1
      ['1-2 weeks', '2-3 weeks', '1-4 weeks'],     // Level 2
      ['3-5 days', '1-2 weeks', '5-10 days'],      // Level 3+
    ];
    
    const levelIndex = Math.min(level, timeRanges.length - 1);
    const options = timeRanges[levelIndex];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Handle goal creation
  const handleCreateGoal = async (goalData: { content: string; parentId?: string }) => {
    if (!currentProject) return;
    
    try {
      const parentGoal = goalData.parentId ? 
        goals.find(g => g.id === goalData.parentId) : null;
      
      const newGoal = await addGoal({
        content: goalData.content,
        parent_id: goalData.parentId || null,
        level: parentGoal ? parentGoal.level + 1 : 0,
        priority: 50,
        order_index: 0,
        metadata: {
          ai_generated: false,
          estimated_time: generateTimeEstimate(parentGoal ? parentGoal.level + 1 : 0),
          pattern_source: selectedPattern
        }
      });
      
      // Auto-expand parent node
      if (goalData.parentId) {
        setExpandedNodes(prev => new Set([...prev, goalData.parentId!]));
      }
      
      return newGoal;
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  // Handle AI suggestion acceptance
  const handleAcceptSuggestion = async (suggestion: any) => {
    await handleCreateGoal({
      content: suggestion.content,
      parentId: suggestion.parentId
    });
    
    // Remove accepted suggestion
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  // Tree rendering helpers
  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const toggleNodeSelection = (nodeId: string, multiSelect = false) => {
    setSelectedNodes(prev => {
      const newSet = new Set(multiSelect ? prev : []);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Filter goals based on search
  const filteredGoalTree = useMemo(() => {
    if (!searchTerm) return goalTree;
    
    const filterTree = (tree: GoalTree): GoalTree | null => {
      const matchesSearch = tree.goal.content.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredChildren = tree.children.map(filterTree).filter(Boolean) as GoalTree[];
      
      if (matchesSearch || filteredChildren.length > 0) {
        return {
          ...tree,
          children: filteredChildren
        };
      }
      
      return null;
    };
    
    return goalTree.map(filterTree).filter(Boolean) as GoalTree[];
  }, [goalTree, searchTerm]);

  // Render tree node
  const renderTreeNode = (tree: GoalTree, depth = 0) => {
    const { goal } = tree;
    const isExpanded = expandedNodes.has(goal.id);
    const isSelected = selectedNodes.has(goal.id);
    const isFocused = focusedBranch === goal.id;
    const hasChildren = tree.children.length > 0;
    
    const getNodeColor = () => {
      if (goal.status === 'completed') return 'from-emerald-500 to-emerald-600';
      if (goal.status === 'in_progress') return 'from-blue-500 to-blue-600';
      if (isSelected) return 'from-purple-500 to-purple-600';
      if (depth === 0) return 'from-indigo-600 to-purple-700';
      if (depth === 1) return 'from-slate-600 to-slate-700';
      return 'from-slate-500 to-slate-600';
    };
    
    const getStatusIcon = () => {
      switch (goal.status) {
        case 'completed': return <CheckCircle className="w-3 h-3 text-emerald-400" />;
        case 'in_progress': return <Clock className="w-3 h-3 text-blue-400 animate-pulse" />;
        case 'blocked': return <AlertTriangle className="w-3 h-3 text-red-400" />;
        default: return null;
      }
    };

    return (
      <div key={goal.id} className="select-none">
        {/* Goal Node */}
        <div 
          className={`
            relative flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
            ${isFocused ? 'border-indigo-400 ring-2 ring-indigo-400/20' : 'border-white/20'}
            ${isSelected ? 'ring-1 ring-purple-400/50' : ''}
            hover:border-white/40 hover:bg-white/5 cursor-pointer group
          `}
          style={{ marginLeft: `${depth * (isMobile ? 16 : 24)}px` }}
          onClick={(e) => {
            e.stopPropagation();
            toggleNodeSelection(goal.id, e.ctrlKey || e.metaKey);
            setFocusedBranch(isFocused ? null : goal.id);
          }}
        >
          {/* Expansion Toggle */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeExpansion(goal.id);
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-400" /> :
                <ChevronRight className="w-4 h-4 text-gray-400" />
              }
            </button>
          )}
          
          {/* Goal Content */}
          <div className={`
            flex-1 px-3 py-2 rounded-lg bg-gradient-to-r ${getNodeColor()}
            border border-white/20 shadow-sm relative overflow-hidden
          `}>
            {/* Priority Indicator */}
            <div className="absolute top-1 right-1 flex items-center gap-1">
              {getStatusIcon()}
              <div className={`w-2 h-2 rounded-full ${
                goal.priority >= 80 ? 'bg-red-400' :
                goal.priority >= 60 ? 'bg-yellow-400' : 'bg-green-400'
              }`} />
            </div>
            
            {/* Goal Text */}
            <div className={`
              text-white font-medium
              ${depth === 0 ? 'text-base' : depth === 1 ? 'text-sm' : 'text-xs'}
              pr-8
            `}>
              {editingGoal === goal.id ? (
                <input
                  type="text"
                  value={goal.content}
                  onChange={(e) => updateGoal(goal.id, { content: e.target.value })}
                  onBlur={() => setEditingGoal(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setEditingGoal(null);
                    if (e.key === 'Escape') setEditingGoal(null);
                  }}
                  className="bg-transparent border-none outline-none w-full"
                  autoFocus
                />
              ) : (
                goal.content
              )}
            </div>
            
            {/* Metadata */}
            {!isMobile && goal.metadata?.estimated_time && (
              <div className="absolute bottom-1 right-2 text-[10px] text-white/70">
                {goal.metadata.estimated_time}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                generateAISuggestions(goal);
              }}
              className="p-1 hover:bg-indigo-600/20 rounded text-indigo-400 transition-colors"
              title="AI Suggestions"
            >
              <Brain className="w-3 h-3" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingGoal(goal.id);
              }}
              className="p-1 hover:bg-blue-600/20 rounded text-blue-400 transition-colors"
              title="Edit Goal"
            >
              <Edit3 className="w-3 h-3" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Delete this goal and all sub-goals?')) {
                  deleteGoal(goal.id);
                }
              }}
              className="p-1 hover:bg-red-600/20 rounded text-red-400 transition-colors"
              title="Delete Goal"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {tree.children.map(childTree => renderTreeNode(childTree, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!embedded && !currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <TreePine className="w-16 h-16 mx-auto mb-4 text-emerald-400 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No Project Selected</h2>
          <p className="text-gray-400">Select a project to view its Memory Tree</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${embedded ? '' : 'min-h-screen'} bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white ${embedded ? '' : 'p-6'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        {!embedded && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <TreePine className="w-8 h-8 text-emerald-400" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                    Memory Tree
                  </h1>
                  <p className="text-sm text-gray-400">
                    {currentProject?.name} • Fractal Goal Planning
                  </p>
                </div>
              </div>
              
              {prerequisites && !prerequisites.all_clear && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Prerequisites needed for AI generation
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search goals..."
                  className="bg-transparent border-none outline-none text-white text-sm w-32 placeholder-gray-400"
                />
              </div>
              
              <button
                onClick={() => generateAISuggestions()}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 
                           disabled:from-gray-600 disabled:to-gray-700 rounded-lg transition-all flex items-center gap-2 text-sm"
              >
                <Brain className="w-4 h-4" />
                {isAnalyzing ? 'Analyzing...' : 'AI Suggest'}
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </div>
          </div>
        )}

        {/* AI Suggestions Panel */}
        {showSuggestions && aiSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg border border-indigo-500/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold text-indigo-200">AI Goal Suggestions</span>
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiSuggestions.map(suggestion => (
                <div key={suggestion.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="font-medium text-sm mb-2">{suggestion.content}</div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>{suggestion.estimatedTime}</span>
                    <span>{Math.round(suggestion.confidence * 100)}% confidence</span>
                  </div>
                  <button
                    onClick={() => handleAcceptSuggestion(suggestion)}
                    className="w-full px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-600/30 transition-all text-xs"
                  >
                    Add Goal
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tree Visualization */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          {filteredGoalTree.length > 0 ? (
            <div className="space-y-4">
              {/* Tree Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold">Project Goal Tree</span>
                  <span className="text-sm text-gray-400">
                    {goals.length} goals • {goals.filter(g => g.status === 'completed').length} completed
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCompactMode(!compactMode)}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Toggle Compact Mode"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setExpandedNodes(new Set(goals.map(g => g.id)))}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Expand All"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Tree Nodes */}
              <div className="space-y-3">
                {filteredGoalTree.map(tree => renderTreeNode(tree, 0))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <TreePine className="w-16 h-16 mx-auto mb-4 text-emerald-400 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? 'No matching goals found' : 'No goals yet'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Create your first goal to start building the memory tree'
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Create First Goal
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats and Insights */}
        {goals.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-400" />
                <div>
                  <div className="text-lg font-bold">
                    {Math.round((goals.filter(g => g.status === 'completed').length / goals.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Completion Rate</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-lg font-bold">
                    {Math.max(...goals.map(g => g.level), 0) + 1}
                  </div>
                  <div className="text-sm text-gray-400">Tree Depth</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="text-lg font-bold">
                    {goals.filter(g => g.metadata?.ai_generated).length}
                  </div>
                  <div className="text-sm text-gray-400">AI Generated</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Goal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Goal</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const content = formData.get('content') as string;
                const parentId = formData.get('parentId') as string;
                
                if (content.trim()) {
                  handleCreateGoal({
                    content: content.trim(),
                    parentId: parentId || undefined
                  });
                  setShowCreateModal(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Goal Description</label>
                <textarea
                  name="content"
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Describe what you want to achieve..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Parent Goal (Optional)</label>
                <select
                  name="parentId"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="" className="bg-gray-800">Root Level Goal</option>
                  {goals.map(goal => (
                    <option key={goal.id} value={goal.id} className="bg-gray-800">
                      {'  '.repeat(goal.level)}{goal.content}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
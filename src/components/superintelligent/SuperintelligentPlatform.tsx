'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import {
  Target, Zap, Settings, Eye, Download, Share2, Plus, Search, Filter,
  BookOpen, Layers, Move, ZoomIn, ZoomOut, Menu, X, ChevronRight,
  Calendar, CheckSquare, MoreVertical, Copy, Edit3, Trash2, Star,
  Clock, Users, Tag, Archive, GitBranch, Shuffle, RotateCcw,
  Maximize2, Minimize2, Play, Pause, Award, TrendingUp, Brain,
  AlertTriangle, CheckCircle, XCircle, Lightbulb, Cpu, Database,
  Network, Gauge, Bot, User, MessageSquare, Rocket, Shield,
  Sparkles, Crown
} from 'lucide-react';

// Enhanced goal patterns with industry intelligence
const SUPERINTELLIGENT_PATTERNS = {
  saas_marketing: {
    name: 'SaaS Marketing Campaign',
    complexity: 4,
    timeline: '8-12 weeks',
    patterns: [
      'Market Intelligence', 'Content Strategy', 'Channel Strategy', 'Lead Generation',
      'Customer Journey', 'Performance Analytics', 'Budget Management', 'Team Coordination'
    ],
    contextualQuestions: [
      'What is your target customer segment (SMB, Mid-market, Enterprise)?',
      'What is your marketing budget range for this campaign?',
      'Do you have existing brand guidelines or need to develop them?',
      'What compliance requirements exist in your industry?'
    ],
    successMetrics: ['Lead Quality Score', 'CAC/LTV Ratio', 'Pipeline Velocity', 'Brand Awareness'],
    riskFactors: ['Market saturation', 'Competitive response', 'Budget overrun', 'Timeline compression']
  },

  product_development: {
    name: 'Product Development Cycle',
    complexity: 5,
    timeline: '12-24 weeks',
    patterns: [
      'Requirements Analysis', 'Technical Architecture', 'Design System', 'Development Sprint',
      'Quality Assurance', 'User Testing', 'Deployment Strategy', 'Post-Launch Support'
    ],
    contextualQuestions: [
      'What is the technical complexity level (MVP, Feature Enhancement, Platform)?',
      'Do you have existing technical debt that impacts this development?',
      'What are your security and compliance requirements?',
      'How will this integrate with your existing technology stack?'
    ],
    successMetrics: ['Time to Market', 'Code Quality Score', 'User Adoption Rate', 'Performance Metrics'],
    riskFactors: ['Technical complexity', 'Resource constraints', 'Integration challenges', 'User acceptance']
  },

  business_expansion: {
    name: 'Business Expansion Initiative',
    complexity: 5,
    timeline: '16-32 weeks',
    patterns: [
      'Market Research', 'Financial Planning', 'Legal Framework', 'Operational Setup',
      'Talent Acquisition', 'Partnership Strategy', 'Risk Management', 'Performance Tracking'
    ],
    contextualQuestions: [
      'What geographic markets are you targeting?',
      'What regulatory requirements exist in target markets?',
      'Do you have existing partnerships or need to build them?',
      'What is your risk tolerance for this expansion?'
    ],
    successMetrics: ['Market Penetration', 'Revenue Growth', 'ROI Timeline', 'Market Share'],
    riskFactors: ['Regulatory changes', 'Cultural barriers', 'Competition', 'Economic conditions']
  }
};

export default function SuperintelligentPlatform() {
  const {
    currentProject,
    goals,
    addGoal,
    latestHealth,
    prerequisites
  } = useProject();

  // Core State
  const [rootGoal, setRootGoal] = useState('');
  const [granularity, setGranularity] = useState(3);
  const [tree, setTree] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // AI Integration State
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tokensUsed, setTokensUsed] = useState({ total: 0, session: 0 });

  // Intelligence System State
  const [interventionTriggers, setInterventionTriggers] = useState([]);
  const [crystallizationData, setCrystallizationData] = useState(null);
  const [organizationalContext, setOrganizationalContext] = useState({
    industry: 'SaaS',
    teamSize: 'medium',
    stage: 'growth',
    previousGoals: []
  });

  // UI State
  const [focusedBranch, setFocusedBranch] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize root goal from current project
  useEffect(() => {
    if (currentProject && !rootGoal) {
      setRootGoal(currentProject.name);
    }
  }, [currentProject, rootGoal]);

  // Superintelligent Goal Analysis
  const superintelligentAnalysis = useCallback(async (goal) => {
    setIsAnalyzing(true);

    try {
      // Phase 1: Pattern Recognition
      const patternMatch = detectGoalPattern(goal);

      // Phase 2: Context Analysis
      const contextAnalysis = analyzeOrganizationalContext(goal, organizationalContext);

      // Phase 3: Crystallization
      const crystallization = await crystallizeGoal(goal, patternMatch, contextAnalysis);

      // Phase 4: Intervention Planning
      const interventions = planInterventions(crystallization);

      const analysis = {
        ...crystallization,
        pattern: patternMatch,
        context: contextAnalysis,
        interventions,
        confidence: calculateConfidence(crystallization),
        apiCost: estimateApiCost(goal.length, granularity)
      };

      setAiAnalysis(analysis);
      setCrystallizationData(crystallization);
      setInterventionTriggers(interventions);

      // Simulate token usage
      const tokens = Math.floor(goal.length * 2.5 + granularity * 50);
      setTokensUsed(prev => ({
        total: prev.total + tokens,
        session: prev.session + tokens
      }));

      return analysis;

    } catch (error) {
      console.error('Superintelligent analysis failed:', error);
      return simulateBasicAnalysis(goal);
    } finally {
      setIsAnalyzing(false);
    }
  }, [granularity, organizationalContext]);

  const detectGoalPattern = useCallback((goal) => {
    const lowerGoal = goal.toLowerCase();

    // Advanced pattern matching
    if (lowerGoal.includes('marketing') || lowerGoal.includes('campaign')) {
      return SUPERINTELLIGENT_PATTERNS.saas_marketing;
    }
    if (lowerGoal.includes('product') || lowerGoal.includes('develop')) {
      return SUPERINTELLIGENT_PATTERNS.product_development;
    }
    if (lowerGoal.includes('expansion') || lowerGoal.includes('launch')) {
      return SUPERINTELLIGENT_PATTERNS.business_expansion;
    }

    // Default to marketing for demo
    return SUPERINTELLIGENT_PATTERNS.saas_marketing;
  }, []);

  const analyzeOrganizationalContext = useCallback((goal, context) => {
    return {
      industryFit: context.industry === 'SaaS' ? 'high' : 'medium',
      teamSizeImpact: context.teamSize === 'medium' ? 'optimal' : 'challenging',
      stageAlignment: context.stage === 'growth' ? 'aligned' : 'requires-adjustment',
      historicalSuccess: Math.random() > 0.5 ? 'positive' : 'mixed',
      resourceAvailability: 'sufficient',
      timelineRealism: 'optimistic'
    };
  }, []);

  const crystallizeGoal = useCallback(async (goal, pattern, context) => {
    // This is where the magic happens - making goals unique and actionable
    const crystallized = {
      originalGoal: goal,
      crystallizedGoal: `${goal} targeting ${organizationalContext.industry} customers through ${pattern.patterns[0]} and ${pattern.patterns[1]}, with ${context.teamSizeImpact} team capacity and ${context.stageAlignment} business stage alignment`,
      uniqueConstraints: [
        `${organizationalContext.industry} industry compliance requirements`,
        `${organizationalContext.teamSize} team coordination complexity`,
        `${organizationalContext.stage} stage resource allocation patterns`
      ],
      keyDifferentiators: [
        'Company-specific market position',
        'Existing customer relationship dynamics',
        'Technical infrastructure capabilities',
        'Competitive landscape positioning'
      ],
      criticalDecisionPoints: pattern.contextualQuestions,
      successProbability: Math.floor(Math.random() * 3) + 7, // 7-9 range
      timeline: pattern.timeline,
      complexity: pattern.complexity,
      riskFactors: pattern.riskFactors
    };

    return crystallized;
  }, [organizationalContext]);

  const planInterventions = useCallback((crystallization) => {
    const interventions = [];

    // Low confidence triggers
    if (crystallization.successProbability < 7) {
      interventions.push({
        type: 'confidence',
        priority: 'high',
        message: 'Low success probability detected. Human strategy review recommended.',
        action: 'schedule_review'
      });
    }

    // Complexity triggers
    if (crystallization.complexity > 4) {
      interventions.push({
        type: 'complexity',
        priority: 'medium',
        message: 'High complexity goal. Consider breaking into smaller milestones.',
        action: 'suggest_breakdown'
      });
    }

    // Risk triggers
    if (crystallization.riskFactors.length > 3) {
      interventions.push({
        type: 'risk',
        priority: 'medium',
        message: 'Multiple risk factors identified. Risk mitigation planning advised.',
        action: 'create_risk_plan'
      });
    }

    return interventions;
  }, []);

  const calculateConfidence = useCallback((crystallization) => {
    let confidence = 0.8; // Base confidence

    // Adjust based on various factors
    if (crystallization.successProbability > 7) confidence += 0.1;
    if (crystallization.complexity < 4) confidence += 0.05;
    if (crystallization.riskFactors.length < 3) confidence += 0.05;

    return Math.min(confidence, 1.0);
  }, []);

  const estimateApiCost = useCallback((goalLength, granularity) => {
    const baseTokens = goalLength * 2.5;
    const complexityTokens = granularity * 100;
    const totalTokens = baseTokens + complexityTokens;

    // Estimate cost at $0.03 per 1K tokens (GPT-4 pricing)
    return (totalTokens / 1000) * 0.03;
  }, []);

  const simulateBasicAnalysis = useCallback((goal) => {
    return {
      originalGoal: goal,
      crystallizedGoal: goal + ' (basic analysis)',
      confidence: 0.6,
      successProbability: 6,
      complexity: 3,
      timeline: '8-12 weeks',
      pattern: SUPERINTELLIGENT_PATTERNS.saas_marketing
    };
  }, []);

  // Generate Enhanced Goal Tree
  const generateSuperTree = useCallback(async (goal, analysis) => {
    if (!currentProject) return;

    setIsGenerating(true);

    try {
      // Use the project context to generate goals
      const pattern = analysis?.pattern || SUPERINTELLIGENT_PATTERNS.saas_marketing;

      // Create root goal if it doesn't exist
      const rootGoals = goals.filter(g => !g.parent_id);
      if (rootGoals.length === 0) {
        await addGoal({
          content: analysis?.crystallizedGoal || goal,
          parent_id: null,
          level: 0,
          priority: 90,
          metadata: {
            ai_generated: true,
            pattern_source: pattern.name,
            crystallized: true
          }
        });
      }

      // Generate sub-goals based on pattern
      const mainBranches = pattern.patterns.slice(0, Math.min(6, granularity + 3));

      for (const [index, branch] of mainBranches.entries()) {
        const existingGoal = goals.find(g => g.content.includes(branch));
        if (!existingGoal) {
          await addGoal({
            content: branch,
            parent_id: rootGoals[0]?.id || null,
            level: 1,
            priority: 80 - (index * 5),
            metadata: {
              ai_generated: true,
              pattern_source: pattern.name,
              estimated_time: '2-4 weeks'
            }
          });
        }
      }

    } catch (error) {
      console.error('Failed to generate goals:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [currentProject, goals, granularity, addGoal]);

  const handleGenerateTree = useCallback(async () => {
    if (!rootGoal.trim() || !currentProject) return;

    setIsGenerating(true);

    // Phase 1: Superintelligent Analysis
    const analysis = await superintelligentAnalysis(rootGoal);

    // Phase 2: Generate Enhanced Tree
    await generateSuperTree(rootGoal, analysis);

    setIsGenerating(false);
  }, [rootGoal, currentProject, superintelligentAnalysis, generateSuperTree]);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 text-indigo-400 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">No Project Selected</h2>
          <p className="text-gray-400">Select a project to access superintelligent analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Target className="w-8 h-8 text-indigo-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                <Brain className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                GLYPHD Superintelligent Platform
              </h1>
              <p className="text-[10px] text-gray-400">
                Goal Intelligence • Pattern Recognition • Auto-Crystallization • {currentProject.name}
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={rootGoal}
              onChange={(e) => setRootGoal(e.target.value)}
              placeholder="Enter your strategic goal..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
              <Gauge className="w-3 h-3 text-gray-400" />
              <input
                type="range"
                min="1"
                max="5"
                value={granularity}
                onChange={(e) => setGranularity(parseInt(e.target.value))}
                className="w-16 accent-indigo-500"
              />
              <span className="text-xs font-mono w-4 text-indigo-400">{granularity}</span>
            </div>

            <button
              onClick={handleGenerateTree}
              disabled={isGenerating || !rootGoal.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                         disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300
                         flex items-center gap-2 font-semibold text-sm relative overflow-hidden"
            >
              <Zap className="w-4 h-4" />
              {isGenerating ? (isAnalyzing ? 'AI Analyzing...' : 'Crystallizing...') : 'Generate Superintelligent Tree'}

              {/* AI processing animation */}
              {isGenerating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Analysis Panel */}
      {aiAnalysis && (
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border-b border-indigo-500/20 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold text-indigo-200">Superintelligent Analysis</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  {Math.round(aiAnalysis.confidence * 100)}% Confidence
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Tokens: {tokensUsed.session}</span>
                <span>Cost: ${aiAnalysis.apiCost?.toFixed(3) || '0.000'}</span>
                <span>Pattern: {aiAnalysis.pattern?.name}</span>
              </div>
            </div>

            {/* Crystallized Goal */}
            <div className="bg-white/5 rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                Crystallized Goal (AI-Enhanced)
              </div>
              <div className="text-sm text-white leading-relaxed">
                {crystallizationData?.crystallizedGoal || rootGoal}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400 mb-1">Success Rate</div>
                <div className="text-lg font-bold text-emerald-400">{aiAnalysis.successProbability}/10</div>
              </div>

              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400 mb-1">Complexity</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${
                      i < aiAnalysis.complexity ? 'bg-indigo-400' : 'bg-gray-600'
                    }`} />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400 mb-1">Timeline</div>
                <div className="text-sm font-medium text-white">{aiAnalysis.timeline}</div>
              </div>

              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400 mb-1">Risk Level</div>
                <div className="text-sm font-medium text-orange-400">
                  {crystallizationData?.riskFactors?.length || 0} factors
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-xs text-gray-400 mb-1">Interventions</div>
                <div className="text-sm font-medium text-yellow-400">
                  {interventionTriggers.length} planned
                </div>
              </div>
            </div>

            {/* Intervention Alerts */}
            {interventionTriggers.length > 0 && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Human Intervention Recommended</span>
                </div>
                <div className="space-y-1">
                  {interventionTriggers.map((trigger, index) => (
                    <div key={index} className="text-xs text-orange-200 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        trigger.priority === 'high' ? 'bg-red-400' : 'bg-yellow-400'
                      }`} />
                      {trigger.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current Goals Display */}
      <div className="flex-1 overflow-auto p-6">
        {goals.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-emerald-400" />
              Current Project Goals
            </h2>

            <div className="grid gap-4">
              {goals.filter(g => !g.parent_id).map(goal => (
                <div key={goal.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-300">{goal.content}</h3>
                    <div className="flex items-center gap-2">
                      {goal.metadata?.ai_generated && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          AI Generated
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${
                        goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        goal.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    Level {goal.level} • Priority {goal.priority} • {goal.metadata?.estimated_time || 'Time TBD'}
                  </div>

                  {/* Sub-goals */}
                  {goals.filter(g => g.parent_id === goal.id).length > 0 && (
                    <div className="mt-3 ml-4 space-y-2">
                      {goals.filter(g => g.parent_id === goal.id).map(subGoal => (
                        <div key={subGoal.id} className="p-2 bg-white/5 rounded border-l-2 border-indigo-400">
                          <div className="text-sm font-medium text-white">{subGoal.content}</div>
                          <div className="text-xs text-gray-400">
                            {subGoal.metadata?.estimated_time || 'Time TBD'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400 max-w-lg">
              <div className="relative mb-6">
                <Brain className="w-20 h-20 mx-auto opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Superintelligent Goal Creation
              </h3>
              <p className="text-sm leading-relaxed mb-6">
                Enter your strategic goal above and watch as our AI creates a crystallized,
                unique action plan tailored to your project's context and constraints.
              </p>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="bg-white/5 rounded-lg p-3">
                  <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="font-medium">Pattern Recognition</div>
                  <div className="text-gray-500">Industry-specific templates</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <Network className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="font-medium">Goal Crystallization</div>
                  <div className="text-gray-500">Unique, actionable goals</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="font-medium">Smart Interventions</div>
                  <div className="text-gray-500">Human guidance when needed</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-black/40 backdrop-blur-lg border-t border-white/10 p-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-3">
            <span className="font-medium">GLYPHD Superintelligent Platform v3.0</span>
            {currentProject && (
              <>
                <span>•</span>
                <span>Project: {currentProject.name}</span>
                <span>•</span>
                <span>{goals.length} goals configured</span>
                <span>•</span>
                <span className="text-green-400">{tokensUsed.session} tokens used</span>
                <span>•</span>
                <span className="text-indigo-400">
                  {interventionTriggers.length} interventions planned
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span>AI-Enhanced Goal Intelligence</span>
            <span>•</span>
            <span>Pattern Recognition Active</span>
            <span>•</span>
            <span className="text-purple-400">Crystallization Engine Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

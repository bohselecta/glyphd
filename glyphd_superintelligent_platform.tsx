import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  Target, Zap, Settings, Eye, Download, Share2, Plus, Search, Filter, 
  BookOpen, Layers, Move, ZoomIn, ZoomOut, Menu, X, ChevronRight, 
  Calendar, CheckSquare, MoreVertical, Copy, Edit3, Trash2, Star,
  Clock, Users, Tag, Archive, GitBranch, Shuffle, RotateCcw,
  Maximize2, Minimize2, Play, Pause, Award, TrendingUp, Brain,
  AlertTriangle, CheckCircle, XCircle, Lightbulb, Cpu, Database,
  Network, Gauge, Bot, User, MessageSquare, Rocket, Shield
} from 'lucide-react';

const GLYPHDSuperPlatform = () => {
  // Core State
  const [rootGoal, setRootGoal] = useState('Launch our Q2 marketing campaign for the new SaaS product');
  const [granularity, setGranularity] = useState(3);
  const [tree, setTree] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // AI Integration State
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    glyphd: ''
  });
  const [aiProvider, setAiProvider] = useState('simulation');
  const [tokensUsed, setTokensUsed] = useState({ total: 0, session: 0 });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
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
  const [viewMode, setViewMode] = useState('tree');
  const [focusedBranch, setFocusedBranch] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  const svgRef = useRef();

  // Enhanced Goal Patterns with Industry Intelligence
  const superintelligentPatterns = {
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

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Superintelligent Goal Analysis
  const superintelligentAnalysis = async (goal) => {
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
  };

  const detectGoalPattern = (goal) => {
    const lowerGoal = goal.toLowerCase();
    
    // Advanced pattern matching
    if (lowerGoal.includes('marketing') || lowerGoal.includes('campaign')) {
      return superintelligentPatterns.saas_marketing;
    }
    if (lowerGoal.includes('product') || lowerGoal.includes('develop')) {
      return superintelligentPatterns.product_development;
    }
    if (lowerGoal.includes('expansion') || lowerGoal.includes('launch')) {
      return superintelligentPatterns.business_expansion;
    }
    
    // Default to marketing for demo
    return superintelligentPatterns.saas_marketing;
  };

  const analyzeOrganizationalContext = (goal, context) => {
    return {
      industryFit: context.industry === 'SaaS' ? 'high' : 'medium',
      teamSizeImpact: context.teamSize === 'medium' ? 'optimal' : 'challenging',
      stageAlignment: context.stage === 'growth' ? 'aligned' : 'requires-adjustment',
      historicalSuccess: Math.random() > 0.5 ? 'positive' : 'mixed',
      resourceAvailability: 'sufficient',
      timelineRealism: 'optimistic'
    };
  };

  const crystallizeGoal = async (goal, pattern, context) => {
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
  };

  const planInterventions = (crystallization) => {
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
  };

  const calculateConfidence = (crystallization) => {
    let confidence = 0.8; // Base confidence
    
    // Adjust based on various factors
    if (crystallization.successProbability > 7) confidence += 0.1;
    if (crystallization.complexity < 4) confidence += 0.05;
    if (crystallization.riskFactors.length < 3) confidence += 0.05;
    
    return Math.min(confidence, 1.0);
  };

  const estimateApiCost = (goalLength, granularity) => {
    const baseTokens = goalLength * 2.5;
    const complexityTokens = granularity * 100;
    const totalTokens = baseTokens + complexityTokens;
    
    // Estimate cost at $0.03 per 1K tokens (GPT-4 pricing)
    return (totalTokens / 1000) * 0.03;
  };

  const simulateBasicAnalysis = (goal) => {
    return {
      originalGoal: goal,
      crystallizedGoal: goal + ' (basic analysis)',
      confidence: 0.6,
      successProbability: 6,
      complexity: 3,
      timeline: '8-12 weeks',
      pattern: superintelligentPatterns.saas_marketing
    };
  };

  // Generate Enhanced Goal Tree
  const generateSuperTree = useCallback(async (goal, analysis) => {
    const pattern = analysis?.pattern || superintelligentPatterns.saas_marketing;
    
    const createNode = (text, type = 'goal', level = 0, metadata = {}) => ({
      id: `${type}_${Math.random().toString(36).substr(2, 9)}`,
      text: text.length > (isMobile ? 25 : 40) ? text.substring(0, isMobile ? 22 : 37) + '...' : text,
      fullText: text,
      type,
      level,
      status: 'pending',
      priority: metadata.priority || Math.floor(Math.random() * 3) + 1,
      confidence: metadata.confidence || (analysis?.confidence || 0.8),
      estimatedTime: metadata.estimatedTime || calculateTimeEstimate(type, level),
      riskLevel: metadata.riskLevel || 'low',
      aiGenerated: true,
      interventionNeeded: metadata.interventionNeeded || false,
      children: []
    });

    const calculateTimeEstimate = (type, level) => {
      if (type === 'action') return `${Math.floor(Math.random() * 3) + 1}d`;
      if (level === 2) return `${Math.floor(Math.random() * 2) + 1}w`;
      return `${Math.floor(Math.random() * 4) + 2}w`;
    };

    const root = createNode(analysis?.crystallizedGoal || goal, 'root', 0, {
      confidence: analysis?.confidence || 0.8,
      priority: 5
    });

    // Generate intelligent sub-goals based on pattern
    const mainBranches = pattern.patterns.slice(0, Math.min(6, granularity + 3));
    
    root.children = mainBranches.map((branch, index) => {
      const branchNode = createNode(branch, 'main', 1, {
        priority: index < 3 ? 3 : 2,
        confidence: 0.85,
        interventionNeeded: index === 0 // First branch often needs human input
      });
      
      // Add sub-branches with intelligence
      const subBranches = generateIntelligentSubBranches(branch, pattern);
      branchNode.children = subBranches.map(subBranch => 
        createNode(subBranch, 'sub', 2, {
          confidence: 0.7,
          riskLevel: Math.random() > 0.7 ? 'medium' : 'low'
        })
      );
      
      return branchNode;
    });

    return root;
  }, [granularity, isMobile]);

  const generateIntelligentSubBranches = (parentBranch, pattern) => {
    const subBranchMap = {
      'Market Intelligence': [
        'Customer Segment Analysis', 'Competitive Positioning', 'Market Size Validation',
        'Pricing Strategy Research', 'Channel Partner Analysis'
      ],
      'Content Strategy': [
        'Brand Message Framework', 'Content Calendar Planning', 'Asset Production Pipeline',
        'Distribution Channel Mapping', 'Performance Metrics Setup'
      ],
      'Channel Strategy': [
        'Digital Channel Mix', 'Partner Channel Development', 'Direct Sales Support',
        'Attribution Model Design', 'Channel Optimization'
      ],
      'Lead Generation': [
        'Lead Scoring Model', 'Qualification Process', 'Nurture Campaign Design',
        'Conversion Optimization', 'Sales Handoff Process'
      ]
    };

    return subBranchMap[parentBranch] || [
      'Strategic Planning', 'Implementation Design', 'Execution Framework',
      'Quality Assurance', 'Performance Monitoring'
    ];
  };

  const handleGenerateTree = useCallback(async () => {
    if (!rootGoal.trim()) return;
    
    setIsGenerating(true);
    
    // Phase 1: Superintelligent Analysis
    const analysis = await superintelligentAnalysis(rootGoal);
    
    // Phase 2: Generate Enhanced Tree
    const newTree = await generateSuperTree(rootGoal, analysis);
    
    setTree(newTree);
    setFocusedBranch(null);
    setSelectedNodes(new Set());
    setIsGenerating(false);
  }, [rootGoal, generateSuperTree]);

  // Node Dimensions (Ultra-compact for information density)
  const getNodeDimensions = (node, isRoot = false) => {
    if (isMobile || compactMode) {
      return {
        width: isRoot ? 180 : node.type === 'main' ? 130 : node.type === 'sub' ? 110 : 95,
        height: isRoot ? 44 : node.type === 'main' ? 36 : 32,
        fontSize: isRoot ? 'text-xs' : node.type === 'main' ? 'text-[10px]' : 'text-[9px]'
      };
    }
    
    return {
      width: isRoot ? 220 : node.type === 'main' ? 160 : node.type === 'sub' ? 140 : 120,
      height: isRoot ? 52 : node.type === 'main' ? 40 : 36,
      fontSize: isRoot ? 'text-sm' : node.type === 'main' ? 'text-xs' : 'text-[10px]'
    };
  };

  const getSpacing = () => {
    if (isMobile || compactMode) {
      return { childSpacing: 160, levelSpacing: 80 };
    }
    return { childSpacing: 200, levelSpacing: 100 };
  };

  // Enhanced Tree Node Component
  const SuperTreeNode = ({ node, x = 0, y = 0, parentX = 0, isRoot = false }) => {
    const { width, height, fontSize } = getNodeDimensions(node, isRoot);
    const { childSpacing, levelSpacing } = getSpacing();
    
    const isSelected = selectedNodes.has(node.id);
    const isFocused = focusedBranch === node.id;
    const isInFocusedBranch = !focusedBranch || focusedBranch === node.id || 
                               findNodeInTree(tree, focusedBranch, node.id);
    
    const nodeOpacity = isInFocusedBranch ? 1 : 0.3;
    const isSearchMatch = !searchTerm || node.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    const getNodeColor = () => {
      if (node.interventionNeeded) return 'from-yellow-500 to-orange-500';
      if (node.status === 'completed') return 'from-emerald-500 to-emerald-600';
      if (node.status === 'in-progress') return 'from-blue-500 to-blue-600';
      if (isSelected) return 'from-purple-500 to-purple-600';
      if (isRoot) return 'from-indigo-600 to-purple-700';
      if (node.type === 'main') return 'from-slate-600 to-slate-700';
      if (node.type === 'sub') return 'from-slate-500 to-slate-600';
      return 'from-slate-400 to-slate-500';
    };
    
    const getConfidenceIndicator = () => {
      if (node.confidence >= 0.8) return 'bg-green-400';
      if (node.confidence >= 0.6) return 'bg-yellow-400';
      return 'bg-red-400';
    };

    const childrenStartX = x - (Math.max(node.children.length - 1, 0) * childSpacing) / 2;
    
    return (
      <g style={{ 
        opacity: nodeOpacity * (isSearchMatch ? 1 : 0.2), 
        transition: 'all 0.3s ease',
        transform: `scale(${zoom})`,
        transformOrigin: `${x}px ${y}px`
      }}>
        {/* Connection line */}
        {!isRoot && (
          <line
            x1={parentX}
            y1={y - levelSpacing + height}
            x2={x}
            y2={y}
            stroke={node.interventionNeeded ? '#f59e0b' : isFocused ? '#6366f1' : '#64748b'}
            strokeWidth={node.interventionNeeded ? 3 : isFocused ? 2 : 1}
            strokeDasharray={node.aiGenerated ? '2,2' : 'none'}
            className="transition-all duration-300"
            opacity={0.7}
          />
        )}
        
        {/* Node */}
        <foreignObject
          x={x - width / 2}
          y={y}
          width={width}
          height={height}
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (e.ctrlKey || e.metaKey) {
              const newSelected = new Set(selectedNodes);
              if (newSelected.has(node.id)) {
                newSelected.delete(node.id);
              } else {
                newSelected.add(node.id);
              }
              setSelectedNodes(newSelected);
            } else {
              setFocusedBranch(isFocused ? null : node.id);
            }
          }}
        >
          <div className={`
            h-full w-full rounded-lg bg-gradient-to-br ${getNodeColor()}
            border ${isFocused ? 'border-indigo-400 border-2' : 'border-white/20'}
            shadow-sm hover:shadow-lg transition-all duration-200
            flex flex-col justify-center p-2 relative overflow-hidden
            ${isFocused ? 'ring-1 ring-indigo-400/50' : ''}
            hover:scale-105 active:scale-95
          `}>
            {/* AI & Confidence Indicators */}
            <div className="absolute top-1 right-1 flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${getConfidenceIndicator()}`} />
              {node.aiGenerated && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
              {node.interventionNeeded && <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
            </div>
            
            {/* Risk indicator */}
            {node.riskLevel === 'medium' && (
              <div className="absolute top-1 left-1 text-[8px] text-yellow-300">⚠</div>
            )}
            
            {/* Node text */}
            <div className={`text-white ${fontSize} font-medium text-center leading-tight`}>
              {node.text}
            </div>
            
            {/* Time estimate */}
            {!isMobile && node.estimatedTime && node.type !== 'root' && (
              <div className="absolute bottom-0.5 right-1 text-[7px] text-white/70">
                {node.estimatedTime}
              </div>
            )}
          </div>
        </foreignObject>
        
        {/* Children */}
        {node.children.map((child, index) => (
          <SuperTreeNode
            key={child.id}
            node={child}
            x={childrenStartX + index * childSpacing}
            y={y + levelSpacing}
            parentX={x}
          />
        ))}
      </g>
    );
  };

  const findNodeInTree = (tree, targetId, searchId) => {
    if (!tree) return false;
    
    const search = (node) => {
      if (node.id === targetId) return findInSubtree(node, searchId);
      return node.children.some(search);
    };
    
    const findInSubtree = (node, id) => {
      if (node.id === id) return true;
      return node.children.some(child => findInSubtree(child, id));
    };
    
    return search(tree);
  };

  const calculateTreeDimensions = () => {
    if (!tree) return { width: 1000, height: 700 };
    
    const { childSpacing, levelSpacing } = getSpacing();
    const baseWidth = isMobile ? 800 : 1200;
    const maxWidth = Math.max(baseWidth, tree.children.length * childSpacing + 400);
    const maxDepth = getMaxDepth(tree);
    const height = Math.max(isMobile ? 500 : 700, maxDepth * levelSpacing + 200);
    
    return { width: maxWidth, height };
  };

  const getMaxDepth = (node, depth = 0) => {
    if (!node.children.length) return depth;
    return Math.max(...node.children.map(child => getMaxDepth(child, depth + 1)));
  };

  const { width, height } = calculateTreeDimensions();

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
              <p className="text-[10px] text-gray-400">Goal Intelligence • Pattern Recognition • Auto-Crystallization</p>
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
              onClick={() => setShowAIPanel(!showAIPanel)}
              className={`p-2.5 rounded-lg transition-colors ${
                showAIPanel ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              title="AI Analysis Panel"
            >
              <Brain className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleGenerateTree}
              disabled={isGenerating}
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
      {showAIPanel && aiAnalysis && (
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

      {/* Tree Visualization */}
      <div className="flex-1 overflow-auto relative">
        {tree ? (
          <div className="p-6 min-h-full flex items-start justify-center">
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="overflow-visible select-none"
              style={{ minWidth: width, minHeight: height }}
            >
              <defs>
                <filter id="superintelligentGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <pattern id="aiGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="url(#aiGradient)" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
                
                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#6366f1', stopOpacity:0.5}} />
                  <stop offset="100%" style={{stopColor:'#a855f7', stopOpacity:0.5}} />
                </linearGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#aiGrid)" />
              
              <SuperTreeNode
                node={tree}
                x={width / 2}
                y={60}
                isRoot={true}
              />
            </svg>
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
                unique action plan tailored to your organization's context and constraints.
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
            {tree && (
              <>
                <span>•</span>
                <span>{getMaxDepth(tree) + 1} levels deep</span>
                <span>•</span>
                <span>{(function countNodes(node) {
                  return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
                })(tree)} total nodes</span>
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
};

export default GLYPHDSuperPlatform;
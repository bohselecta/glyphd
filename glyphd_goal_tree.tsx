import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, Target, Zap, Settings, Eye } from 'lucide-react';

const GoalTreeDemo = () => {
  const [rootGoal, setRootGoal] = useState('Launch a successful tech startup');
  const [granularity, setGranularity] = useState(3);
  const [focusedBranch, setFocusedBranch] = useState(null);
  const [tree, setTree] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Goal decomposition patterns and logic
  const goalPatterns = {
    business: {
      patterns: [
        'Market Research & Validation',
        'Product Development',
        'Business Planning',
        'Funding & Investment',
        'Team Building',
        'Marketing & Sales',
        'Operations Setup',
        'Legal & Compliance'
      ],
      subPatterns: {
        'Market Research & Validation': [
          'Identify Target Market',
          'Competitive Analysis',
          'Customer Interviews',
          'Market Size Analysis',
          'Value Proposition Testing'
        ],
        'Product Development': [
          'MVP Design',
          'Technical Architecture',
          'User Experience Design',
          'Development Sprint Planning',
          'Quality Assurance'
        ],
        'Business Planning': [
          'Business Model Canvas',
          'Financial Projections',
          'Revenue Strategy',
          'Risk Assessment',
          'Milestone Planning'
        ]
      }
    },
    personal: {
      patterns: [
        'Goal Definition',
        'Skill Development',
        'Resource Acquisition',
        'Network Building',
        'Execution Planning',
        'Progress Tracking'
      ],
      subPatterns: {
        'Goal Definition': [
          'SMART Goals Framework',
          'Priority Ranking',
          'Success Metrics',
          'Timeline Setting'
        ],
        'Skill Development': [
          'Skill Gap Analysis',
          'Learning Path Design',
          'Practice Schedule',
          'Mentor Identification'
        ]
      }
    },
    project: {
      patterns: [
        'Project Initiation',
        'Planning & Design',
        'Resource Allocation',
        'Implementation',
        'Quality Control',
        'Delivery & Closure'
      ],
      subPatterns: {
        'Project Initiation': [
          'Stakeholder Identification',
          'Requirements Gathering',
          'Scope Definition',
          'Charter Approval'
        ],
        'Planning & Design': [
          'Work Breakdown Structure',
          'Timeline Development',
          'Risk Planning',
          'Communication Plan'
        ]
      }
    }
  };

  const detectGoalType = (goal) => {
    const businessKeywords = ['startup', 'business', 'company', 'market', 'revenue', 'profit'];
    const personalKeywords = ['learn', 'improve', 'develop', 'achieve', 'become'];
    const projectKeywords = ['build', 'create', 'implement', 'deliver', 'complete'];
    
    const lowerGoal = goal.toLowerCase();
    
    if (businessKeywords.some(keyword => lowerGoal.includes(keyword))) return 'business';
    if (personalKeywords.some(keyword => lowerGoal.includes(keyword))) return 'personal';
    if (projectKeywords.some(keyword => lowerGoal.includes(keyword))) return 'project';
    
    return 'business'; // default
  };

  const generateDetailedSteps = (category, maxDepth = 2, currentDepth = 0) => {
    if (currentDepth >= maxDepth) return [];
    
    const details = [
      'Research and analyze requirements',
      'Create detailed action plan',
      'Identify necessary resources',
      'Set specific deadlines',
      'Establish success criteria',
      'Begin implementation',
      'Monitor progress regularly',
      'Adjust strategy as needed'
    ];
    
    return details.slice(0, granularity + 1).map((detail, index) => ({
      id: `detail_${currentDepth}_${index}`,
      text: detail,
      type: 'action',
      children: currentDepth < maxDepth - 1 ? generateDetailedSteps(category, maxDepth, currentDepth + 1) : []
    }));
  };

  const generateGoalTree = useCallback((goal, depth = granularity) => {
    const goalType = detectGoalType(goal);
    const patterns = goalPatterns[goalType];
    
    const createNode = (text, type = 'goal', level = 0) => ({
      id: `node_${Math.random().toString(36).substr(2, 9)}`,
      text,
      type,
      level,
      children: []
    });
    
    const root = createNode(goal, 'root', 0);
    
    // Generate main branches
    const mainBranches = patterns.patterns.slice(0, Math.min(patterns.patterns.length, granularity + 3));
    
    root.children = mainBranches.map((branch, index) => {
      const branchNode = createNode(branch, 'main', 1);
      
      // Add sub-branches if they exist and depth allows
      if (depth > 1 && patterns.subPatterns[branch]) {
        const subBranches = patterns.subPatterns[branch].slice(0, granularity + 2);
        branchNode.children = subBranches.map((subBranch, subIndex) => {
          const subNode = createNode(subBranch, 'sub', 2);
          
          // Add detailed steps for highest granularity
          if (depth > 2) {
            subNode.children = generateDetailedSteps(goalType, Math.min(depth - 2, 2));
          }
          
          return subNode;
        });
      }
      
      return branchNode;
    });
    
    return root;
  }, [granularity]);

  const handleGenerateTree = useCallback(async () => {
    if (!rootGoal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate processing time for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newTree = generateGoalTree(rootGoal, granularity);
    setTree(newTree);
    setFocusedBranch(null);
    setIsGenerating(false);
  }, [rootGoal, granularity, generateGoalTree]);

  useEffect(() => {
    handleGenerateTree();
  }, [granularity]);

  const TreeNode = ({ node, x = 0, y = 0, parentX = 0, isRoot = false }) => {
    const nodeWidth = isRoot ? 280 : node.type === 'main' ? 220 : node.type === 'sub' ? 180 : 140;
    const nodeHeight = isRoot ? 60 : node.type === 'main' ? 50 : 40;
    const childSpacing = isRoot ? 300 : node.type === 'main' ? 250 : 200;
    const levelSpacing = isRoot ? 120 : 100;
    
    const isFocused = focusedBranch === node.id;
    const isInFocusedBranch = focusedBranch && (
      node.id === focusedBranch ||
      findNodeInTree(tree, focusedBranch, node.id)
    );
    
    const nodeOpacity = !focusedBranch || isInFocusedBranch ? 1 : 0.3;
    
    const getNodeColor = () => {
      if (isRoot) return 'from-purple-600 to-purple-800';
      if (node.type === 'main') return 'from-blue-500 to-blue-700';
      if (node.type === 'sub') return 'from-green-500 to-green-600';
      return 'from-orange-400 to-orange-500';
    };
    
    const getTextSize = () => {
      if (isRoot) return 'text-lg font-bold';
      if (node.type === 'main') return 'text-base font-semibold';
      if (node.type === 'sub') return 'text-sm font-medium';
      return 'text-xs';
    };
    
    const childrenStartX = x - (Math.max(node.children.length - 1, 0) * childSpacing) / 2;
    
    return (
      <g style={{ opacity: nodeOpacity, transition: 'all 0.3s ease' }}>
        {/* Connection line to parent */}
        {!isRoot && (
          <line
            x1={parentX}
            y1={y - levelSpacing + nodeHeight}
            x2={x}
            y2={y}
            stroke={isFocused ? '#fbbf24' : '#64748b'}
            strokeWidth={isFocused ? 3 : 2}
            className="transition-all duration-300"
          />
        )}
        
        {/* Node */}
        <foreignObject
          x={x - nodeWidth / 2}
          y={y}
          width={nodeWidth}
          height={nodeHeight}
          className="cursor-pointer"
          onClick={() => setFocusedBranch(isFocused ? null : node.id)}
        >
          <div className={`
            h-full w-full rounded-lg bg-gradient-to-r ${getNodeColor()}
            border-2 ${isFocused ? 'border-yellow-400' : 'border-white/20'}
            shadow-lg hover:shadow-xl transition-all duration-300
            flex items-center justify-center p-3
            ${isFocused ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
            hover:scale-105
          `}>
            <span className={`text-white text-center ${getTextSize()} leading-tight`}>
              {node.text}
            </span>
          </div>
        </foreignObject>
        
        {/* Children */}
        {node.children.map((child, index) => (
          <TreeNode
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
      if (node.id === targetId) {
        return findInSubtree(node, searchId);
      }
      return node.children.some(search);
    };
    
    const findInSubtree = (node, id) => {
      if (node.id === id) return true;
      return node.children.some(child => findInSubtree(child, id));
    };
    
    return search(tree);
  };

  const calculateTreeDimensions = () => {
    if (!tree) return { width: 800, height: 600 };
    
    const maxWidth = Math.max(1200, tree.children.length * 300 + 400);
    const maxDepth = getMaxDepth(tree);
    const height = Math.max(600, maxDepth * 120 + 200);
    
    return { width: maxWidth, height };
  };

  const getMaxDepth = (node, depth = 0) => {
    if (!node.children.length) return depth;
    return Math.max(...node.children.map(child => getMaxDepth(child, depth + 1)));
  };

  const { width, height } = calculateTreeDimensions();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              GLYPHD Goal Tree
            </h1>
          </div>
          
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={rootGoal}
              onChange={(e) => setRootGoal(e.target.value)}
              placeholder="Enter your primary goal..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-sm">Granularity:</span>
              <input
                type="range"
                min="1"
                max="5"
                value={granularity}
                onChange={(e) => setGranularity(parseInt(e.target.value))}
                className="w-20 accent-purple-500"
              />
              <span className="text-sm font-mono w-4">{granularity}</span>
            </div>
            
            <button
              onClick={handleGenerateTree}
              disabled={isGenerating}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 
                         rounded-lg transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      {focusedBranch && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-100">Branch Focus Mode Active</span>
            </div>
            <button
              onClick={() => setFocusedBranch(null)}
              className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Clear Focus
            </button>
          </div>
        </div>
      )}

      {/* Tree Visualization */}
      <div className="flex-1 overflow-auto">
        {tree ? (
          <div className="p-8 min-h-full flex items-start justify-center">
            <svg
              width={width}
              height={height}
              className="overflow-visible"
              style={{ minWidth: width, minHeight: height }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <TreeNode
                node={tree}
                x={width / 2}
                y={50}
                isRoot={true}
              />
            </svg>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Enter a goal above to generate your tree</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          <p>GLYPHD Goal Tree Demo • Click nodes to focus branches • Adjust granularity for detail levels</p>
        </div>
      </div>
    </div>
  );
};

export default GoalTreeDemo;
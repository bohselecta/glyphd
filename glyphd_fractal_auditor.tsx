import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Code, Cpu, Brain,
  Lock, Unlock, RefreshCw, Save, Undo, GitBranch, Zap, Eye,
  FileText, Folder, Settings, Target, Network, Layers, Box,
  ArrowUp, ArrowDown, ArrowRight, Play, Pause, RotateCcw,
  AlertCircle, Info, Clock, Workflow, Database, TreePine,
  Microscope, Globe, Activity, TrendingUp, Bot, User, Crown
} from 'lucide-react';

const GLYPHDFractalAuditor = () => {
  // Global State
  const [masterRules, setMasterRules] = useState(null);
  const [globalModerator, setGlobalModerator] = useState(null);
  const [auditResults, setAuditResults] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditPhase, setAuditPhase] = useState('');

  // Code Nodes State
  const [codeNodes, setCodeNodes] = useState([]);
  const [frozenNodes, setFrozenNodes] = useState(new Set());
  const [workingNodes, setWorkingNodes] = useState(new Map());
  const [pendingChanges, setPendingChanges] = useState([]);

  // UI State
  const [selectedNode, setSelectedNode] = useState(null);
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);
  const [viewMode, setViewMode] = useState('fractal'); // fractal, audit, rules

  // Master Rules Configuration
  const initializeMasterRules = () => {
    const rules = {
      id: 'master_constitution_v1',
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      
      // Core architectural principles
      architecture: {
        patterns: {
          stateManagement: 'React Context + useReducer',
          dataFlow: 'unidirectional',
          componentStructure: 'composition over inheritance',
          errorHandling: 'Result<T, Error> pattern',
          apiCommunication: 'fetch with error boundaries'
        },
        constraints: {
          maxComponentDepth: 3,
          maxPropsCount: 8,
          maxFileLength: 300,
          maxComplexity: 10
        }
      },
      
      // Code quality requirements
      quality: {
        typescript: {
          required: true,
          strictMode: true,
          noAny: true,
          noImplicitReturns: true
        },
        testing: {
          minCoverage: 85,
          requiredTests: ['unit', 'integration'],
          testFilePattern: '*.test.{ts,tsx}'
        },
        performance: {
          bundleSizeLimit: '50KB per route',
          renderTimeLimit: '16ms',
          memoryLeakPrevention: true
        }
      },
      
      // Fractal consistency rules
      fractal: {
        nodeStructure: {
          mustHave: ['interface', 'implementation', 'tests', 'documentation'],
          relationships: ['parent', 'children', 'dependencies', 'dependents'],
          immutability: 'frozen nodes cannot be modified directly'
        },
        coherence: {
          namingConsistency: true,
          patternConsistency: true,
          versionConsistency: true
        }
      },
      
      // Audit criteria
      audit: {
        healthChecks: [
          'typescript_compilation',
          'test_coverage',
          'performance_benchmarks',
          'dependency_analysis',
          'security_scan',
          'fractal_coherence'
        ],
        failureThresholds: {
          errors: 0,
          warnings: 5,
          performanceRegression: 10 // percent
        }
      }
    };
    
    setMasterRules(rules);
    return rules;
  };

  // Global Moderator System
  const initializeGlobalModerator = (rules) => {
    const moderator = {
      id: 'global_moderator_v1',
      status: 'active',
      
      // Validates all operations against master rules
      validateOperation: async (operation, context) => {
        const validation = {
          operation,
          timestamp: new Date().toISOString(),
          status: 'pending',
          violations: [],
          recommendations: []
        };
        
        // Check against architectural patterns
        if (operation.type === 'code_generation') {
          validation.violations = await checkArchitecturalViolations(operation.code, rules);
          validation.recommendations = await generateRecommendations(operation.code, rules);
        }
        
        // Check fractal coherence
        if (operation.type === 'node_modification') {
          const coherenceCheck = await checkFractalCoherence(operation.nodeId, operation.changes);
          validation.violations.push(...coherenceCheck.violations);
        }
        
        validation.status = validation.violations.length === 0 ? 'approved' : 'rejected';
        return validation;
      },
      
      // Prevents recursive loops
      preventRecursion: (operationChain) => {
        const operationTypes = operationChain.map(op => op.type);
        const cycles = detectCycles(operationTypes);
        
        if (cycles.length > 0) {
          return {
            blocked: true,
            reason: 'Recursive loop detected',
            cycles,
            recommendation: 'Collapse intent vector and reorganize'
          };
        }
        
        return { blocked: false };
      },
      
      // Manages global system coherence
      maintainCoherence: async (allNodes) => {
        const coherenceReport = {
          timestamp: new Date().toISOString(),
          globalHealth: 'unknown',
          issues: [],
          recommendations: []
        };
        
        // Check cross-node consistency
        const consistencyIssues = await checkCrossNodeConsistency(allNodes);
        coherenceReport.issues.push(...consistencyIssues);
        
        // Check dependency graph health
        const dependencyIssues = await analyzeDependencyGraph(allNodes);
        coherenceReport.issues.push(...dependencyIssues);
        
        // Calculate global health
        coherenceReport.globalHealth = coherenceReport.issues.length === 0 ? 'healthy' : 
                                      coherenceReport.issues.length < 5 ? 'warning' : 'critical';
        
        return coherenceReport;
      }
    };
    
    setGlobalModerator(moderator);
    return moderator;
  };

  // Initialize system
  useEffect(() => {
    const rules = initializeMasterRules();
    initializeGlobalModerator(rules);
    
    // Initialize with sample nodes
    const sampleNodes = [
      {
        id: 'content_strategy_root',
        type: 'root',
        title: 'Content Strategy System',
        status: 'frozen',
        health: 'healthy',
        children: ['content_calendar', 'asset_manager', 'analytics_dashboard'],
        files: ['ContentStrategy.tsx', 'types.ts', 'api.ts'],
        lastAudit: new Date().toISOString(),
        auditScore: 95
      },
      {
        id: 'content_calendar',
        type: 'component',
        title: 'Content Calendar',
        status: 'working',
        health: 'warning',
        parent: 'content_strategy_root',
        files: ['ContentCalendar.tsx', 'CalendarView.tsx', 'DatePicker.tsx'],
        issues: ['Performance: Re-renders on every props change', 'Missing: Error boundary'],
        lastAudit: new Date().toISOString(),
        auditScore: 78
      },
      {
        id: 'asset_manager',
        type: 'component', 
        title: 'Asset Manager',
        status: 'frozen',
        health: 'healthy',
        parent: 'content_strategy_root',
        files: ['AssetManager.tsx', 'AssetUpload.tsx', 'AssetLibrary.tsx'],
        lastAudit: new Date().toISOString(),
        auditScore: 92
      }
    ];
    
    setCodeNodes(sampleNodes);
    setFrozenNodes(new Set(['content_strategy_root', 'asset_manager']));
  }, []);

  // Top-Down Audit System
  const runTopDownAudit = async () => {
    setIsAuditing(true);
    setAuditPhase('Initializing global audit...');
    
    try {
      // Phase 1: Global Moderator Health Check
      setAuditPhase('Running global moderator health check...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const globalHealth = await globalModerator.maintainCoherence(codeNodes);
      
      // Phase 2: Individual Node Audits
      setAuditPhase('Auditing individual nodes...');
      const nodeAudits = [];
      
      for (const node of codeNodes) {
        setAuditPhase(`Auditing ${node.title}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const nodeAudit = await auditNode(node);
        nodeAudits.push(nodeAudit);
      }
      
      // Phase 3: Cross-Node Dependency Analysis
      setAuditPhase('Analyzing cross-node dependencies...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const dependencyAnalysis = await analyzeDependencyGraph(codeNodes);
      
      // Phase 4: Fractal Coherence Check
      setAuditPhase('Checking fractal coherence...');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const fractalCoherence = await checkFractalCoherence(codeNodes);
      
      // Compile final audit results
      const auditReport = {
        timestamp: new Date().toISOString(),
        globalHealth: globalHealth.globalHealth,
        overallScore: calculateOverallScore(nodeAudits),
        nodeAudits,
        dependencyAnalysis,
        fractalCoherence,
        recommendations: generateGlobalRecommendations(nodeAudits, dependencyAnalysis),
        actionItems: generateActionItems(nodeAudits)
      };
      
      setAuditResults(auditReport);
      
    } catch (error) {
      console.error('Audit failed:', error);
    } finally {
      setIsAuditing(false);
      setAuditPhase('');
    }
  };

  // Node-specific audit
  const auditNode = async (node) => {
    const audit = {
      nodeId: node.id,
      title: node.title,
      timestamp: new Date().toISOString(),
      status: 'pending',
      score: 0,
      checks: {
        typescript: { status: 'pending', score: 0, issues: [] },
        tests: { status: 'pending', score: 0, issues: [] },
        performance: { status: 'pending', score: 0, issues: [] },
        architecture: { status: 'pending', score: 0, issues: [] },
        fractal: { status: 'pending', score: 0, issues: [] }
      },
      health: 'unknown',
      actionItems: []
    };
    
    // Simulate individual checks
    for (const [checkName, check] of Object.entries(audit.checks)) {
      // Simulate check execution
      const result = await simulateHealthCheck(checkName, node);
      audit.checks[checkName] = result;
    }
    
    // Calculate overall score
    const scores = Object.values(audit.checks).map(check => check.score);
    audit.score = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    
    // Determine health status
    audit.health = audit.score >= 90 ? 'healthy' : 
                   audit.score >= 75 ? 'warning' : 'critical';
    
    // Generate action items
    audit.actionItems = generateNodeActionItems(audit.checks);
    
    return audit;
  };

  const simulateHealthCheck = async (checkType, node) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const results = {
      typescript: {
        status: node.id === 'content_calendar' ? 'warning' : 'healthy',
        score: node.id === 'content_calendar' ? 75 : 95,
        issues: node.id === 'content_calendar' ? ['Missing type annotations in CalendarView.tsx'] : []
      },
      tests: {
        status: node.id === 'content_calendar' ? 'critical' : 'healthy',
        score: node.id === 'content_calendar' ? 60 : 90,
        issues: node.id === 'content_calendar' ? ['Test coverage: 45% (below 85% threshold)'] : []
      },
      performance: {
        status: node.id === 'content_calendar' ? 'warning' : 'healthy',
        score: node.id === 'content_calendar' ? 70 : 88,
        issues: node.id === 'content_calendar' ? ['Component re-renders 15 times per user action'] : []
      },
      architecture: {
        status: 'healthy',
        score: 92,
        issues: []
      },
      fractal: {
        status: 'healthy',
        score: 85,
        issues: []
      }
    };
    
    return results[checkType] || { status: 'healthy', score: 90, issues: [] };
  };

  const generateNodeActionItems = (checks) => {
    const actionItems = [];
    
    Object.entries(checks).forEach(([checkName, check]) => {
      if (check.status !== 'healthy') {
        check.issues.forEach(issue => {
          actionItems.push({
            id: Math.random().toString(36).substr(2, 9),
            category: checkName,
            severity: check.status,
            description: issue,
            autoFixable: checkName === 'typescript' || checkName === 'performance',
            estimatedTime: checkName === 'tests' ? '2-4 hours' : '30-60 minutes'
          });
        });
      }
    });
    
    return actionItems;
  };

  const calculateOverallScore = (nodeAudits) => {
    const scores = nodeAudits.map(audit => audit.score);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  // Intelligent Fix All System
  const runIntelligentFixAll = async () => {
    if (!auditResults) return;
    
    setIsAuditing(true);
    setAuditPhase('Analyzing fixable issues...');
    
    try {
      // Collect all auto-fixable issues
      const autoFixableIssues = [];
      auditResults.nodeAudits.forEach(nodeAudit => {
        nodeAudit.actionItems.forEach(item => {
          if (item.autoFixable) {
            autoFixableIssues.push({
              ...item,
              nodeId: nodeAudit.nodeId,
              nodeTitle: nodeAudit.title
            });
          }
        });
      });
      
      if (autoFixableIssues.length === 0) {
        setAuditPhase('No auto-fixable issues found');
        return;
      }
      
      // Check for recursive loops before proceeding
      setAuditPhase('Checking for potential recursive loops...');
      const recursionCheck = globalModerator.preventRecursion(
        autoFixableIssues.map(issue => ({ type: 'auto_fix', target: issue.nodeId }))
      );
      
      if (recursionCheck.blocked) {
        setAuditPhase(`Fix blocked: ${recursionCheck.reason}`);
        return;
      }
      
      // Apply fixes one by one
      for (const issue of autoFixableIssues) {
        setAuditPhase(`Fixing: ${issue.description}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate fix application
        await applyAutoFix(issue);
      }
      
      setAuditPhase('Re-running audit to verify fixes...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Re-run audit to verify fixes
      await runTopDownAudit();
      
    } catch (error) {
      setAuditPhase(`Fix failed: ${error.message}`);
    } finally {
      setIsAuditing(false);
    }
  };

  const applyAutoFix = async (issue) => {
    // Simulate applying fix to the code
    // In reality, this would modify the actual code files
    console.log(`Applied fix for: ${issue.description}`);
  };

  // Node Management
  const upgradeNodeWithTemplate = async (nodeId) => {
    const node = codeNodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Create working copy
    const workingCopy = {
      ...node,
      id: `${nodeId}_working_${Date.now()}`,
      status: 'working',
      parent: nodeId,
      title: `${node.title} (Working Copy)`
    };
    
    setWorkingNodes(prev => new Map(prev.set(nodeId, workingCopy)));
    setSelectedNode(workingCopy);
  };

  const unfreezeNode = (nodeId) => {
    setFrozenNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(nodeId);
      return newSet;
    });
  };

  const freezeNode = (nodeId) => {
    setFrozenNodes(prev => new Set(prev.add(nodeId)));
  };

  // Impact Analysis
  const analyzeImpact = (nodeId, changes) => {
    const node = codeNodes.find(n => n.id === nodeId);
    if (!node) return null;
    
    // Simulate impact analysis
    const impact = {
      directlyAffected: node.children || [],
      indirectlyAffected: ['analytics_dashboard'], // Nodes that depend on this node
      newNodesRequired: [],
      mergingRequired: false,
      complexityIncrease: 'low',
      recommendations: [
        'Update type definitions in dependent components',
        'Regenerate test fixtures',
        'Update documentation'
      ]
    };
    
    return impact;
  };

  const getNodeHealthColor = (health) => {
    switch (health) {
      case 'healthy': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-indigo-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <Crown className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  GLYPHD Global Moderator
                </h1>
                <p className="text-sm text-gray-400">Fractal Code Auditor & Tautological Coherence Engine</p>
              </div>
            </div>
            
            {globalModerator && (
              <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Global Moderator Active</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 rounded-lg p-1">
              {['fractal', 'audit', 'rules'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 rounded text-sm transition-colors capitalize ${
                    viewMode === mode 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={runTopDownAudit}
              disabled={isAuditing}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                         disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300
                         flex items-center gap-2 font-semibold text-sm relative overflow-hidden"
            >
              <Microscope className="w-5 h-5" />
              {isAuditing ? 'Auditing...' : 'Run Global Audit'}
              
              {isAuditing && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Audit Status Bar */}
      {isAuditing && (
        <div className="bg-purple-900/30 border-b border-purple-500/20 p-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400 animate-spin" />
              <span className="text-sm text-purple-200">Global Audit in Progress</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-purple-300">{auditPhase}</div>
              <div className="w-full bg-purple-900/50 rounded-full h-1 mt-1">
                <div className="bg-purple-400 h-1 rounded-full animate-pulse" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {viewMode === 'fractal' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TreePine className="w-6 h-6 text-green-400" />
                  Fractal Code Structure
                </h2>
                
                {auditResults && (
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Overall Health Score: 
                      <span className={`ml-2 font-bold ${
                        auditResults.overallScore >= 90 ? 'text-green-400' :
                        auditResults.overallScore >= 75 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {auditResults.overallScore}/100
                      </span>
                    </div>
                    
                    <button
                      onClick={runIntelligentFixAll}
                      disabled={isAuditing}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 
                                 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                      <Zap className="w-4 h-4" />
                      Intelligent Fix All
                    </button>
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                {codeNodes.map(node => {
                  const nodeAudit = auditResults?.nodeAudits.find(audit => audit.nodeId === node.id);
                  const isWorking = workingNodes.has(node.id);
                  const isFrozen = frozenNodes.has(node.id);
                  
                  return (
                    <div
                      key={node.id}
                      className={`bg-white/5 rounded-lg border-l-4 p-4 transition-all duration-300 ${
                        nodeAudit ? 
                          (nodeAudit.health === 'healthy' ? 'border-green-400' :
                           nodeAudit.health === 'warning' ? 'border-yellow-400' : 'border-red-400') :
                          'border-gray-400'
                      } ${selectedNode?.id === node.id ? 'ring-2 ring-indigo-400' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {isFrozen ? <Lock className="w-4 h-4 text-blue-400" /> : <Unlock className="w-4 h-4 text-gray-400" />}
                            <span className="font-semibold">{node.title}</span>
                          </div>
                          
                          {nodeAudit && (
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getNodeHealthColor(nodeAudit.health)}`}>
                              {nodeAudit.health} ({nodeAudit.score}/100)
                            </div>
                          )}
                          
                          {isWorking && (
                            <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                              Working Copy
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isFrozen && (
                            <button
                              onClick={() => upgradeNodeWithTemplate(node.id)}
                              className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-xs transition-colors"
                            >
                              Upgrade Node
                            </button>
                          )}
                          
                          <button
                            onClick={() => setSelectedNode(node)}
                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded text-xs transition-colors"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-2">
                        Files: {node.files?.join(', ')}
                      </div>
                      
                      {nodeAudit?.actionItems && nodeAudit.actionItems.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="text-xs font-medium text-gray-300">Action Items:</div>
                          {nodeAudit.actionItems.slice(0, 3).map(item => (
                            <div key={item.id} className="flex items-center gap-2 text-xs">
                              <div className={`w-2 h-2 rounded-full ${
                                item.severity === 'critical' ? 'bg-red-400' :
                                item.severity === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                              }`} />
                              <span className="text-gray-300">{item.description}</span>
                              {item.autoFixable && (
                                <span className="text-green-400 text-[10px]">(Auto-fixable)</span>
                              )}
                            </div>
                          ))}
                          {nodeAudit.actionItems.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{nodeAudit.actionItems.length - 3} more items
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'audit' && auditResults && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-400" />
                Global Audit Results
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    Global Health
                  </h3>
                  <div className={`text-2xl font-bold ${
                    auditResults.globalHealth === 'healthy' ? 'text-green-400' :
                    auditResults.globalHealth === 'warning' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {auditResults.globalHealth.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Score: {auditResults.overallScore}/100
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Network className="w-4 h-4 text-green-400" />
                    Fractal Coherence
                  </h3>
                  <div className="text-2xl font-bold text-green-400">ALIGNED</div>
                  <div className="text-sm text-gray-400 mt-1">
                    All nodes following master patterns
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    Action Items
                  </h3>
                  <div className="text-2xl font-bold text-purple-400">
                    {auditResults.actionItems?.length || 0}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Items requiring attention
                  </div>
                </div>
              </div>
              
              {auditResults.recommendations && auditResults.recommendations.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-400" />
                    Global Recommendations
                  </h3>
                  <div className="space-y-2">
                    {auditResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-200">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === 'rules' && masterRules && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6 text-orange-400" />
                Master Rules Constitution
              </h2>
              
              <div className="bg-white/5 rounded-lg p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-400">Version: {masterRules.version}</div>
                  <div className="text-sm text-gray-400">Last Updated: {new Date(masterRules.lastUpdated).toLocaleDateString()}</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-indigo-400">Architecture Patterns</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(masterRules.architecture.patterns).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-green-400">Quality Standards</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">TypeScript Strict Mode:</span>
                        <span className="text-green-400">Required</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Min Test Coverage:</span>
                        <span className="text-green-400">{masterRules.quality.testing.minCoverage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bundle Size Limit:</span>
                        <span className="text-green-400">{masterRules.quality.performance.bundleSizeLimit}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-purple-400">Fractal Rules</h3>
                    <div className="space-y-2 text-sm">
                      {masterRules.fractal.nodeStructure.mustHave.map(requirement => (
                        <div key={requirement} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-purple-400" />
                          <span className="text-gray-300 capitalize">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="w-1/3 bg-black/20 border-l border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Node Inspector</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Title</label>
                <div className="text-white font-medium">{selectedNode.title}</div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Status</label>
                <div className={`inline-block px-2 py-1 rounded text-xs ${
                  selectedNode.status === 'frozen' ? 'bg-blue-500/20 text-blue-400' :
                  selectedNode.status === 'working' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedNode.status}
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400">Files</label>
                <div className="space-y-1 mt-1">
                  {selectedNode.files?.map(file => (
                    <div key={file} className="flex items-center gap-2 text-sm">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-300">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {frozenNodes.has(selectedNode.id) && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                    <Lock className="w-4 h-4" />
                    Frozen Node
                  </div>
                  <p className="text-xs text-yellow-200 mb-3">
                    This node is frozen and cannot be modified directly. Create an upgrade to make changes.
                  </p>
                  <button
                    onClick={() => upgradeNodeWithTemplate(selectedNode.id)}
                    className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm transition-colors"
                  >
                    Create Upgrade Node
                  </button>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowImpactAnalysis(!showImpactAnalysis)}
                  className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm transition-colors"
                >
                  Impact Analysis
                </button>
                
                <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              {showImpactAnalysis && (
                <div className="bg-white/5 rounded-lg p-3">
                  <h4 className="font-medium mb-2">Impact Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Directly Affected:</span>
                      <div className="text-gray-300">{selectedNode.children?.length || 0} child nodes</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Risk Level:</span>
                      <span className="text-green-400 ml-2">Low</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions (would be implemented in separate modules)
const checkArchitecturalViolations = async (code, rules) => {
  // Implementation for checking code against architectural rules
  return [];
};

const generateRecommendations = async (code, rules) => {
  // Implementation for generating recommendations
  return [];
};

const checkFractalCoherence = async (nodeId, changes) => {
  // Implementation for checking fractal coherence
  return { violations: [] };
};

const checkCrossNodeConsistency = async (nodes) => {
  // Implementation for cross-node consistency checks
  return [];
};

const analyzeDependencyGraph = async (nodes) => {
  // Implementation for dependency graph analysis
  return [];
};

const detectCycles = (operationTypes) => {
  // Implementation for cycle detection
  return [];
};

const generateGlobalRecommendations = (nodeAudits, dependencyAnalysis) => {
  // Implementation for generating global recommendations
  return [
    "Consider consolidating similar patterns across components",
    "Update TypeScript configuration for stricter type checking",
    "Implement automated performance monitoring"
  ];
};

const generateActionItems = (nodeAudits) => {
  // Implementation for generating action items
  const allItems = [];
  nodeAudits.forEach(audit => {
    allItems.push(...audit.actionItems);
  });
  return allItems;
};

export default GLYPHDFractalAuditor;
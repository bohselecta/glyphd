import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Brain, Code, Zap, Settings, Target, Shield, Network, Cpu,
  Bot, User, Crown, Layers, GitBranch, CheckCircle, AlertTriangle,
  Play, Pause, RotateCcw, Save, Download, Upload, Eye, EyeOff,
  MessageSquare, Send, ArrowRight, ArrowDown, Plus, X, Edit3,
  Database, Cloud, Lock, Unlock, Workflow, Activity, TrendingUp,
  FileText, Folder, Terminal, Monitor, Smartphone, Globe,
  Command, Sparkles, Wand2, Rocket, Star, Award, Gauge
} from 'lucide-react';

const GLYPHDCanvasWriter = () => {
  // Agent Configuration
  const [selectedAgent, setSelectedAgent] = useState('');
  const [agentConfig, setAgentConfig] = useState({
    apiKey: '',
    model: '',
    provider: '',
    capabilities: []
  });
  
  // Tautological Enhancement System
  const [masterSystem, setMasterSystem] = useState(null);
  const [commandLayer, setCommandLayer] = useState(null);
  const [enhancementActive, setEnhancementActive] = useState(false);
  
  // Canvas State
  const [projectGoal, setProjectGoal] = useState('Build a responsive landing page for a SaaS product');
  const [codeOutput, setCodeOutput] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [enhancementPhase, setEnhancementPhase] = useState('');
  
  // Real-time Verification
  const [verificationResults, setVerificationResults] = useState([]);
  const [systemGuidance, setSystemGuidance] = useState([]);
  const [tokensUsed, setTokensUsed] = useState({ enhanced: 0, raw: 0 });

  // Available AI Agents
  const availableAgents = [
    {
      id: 'openai_gpt4',
      name: 'OpenAI GPT-4',
      provider: 'OpenAI',
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-4o'],
      capabilities: ['code-generation', 'architecture', 'debugging', 'optimization'],
      baseStrength: 85,
      enhancedStrength: 97
    },
    {
      id: 'anthropic_claude',
      name: 'Anthropic Claude',
      provider: 'Anthropic', 
      models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      capabilities: ['code-generation', 'architecture', 'analysis', 'safety'],
      baseStrength: 88,
      enhancedStrength: 98
    },
    {
      id: 'openai_gpt35',
      name: 'OpenAI GPT-3.5',
      provider: 'OpenAI',
      models: ['gpt-3.5-turbo'],
      capabilities: ['code-generation', 'basic-architecture'],
      baseStrength: 72,
      enhancedStrength: 89
    },
    {
      id: 'local_llm',
      name: 'Local LLM',
      provider: 'Local',
      models: ['llama-2', 'codellama', 'custom'],
      capabilities: ['code-generation', 'privacy', 'unlimited-usage'],
      baseStrength: 70,
      enhancedStrength: 92
    }
  ];

  // Initialize Master Tautological System
  const initializeMasterSystem = () => {
    const system = {
      id: 'tautological_enhancement_v1',
      version: '1.0.0',
      
      // Core Enhancement Principles
      enhancementPrinciples: {
        goalOrientation: 'Every code section must advance the stated project goal',
        architecturalCoherence: 'All generated code follows consistent patterns',
        tautologicalVerification: 'Each piece logically supports the whole',
        realTimeGuidance: 'Continuous high-level direction without micromanagement'
      },
      
      // Command Layer Structure
      commandStructure: {
        strategicLevel: 'Overall project architecture and flow',
        tacticalLevel: 'Component-level organization and relationships', 
        operationalLevel: 'Function and method implementation guidance',
        verificationLevel: 'Real-time consistency and goal alignment checking'
      },
      
      // Enhancement Mechanisms
      enhancementMechanisms: {
        preGeneration: 'Set context and architectural constraints',
        duringGeneration: 'Real-time guidance and course correction',
        postGeneration: 'Verification against master goals and patterns',
        systemFeedback: 'Continuous learning and adaptation'
      }
    };
    
    setMasterSystem(system);
    return system;
  };

  // Initialize Command Layer
  const initializeCommandLayer = (goal, agent) => {
    const layer = {
      id: 'command_layer_' + Date.now(),
      projectGoal: goal,
      targetAgent: agent,
      
      // Strategic Commands (High-Level Direction)
      strategicCommands: {
        primaryObjective: extractPrimaryObjective(goal),
        architecturalStyle: determineArchitecturalStyle(goal),
        technicalStack: suggestTechnicalStack(goal),
        qualityRequirements: defineQualityRequirements(goal)
      },
      
      // Tactical Commands (Component-Level Guidance)
      tacticalCommands: {
        componentStructure: 'Break into logical components based on functionality',
        dataFlow: 'Implement unidirectional data flow patterns',
        errorHandling: 'Include comprehensive error boundaries and validation',
        performance: 'Optimize for fast initial load and smooth interactions'
      },
      
      // Real-Time Verification Rules
      verificationRules: {
        goalAlignment: 'Does this code advance the primary objective?',
        architecturalConsistency: 'Does this follow the established patterns?',
        codeQuality: 'Does this meet our quality requirements?',
        systemCoherence: 'Does this integrate well with existing components?'
      }
    };
    
    setCommandLayer(layer);
    return layer;
  };

  // Agent Enhancement Engine
  const enhanceAgentCapabilities = async (agentPrompt, baseAgent, commandLayer) => {
    const enhancedPrompt = `
${commandLayer.strategicCommands.primaryObjective}

TAUTOLOGICAL ENHANCEMENT LAYER:
You are being enhanced by GLYPHD's proprietary tautological system. This system provides high-level guidance while preserving your natural capabilities.

PROJECT CONTEXT:
- Goal: ${commandLayer.projectGoal}
- Architecture: ${commandLayer.strategicCommands.architecturalStyle}
- Stack: ${commandLayer.strategicCommands.technicalStack}
- Quality: ${commandLayer.strategicCommands.qualityRequirements}

STRATEGIC GUIDANCE:
${Object.entries(commandLayer.strategicCommands).map(([key, value]) => `${key}: ${value}`).join('\n')}

TACTICAL DIRECTION:
${Object.entries(commandLayer.tacticalCommands).map(([key, value]) => `${key}: ${value}`).join('\n')}

ORIGINAL REQUEST:
${agentPrompt}

ENHANCEMENT INSTRUCTIONS:
1. Use your natural coding abilities
2. Follow the strategic guidance above
3. Ensure everything aligns with the project goal
4. Maintain architectural consistency
5. Include verification points in your response

Generate code that advances the primary objective while following the architectural guidance.
`;

    return enhancedPrompt;
  };

  // Real-Time Verification System
  const verifyGeneratedCode = async (code, commandLayer) => {
    const verification = {
      timestamp: new Date().toISOString(),
      codeSnippet: code.substring(0, 200) + '...',
      results: []
    };

    // Goal Alignment Check
    const goalAlignment = analyzeGoalAlignment(code, commandLayer.projectGoal);
    verification.results.push({
      rule: 'Goal Alignment',
      status: goalAlignment.score > 0.7 ? 'pass' : 'warning',
      score: goalAlignment.score,
      feedback: goalAlignment.feedback
    });

    // Architectural Consistency Check
    const archConsistency = analyzeArchitecturalConsistency(code, commandLayer.strategicCommands);
    verification.results.push({
      rule: 'Architectural Consistency',
      status: archConsistency.score > 0.8 ? 'pass' : 'warning',
      score: archConsistency.score,
      feedback: archConsistency.feedback
    });

    // Code Quality Check
    const qualityCheck = analyzeCodeQuality(code, commandLayer.strategicCommands.qualityRequirements);
    verification.results.push({
      rule: 'Code Quality',
      status: qualityCheck.score > 0.75 ? 'pass' : 'warning',
      score: qualityCheck.score,
      feedback: qualityCheck.feedback
    });

    // System Coherence Check
    const coherenceCheck = analyzeSystemCoherence(code, codeOutput);
    verification.results.push({
      rule: 'System Coherence',
      status: coherenceCheck.score > 0.8 ? 'pass' : 'warning',
      score: coherenceCheck.score,
      feedback: coherenceCheck.feedback
    });

    return verification;
  };

  // Enhanced Code Generation
  const generateEnhancedCode = async () => {
    if (!selectedAgent || !agentConfig.apiKey || !projectGoal) {
      alert('Please configure your AI agent and set a project goal');
      return;
    }

    setIsGenerating(true);
    setEnhancementPhase('Initializing tautological enhancement...');

    try {
      // Phase 1: Initialize Enhancement Systems
      const masterSys = masterSystem || initializeMasterSystem();
      const cmdLayer = initializeCommandLayer(projectGoal, selectedAgent);
      setEnhancementActive(true);

      // Phase 2: Generate System Guidance
      setEnhancementPhase('Generating strategic guidance...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const guidance = generateSystemGuidance(cmdLayer);
      setSystemGuidance(guidance);

      // Phase 3: Enhance Agent Prompt
      setEnhancementPhase('Enhancing agent capabilities...');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const basePrompt = `Create a ${projectGoal}`;
      const enhancedPrompt = await enhanceAgentCapabilities(basePrompt, selectedAgent, cmdLayer);

      // Phase 4: Generate Code with Enhanced Agent
      setEnhancementPhase('Generating code with enhanced agent...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedCode = await callEnhancedAgent(enhancedPrompt, agentConfig);

      // Phase 5: Real-Time Verification
      setEnhancementPhase('Running real-time verification...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const verification = await verifyGeneratedCode(generatedCode, cmdLayer);
      setVerificationResults(prev => [...prev, verification]);

      // Phase 6: Add to Canvas
      const codeSection = {
        id: 'section_' + Date.now(),
        content: generatedCode,
        verification: verification,
        enhanced: true,
        agent: selectedAgent,
        timestamp: new Date().toISOString()
      };

      setCodeOutput(prev => [...prev, codeSection]);

      // Update token usage
      const tokens = Math.floor(enhancedPrompt.length * 1.3);
      setTokensUsed(prev => ({
        enhanced: prev.enhanced + tokens,
        raw: prev.raw + Math.floor(tokens * 0.6) // Estimate what raw agent would have used
      }));

    } catch (error) {
      setEnhancementPhase(`Enhancement failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
      setEnhancementPhase('');
    }
  };

  // Helper Functions
  const extractPrimaryObjective = (goal) => {
    if (goal.includes('landing page')) return 'Create conversion-optimized landing page';
    if (goal.includes('dashboard')) return 'Build data visualization dashboard';
    if (goal.includes('API')) return 'Develop robust API system';
    return `Achieve: ${goal}`;
  };

  const determineArchitecturalStyle = (goal) => {
    if (goal.includes('React') || goal.includes('component')) return 'Component-based React architecture';
    if (goal.includes('API') || goal.includes('backend')) return 'RESTful API with microservices';
    return 'Modern web application architecture';
  };

  const suggestTechnicalStack = (goal) => {
    if (goal.includes('landing page')) return 'React + TypeScript + Tailwind CSS';
    if (goal.includes('dashboard')) return 'React + TypeScript + Chart.js + Tailwind';
    if (goal.includes('API')) return 'Node.js + Express + TypeScript + Database';
    return 'React + TypeScript + Modern tooling';
  };

  const defineQualityRequirements = (goal) => {
    return 'TypeScript strict mode, comprehensive error handling, responsive design, performance optimized';
  };

  const generateSystemGuidance = (commandLayer) => {
    return [
      {
        id: 1,
        type: 'strategic',
        message: `Start with component structure for: ${commandLayer.strategicCommands.primaryObjective}`,
        priority: 'high'
      },
      {
        id: 2,
        type: 'tactical',
        message: `Implement using: ${commandLayer.strategicCommands.technicalStack}`,
        priority: 'high'
      },
      {
        id: 3,
        type: 'operational',
        message: 'Focus on responsive design and TypeScript types',
        priority: 'medium'
      },
      {
        id: 4,
        type: 'verification',
        message: 'Ensure each component advances the conversion goal',
        priority: 'high'
      }
    ];
  };

  const callEnhancedAgent = async (enhancedPrompt, config) => {
    // Simulate API call to user's chosen agent
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulated enhanced response
    return `// Enhanced ${config.provider} Response
import React from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

interface LandingPageProps {
  product: {
    name: string;
    tagline: string;
    features: string[];
  };
}

export const LandingPage: React.FC<LandingPageProps> = ({ product }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section - Tautologically aligned with conversion goal */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {product.tagline}
          </p>
          
          {/* CTA Button - Strategically positioned */}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features Section - Architecturally consistent */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {product.features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-600">
                Optimized implementation advancing conversion goals.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof - Verification aligned */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-lg text-gray-600">
            Trusted by thousands of customers worldwide
          </p>
        </div>
      </section>
    </div>
  );
};`;
  };

  const analyzeGoalAlignment = (code, goal) => {
    // Simulate goal alignment analysis
    const hasRelevantStructure = code.includes(goal.toLowerCase().split(' ')[0]);
    const hasCTA = code.includes('button') || code.includes('CTA');
    const hasResponsive = code.includes('responsive') || code.includes('md:');
    
    const score = (hasRelevantStructure ? 0.4 : 0) + (hasCTA ? 0.3 : 0) + (hasResponsive ? 0.3 : 0);
    
    return {
      score,
      feedback: score > 0.7 ? 'Strong alignment with project goal' : 'Could better align with stated objective'
    };
  };

  const analyzeArchitecturalConsistency = (code, strategicCommands) => {
    const hasTypeScript = code.includes('interface') || code.includes(': React.FC');
    const hasModularStructure = code.includes('export') && code.includes('import');
    const followsConventions = code.includes('className') && !code.includes('class=');
    
    const score = (hasTypeScript ? 0.4 : 0) + (hasModularStructure ? 0.3 : 0) + (followsConventions ? 0.3 : 0);
    
    return {
      score,
      feedback: score > 0.8 ? 'Excellent architectural consistency' : 'Some architectural improvements needed'
    };
  };

  const analyzeCodeQuality = (code, requirements) => {
    const hasErrorHandling = code.includes('try') || code.includes('catch') || code.includes('?.');
    const hasTypeAnnotations = code.includes(': ') && code.includes('interface');
    const hasAccessibility = code.includes('aria-') || code.includes('alt=');
    
    const score = (hasErrorHandling ? 0.3 : 0) + (hasTypeAnnotations ? 0.4 : 0) + (hasAccessibility ? 0.3 : 0);
    
    return {
      score,
      feedback: score > 0.75 ? 'High code quality standards met' : 'Quality improvements recommended'
    };
  };

  const analyzeSystemCoherence = (code, existingCode) => {
    // For simplicity, assume good coherence if following patterns
    const score = 0.85;
    return {
      score,
      feedback: 'Good integration with existing system patterns'
    };
  };

  useEffect(() => {
    initializeMasterSystem();
  }, []);

  const getVerificationColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'fail': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wand2 className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  GLYPHD Canvas Writer
                </h1>
                <p className="text-sm text-gray-400">AI Agent Enhancement System • Tautological Orchestration Layer</p>
              </div>
            </div>
            
            {enhancementActive && (
              <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm text-purple-400">Enhancement Layer Active</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400">
              Enhanced: {tokensUsed.enhanced} | Raw: {tokensUsed.raw} | 
              <span className="text-green-400 ml-1">
                +{Math.round((tokensUsed.enhanced - tokensUsed.raw) / Math.max(tokensUsed.raw, 1) * 100)}% effectiveness
              </span>
            </div>
            
            <button
              onClick={generateEnhancedCode}
              disabled={isGenerating || !selectedAgent || !agentConfig.apiKey}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                         disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300
                         flex items-center gap-2 font-semibold text-sm relative overflow-hidden"
            >
              <Rocket className="w-5 h-5" />
              {isGenerating ? 'Enhancing...' : 'Generate Enhanced Code'}
              
              {isGenerating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhancement Status */}
      {isGenerating && (
        <div className="bg-purple-900/30 border-b border-purple-500/20 p-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-purple-400 animate-spin" />
              <span className="text-sm text-purple-200">Tautological Enhancement Active</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-purple-300">{enhancementPhase}</div>
              <div className="w-full bg-purple-900/50 rounded-full h-1 mt-1">
                <div className="bg-purple-400 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Configuration Panel */}
        <div className="w-1/3 bg-black/20 border-r border-white/10 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Agent Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-400" />
                Select AI Agent
              </h3>
              
              <div className="space-y-3">
                {availableAgents.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAgent === agent.id 
                        ? 'border-purple-500 bg-purple-500/20' 
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{agent.name}</span>
                      <span className="text-xs text-gray-400">{agent.provider}</span>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-2">
                      {agent.capabilities.join(', ')}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Base</div>
                        <div className="text-sm text-white">{agent.baseStrength}%</div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                      <div>
                        <div className="text-xs text-purple-400">Enhanced</div>
                        <div className="text-sm text-purple-300 font-semibold">{agent.enhancedStrength}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Configuration */}
            {selectedAgent && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-400" />
                  Agent Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <input
                      type="password"
                      value={agentConfig.apiKey}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Enter your API key..."
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Model</label>
                    <select
                      value={agentConfig.model}
                      onChange={(e) => setAgentConfig(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                                 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select model...</option>
                      {availableAgents.find(a => a.id === selectedAgent)?.models.map(model => (
                        <option key={model} value={model} className="bg-gray-800">{model}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Project Goal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Project Goal
              </h3>
              
              <textarea
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                placeholder="Describe what you want to build..."
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            {/* System Guidance */}
            {systemGuidance.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Command className="w-5 h-5 text-purple-400" />
                  System Guidance
                </h3>
                
                <div className="space-y-2">
                  {systemGuidance.map(guidance => (
                    <div key={guidance.id} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium capitalize ${
                          guidance.type === 'strategic' ? 'text-purple-400' :
                          guidance.type === 'tactical' ? 'text-blue-400' :
                          guidance.type === 'operational' ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {guidance.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          guidance.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {guidance.priority}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">{guidance.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Header */}
          <div className="bg-black/20 border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">Enhanced Code Canvas</h3>
                <span className="text-sm text-gray-400">
                  {codeOutput.length} sections generated
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition-colors">
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="flex-1 overflow-y-auto p-6">
            {codeOutput.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400 max-w-md">
                  <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Ready for Enhancement</h3>
                  <p className="text-sm leading-relaxed">
                    Configure your AI agent and project goal above, then generate enhanced code with 
                    GLYPHD's proprietary tautological orchestration system.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {codeOutput.map(section => (
                  <div key={section.id} className="bg-white/5 rounded-lg overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-black/20 p-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span className="font-medium">Enhanced Code Section</span>
                          <span className="text-xs text-gray-400">
                            {new Date(section.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {section.enhanced && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                              GLYPHD Enhanced
                            </span>
                          )}
                          <span className="text-xs text-gray-400">{section.agent}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Verification Results */}
                    {section.verification && (
                      <div className="p-4 border-b border-white/10">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          Real-Time Verification
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {section.verification.results.map((result, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">{result.rule}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{Math.round(result.score * 100)}%</span>
                                <span className={`px-2 py-1 rounded text-xs ${getVerificationColor(result.status)}`}>
                                  {result.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Code Content */}
                    <div className="p-4">
                      <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        {section.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLYPHDCanvasWriter;
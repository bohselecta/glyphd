import Link from 'next/link';
import { FolderOpen, TreePine, Brain, Wand2, Shield, Code } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Superintelligent Goal Orchestration & AI-Assisted Development</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/projects">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Projects</h3>
                  <p className="text-sm text-gray-400">Manage initiatives</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Central project management with AI-enhanced planning and tracking.</p>
            </div>
          </Link>

          <Link href="/memory-tree">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Memory Tree</h3>
                  <p className="text-sm text-gray-400">Goal visualization</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Fractal goal planning with intelligent pattern recognition.</p>
            </div>
          </Link>

          <Link href="/superintelligent">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Superintelligent</h3>
                  <p className="text-sm text-gray-400">AI analysis platform</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Advanced AI analysis with goal crystallization and intervention planning.</p>
            </div>
          </Link>

          <Link href="/canvas-writer">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Canvas Writer</h3>
                  <p className="text-sm text-gray-400">AI enhancement layer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Enhanced AI code generation with tautological verification.</p>
            </div>
          </Link>

          <Link href="/fractal-auditor">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Fractal Auditor</h3>
                  <p className="text-sm text-gray-400">Health monitoring</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Self-healing code architecture with global moderator system.</p>
            </div>
          </Link>

          <Link href="/code-project">
            <div className="p-6 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Code Project</h3>
                  <p className="text-sm text-gray-400">Full project generation</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Complete codebase generation with intelligent project orchestration.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

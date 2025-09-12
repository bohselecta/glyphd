'use client';

import React, { useState } from 'react';
import { TreePine, Plus, Brain } from 'lucide-react';

interface MemoryTreeProps {
  currentProject: { name: string; description?: string };
  goals: Array<{
    id: string;
    content: string;
    level: number;
    status: string;
    parent_id: string | null;
  }>;
}

export default function MemoryTreeCanvas({ currentProject, goals }: MemoryTreeProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!currentProject) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TreePine className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-bold">Memory Tree</h1>
              <p className="text-sm text-gray-400">{currentProject.name} • Fractal Goal Planning</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all flex items-center gap-2 text-sm">
              <Brain className="w-4 h-4" />
              AI Suggest
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

        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          {goals.length > 0 ? (
            <div className="space-y-4">
              {goals.filter(g => !g.parent_id).map(goal => (
                <div key={goal.id} className="p-4 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                  <h3 className="font-semibold text-emerald-300">{goal.content}</h3>
                  <p className="text-sm text-gray-400 mt-1">Level {goal.level} • Priority {goal.priority}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <TreePine className="w-16 h-16 mx-auto mb-4 text-emerald-400 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
              <p className="text-gray-400 mb-6">Create your first goal to start building the memory tree</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                Create First Goal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

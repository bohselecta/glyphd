'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CanvasWriterAdapter } from '../../src/services/integrationAdapters.tsx';

// Import the GLYPHD Canvas Writer component
const GLYPHDCanvasWriter = dynamic(() => import('../../glyphd_canvas_writer.tsx'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Canvas Writer...</p>
      </div>
    </div>
  )
});

export default function CanvasWriterPage() {
  return (
    <CanvasWriterAdapter>
      {(props) => (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Canvas Writer</h1>
            <p className="text-gray-400">
              {props.currentProject
                ? `AI-enhanced code generation for "${props.currentProject.name}"`
                : 'AI-enhanced code generation (Select a project to enable context)'}
            </p>
          </div>

          {props.currentProject && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-purple-400 mb-2">🎨 Project Context Active</h3>
              <div className="text-sm text-purple-200">
                <p><strong>Project:</strong> {props.currentProject.name}</p>
                <p><strong>Goals:</strong> {props.projectGoals.length} active</p>
                <p><strong>Files:</strong> {props.projectFiles.length} tracked</p>
                <p><strong>Health:</strong> {props.currentProject.health_score}/100</p>
              </div>
            </div>
          )}

          {/* Render the GLYPHD Canvas Writer with full project context */}
          <GLYPHDCanvasWriter
            enhancedPrompt={(basePrompt) => props.generateEnhancedPrompt(basePrompt)}
            onSave={(filename, content) => props.saveGeneratedCode(filename, content)}
            projectContext={props.getProjectContext()}
            technicalConstraints={props.getTechnicalConstraints()}
            goalAlignment={props.getGoalAlignment()}
            tautologies={props.getProjectTautologies()}
            validateAlignment={props.validateCodeAlignment}
          />
        </div>
      )}
    </CanvasWriterAdapter>
  );
}

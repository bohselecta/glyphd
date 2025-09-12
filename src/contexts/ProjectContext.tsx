'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type {
  Project,
  ProjectGoal,
  ProjectFile,
  ProjectHealth,
  ProjectSummary,
  ProjectContextType,
  GoalTree,
  PrerequisitesCheck,
  ProjectInsert,
  GoalInsert,
  FileInsert,
  HealthInsert,
} from '../types/project';

// =============================================================================
// SUPABASE CLIENT SETUP
// =============================================================================

// Supabase client intentionally omitted; add when backend is wired up

// =============================================================================
// CONTEXT STATE TYPE
// =============================================================================

interface ProjectState {
  currentProject: Project | null;
  projects: ProjectSummary[];
  goals: ProjectGoal[];
  files: ProjectFile[];
  latestHealth: ProjectHealth | null;
  healthHistory: ProjectHealth[];
  prerequisites: PrerequisitesCheck | null;
  loading: boolean;
  error: string | null;
}

// =============================================================================
// REDUCER ACTIONS
// =============================================================================

type ProjectAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_PROJECT'; payload: Project | null }
  | { type: 'SET_PROJECTS'; payload: ProjectSummary[] }
  | { type: 'ADD_PROJECT'; payload: ProjectSummary }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'SET_GOALS'; payload: ProjectGoal[] }
  | { type: 'ADD_GOAL'; payload: ProjectGoal }
  | { type: 'UPDATE_GOAL'; payload: ProjectGoal }
  | { type: 'REMOVE_GOAL'; payload: string }
  | { type: 'SET_FILES'; payload: ProjectFile[] }
  | { type: 'ADD_FILE'; payload: ProjectFile }
  | { type: 'UPDATE_FILE'; payload: ProjectFile }
  | { type: 'REMOVE_FILE'; payload: string }
  | { type: 'SET_HEALTH'; payload: ProjectHealth }
  | { type: 'SET_HEALTH_HISTORY'; payload: ProjectHealth[] }
  | { type: 'SET_PREREQUISITES'; payload: PrerequisitesCheck };

// =============================================================================
// REDUCER FUNCTION
// =============================================================================

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload };

    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };

    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        currentProject: state.currentProject?.id === action.payload.id ? action.payload : state.currentProject,
        projects: state.projects.map(p =>
          p.project.id === action.payload.id
            ? { ...p, project: action.payload }
            : p
        ),
      };

    case 'REMOVE_PROJECT':
      return {
        ...state,
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject,
        projects: state.projects.filter(p => p.project.id !== action.payload),
      };

    case 'SET_GOALS':
      return { ...state, goals: action.payload };

    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.payload] };

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(g => g.id === action.payload.id ? action.payload : g),
      };

    case 'REMOVE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(g => g.id !== action.payload),
      };

    case 'SET_FILES':
      return { ...state, files: action.payload };

    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.payload] };

    case 'UPDATE_FILE':
      return {
        ...state,
        files: state.files.map(f => f.id === action.payload.id ? action.payload : f),
      };

    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(f => f.id !== action.payload),
      };

    case 'SET_HEALTH':
      return {
        ...state,
        latestHealth: action.payload,
        healthHistory: [action.payload, ...state.healthHistory.slice(0, 9)], // Keep last 10
      };

    case 'SET_HEALTH_HISTORY':
      return { ...state, healthHistory: action.payload };

    case 'SET_PREREQUISITES':
      return { ...state, prerequisites: action.payload };

    default:
      return state;
  }
}

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: ProjectState = {
  currentProject: null,
  projects: [],
  goals: [],
  files: [],
  latestHealth: null,
  healthHistory: [],
  prerequisites: null,
  loading: false,
  error: null,
};

// =============================================================================
// CONTEXT CREATION
// =============================================================================

const ProjectContext = createContext<ProjectContextType | null>(null);

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Build goal tree from flat goal list
function buildGoalTree(goals: ProjectGoal[]): GoalTree[] {
  const goalMap = new Map<string, ProjectGoal>();
  const roots: GoalTree[] = [];

  // First pass: create map of all goals
  goals.forEach(goal => goalMap.set(goal.id, goal));

  // Second pass: build tree structure
  goals.forEach(goal => {
    if (!goal.parent_id) {
      // Root goal
      roots.push(buildGoalNode(goal, goalMap, [], 0));
    }
  });

  return roots.sort((a, b) => a.goal.order_index - b.goal.order_index);
}

function buildGoalNode(goal: ProjectGoal, goalMap: Map<string, ProjectGoal>, path: string[], depth: number): GoalTree {
  const children: GoalTree[] = [];
  const currentPath = [...path, goal.id];

  // Find all direct children
  Array.from(goalMap.values())
    .filter(g => g.parent_id === goal.id)
    .sort((a, b) => a.order_index - b.order_index)
    .forEach(childGoal => {
      children.push(buildGoalNode(childGoal, goalMap, currentPath, depth + 1));
    });

  return {
    goal,
    children,
    depth,
    path: currentPath,
  };
}

// Check prerequisites for AI operations
function checkPrerequisites(
  project: Project | null,
  health: ProjectHealth | null,
  goals: ProjectGoal[]
): PrerequisitesCheck {
  const issues: string[] = [];

  // Health score check
  const health_score_ok = health ? health.score >= 95 : false;
  if (!health_score_ok) {
    issues.push(`Health score is ${health?.score || 0}%, needs to be ≥95%`);
  }

  // Goals structure check
  const rootGoals = goals.filter(g => !g.parent_id);
  const goals_structure_ok = rootGoals.length > 0;
  if (!goals_structure_ok) {
    issues.push('No root goals defined. Create at least one main goal.');
  }

  // Token budget check
  const token_budget_ok = project?.settings?.token_budget ? project.settings.token_budget > 0 : false;
  if (!token_budget_ok) {
    issues.push('Token budget not configured. Set a budget in project settings.');
  }

  // Storage configuration check
  const storage_configured = project?.settings?.storage_location ? true : false;
  if (!storage_configured) {
    issues.push('Storage location not configured. Choose where to save generated files.');
  }

  const all_clear = health_score_ok && goals_structure_ok && token_budget_ok && storage_configured;

  return {
    health_score_ok,
    goals_structure_ok,
    token_budget_ok,
    storage_configured,
    all_clear,
    issues,
  };
}

// =============================================================================
// CONTEXT PROVIDER COMPONENT
// =============================================================================

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // =============================================================================
  // PROJECT OPERATIONS
  // =============================================================================

  const setCurrentProject = useCallback((project: Project | null) => {
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });

    // Load related data when project changes
    if (project) {
      loadProjectGoals(project.id);
      loadProjectFiles(project.id);
      loadProjectHealth(project.id);
    } else {
      dispatch({ type: 'SET_GOALS', payload: [] });
      dispatch({ type: 'SET_FILES', payload: [] });
      dispatch({ type: 'SET_HEALTH_HISTORY', payload: [] });
    }
  }, []);

  const createProject = useCallback(async (data: Partial<Project>): Promise<Project> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // For demo purposes, create a mock project
      // In production, this would make a Supabase call
      const project: Project = {
        id: `proj_${Date.now()}`,
        user_id: 'demo_user',
        name: data.name || 'Untitled Project',
        description: data.description || null,
        tech_stack: data.tech_stack || {},
        health_score: 0,
        status: 'active',
        settings: data.settings || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const projectSummary: ProjectSummary = {
        project,
        total_goals: 0,
        completed_goals: 0,
        total_files: 0,
        latest_health: null,
        completion_rate: 0,
        last_activity: project.created_at,
      };

      dispatch({ type: 'ADD_PROJECT', payload: projectSummary });
      return project;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create project';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const updateProject = useCallback(async (id: string, data: Partial<Project>): Promise<Project> => {
    try {
      // For demo purposes, update the local state
      // In production, this would make a Supabase call
      const existingProject = state.projects.find(p => p.project.id === id)?.project;
      if (!existingProject) throw new Error('Project not found');

      const updatedProject: Project = {
        ...existingProject,
        ...data,
        updated_at: new Date().toISOString()
      };

      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
      return updatedProject;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update project';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, [state.projects]);

  const deleteProject = useCallback(async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'REMOVE_PROJECT', payload: id });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete project';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  const refreshProjects = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // For demo purposes, just keep existing projects
      // In production, this would fetch from Supabase
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load projects';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // =============================================================================
  // GOALS OPERATIONS
  // =============================================================================

  const loadProjectGoals = useCallback(async (projectId: string): Promise<void> => {
    try {
      // For demo purposes, load from local state
      // In production, this would fetch from Supabase
      console.log('Loading goals for project:', projectId);
    } catch (error) {
      console.error('Failed to load goals:', error);
    }
  }, []);

  const addGoal = useCallback(async (goalData: Partial<ProjectGoal>): Promise<ProjectGoal> => {
    if (!state.currentProject) throw new Error('No current project');

    const newGoal: ProjectGoal = {
      id: `goal_${Date.now()}`,
      project_id: state.currentProject.id,
      content: goalData.content || '',
      parent_id: goalData.parent_id || null,
      level: goalData.level || 0,
      status: goalData.status || 'pending',
      priority: goalData.priority || 50,
      order_index: goalData.order_index || 0,
      metadata: goalData.metadata || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dispatch({ type: 'ADD_GOAL', payload: newGoal });
    return newGoal;
  }, [state.currentProject]);

  const updateGoal = useCallback(async (id: string, data: Partial<ProjectGoal>): Promise<ProjectGoal> => {
    const existingGoal = state.goals.find(g => g.id === id);
    if (!existingGoal) throw new Error('Goal not found');

    const updatedGoal: ProjectGoal = {
      ...existingGoal,
      ...data,
      updated_at: new Date().toISOString()
    };

    dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
    return updatedGoal;
  }, [state.goals]);

  const deleteGoal = useCallback(async (id: string): Promise<void> => {
    dispatch({ type: 'REMOVE_GOAL', payload: id });
  }, []);

  // =============================================================================
  // FILES OPERATIONS
  // =============================================================================

  const loadProjectFiles = useCallback(async (projectId: string): Promise<void> => {
    try {
      console.log('Loading files for project:', projectId);
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  }, []);

  const addFile = useCallback(async (fileData: Partial<ProjectFile>): Promise<ProjectFile> => {
    if (!state.currentProject) throw new Error('No current project');

    const newFile: ProjectFile = {
      id: `file_${Date.now()}`,
      project_id: state.currentProject.id,
      filename: fileData.filename || 'untitled.txt',
      content: fileData.content || '',
      file_type: fileData.file_type || 'text',
      language: fileData.language || null,
      size_bytes: fileData.size_bytes || 0,
      checksum: fileData.checksum || null,
      metadata: fileData.metadata || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dispatch({ type: 'ADD_FILE', payload: newFile });
    return newFile;
  }, [state.currentProject]);

  const updateFile = useCallback(async (id: string, data: Partial<ProjectFile>): Promise<ProjectFile> => {
    const existingFile = state.files.find(f => f.id === id);
    if (!existingFile) throw new Error('File not found');

    const updatedFile: ProjectFile = {
      ...existingFile,
      ...data,
      updated_at: new Date().toISOString()
    };

    dispatch({ type: 'UPDATE_FILE', payload: updatedFile });
    return updatedFile;
  }, [state.files]);

  const deleteFile = useCallback(async (id: string): Promise<void> => {
    dispatch({ type: 'REMOVE_FILE', payload: id });
  }, []);

  // =============================================================================
  // HEALTH OPERATIONS
  // =============================================================================

  const loadProjectHealth = useCallback(async (projectId: string): Promise<void> => {
    try {
      console.log('Loading health for project:', projectId);
    } catch (error) {
      console.error('Failed to load health:', error);
    }
  }, []);

  const runHealthCheck = useCallback(async (type: 'full' | 'incremental' | 'manual' = 'full'): Promise<ProjectHealth> => {
    if (!state.currentProject) throw new Error('No current project');

    // For demo purposes, return a mock health score
    const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100

    const health: ProjectHealth = {
      id: `health_${Date.now()}`,
      project_id: state.currentProject.id,
      score: mockScore,
      issues: [],
      metrics: {},
      audit_type: type,
      created_at: new Date().toISOString()
    };

    dispatch({ type: 'SET_HEALTH', payload: health });
    return health;
  }, [state.currentProject]);

  const checkPrerequisitesCallback = useCallback(async (): Promise<PrerequisitesCheck> => {
    const check = checkPrerequisites(state.currentProject, state.latestHealth, state.goals);
    dispatch({ type: 'SET_PREREQUISITES', payload: check });
    return check;
  }, [state.currentProject, state.latestHealth, state.goals]);

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  const goalTree = React.useMemo(() => buildGoalTree(state.goals), [state.goals]);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  // Load projects on mount
  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  // Update prerequisites when dependencies change
  useEffect(() => {
    if (state.currentProject) {
      checkPrerequisitesCallback();
    }
  }, [state.currentProject, state.latestHealth, state.goals, checkPrerequisitesCallback]);

  // =============================================================================
  // CONTEXT VALUE
  // =============================================================================

  const contextValue: ProjectContextType = {
    // State
    currentProject: state.currentProject,
    projects: state.projects,
    loading: state.loading,
    error: state.error,

    // Actions
    setCurrentProject,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects,

    // Goals
    goals: state.goals,
    goalTree,
    addGoal,
    updateGoal,
    deleteGoal,

    // Files
    files: state.files,
    addFile,
    updateFile,
    deleteFile,

    // Health
    latestHealth: state.latestHealth,
    healthHistory: state.healthHistory,
    runHealthCheck,

    // Prerequisites
    prerequisites: state.prerequisites,
    checkPrerequisites: checkPrerequisitesCallback,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

// =============================================================================
// CUSTOM HOOK
// =============================================================================

export function useProject(): ProjectContextType {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

export { ProjectContext };
export default ProjectContext;

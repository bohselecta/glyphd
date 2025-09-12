'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import type {
  Project,
  ProjectGoal,
  ProjectFile,
  ProjectHealth,
  ProjectSummary,
  ProjectContextType,
  GoalTree,
  PrerequisitesCheck,
  ApiResponse,
  ProjectInsert,
  GoalInsert,
  FileInsert,
  HealthInsert,
  HEALTH_THRESHOLDS,
} from '@/types/project';

// =============================================================================
// SUPABASE CLIENT SETUP
// =============================================================================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const projectData: ProjectInsert = {
        user_id: user.user.id,
        name: data.name || 'Untitled Project',
        description: data.description || null,
        tech_stack: data.tech_stack || {},
        health_score: 0,
        status: 'active',
        settings: data.settings || {},
      };

      const { data: project, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

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
      const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'UPDATE_PROJECT', payload: project });
      return project;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update project';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Convert to ProjectSummary format (simplified for now)
      const projectSummaries: ProjectSummary[] = projects.map(project => ({
        project,
        total_goals: 0, // TODO: Add aggregated queries
        completed_goals: 0,
        total_files: 0,
        latest_health: null,
        completion_rate: 0,
        last_activity: project.updated_at,
      }));

      dispatch({ type: 'SET_PROJECTS', payload: projectSummaries });
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
      const { data: goals, error } = await supabase
        .from('project_goals')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index');

      if (error) throw error;

      dispatch({ type: 'SET_GOALS', payload: goals || [] });
    } catch (error) {
      console.error('Failed to load goals:', error);
    }
  }, []);

  const addGoal = useCallback(async (goalData: Partial<ProjectGoal>): Promise<ProjectGoal> => {
    if (!state.currentProject) throw new Error('No current project');

    const newGoal: GoalInsert = {
      project_id: state.currentProject.id,
      content: goalData.content || '',
      parent_id: goalData.parent_id || null,
      level: goalData.level || 0,
      status: goalData.status || 'pending',
      priority: goalData.priority || 50,
      order_index: goalData.order_index || 0,
      metadata: goalData.metadata || {},
    };

    const { data: goal, error } = await supabase
      .from('project_goals')
      .insert([newGoal])
      .select()
      .single();

    if (error) throw error;

    dispatch({ type: 'ADD_GOAL', payload: goal });
    return goal;
  }, [state.currentProject]);

  const updateGoal = useCallback(async (id: string, data: Partial<ProjectGoal>): Promise<ProjectGoal> => {
    const { data: goal, error } = await supabase
      .from('project_goals')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    dispatch({ type: 'UPDATE_GOAL', payload: goal });
    return goal;
  }, []);

  const deleteGoal = useCallback(async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('project_goals')
      .delete()
      .eq('id', id);

    if (error) throw error;

    dispatch({ type: 'REMOVE_GOAL', payload: id });
  }, []);

  // =============================================================================
  // FILES OPERATIONS
  // =============================================================================

  const loadProjectFiles = useCallback(async (projectId: string): Promise<void> => {
    try {
      const { data: files, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('filename');

      if (error) throw error;

      dispatch({ type: 'SET_FILES', payload: files || [] });
    } catch (error) {
      console.error('Failed to load files:', error);
    }
  }, []);

  const addFile = useCallback(async (fileData: Partial<ProjectFile>): Promise<ProjectFile> => {
    if (!state.currentProject) throw new Error('No current project');

    const newFile: FileInsert = {
      project_id: state.currentProject.id,
      filename: fileData.filename || 'untitled.txt',
      content: fileData.content || '',
      file_type: fileData.file_type || 'text',
      language: fileData.language || null,
      size_bytes: fileData.size_bytes || 0,
      checksum: fileData.checksum || null,
      metadata: fileData.metadata || {},
    };

    const { data: file, error } = await supabase
      .from('project_files')
      .insert([newFile])
      .select()
      .single();

    if (error) throw error;

    dispatch({ type: 'ADD_FILE', payload: file });
    return file;
  }, [state.currentProject]);

  const updateFile = useCallback(async (id: string, data: Partial<ProjectFile>): Promise<ProjectFile> => {
    const { data: file, error } = await supabase
      .from('project_files')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    dispatch({ type: 'UPDATE_FILE', payload: file });
    return file;
  }, []);

  const deleteFile = useCallback(async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('project_files')
      .delete()
      .eq('id', id);

    if (error) throw error;

    dispatch({ type: 'REMOVE_FILE', payload: id });
  }, []);

  // =============================================================================
  // HEALTH OPERATIONS
  // =============================================================================

  const loadProjectHealth = useCallback(async (projectId: string): Promise<void> => {
    try {
      const { data: healthRecords, error } = await supabase
        .from('project_health')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (healthRecords && healthRecords.length > 0) {
        dispatch({ type: 'SET_HEALTH', payload: healthRecords[0] });
        dispatch({ type: 'SET_HEALTH_HISTORY', payload: healthRecords });
      }
    } catch (error) {
      console.error('Failed to load health:', error);
    }
  }, []);

  const runHealthCheck = useCallback(async (type: 'full' | 'incremental' | 'manual' = 'full'): Promise<ProjectHealth> => {
    if (!state.currentProject) throw new Error('No current project');

    // TODO: Implement actual health check logic
    // For now, return a mock health score
    const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100

    const healthData: HealthInsert = {
      project_id: state.currentProject.id,
      score: mockScore,
      issues: [],
      metrics: {},
      audit_type: type,
    };

    const { data: health, error } = await supabase
      .from('project_health')
      .insert([healthData])
      .select()
      .single();

    if (error) throw error;

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

export default ProjectContext;
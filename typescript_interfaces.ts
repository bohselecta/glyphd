// =============================================================================
// GLYPHD PROJECT FOUNDATION TYPES
// =============================================================================
// Purpose: TypeScript interfaces matching the Supabase schema
// Usage: Import these types across all modules for type safety

// =============================================================================
// CORE PROJECT TYPES
// =============================================================================

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  tech_stack: TechStack;
  health_score: number;
  status: ProjectStatus;
  settings: ProjectSettings;
  created_at: string;
  updated_at: string;
}

export interface ProjectGoal {
  id: string;
  project_id: string;
  parent_id: string | null;
  content: string;
  level: number;
  status: GoalStatus;
  priority: number;
  order_index: number;
  metadata: GoalMetadata;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  filename: string;
  content: string | null;
  file_type: FileType;
  language: string | null;
  size_bytes: number;
  checksum: string | null;
  metadata: FileMetadata;
  created_at: string;
  updated_at: string;
}

export interface ProjectHealth {
  id: string;
  project_id: string;
  score: number;
  issues: HealthIssue[];
  metrics: HealthMetrics;
  audit_type: AuditType;
  created_at: string;
}

// =============================================================================
// ENUM-LIKE TYPES
// =============================================================================

export type ProjectStatus = 'active' | 'paused' | 'completed' | 'archived';
export type GoalStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type FileType = 'text' | 'code' | 'markdown' | 'json' | 'other';
export type AuditType = 'full' | 'incremental' | 'manual';

// =============================================================================
// COMPLEX TYPES FOR JSONB FIELDS
// =============================================================================

export interface TechStack {
  frontend?: string;
  backend?: string;
  database?: string;
  deployment?: string;
  languages?: string[];
  frameworks?: string[];
  dependencies?: string[];
  [key: string]: any; // Allow additional tech stack properties
}

export interface ProjectSettings {
  api_provider?: 'openai' | 'anthropic' | 'ollama' | 'custom';
  api_key?: string;
  token_budget?: number;
  storage_location?: 'github' | 'glyphd_temp' | 'download';
  github_repo?: string;
  github_token?: string;
  ollama_endpoint?: string;
  notifications_enabled?: boolean;
  auto_audit?: boolean;
  [key: string]: any; // Allow additional settings
}

export interface GoalMetadata {
  complexity_score?: number;
  estimated_hours?: number;
  ai_analysis?: string;
  dependencies?: string[];
  blockers?: string[];
  notes?: string;
  [key: string]: any;
}

export interface FileMetadata {
  generated_by?: 'ai' | 'user' | 'import';
  ai_model?: string;
  prompt_used?: string;
  dependencies?: string[];
  exports?: string[];
  imports?: string[];
  functions?: string[];
  classes?: string[];
  [key: string]: any;
}

export interface HealthIssue {
  type: 'error' | 'warning' | 'info';
  category: 'code' | 'architecture' | 'dependencies' | 'goals' | 'files';
  message: string;
  file?: string;
  line?: number;
  severity: number; // 1-10
  auto_fixable?: boolean;
  fix_suggestion?: string;
}

export interface HealthMetrics {
  goal_completion_rate?: number;
  code_quality_score?: number;
  dependency_health?: number;
  architecture_score?: number;
  test_coverage?: number;
  documentation_score?: number;
  security_score?: number;
  performance_score?: number;
  [key: string]: any;
}

// =============================================================================
// COMPUTED/DERIVED TYPES
// =============================================================================

// Tree structure for goals (computed from flat goal list)
export interface GoalTree {
  goal: ProjectGoal;
  children: GoalTree[];
  depth: number;
  path: string[]; // Array of parent IDs leading to this goal
}

// Project summary with aggregated data
export interface ProjectSummary {
  project: Project;
  total_goals: number;
  completed_goals: number;
  total_files: number;
  latest_health: ProjectHealth | null;
  completion_rate: number;
  last_activity: string;
}

// Prerequisites check result
export interface PrerequisitesCheck {
  health_score_ok: boolean; // >= 95
  goals_structure_ok: boolean; // Has at least one root goal
  token_budget_ok: boolean; // Budget set and sufficient
  storage_configured: boolean; // Storage location set
  all_clear: boolean; // All above are true
  issues: string[]; // Human-readable issues
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface ProjectListResponse {
  projects: ProjectSummary[];
  total: number;
  page: number;
  per_page: number;
}

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface ProjectContextType {
  // Current state
  currentProject: Project | null;
  projects: ProjectSummary[];
  loading: boolean;
  error: string | null;

  // Actions
  setCurrentProject: (project: Project | null) => void;
  createProject: (data: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, data: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  refreshProjects: () => Promise<void>;

  // Goals management
  goals: ProjectGoal[];
  goalTree: GoalTree[];
  addGoal: (goal: Partial<ProjectGoal>) => Promise<ProjectGoal>;
  updateGoal: (id: string, data: Partial<ProjectGoal>) => Promise<ProjectGoal>;
  deleteGoal: (id: string) => Promise<void>;

  // Files management
  files: ProjectFile[];
  addFile: (file: Partial<ProjectFile>) => Promise<ProjectFile>;
  updateFile: (id: string, data: Partial<ProjectFile>) => Promise<ProjectFile>;
  deleteFile: (id: string) => Promise<void>;

  // Health monitoring
  latestHealth: ProjectHealth | null;
  healthHistory: ProjectHealth[];
  runHealthCheck: (type?: AuditType) => Promise<ProjectHealth>;

  // Prerequisites
  prerequisites: PrerequisitesCheck | null;
  checkPrerequisites: () => Promise<PrerequisitesCheck>;
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface CreateProjectForm {
  name: string;
  description: string;
  tech_stack: TechStack;
  settings: ProjectSettings;
}

export interface CreateGoalForm {
  content: string;
  parent_id?: string;
  priority?: number;
}

export interface CreateFileForm {
  filename: string;
  content: string;
  file_type: FileType;
  language?: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

// Helper type for database inserts (excludes generated fields)
export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type GoalInsert = Omit<ProjectGoal, 'id' | 'created_at' | 'updated_at'>;
export type FileInsert = Omit<ProjectFile, 'id' | 'created_at' | 'updated_at'>;
export type HealthInsert = Omit<ProjectHealth, 'id' | 'created_at'>;

// Helper type for database updates (all fields optional except id)
export type ProjectUpdate = Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
export type GoalUpdate = Partial<Omit<ProjectGoal, 'id' | 'created_at' | 'updated_at'>>;
export type FileUpdate = Partial<Omit<ProjectFile, 'id' | 'created_at' | 'updated_at'>>;

// =============================================================================
// CONSTANTS
// =============================================================================

export const PROJECT_STATUSES: ProjectStatus[] = ['active', 'paused', 'completed', 'archived'];
export const GOAL_STATUSES: GoalStatus[] = ['pending', 'in_progress', 'completed', 'blocked'];
export const FILE_TYPES: FileType[] = ['text', 'code', 'markdown', 'json', 'other'];
export const AUDIT_TYPES: AuditType[] = ['full', 'incremental', 'manual'];

export const HEALTH_THRESHOLDS = {
  EXCELLENT: 95,
  GOOD: 80,
  FAIR: 60,
  POOR: 40,
  CRITICAL: 20,
} as const;

export const DEFAULT_TECH_STACK: TechStack = {
  frontend: 'React',
  backend: 'Node.js',
  database: 'Supabase',
  deployment: 'Vercel',
  languages: ['TypeScript', 'JavaScript'],
  frameworks: ['Next.js', 'Tailwind CSS'],
};

export const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  api_provider: 'ollama',
  token_budget: 1000,
  storage_location: 'download',
  notifications_enabled: true,
  auto_audit: true,
};
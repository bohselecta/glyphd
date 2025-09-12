# GLYPHD Project Foundation Integration Guide

## 🎯 Goal
Add the project-centric foundation to your existing GLYPHD dashboard, following your `.cursorrules` for clean, deployable code.

## 📁 File Structure to Create

```
src/
├── types/
│   └── project.ts                 # TypeScript interfaces
├── contexts/
│   └── ProjectContext.tsx         # Shared state management
├── components/
│   └── ProjectHub.tsx             # Main project interface
└── app/
    └── dashboard/
        └── projects/
            └── page.tsx           # Projects page route
```

## 🚀 Step-by-Step Integration

### Step 1: Add Supabase Schema
1. **Open your Supabase dashboard** → SQL Editor
2. **Run the SQL schema** from the first artifact
3. **Verify tables created**: projects, project_goals, project_files, project_health

### Step 2: Install Dependencies
```bash
# If not already installed
npm install @supabase/supabase-js
```

### Step 3: Add TypeScript Types
1. **Create** `src/types/project.ts`
2. **Copy content** from the TypeScript interfaces artifact
3. **Update imports** if your project structure differs

### Step 4: Add Project Context
1. **Create** `src/contexts/ProjectContext.tsx`
2. **Copy content** from the Project Context artifact
3. **Update the Supabase import path** if needed:
   ```typescript
   // Adjust this import to match your Supabase client location
   import { createClient } from '@supabase/supabase-js';
   ```

### Step 5: Add Project Hub Component
1. **Create** `src/components/ProjectHub.tsx`
2. **Copy content** from the Project Hub artifact
3. **Update import paths** to match your project structure

### Step 6: Wrap App with Context
**Update your main layout** (`app/layout.tsx` or equivalent):

```typescript
import { ProjectProvider } from '@/contexts/ProjectContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
```

### Step 7: Create Projects Page
**Create** `app/dashboard/projects/page.tsx`:

```typescript
import ProjectHub from '@/components/ProjectHub';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <ProjectHub />
    </div>
  );
}
```

### Step 8: Update Navigation
**Add Projects link** to your existing dashboard navigation:

```typescript
// In your navigation component
<Link 
  href="/dashboard/projects" 
  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
>
  <svg className="w-5 h-5" /* folder icon */></svg>
  Projects
</Link>
```

## ✅ Validation Checklist

Before deploying, run these commands (per your `.cursorrules`):

```bash
# TypeScript check
npm run typecheck

# ESLint check  
npm run lint --fix

# Build check
npm run build

# Local development test
npm run dev
```

## 🧪 Testing the Foundation

1. **Visit** `/dashboard/projects`
2. **Create a test project** using the "New Project" button
3. **Verify Supabase data** - check your Supabase dashboard for the new project
4. **Test project selection** - click on a project card
5. **Check context** - other components can now use `useProject()` hook

## 🔗 Next Steps - Module Integration

With this foundation in place, you can now build:

### Memory Tree Module
```typescript
// Any component can now access project context
const { currentProject, goals, addGoal } = useProject();

// Goals automatically link to the current project
await addGoal({ content: "Build landing page", priority: 80 });
```

### Canvas Writer Module  
```typescript
const { currentProject, files, addFile } = useProject();

// Files automatically link to the current project  
await addFile({ 
  filename: "App.tsx", 
  content: generatedCode,
  file_type: "code",
  language: "typescript"
});
```

### Fractal Auditor Module
```typescript
const { currentProject, runHealthCheck, latestHealth } = useProject();

// Health checks automatically link to current project
const health = await runHealthCheck('full');
// Updates project.health_score automatically via trigger
```

## 🚨 Troubleshooting

### TypeScript Errors
- **Ensure all import paths match your structure**
- **Check that types are exported/imported correctly**
- **Verify Supabase client types are compatible**

### Supabase Connection Issues  
- **Verify environment variables** in Vercel
- **Check RLS policies** are enabled
- **Test auth** - user must be logged in

### Build Failures
- **Run lint fixes** - `npm run lint --fix`
- **Check for unused imports**
- **Verify all components have proper exports**

## 💡 Architecture Benefits

This foundation provides:

✅ **Project-centric workflow** - Everything revolves around projects  
✅ **Shared state management** - All modules can access project data  
✅ **Type safety** - Full TypeScript coverage  
✅ **Database consistency** - RLS policies protect data  
✅ **Real-time updates** - Context updates automatically  
✅ **Scalable architecture** - Add modules without refactoring  

## 🎁 Ready for Module Development

Once integrated, you can start building:
1. **Memory Tree** - Goal planning with fractal patterns
2. **Canvas Writer** - AI code generation 
3. **Fractal Auditor** - Health monitoring
4. **Superintelligent Platform** - API orchestration

Each module plugs into this foundation seamlessly! 🚀
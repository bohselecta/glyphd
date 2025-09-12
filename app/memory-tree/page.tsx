import MemoryTreeCanvas from '../../src/components/memory-tree/MemoryTreeCanvas';

export default function MemoryTreePage() {
  // Mock data for now - replace with actual project context when Supabase is configured
  const currentProject = { name: 'Demo Project', description: 'Memory Tree Demo' };
  const goals = [
    { id: '1', content: 'Build responsive landing page', level: 0, status: 'completed', parent_id: null },
    { id: '2', content: 'Implement user authentication', level: 1, status: 'in_progress', parent_id: '1' },
    { id: '3', content: 'Add contact form', level: 1, status: 'pending', parent_id: '1' }
  ];

  return <MemoryTreeCanvas currentProject={currentProject} goals={goals} />;
}

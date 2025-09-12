'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderOpen, TreePine, Brain, Wand2, Shield, Code
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: null },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Memory Tree', href: '/memory-tree', icon: TreePine },
  { name: 'Superintelligent', href: '/superintelligent', icon: Brain },
  { name: 'Canvas Writer', href: '/canvas-writer', icon: Wand2 },
  { name: 'Fractal Auditor', href: '/fractal-auditor', icon: Shield },
  { name: 'Code Project', href: '/code-project', icon: Code },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-gray-900/50 border-r border-white/10 p-4">
      <div className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              style={isActive ? { backgroundColor: '#f531b1' } : undefined}
            >
              {item.icon ? (
                <item.icon className="w-5 h-5" />
              ) : (
                // GLYPHD Logo for Dashboard
                <img
                  src="/GLYPHDlogo.svg"
                  alt="GLYPHD Logo"
                  width={22}
                  height={22}
                  className={`w-[22px] h-[22px] bg-transparent ${isActive ? '' : 'opacity-70'}`}
                />
              )}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

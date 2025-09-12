'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const showLandingLogo = pathname === '/';
  const hideLogoOnDashboard = pathname === '/dashboard';

  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showLandingLogo && (
            <img
              src="/GLYPHDlogo.svg"
              alt="GLYPHD Logo"
              width={24}
              height={24}
              className="w-[24px] h-[24px] bg-transparent"
            />
          )}
          <h1 className="text-xl font-bold text-white">GLYPHD</h1>
        </div>
      </div>
    </header>
  );
}

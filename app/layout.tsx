'use client';

import { usePathname } from 'next/navigation';
import Header from '../src/components/common/Header';
import Sidebar from '../src/components/common/Sidebar';
import { ProjectProvider } from '../src/contexts/ProjectContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        <ProjectProvider>
          <div className="flex h-screen">
            {!isLandingPage && <Sidebar />}
            <div className={`${isLandingPage ? 'w-full' : 'flex-1'} flex flex-col overflow-hidden`}>
              <Header />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </ProjectProvider>
      </body>
    </html>
  );
}

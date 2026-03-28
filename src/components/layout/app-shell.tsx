'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  return (
    <>
      <Sidebar isMinimized={isMinimized} toggleMinimize={toggleMinimize} />
      <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-300", isMinimized ? "ml-[5rem]" : "ml-64")}>
        <Topbar isMinimized={isMinimized} toggleMinimize={toggleMinimize} />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  );
}

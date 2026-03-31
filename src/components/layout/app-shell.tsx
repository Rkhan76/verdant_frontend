'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const authPaths = ['/login', '/mfa-verify', '/mfa-setup'];
    if (!isAuthenticated && !authPaths.includes(pathname)) {
      router.push('/login');
    }
  }, [isAuthenticated, pathname, router, mounted]);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const authPaths = ['/login', '/mfa-verify', '/mfa-setup'];
  if (authPaths.includes(pathname)) {
    return <>{children}</>;
  }

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

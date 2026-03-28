'use client';

import { Search, Moon, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TopbarProps {
  isMinimized?: boolean;
  toggleMinimize?: () => void;
}

export function Topbar({ isMinimized, toggleMinimize }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between bg-white px-8 border-b border-gray-100 transition-all">
      <div className="flex items-center gap-4 flex-1">
        {toggleMinimize && (
          <button 
            onClick={toggleMinimize} 
            className="text-gray-500 hover:text-[#25a194] transition-colors p-2 -ml-2 rounded-md hover:bg-gray-100 hidden sm:block"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search" 
            className="pl-10 h-10 bg-gray-50 border-gray-200 focus-visible:ring-[#25a194] rounded-md text-sm border-none" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#25a194] hover:bg-gray-100 transition-colors">
          <Moon className="h-5 w-5" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 overflow-hidden border border-gray-100 hover:opacity-80 transition-opacity">
          <img src="https://flagcdn.com/w40/us.png" alt="English" className="h-full w-full object-cover" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#25a194] hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}

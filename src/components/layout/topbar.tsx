'use client';

import { Search, Moon, Sun, Bell, ChevronRight, User, HelpCircle, Settings, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api/axios';

interface TopbarProps {
  isMinimized?: boolean;
  toggleMinimize?: () => void;
}

export function Topbar({ isMinimized, toggleMinimize }: TopbarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore errors for logout endpoint (e.g., 404 if it doesn't exist)
    } finally {
      logout();
      router.push('/login');
    }
  };

  const userName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';
  const roleName = user?.role || 'Guest';

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between bg-white dark:bg-[#09090b] px-8 border-b border-gray-100 dark:border-[#27272a] transition-all">
      <div className="flex items-center gap-4 flex-1">
        {toggleMinimize && (
          <button 
            onClick={toggleMinimize} 
            className="text-gray-500 dark:text-gray-400 hover:text-[#25a194] dark:hover:text-[#25a194] transition-colors p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#27272a] hidden sm:block"
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
            className="pl-10 h-10 bg-gray-50 dark:bg-[#27272a] text-gray-800 dark:text-gray-200 border-none focus-visible:ring-[#25a194] rounded-md text-sm" 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-[#27272a] text-gray-400 dark:text-gray-300 hover:text-[#25a194] hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-[#27272a] text-gray-400 dark:text-gray-300 hover:text-[#25a194] hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-[#27272a]"></span>
        </button>
        <div className="h-8 border-l border-gray-200 dark:border-[#27272a] mx-2 hidden sm:block"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25a194] focus-visible:ring-offset-2 rounded-lg flex items-center">
            <div className="bg-gray-50 dark:bg-[#27272a] rounded-lg p-2 pr-3 flex items-center gap-3 border border-gray-100 dark:border-[#3f3f46] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName.replace(' ', '')}`} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{roleName}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 hidden md:block" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 p-2 bg-white dark:bg-[#18181b] rounded-xl shadow-lg border-gray-100 dark:border-[#27272a]">
            <div className="flex items-center gap-3 p-2 mb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName.replace(' ', '')}`} />
                <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{roleName}</p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-[#27272a] mb-2" />
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#25a194] dark:hover:text-[#25a194] hover:bg-[#25a194]/10 dark:hover:bg-[#25a194]/20 focus:bg-[#25a194]/10 focus:text-[#25a194]">
              <User className="h-4 w-4" />
              <span className="font-medium">User Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#25a194] dark:hover:text-[#25a194] hover:bg-[#25a194]/10 dark:hover:bg-[#25a194]/20 focus:bg-[#25a194]/10 focus:text-[#25a194]">
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium">Help List</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#25a194] dark:hover:text-[#25a194] hover:bg-[#25a194]/10 dark:hover:bg-[#25a194]/20 focus:bg-[#25a194]/10 focus:text-[#25a194]">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-[#27272a] my-2" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

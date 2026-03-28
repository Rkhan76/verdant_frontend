import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Users, BookOpen, UserCheck, Calendar,
  CreditCard, CheckSquare, Clock, ShieldCheck, 
  FileText, Briefcase, Settings, Mail, Bell, PenTool,
  ChevronDown, ChevronRight, UserCircle, Book, CircleDollarSign
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { 
    name: 'Students', 
    icon: Users,
    href: '/students', 
    submenus: [
      { name: 'Student List', href: '/students' },
      { name: 'Suspend Student', href: '/students/suspend' },
      { name: 'Student Categories', href: '/students/categories' },
    ]
  },
  { 
    name: 'Teachers', 
    icon: BookOpen, 
    href: '/teachers',
    submenus: [
      { name: 'Teacher', href: '/teachers' },
      { name: 'Add New Teacher', href: '/teachers/add' },
    ]
  },
  { name: 'Guardian', icon: UserCheck, href: '/guardian' },
  { name: 'Classes', icon: Book, href: '/classes' },
  { name: 'Examinations', icon: CheckSquare, href: '/examinations' },
  { name: 'Fees Collection', icon: CircleDollarSign, href: '/fees' },
  { name: 'Attendance', icon: Clock, href: '/attendance' },
  { name: 'Leaves', icon: Calendar, href: '/leaves' },
  { name: 'Certificate', icon: ShieldCheck, href: '/certificate' },
  { name: 'Library', icon: BookOpen, href: '/library' },
  { name: 'Accounts', icon: CreditCard, href: '/accounts' },
  { name: 'HRM', icon: Briefcase, href: '/hrm' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

interface SidebarProps {
  isMinimized?: boolean;
  toggleMinimize?: () => void;
}

export function Sidebar({ isMinimized = false, toggleMinimize }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(['Students']);

  const toggleMenu = (name: string) => {
    if (isMinimized && toggleMinimize) toggleMinimize();
    setOpenMenus(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-100 transition-all duration-300",
      isMinimized ? "w-[5rem]" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b border-gray-100", isMinimized ? "justify-center px-0" : "px-6")}>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-teal-400 to-orange-400 font-bold text-white text-lg overflow-hidden">
            <div className="w-full h-full bg-white flex items-center justify-center rounded-[2px] m-[2px]">
              <span className="text-teal-500">V</span>
            </div>
          </div>
          {!isMinimized && <span className="text-xl font-bold text-gray-800 tracking-tight overflow-hidden">Verdant</span>}
        </Link>
      </div>

      <div className="h-[calc(100vh-4rem)] overflow-y-auto py-4 scrollbar-hide overflow-x-hidden">
        
        {/* User Card */}
        {!isMinimized && (
          <div className="px-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-800 truncate">Jone Copper</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <ul className={cn("space-y-1", isMinimized ? "px-2" : "px-4")}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const isOpen = openMenus.includes(item.name);
            const hasSubmenus = item.submenus && item.submenus.length > 0;

            return (
              <li key={item.name} className="relative group">
                <div
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md py-2.5 text-sm transition-colors",
                    isMinimized ? "px-0 justify-center" : "px-3",
                    isActive ? "bg-[#25a194] text-white font-medium shadow-sm hover:opacity-90" : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                  )}
                  onClick={() => {
                    if (hasSubmenus) toggleMenu(item.name);
                    else window.location.href = item.href;
                  }}
                  title={isMinimized ? item.name : undefined}
                >
                  <div className={cn("flex items-center gap-3", isMinimized ? "justify-center w-full" : "")}>
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-gray-500")} />
                    {!isMinimized && <span className="whitespace-nowrap">{item.name}</span>}
                  </div>
                  {!isMinimized && hasSubmenus && (
                    <ChevronRight 
                      className={cn("h-4 w-4 shrink-0 transition-transform", isActive ? "text-white" : "text-gray-400", isOpen && "rotate-90")} 
                    />
                  )}
                </div>
                
                {/* Submenus */}
                {!isMinimized && hasSubmenus && isOpen && (
                  <ul className="mt-1 mb-2 space-y-1 px-1 whitespace-nowrap overflow-hidden border-l-2 border-gray-100 ml-5 pl-2">
                    {item.submenus.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <li key={sub.name}>
                          <Link 
                            href={sub.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                              isSubActive 
                                ? "text-[#25a194] font-medium" 
                                : "text-gray-500 hover:text-[#25a194] hover:bg-gray-50"
                            )}
                          >
                            <span className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              isSubActive ? "bg-[#25a194]" : "bg-gray-300"
                            )} />
                            {sub.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

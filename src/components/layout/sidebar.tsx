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
  { 
    name: 'Dashboard', 
    icon: Home, 
    href: '/',
    submenus: [
      { name: 'School', href: '/' },
      { name: 'Student', href: '/dashboards/student' },
      { name: 'Teacher', href: '/dashboards/teacher' },
      { name: 'Parent', href: '/dashboards/parent' },
      { name: 'LMS', href: '/dashboards/lms' },
    ]
  },
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
      { name: 'Teacher Time Table', href: '/teachers/timetable' },
      { name: 'Teacher Details', href: '/teachers/detail' },
    ]
  },
  { 
    name: 'Guardian', 
    icon: UserCheck, 
    href: '/guardian',
    submenus: [
      { name: 'Add New Guardians', href: '/guardian/add' },
      { name: 'Guardians List', href: '/guardian' },
      { name: 'Edit Guardian', href: '/guardian/edit' },
      { name: 'Guardian Details', href: '/guardian/detail' },
    ]
  },
  { 
    name: 'Classes', 
    icon: Book, 
    href: '/classes',
    submenus: [
      { name: 'Section', href: '/classes/sections' },
      { name: 'Subjects', href: '/classes/subjects' },
      { name: 'Class List', href: '/classes' },
      { name: 'Class Room', href: '/classes/rooms' },
    ]
  },
  { 
    name: 'Examinations', 
    icon: CheckSquare, 
    href: '/examinations',
    submenus: [
      { name: 'Exam', href: '/examinations/exam' },
      { name: 'Exam Schedule', href: '/examinations/schedule' },
      { name: 'Exam Result', href: '/examinations/result' },
    ]
  },
  { 
    name: 'Fees Collection', 
    icon: CircleDollarSign, 
    href: '/fees',
    submenus: [
      { name: 'Fees Collect', href: '/fees/collect' },
      { name: 'Fees Type', href: '/fees/type' },
      { name: 'Fees Group', href: '/fees/group' },
      { name: 'Fees Discount', href: '/fees/discount' },
    ]
  },
  { 
    name: 'Attendance', 
    icon: Calendar, 
    href: '/attendance',
    submenus: [
      { name: 'Student Attendance', href: '/attendance/student' },
      { name: 'Teacher Attendance', href: '/attendance/teacher' },
      { name: 'Employee Attendance', href: '/attendance/employee' },
    ]
  },
  { 
    name: 'Leaves', 
    icon: Clock, 
    href: '/leaves',
    submenus: [
      { name: 'Leave Types', href: '/leaves/types' },
      { name: 'Leave Request', href: '/leaves/request' },
    ]
  },
  { name: 'Certificate', icon: ShieldCheck, href: '/certificate' },
  { name: 'Library', icon: BookOpen, href: '/library' },
  { name: 'Accounts', icon: CreditCard, href: '/accounts' },
  { 
    name: 'HRM', 
    icon: Briefcase, 
    href: '/hrm',
    submenus: [
      { name: 'Employee List', href: '/hrm/employees' },
      { name: 'Employee Details', href: '/hrm/details' },
      { name: 'Add New Employee', href: '/hrm/add' },
      { name: 'Payroll', href: '/hrm/payroll' },
      { name: 'Designation', href: '/hrm/designation' },
      { name: 'Department', href: '/hrm/department' },
    ]
  },
  { name: 'Notice Board', icon: Bell, href: '/notice-board' },
  { name: 'Event', icon: Calendar, href: '/event' },
  { name: 'Message', icon: Mail, href: '/message' },
  { name: 'Members', icon: Users, href: '/members' },
  { name: 'Roles', icon: ShieldCheck, href: '/roles' },
  { name: 'Permissions', icon: UserCheck, href: '/permissions' },
  { 
    name: 'Settings', 
    icon: Settings, 
    href: '/settings',
    submenus: [
      { name: 'General', href: '/settings/general' },
      { name: 'Notification', href: '/settings/notification' },
      { name: 'Currencies', href: '/settings/currencies' },
      { name: 'Languages', href: '/settings/languages' },
    ]
  },
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
      "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-[#09090b] border-r border-gray-100 dark:border-[#27272a] transition-all duration-300",
      isMinimized ? "w-[5rem]" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b border-gray-100 dark:border-[#27272a]", isMinimized ? "justify-center px-0" : "px-6")}>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-teal-400 to-orange-400 font-bold text-white text-lg overflow-hidden">
            <div className="w-full h-full bg-white dark:bg-[#09090b] flex items-center justify-center rounded-[2px] m-[2px]">
              <span className="text-teal-500">V</span>
            </div>
          </div>
          {!isMinimized && <span className="text-lg font-bold text-gray-800 dark:text-gray-200 tracking-tight leading-tight">Verdant Public School</span>}
        </Link>
      </div>

      <div className="h-[calc(100vh-4rem)] overflow-y-auto py-4 scrollbar-hide overflow-x-hidden">
        

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
                    isActive ? "bg-[#25a194] text-white font-medium shadow-sm hover:opacity-90" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#27272a] hover:text-[#25a194]"
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
                  <ul className="mt-1 mb-2 space-y-1 px-1 whitespace-nowrap overflow-hidden border-l-2 border-gray-100 dark:border-[#27272a] ml-5 pl-2">
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
                                : "text-gray-500 dark:text-gray-400 hover:text-[#25a194] hover:bg-gray-50 dark:hover:bg-[#27272a]"
                            )}
                          >
                            <span className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              isSubActive ? "bg-[#25a194]" : "bg-gray-300 dark:bg-gray-600"
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

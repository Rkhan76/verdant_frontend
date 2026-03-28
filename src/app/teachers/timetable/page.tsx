'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, BookOpen, Building2, Clock } from 'lucide-react';
import Link from 'next/link';

const colorMap: Record<string, { bg: string, text: string }> = {
  orange: { bg: 'bg-orange-50/80', text: 'text-orange-500' },
  cyan: { bg: 'bg-cyan-50/80', text: 'text-cyan-500' },
  green: { bg: 'bg-green-100/50', text: 'text-green-500' },
  red: { bg: 'bg-red-50/80', text: 'text-red-500' },
  teal: { bg: 'bg-[#25a194]/10', text: 'text-[#25a194]' },
};

const baseRoutine = [
  { class: 'Class: 1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'orange' },
  { class: 'Class: 2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'cyan' },
  { class: 'Class: 3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'green' },
  { class: 'Class: 4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'red' },
  { class: 'Class: 5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'teal' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timetableData = days.map(day => ({
  day,
  routines: baseRoutine
}));

export default function TeacherTimeTablePage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Teacher Time Table</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/teachers" className="hover:text-[#25a194] transition-colors">Teacher</Link>
            <span>/</span>
            <span className="text-gray-400">Teacher Time Table</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
          + Add Timetable
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center">
        {/* Export Dropdown */}
        <Select defaultValue="export">
          <SelectTrigger className="w-[120px] h-10 bg-white border-gray-200 text-gray-600 rounded shadow-none">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="export">Export</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>

        {/* Search Input */}
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-9 h-10 border-gray-200 rounded focus-visible:ring-[#25a194] shadow-none w-full"
          />
        </div>

        {/* Filter Dropdown */}
        <Select defaultValue="filter">
          <SelectTrigger className="w-[110px] h-10 bg-white border-gray-200 text-gray-600 rounded shadow-none">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="filter">Filter</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="next-week">Next Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <div className="min-w-[1200px] grid grid-cols-6 gap-6">
          {timetableData.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              {/* Day Header */}
              <h3 className="font-semibold text-gray-800 mb-1">{col.day}</h3>
              
              {/* Routine Cards */}
              {col.routines.map((routine, i) => {
                const theme = colorMap[routine.color];
                return (
                  <div key={i} className="border border-gray-100 rounded-lg overflow-hidden flex flex-col shadow-sm">
                    {/* Card Header */}
                    <div className={`${theme.bg} ${theme.text} py-3 text-center font-semibold text-[15px]`}>
                      {routine.class}
                    </div>
                    {/* Card Body */}
                    <div className="p-4 bg-white space-y-3.5">
                      <div className="flex xl:items-center gap-3 text-sm text-gray-500">
                        <BookOpen className="h-[18px] w-[18px] text-gray-400 shrink-0" />
                        <span className="flex items-start gap-1 w-full"><span className="w-16 shrink-0">Subject</span> : {routine.subject}</span>
                      </div>
                      <div className="flex xl:items-center gap-3 text-sm text-gray-500">
                        <Building2 className="h-[18px] w-[18px] text-gray-400 shrink-0" />
                        <span className="flex items-start gap-1 w-full"><span className="w-16 shrink-0">Room No</span> : {routine.room}</span>
                      </div>
                      <div className="flex xl:items-center gap-3 text-sm text-gray-500">
                        <Clock className="h-[18px] w-[18px] text-gray-400 shrink-0" />
                        <span className="flex items-start gap-1 w-full">{routine.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

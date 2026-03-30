'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const upcomingEvents = [
  { id: 1, date: 'Feb 10, 2026, 10:30 AM', title: 'Design Conference', color: 'bg-teal-500' },
  { id: 2, date: 'Feb 15, 2026, 06:00 PM', title: 'Weekend Festival', color: 'bg-green-500' },
  { id: 3, date: 'Feb 20, 2026, 09:00 AM', title: 'Team Meeting', color: 'bg-teal-500' },
  { id: 4, date: 'Feb 25, 2026, 08:00 PM', title: 'Ultra Europe 2026', color: 'bg-orange-500' },
];

export default function EventPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const paddingFront = Array.from({ length: 0 }, (_, i) => i); // Start Sunday on 1st for mockup
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Event</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Event</span>
            <span>/</span>
            <span className="text-gray-400">Event</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded font-medium disabled:opacity-50">
          + Add Event
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Upcoming Events */}
        <div className="w-full lg:w-[320px] bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-50 bg-white rounded-t-lg">
            <h2 className="text-[17px] font-semibold text-gray-800">Upcoming Events</h2>
          </div>
          <div className="flex-1 p-2">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="p-4 flex items-start justify-between group rounded-md hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 mt-1">
                  <div className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${evt.color}`}></div>
                  <div className="space-y-1">
                    <p className="text-[12px] text-gray-500 font-medium">{evt.date}</p>
                    <h3 className="text-[15px] font-semibold text-gray-800">{evt.title}</h3>
                  </div>
                </div>
                <button className="h-8 w-8 rounded text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Calendar View */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 overflow-hidden">
          
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="flex overflow-hidden rounded bg-blue-500 shadow-sm border border-blue-600">
                <button className="h-9 w-9 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="w-[1px] bg-blue-600/50"></div>
                <button className="h-9 w-9 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Button className="h-9 px-4 bg-gray-500 hover:bg-gray-600 text-white shadow-none font-medium text-[13px] rounded">
                today
              </Button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">March 2026</h2>
            
            <div className="flex rounded overflow-hidden shadow-sm border border-blue-600">
              <button className="h-9 px-4 bg-blue-500 text-white text-[13px] font-medium border-r border-blue-600 hover:bg-blue-600 transition-colors">month</button>
              <button className="h-9 px-4 bg-blue-500 text-white text-[13px] font-medium border-r border-blue-600 hover:bg-blue-600 transition-colors">week</button>
              <button className="h-9 px-4 bg-blue-500 text-white text-[13px] font-medium border-r border-blue-600 hover:bg-blue-600 transition-colors">day</button>
              <button className="h-9 px-4 bg-blue-500 text-white text-[13px] font-medium hover:bg-blue-600 transition-colors">list</button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border border-gray-100 rounded overflow-hidden flex flex-col h-[600px]">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
              {days.map(day => (
                <div key={day} className="py-3 text-center text-[13px] font-medium text-gray-500 border-r border-gray-100 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Dates Grid */}
            <div className="grid grid-cols-7 flex-1">
              {/* Empty padding cells */}
              {paddingFront.map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[100px] border-r border-b border-gray-100 bg-gray-50/20 p-2"></div>
              ))}
              
              {/* Actual date cells */}
              {dates.map((date, idx) => {
                const isSelected = date === 30; // Highlighting 30th as per mockup blue bg
                return (
                  <div key={date} className={`min-h-[100px] border-r border-b border-gray-100 p-2 flex flex-col transition-colors ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/40'}`}>
                    <span className={`text-[13px] self-end font-medium mb-1 ${date === 30 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {date}
                    </span>
                    {/* Placeholder for events if mapping them */}
                  </div>
                )
              })}
              
              {/* Padding back if necessary */}
              {Array.from({ length: 42 - paddingFront.length - dates.length }, (_, i) => (
                <div key={`empty-back-${i}`} className="min-h-[100px] border-r border-b border-gray-100 bg-gray-50/20 p-2"></div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

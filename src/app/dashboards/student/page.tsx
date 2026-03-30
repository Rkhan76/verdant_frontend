'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Bell, Users, MoreVertical, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Student &rarr; Manage courses, students, and assignments efficiently from a centralized dashboard.</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex flex-col items-center justify-center py-8">
           <Avatar className="h-20 w-20 border-4 border-white mb-4 shadow-sm">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Devon" />
            <AvatarFallback>DL</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold tracking-tight">Devon Lane</h2>
          <p className="text-sm text-indigo-100 mt-1">Class: 7 • Roll No: 03</p>
          <Button variant="outline" className="mt-5 border-white text-white hover:bg-white/20 hover:text-white rounded-full px-6 h-9 transition-colors">
            Edit Profile
          </Button>
        </Card>

        {/* 3 Metric Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Events */}
          <Card className="border border-gray-100 shadow-sm rounded-xl bg-pink-50">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-3">
              <div className="h-12 w-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-gray-500 font-medium text-sm">Events</h3>
              <p className="text-3xl font-bold text-gray-800">10</p>
            </CardContent>
          </Card>
          
          {/* Notifications */}
          <Card className="border border-gray-100 shadow-sm rounded-xl bg-emerald-50">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-gray-500 font-medium text-sm">Notifications</h3>
              <p className="text-3xl font-bold text-gray-800">15</p>
            </CardContent>
          </Card>

          {/* Attendance */}
          <Card className="border border-gray-100 shadow-sm rounded-xl bg-sky-50">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-3">
              <div className="h-12 w-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-gray-500 font-medium text-sm">Attendance</h3>
              <p className="text-3xl font-bold text-gray-800">90%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Row: Attendance Chart & Today's Class */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Donut */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Attendance</CardTitle>
            <select className="text-sm border-gray-200 rounded text-gray-600 shadow-sm p-1.5 focus:ring-[#25a194]">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center h-64">
              <div className="h-48 w-full relative mb-6">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Half Day', value: 200, color: '#fb923c' },
                        { name: 'Late', value: 300, color: '#9333ea' },
                        { name: 'Absent', value: 172, color: '#3b82f6' },
                        { name: 'Present', value: 500, color: '#25a194' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {[
                        { name: 'Half Day', value: 200, color: '#fb923c' },
                        { name: 'Late', value: 300, color: '#9333ea' },
                        { name: 'Absent', value: 172, color: '#3b82f6' },
                        { name: 'Present', value: 500, color: '#25a194' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between w-full max-w-sm text-center">
                <div><p className="text-xl font-bold text-gray-800">200</p><p className="text-[11px] text-gray-500">Half Day</p></div>
                <div><p className="text-xl font-bold text-gray-800">300</p><p className="text-[11px] text-gray-500">Late</p></div>
                <div><p className="text-xl font-bold text-gray-800">172</p><p className="text-[11px] text-gray-500">Absent</p></div>
                <div><p className="text-xl font-bold text-gray-800">500</p><p className="text-[11px] text-gray-500">Present</p></div>
              </div>
          </CardContent>
        </Card>

        {/* Today's Class */}
        <Card className="border border-gray-100 shadow-sm rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Today's Class</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {[
              { sub: 'English', time: '09:30 - 09:45 AM', s: 'Completed', c: 'bg-[#10b981]/10 text-[#10b981]' },
              { sub: 'Physics', time: '09:50 - 10:35 AM', s: 'Inprogress', c: 'bg-orange-50 text-orange-500' },
              { sub: 'Bangla', time: '09:30 - 09:45 AM', s: 'Inprogress', c: 'bg-orange-50 text-orange-500' },
              { sub: 'Chemistry', time: '09:30 - 09:45 AM', s: 'Inprogress', c: 'bg-orange-50 text-orange-500' },
              { sub: 'Accounting', time: '09:30 - 09:45 AM', s: 'Inprogress', c: 'bg-orange-50 text-orange-500' },
            ].map((cls, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-[13px] font-semibold text-gray-800">{cls.sub}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {cls.time}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-semibold ${cls.c}`}>{cls.s}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Third Row: Exam Results & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Exam Results Table */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Exam Results</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <div className="overflow-x-auto p-0">
            <table className="w-full text-sm text-center">
              <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-y border-gray-100 text-left">
                <tr>
                  <th className="px-5 py-4 w-20 text-[#25a194]">ID</th>
                  <th className="px-4 py-4 min-w-[150px]">Exam Name</th>
                  <th className="px-4 py-4 min-w-[120px]">Subject</th>
                  <th className="px-4 py-4 text-center">Grade</th>
                  <th className="px-4 py-4 text-center">Marks%</th>
                  <th className="px-4 py-4 text-center">CGPA</th>
                  <th className="px-4 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-left">
                {[
                  { id: 'AD52365', exm: 'Class Test', sub: 'English', grd: 'A', mrk: '95%', cpga: '4.2', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD52365', exm: 'First Semester', sub: 'Chemistry', grd: 'A', mrk: '80%', cpga: '3.2', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD52365', exm: 'Class Test', sub: 'Bangla', grd: 'B', mrk: '70%', cpga: '4.5', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD52365', exm: 'Class Test', sub: 'Accounting', grd: 'C', mrk: '60%', cpga: '3.9', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD52365', exm: 'First Semester', sub: 'Chemistry', grd: 'A', mrk: '80%', cpga: '3.2', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD52365', exm: 'Class Test', sub: 'English', grd: 'F', mrk: '30%', cpga: '2.5', sts: 'Fail', c: 'bg-red-50 text-red-500' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 text-[#25a194] font-medium">{row.id}</td>
                    <td className="px-4 py-3 text-gray-500">{row.exm}</td>
                    <td className="px-4 py-3 text-gray-600">{row.sub}</td>
                    <td className="px-4 py-3 text-gray-600 text-center font-bold">{row.grd}</td>
                    <td className="px-4 py-3 text-gray-500 text-center">{row.mrk}</td>
                    <td className="px-4 py-3 text-gray-600 text-center">{row.cpga}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${row.c}`}>{row.sts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between bg-white text-xs text-gray-400 font-medium">
             Showing 1 to 6 of 6 entries
            <div className="flex gap-2">
              <button>&lt;</button>
              <button className="bg-[#25a194] text-white px-2 py-0.5 rounded">1</button>
              <button>&gt;</button>
            </div>
          </div>
        </Card>

        {/* Calendar Widget */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg mb-4">
              <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-white text-gray-400"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-[13px] font-bold text-gray-700">March 2026</span>
              <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-white text-gray-400"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="text-[11px] font-semibold text-gray-500">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center gap-y-2 text-[12px] font-medium text-gray-600">
              {Array.from({length: 31}, (_, i) => {
                const day = i + 1;
                const isSelected = day === 30;
                return (
                  <div key={day} className="flex justify-center">
                    <span className={`h-7 w-7 flex items-center justify-center rounded-full ${isSelected ? 'bg-[#25a194] text-white shadow-sm' : 'hover:bg-gray-50 cursor-pointer'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Fourth Row: Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Leave Status */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Leave Status</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
             {[
               { title: 'Emergency Leave', date: 'Date: 10/10/24', sts: 'Pending', c: 'bg-orange-50 text-orange-500' },
               { title: 'Medical Leave', date: 'Date: 10/10/24', sts: 'Accepted', c: 'bg-[#10b981]/10 text-[#10b981]' },
               { title: 'Now Well', date: 'Date: 10/10/24', sts: 'Pending', c: 'bg-orange-50 text-orange-500' },
               { title: 'Medical Leave', date: 'Date: 10/10/24', sts: 'Accepted', c: 'bg-[#10b981]/10 text-[#10b981]' },
               { title: 'Emergency Leave', date: 'Date: 10/10/24', sts: 'Accepted', c: 'bg-[#10b981]/10 text-[#10b981]' },
             ].map((l, i) => (
               <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="text-[13px] font-semibold text-gray-800">{l.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{l.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-[10px] font-semibold ${l.c}`}>{l.sts}</span>
               </div>
             ))}
          </CardContent>
        </Card>

        {/* Notice Board */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Notice Board</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            {[
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting...', date: '25 Jan 2024' },
              { name: 'Kathryn Murphy', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: '25 Jan 2024' },
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024' },
              { name: 'John Doe', desc: 'Lorem Ipsum dolor sit amet consectetur adipisicing elit.', date: '25 Jan 2024' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-gray-100 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.replace(' ', '')}`} />
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-[13px] font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-[12px] text-gray-500 leading-snug">{item.desc}</p>
                  <p className="text-[11px] text-[#25a194] font-medium">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: '09:00 - 09:45 AM', title: 'Marketing Strategy Kick...', by: 'Robert Fox', color: 'border-purple-500' },
              { time: '11:15 - 12:00 AM', title: 'Product Design Brainsto...', by: 'Leslie Alexander', color: 'border-orange-500' },
              { time: '02:00 - 03:00 PM', title: 'Client Feedback Review', by: 'Courtney Henry', color: 'border-[#25a194]' },
              { time: '04:15 - 05:00 PM', title: 'Sprint Planning & Task...', by: 'Eleanor Pena', color: 'border-green-500' },
              { time: '01:15 - 02:00 PM', title: 'Client Feedback Review', by: 'John', color: 'border-[#25a194]' },
            ].map((evt, i) => (
              <div key={i} className={`pl-3 border-l-4 ${evt.color} flex justify-between items-center my-1 bg-gray-50/30 p-2 rounded-r-md`}>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">{evt.time}</p>
                  <p className="text-[12px] font-semibold text-[#25a194] mt-0.5 w-[140px] truncate">{evt.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Lead by <span className="text-[#25a194] hover:underline cursor-pointer">{evt.by}</span></p>
                </div>
                <Button variant="outline" className="h-7 text-[10px] px-3 border-gray-200">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

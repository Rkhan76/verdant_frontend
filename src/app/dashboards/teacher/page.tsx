'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, MoreVertical, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Teacher &rarr; Manage courses, students, and assignments efficiently from a centralized dashboard.</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Profile & Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="sm:col-span-2 lg:col-span-1 border-none shadow-sm rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white flex flex-col items-center justify-center py-6 h-full relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <Avatar className="h-20 w-20 border-4 border-white mb-3 shadow-md relative z-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold tracking-tight relative z-10">Courtney Henry</h2>
            <p className="text-xs text-white/90 mt-1 relative z-10 text-center px-4">Class: 1-A, V-B<br/>Physics</p>
            <Button variant="outline" className="mt-4 border-white/50 bg-white/10 text-white hover:bg-white hover:text-purple-600 rounded-full px-6 h-8 text-xs font-semibold transition-all relative z-10">
              Edit Profile
            </Button>
          </Card>

          {/* Metrics Grid */}
          <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {[
              { color: 'bg-pink-100 text-pink-600' },
              { color: 'bg-green-100 text-green-600' },
              { color: 'bg-sky-100 text-sky-600' },
              { color: 'bg-orange-100 text-orange-600' },
            ].map((metric, i) => (
              <Card key={i} className={`border border-gray-50 shadow-sm rounded-xl py-4 flex flex-col items-center justify-center ${metric.color.split(' ')[0].replace('100', '50/50')}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${metric.color}`}>
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xs text-gray-500 font-medium">Total Students</h3>
                <p className="text-2xl font-bold text-gray-800">3,500</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side: Attendance Donut */}
        <Card className="lg:col-span-1 border border-gray-100 shadow-sm rounded-xl flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Attendance</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-[12px] font-medium text-gray-600 mb-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-[#25a194]"></span>
                      <strong className="text-lg text-gray-800">200</strong>
                    </p>
                    <p className="text-[10px] text-gray-400 ml-4">Present</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[12px] font-medium text-gray-600 mb-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-orange-400"></span>
                      <strong className="text-lg text-gray-800">300</strong>
                    </p>
                    <p className="text-[10px] text-gray-400 ml-4">Half Day</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[12px] font-medium text-gray-600 mb-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-green-500"></span>
                      <strong className="text-lg text-gray-800">172</strong>
                    </p>
                    <p className="text-[10px] text-gray-400 ml-4">Late</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[12px] font-medium text-gray-600 mb-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-purple-600"></span>
                      <strong className="text-lg text-gray-800">500</strong>
                    </p>
                    <p className="text-[10px] text-gray-400 ml-4">Absent</p>
                  </div>
                </div>
                
                <div className="h-40 w-40 relative ml-2">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Present', value: 200, color: '#25a194' },
                          { name: 'Half Day', value: 300, color: '#fb923c' },
                          { name: 'Late', value: 172, color: '#22c55e' },
                          { name: 'Absent', value: 500, color: '#9333ea' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: 'Present', value: 200, color: '#25a194' },
                          { name: 'Half Day', value: 300, color: '#fb923c' },
                          { name: 'Late', value: 172, color: '#22c55e' },
                          { name: 'Absent', value: 500, color: '#9333ea' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-gray-800">1172</span>
                  </div>
                </div>
             </div>
          </CardContent>
        </Card>

      </div>

      {/* Middle Row: Notice / Events / Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Notice Board */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Notice Board</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            {[
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024' },
              { name: 'Kathryn Murphy', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: '25 Jan 2024' },
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024' },
              { name: 'John Doe', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', date: '25 Jan 2024' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-gray-100 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.replace(' ', '')}`} />
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-[13px] font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-[12px] text-gray-500 leading-snug line-clamp-2">{item.desc}</p>
                  <p className="text-[11px] text-[#25a194] font-medium">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
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

        {/* Calendar Widget */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
            <div className="grid grid-cols-7 text-center gap-y-3 text-[12px] font-medium text-gray-600 mt-4">
              {Array.from({length: 31}, (_, i) => {
                const day = i + 1;
                const isSelected = day === 30;
                return (
                  <div key={day} className="flex justify-center">
                    <span className={`h-8 w-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-[#25a194] text-white shadow-sm font-bold' : 'hover:bg-gray-50 cursor-pointer'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Row: Student Marks & Leave Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
         {/* Student Marks Table */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Student Marks</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <div className="overflow-x-auto p-0 border-t border-gray-50">
            <table className="w-full text-sm text-center">
              <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100 text-left">
                <tr>
                  <th className="px-5 py-4 w-24 text-[#25a194]">Admission No</th>
                  <th className="px-4 py-4 min-w-[200px]">Name</th>
                  <th className="px-4 py-4 min-w-[120px]">Class</th>
                  <th className="px-4 py-4 text-center">Marks%</th>
                  <th className="px-4 py-4 text-center">CGPA</th>
                  <th className="px-4 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-left">
                {[
                  { id: 'AD33578', name: 'Arlene McCoy', roll: '06', cls: 'Class 1 (C)', mrk: '91%', cpga: '4.0', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD45231', name: 'Wade Warren', roll: '08', cls: 'Class 2 (B)', mrk: '88%', cpga: '3.9', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD67452', name: 'Brooklyn Simmons', roll: '15', cls: 'Class 3 (A)', mrk: '72%', cpga: '3.1', sts: 'Pass', c: 'bg-[#10b981]/10 text-[#10b981]' },
                  { id: 'AD76133', name: 'Theresa Webb', roll: '11', cls: 'Class 5 (A)', mrk: '41%', cpga: '1.9', sts: 'Fail', c: 'bg-red-50 text-red-500' },
                  { id: 'AD98214', name: 'Darlene Robertson', roll: '20', cls: 'Class 4 (C)', mrk: '54%', cpga: '2.4', sts: 'Fail', c: 'bg-red-50 text-red-500' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 text-[#25a194] font-medium">{row.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name.replace(' ', '')}`} />
                        </Avatar>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800">{row.name}</p>
                          <p className="text-[11px] text-gray-400">Roll No: {row.roll}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.cls}</td>
                    <td className="px-4 py-3 text-gray-500 text-center">{row.mrk}</td>
                    <td className="px-4 py-3 text-gray-600 text-center font-medium">{row.cpga}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${row.c}`}>{row.sts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 flex items-center justify-between text-xs text-gray-400 font-medium bg-white border-t border-gray-100">
             Showing 1 to 5 of 5 entries
            <div className="flex gap-2">
              <button>&lt;</button>
              <button className="bg-[#25a194] text-white px-2 py-0.5 rounded">1</button>
              <button>&gt;</button>
            </div>
          </div>
        </Card>

        {/* Leave Status */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden h-full">
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
               { title: 'Now Well', date: 'Date: 10/10/24', sts: 'Pending', c: 'bg-orange-50 text-orange-500' },
               { title: 'Medical Leave', date: 'Date: 10/10/24', sts: 'Accepted', c: 'bg-[#10b981]/10 text-[#10b981]' },
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

      </div>
    </div>
  );
}

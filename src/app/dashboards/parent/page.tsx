'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Wallet, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ParentDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Parent &rarr; Track student progress, attendance, and academic performance in one place.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Due Fees', color: 'bg-orange-100 text-orange-500' },
          { label: 'Due Fees', color: 'bg-blue-100 text-blue-500' },
          { label: 'Due Fees', color: 'bg-purple-100 text-purple-600' },
          { label: 'Due Fees', color: 'bg-[#25a194]/20 text-[#25a194]' },
        ].map((metric, i) => (
          <Card key={i} className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${metric.color}`}>
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-[13px] font-medium text-gray-600">{metric.label}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">$500</h3>
              <div className="mt-2 text-[11px] font-medium">
                <span className="text-[#25a194]">10% ▲</span> <span className="text-gray-400">+5 This Month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2: Statistic Chart + My Kids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Statistic Area Chart */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Statistic</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                <span className="h-2.5 w-2.5 bg-orange-400 rounded-sm"></span> Avg. Attendance: <strong>200</strong>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                <span className="h-2.5 w-2.5 bg-blue-500 rounded-sm"></span> Avg. Exam Score: <strong>500</strong>
              </div>
            </div>
            
            <div className="h-56 w-full -ml-4 mt-4">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={[
                  { name: 'Jan', attendance: 180, score: 400 },
                  { name: 'Feb', attendance: 190, score: 450 },
                  { name: 'Mar', attendance: 200, score: 420 },
                  { name: 'Apr', attendance: 195, score: 480 },
                  { name: 'May', attendance: 210, score: 500 },
                  { name: 'Jun', attendance: 205, score: 490 },
                  { name: 'Jul', attendance: 220, score: 550 },
                  { name: 'Aug', attendance: 200, score: 520 },
                  { name: 'Sep', attendance: 215, score: 580 },
                ]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="attendance" stroke="#fb923c" fill="#fb923c" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* My Kids */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">My Kids</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2].map(kid => (
              <div key={kid} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <div className="flex items-center gap-4 mb-4">
                   <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Seth${kid}`} />
                  </Avatar>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800">Seth Hallam</h3>
                    <p className="text-[11px] text-gray-500 mt-1">Admission No: <span className="text-[#25a194] font-medium">AD1256589</span></p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Roll Number: <strong className="text-gray-800">10</strong></p>
                  </div>
                </div>
                <table className="w-full text-[11px] text-gray-600">
                  <tbody>
                    <tr><td className="py-1 w-24">Class</td><td className="font-medium">: Class 6 (2025-26)</td></tr>
                    <tr><td className="py-1 w-24">Section</td><td className="font-medium">: A</td></tr>
                    <tr><td className="py-1 w-24">Gender</td><td className="font-medium">: Male</td></tr>
                    <tr><td className="py-1 w-24">Date Of Birth</td><td className="font-medium">: 10 Nov 2006</td></tr>
                    <tr><td className="py-1 w-24">Academic Year</td><td className="font-medium">: Jun 2025/2026</td></tr>
                  </tbody>
                </table>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Today's Class / Notice Board / Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Class (Mockup actually uses Leave Status data under this title) */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Today's Class</CardTitle>
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
               { title: 'Now Well', date: 'Date: 10/10/24', sts: 'Pending', c: 'bg-orange-50 text-orange-500' },
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
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024' },
              { name: 'Kathryn Murphy', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: '25 Jan 2024' },
              { name: 'Admin', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024' },
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

      {/* Row 4: Exam Results */}
      <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-[15px] font-semibold text-gray-800">Exam Results</CardTitle>
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <div className="overflow-x-auto p-0 border-t border-gray-100">
          <table className="w-full text-sm text-center">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100 text-left">
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
        <div className="px-5 py-3 flex items-center justify-between text-xs text-gray-400 font-medium bg-white">
            Showing 1 to 5 of 5 entries
          <div className="flex gap-2">
            <button>&lt;</button>
            <button className="bg-[#25a194] text-white px-2 py-0.5 rounded">1</button>
            <button>&gt;</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

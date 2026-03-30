'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, BookOpen, User, Camera, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function SchoolDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">School &rarr; Manage your school, track attendance, expense, and net worth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Left Column (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Student', icon: Users, color: 'bg-blue-100 text-blue-600' },
              { label: 'Total Student', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
              { label: 'Total Student', icon: BookOpen, color: 'bg-teal-100 text-teal-600' },
              { label: 'Total Student', icon: Camera, color: 'bg-sky-100 text-sky-600' },
            ].map((metric, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${metric.color}`}>
                      <metric.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[13px] font-medium text-gray-600">{metric.label}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 tracking-tight">20,000</h3>
                  <div className="mt-2 text-[11px] font-medium">
                    <span className="text-[#25a194]">10% ▲</span> <span className="text-gray-400">+5 This Month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Statistic */}
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-gray-50">
              <CardTitle className="text-[15px] font-semibold text-gray-800">Revenue Statistic</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                  <span className="h-2.5 w-2.5 bg-[#25a194] rounded-sm"></span> Total Fee: $500
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                  <span className="h-2.5 w-2.5 bg-orange-400 rounded-sm"></span> Collected Fee: $300
                </div>
              </div>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={[
                    { name: 'Jan', total: 60, collected: 40 },
                    { name: 'Feb', total: 80, collected: 60 },
                    { name: 'Mar', total: 100, collected: 80 },
                    { name: 'Apr', total: 70, collected: 50 },
                    { name: 'May', total: 90, collected: 60 },
                    { name: 'Jun', total: 60, collected: 40 },
                    { name: 'Jul', total: 100, collected: 80 },
                    { name: 'Aug', total: 70, collected: 50 },
                    { name: 'Sep', total: 60, collected: 40 },
                    { name: 'Oct', total: 85, collected: 65 },
                    { name: 'Nov', total: 50, collected: 30 },
                    { name: 'Dec', total: 80, collected: 60 },
                  ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="total" fill="#25a194" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="collected" fill="#fb923c" radius={[2, 2, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Notice Board & Leave Requests row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
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

            {/* Leave Requests */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[15px] font-semibold text-gray-800">Leave Requests</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                {[
                  { name: 'Darlene Robertson', role: 'English Teacher' },
                  { name: 'Esther Howard', role: 'English Teacher' },
                  { name: 'Kristin Watson', role: 'English Teacher' },
                  { name: 'Leslie Alexander', role: 'English Teacher' },
                  { name: 'Dianne Russell', role: 'English Teacher' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 border border-gray-100 shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.replace(' ', '')}`} />
                      </Avatar>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-[11px] text-gray-500">{item.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-[13px] font-semibold text-gray-800">3 Days</h4>
                      <p className="text-[11px] text-gray-500">Apply on: 10 April</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* User Overview & Income vs Expense row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* User Overview */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[15px] font-semibold text-gray-800">User Overview</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48 w-full relative mb-4">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Student', value: 750, color: '#25a194' },
                          { name: 'Teacher', value: 56, color: '#fb923c' },
                          { name: 'Staffs', value: 15, color: '#3b82f6' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: 'Student', value: 750, color: '#25a194' },
                          { name: 'Teacher', value: 56, color: '#fb923c' },
                          { name: 'Staffs', value: 15, color: '#3b82f6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                    <span className="text-xl font-bold text-gray-800">821</span>
                    <span className="text-[10px] text-gray-500">Total Users</span>
                  </div>
                </div>
                <div className="flex justify-between items-center px-4">
                  <div className="text-center">
                    <p className="flex items-center gap-1 justify-center text-[12px] font-medium text-gray-600 mb-1">
                      <span className="h-2 w-2 rounded-full bg-[#25a194]"></span> Student
                    </p>
                    <p className="font-bold text-gray-800">750</p>
                  </div>
                  <div className="text-center">
                    <p className="flex items-center gap-1 justify-center text-[12px] font-medium text-gray-600 mb-1">
                      <span className="h-2 w-2 rounded-full bg-orange-400"></span> Teacher
                    </p>
                    <p className="font-bold text-gray-800">56</p>
                  </div>
                  <div className="text-center">
                    <p className="flex items-center gap-1 justify-center text-[12px] font-medium text-gray-600 mb-1">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span> Staffs
                    </p>
                    <p className="font-bold text-gray-800">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Income Vs Expense */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[15px] font-semibold text-gray-800">Income Vs Expense</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <span className="h-2.5 w-2.5 bg-[#25a194] rounded-sm"></span> Income: $500
                  </div>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <span className="h-2.5 w-2.5 bg-orange-400 rounded-sm"></span> Expense: $300
                  </div>
                </div>
                <div className="h-48 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={[
                      { name: 'Jan', income: 400, expense: 240 },
                      { name: 'Feb', income: 300, expense: 139 },
                      { name: 'Mar', income: 200, expense: 980 },
                      { name: 'Apr', income: 278, expense: 390 },
                      { name: 'May', income: 189, expense: 480 },
                      { name: 'Jun', income: 239, expense: 380 },
                      { name: 'Jul', income: 349, expense: 430 },
                      { name: 'Aug', income: 400, expense: 200 },
                      { name: 'Sep', income: 500, expense: 300 },
                    ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Area type="monotone" dataKey="income" stroke="#25a194" fill="#25a194" fillOpacity={0.1} strokeWidth={2} />
                      <Area type="monotone" dataKey="expense" stroke="#fb923c" fill="#fb923c" fillOpacity={0.1} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Bottom Row - 3 small cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Top Teachers */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[14px] font-semibold text-gray-800">Top Teachers</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {[
                  { name: 'Theresa Webb', sub: 'Mathematics' },
                  { name: 'Darrell Steward', sub: 'Physics' },
                  { name: 'Jane Cooper', sub: 'Biology' },
                  { name: 'Savannah Nguyen', sub: 'English' },
                  { name: 'Eleanor Pena', sub: 'Math' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.replace(' ', '')}`} />
                      </Avatar>
                      <div>
                        <h4 className="text-[12px] font-semibold text-gray-800 whitespace-nowrap">{item.name}</h4>
                        <p className="text-[10px] text-gray-400" style={{fontSize: '10px'}}>example@gmail.com</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-gray-700">{item.sub}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* New Admissions */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[14px] font-semibold text-gray-800">New Admissions</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="relative h-32 w-32 flex items-center justify-center mb-6">
                  <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'English', value: 15, color: '#25a194' },
                            { name: 'Math', value: 15, color: '#2563eb' },
                            { name: 'Biology', value: 5, color: '#fb923c' },
                            { name: 'Physics', value: 10, color: '#9333ea' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={36}
                          outerRadius={56}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {[
                            { name: 'English', value: 15, color: '#25a194' },
                            { name: 'Math', value: 15, color: '#2563eb' },
                            { name: 'Biology', value: 5, color: '#fb923c' },
                            { name: 'Physics', value: 10, color: '#9333ea' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-transparent rounded-full h-16 w-16 z-10 shadow-none pointer-events-none absolute">
                    <span className="text-xl font-bold text-gray-800 leading-none">45</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 px-2 text-[10px] font-medium text-gray-600 w-full">
                  <span className="flex items-center gap-1 px-1"><span className="h-1.5 w-1.5 rounded bg-[#25a194]"></span> English: 15</span>
                  <span className="flex items-center gap-1 px-1"><span className="h-1.5 w-1.5 rounded bg-blue-600"></span> Math: 15</span>
                  <span className="flex items-center gap-1 px-1"><span className="h-1.5 w-1.5 rounded bg-orange-400"></span> Biology: 5</span>
                  <span className="flex items-center gap-1 px-1"><span className="h-1.5 w-1.5 rounded bg-purple-600"></span> Physics: 10</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Student */}
            <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[14px] font-semibold text-gray-800">Top Student</CardTitle>
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {[
                  { name: 'Brooklyn Simmons', cls: 'Class: Six', marks: '20' },
                  { name: 'Floyd Miles', cls: 'Class: Seven', marks: '35' },
                  { name: 'Courtney Henry', cls: 'Class: Eight', marks: '45' },
                  { name: 'Kathryn Murphy', cls: 'Class: Nine', marks: '65' },
                  { name: 'Annette Black', cls: 'Class: Ten', marks: '85' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name.replace(' ', '')}`} />
                      </Avatar>
                      <div>
                        <h4 className="text-[12px] font-semibold text-gray-800 whitespace-nowrap">{item.name}</h4>
                        <p className="text-[10px] text-gray-400">{item.cls}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">Marks</span>
                      <span className="text-[11px] font-bold text-gray-800 bg-gray-100 rounded-full h-6 w-6 flex items-center justify-center border border-gray-200">{item.marks}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

        </div>

        {/* Right Sidebar Column (1/4) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Student Attendance */}
          <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-[15px] font-semibold text-gray-800">Student Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-10 w-full mb-6 max-w-[280px] mx-auto gap-0.5">
                <div className="bg-[#25a194] h-full rounded-l-md w-1/2"></div>
                <div className="bg-orange-400 h-full w-1/3"></div>
                <div className="bg-purple-600 h-full w-[10%]"></div>
                <div className="bg-green-500 h-full rounded-r-md w-[6%]"></div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Present', val: '87%', color: 'bg-[#25a194]' },
                  { label: 'Absent', val: '40%', color: 'bg-orange-400' },
                  { label: 'Late', val: '20%', color: 'bg-purple-600' },
                  { label: 'Half day', val: '20%', color: 'bg-green-500' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2 font-medium text-gray-600">
                      <span className={`h-2.5 w-2.5 rounded-sm ${item.color}`}></span>
                      {item.label}
                    </div>
                    <span className="font-semibold text-gray-800">{item.val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
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
              ].map((evt, i) => (
                <div key={i} className={`pl-3 border-l-4 ${evt.color} flex justify-between items-center my-1 bg-gray-50/30 p-2 rounded-r-md`}>
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">{evt.time}</p>
                    <p className="text-[12px] font-semibold text-[#25a194] mt-0.5 w-[140px] truncate">{evt.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Lead by {evt.by}</p>
                  </div>
                  <Button variant="outline" className="h-7 text-[10px] px-3 border-gray-200">View</Button>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

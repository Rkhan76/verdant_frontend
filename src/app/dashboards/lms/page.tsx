'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Book, DollarSign, MoreVertical, ChevronLeft, ChevronRight, Video, FileText, Star, Clock } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function LMSDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">LMS &rarr; Manage courses, students, assignments and performance metrics in one centralized LMS dashboard.</p>
      </div>

      {/* Row 1: Metrics & Earning Statistic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Metric Cards */}
        <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border border-gray-100 shadow-sm rounded-xl">
            <CardContent className="p-4 flex flex-col justify-between h-full relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded flex items-center justify-center bg-blue-100 text-blue-600">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium text-gray-600">Enrolled Courses</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">500</h3>
                <div className="text-[11px] font-medium text-gray-400 mt-1"><span className="text-[#10b981]">11.9% ↗</span> <br/>From last month</div>
              </div>
              {/* Mock Line Graph */}
              <div className="absolute bottom-4 right-4 h-10 w-16 opacity-70">
                 <svg viewBox="0 0 100 40" className="w-full h-full stroke-blue-500" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0,30 L20,20 L40,35 L60,10 L80,25 L100,5" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm rounded-xl">
            <CardContent className="p-4 flex flex-col justify-between h-full relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded flex items-center justify-center bg-purple-100 text-purple-600">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium text-gray-600">Total Students</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">3,570</h3>
                <div className="text-[11px] font-medium text-gray-400 mt-1"><span className="text-[#10b981]">43.9% ↗</span> <br/>From last month</div>
              </div>
              {/* Mock Bar Graph */}
              <div className="absolute bottom-4 right-4 h-10 w-20 flex items-end gap-[3px]">
                <div className="w-[8px] bg-purple-500 rounded-sm h-[40%]"></div>
                <div className="w-[8px] bg-purple-500 rounded-sm h-[70%]"></div>
                <div className="w-[8px] bg-purple-500 rounded-sm h-[30%]"></div>
                <div className="w-[8px] bg-purple-500 rounded-sm h-[90%]"></div>
                <div className="w-[8px] bg-purple-500 rounded-sm h-[50%]"></div>
                <div className="w-[8px] bg-purple-500 rounded-sm h-[80%]"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm rounded-xl">
            <CardContent className="p-4 flex flex-col justify-between h-full relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded flex items-center justify-center bg-orange-100 text-orange-600">
                  <Book className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium text-gray-600">Total Courses</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">30</h3>
                <div className="text-[11px] font-medium text-gray-400 mt-1"><span className="text-[#10b981]">43.9% ↗</span> <br/>From last month</div>
              </div>
              {/* Mock Bar Graph */}
              <div className="absolute bottom-4 right-4 h-10 w-20 flex items-end gap-[3px]">
                <div className="w-[8px] bg-orange-400 rounded-sm h-[60%]"></div>
                <div className="w-[8px] bg-orange-400 rounded-sm h-[90%]"></div>
                <div className="w-[8px] bg-orange-400 rounded-sm h-[40%]"></div>
                <div className="w-[8px] bg-orange-400 rounded-sm h-[70%]"></div>
                <div className="w-[8px] bg-orange-400 rounded-sm h-[100%]"></div>
                <div className="w-[8px] bg-orange-400 rounded-sm h-[50%]"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm rounded-xl">
            <CardContent className="p-4 flex flex-col justify-between h-full relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded flex items-center justify-center bg-emerald-100 text-[#25a194]">
                  <DollarSign className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium text-gray-600">Total Earnings</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">$50,000</h3>
                <div className="text-[11px] font-medium text-gray-400 mt-1"><span className="text-red-500">20.3% ↘</span> <br/>From last month</div>
              </div>
              {/* Mock Line Graph */}
              <div className="absolute bottom-4 right-4 h-10 w-16 opacity-70">
                 <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#25a194]" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0,10 L20,5 L40,25 L60,15 L80,35 L100,5" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earning Statistic */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Earning Statistic</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-800">$27,200 <span className="text-[12px] font-medium px-2 py-0.5 rounded bg-[#10b981]/10 text-[#25a194] ml-2 align-middle">10% ▲</span></h2>
              <p className="text-xs text-gray-400 mt-1">+$1500 Per Day</p>
            </div>
            {/* Chart Area */}
            <div className="flex-1 mt-6 h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={[
                  { name: 'Jan', total: 60, current: 70 },
                  { name: 'Feb', total: 45, current: 55 },
                  { name: 'Mar', total: 80, current: 90 },
                  { name: 'Apr', total: 50, current: 60 },
                  { name: 'May', total: 40, current: 50 },
                  { name: 'Jun', total: 40, current: 50 },
                  { name: 'Jul', total: 80, current: 90 },
                  { name: 'Aug', total: 50, current: 60 },
                  { name: 'Sep', total: 40, current: 50 },
                  { name: 'Oct', total: 85, current: 95 },
                  { name: 'Nov', total: 40, current: 50 },
                  { name: 'Dec', total: 60, current: 70 },
                ]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="total" fill="#25a194" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Calendar & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar Widget */}
        <Card className="lg:col-span-1 border border-gray-100 shadow-sm rounded-xl overflow-hidden bg-[#e5fcf7]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center bg-white/50 p-2 rounded-xl mb-6 shadow-sm">
              <button className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-gray-500 shadow-sm"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-[14px] font-bold text-gray-800">March 2026</span>
              <button className="h-6 w-6 flex items-center justify-center rounded-full bg-white text-gray-500 shadow-sm"><ChevronRight className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-7 text-center mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="text-[13px] font-bold text-gray-600">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center gap-y-4 text-[13px] font-semibold text-gray-700 mb-2">
              {Array.from({length: 31}, (_, i) => {
                const day = i + 1;
                const isSelected = day === 30;
                return (
                  <div key={day} className="flex justify-center">
                    <span className={`h-8 w-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-[#25a194] text-white shadow font-bold' : 'hover:bg-white/50 cursor-pointer transition-colors'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions Grid */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-100 shadow-sm rounded-xl h-full border-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-[15px] font-semibold text-gray-800">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Cameron Williamson', sub: 'English', date: '15 Jun 2025', time: '12:30 PM' },
                  { name: 'Kristin Watson', sub: 'English', date: '15 Jun 2025', time: '12:30 PM' },
                  { name: 'Kristin Watson', sub: 'English', date: '15 Jun 2025', time: '12:30 PM' },
                  { name: 'Cameron Williamson', sub: 'English', date: '15 Jun 2025', time: '12:30 PM' },
                ].map((s, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                       <Avatar className="h-14 w-14 rounded-lg border border-gray-50">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name.replace(' ', '')}`} className="rounded-lg" />
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-[14px] font-semibold text-gray-800 tracking-tight">{s.name}</h4>
                        <p className="text-[12px] text-gray-500">{s.sub}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                             <Clock className="h-3 w-3" /> {s.date}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                             <Clock className="h-3 w-3" /> {s.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-[#25a194] hover:bg-[#208b80] text-white rounded-md h-9 text-xs font-semibold shadow-none">
                        Join Class
                      </Button>
                      <Button variant="outline" className="flex-1 border-[#25a194] text-[#25a194] hover:bg-[#25a194]/10 rounded-md h-9 text-xs font-semibold shadow-none">
                         <Video className="h-4 w-4 mr-1"/> Join Class
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 3: 3 Column split (User Activity | Top Student | Top Instructor) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Activity */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">User activity</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="p-6">
              <div className="h-48 w-full relative mb-6">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Organic Search', value: 875, color: '#25a194' },
                        { name: 'Referrals', value: 350, color: '#fb923c' },
                        { name: 'Social Media', value: 320, color: '#22c55e' },
                        { name: 'Google Search', value: 340, color: '#9333ea' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {[
                        { name: 'Organic Search', value: 875, color: '#25a194' },
                        { name: 'Referrals', value: 350, color: '#fb923c' },
                        { name: 'Social Media', value: 320, color: '#22c55e' },
                        { name: 'Google Search', value: 340, color: '#9333ea' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-y-4 px-2">
                <div>
                  <p className="flex items-center gap-1 text-[12px] font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-[#25a194]"></span> Organic Search
                  </p>
                  <p className="font-bold text-gray-800 ml-3 text-sm mt-0.5">875</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-[12px] font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-orange-400"></span> Referrals
                  </p>
                  <p className="font-bold text-gray-800 ml-3 text-sm mt-0.5">350</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-[12px] font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Social Media
                  </p>
                  <p className="font-bold text-gray-800 ml-3 text-sm mt-0.5">320</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-[12px] font-medium text-gray-600">
                    <span className="h-2 w-2 rounded-full bg-purple-600"></span> Google Search
                  </p>
                  <p className="font-bold text-gray-800 ml-3 text-sm mt-0.5">340</p>
                </div>
              </div>
          </CardContent>
        </Card>

        {/* Top Student */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Top Student</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-4 space-y-4 pt-4">
             {[
               { name: 'Brooklyn Simmons', c: 'Class: Six', m: '20' },
               { name: 'Floyd Miles', c: 'Class: Seven', m: '35' },
               { name: 'Courtney Henry', c: 'Class: Eight', m: '45' },
               { name: 'Kathryn Murphy', c: 'Class: Nine', m: '65' },
               { name: 'Annette Black', c: 'Class: Ten', m: '85' },
             ].map((s, idx) => (
               <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name.replace(' ', '')}`} />
                  </Avatar>
                  <div>
                    <h4 className="text-[13px] font-semibold text-gray-800">{s.name}</h4>
                    <p className="text-[11px] text-gray-400">{s.c}</p>
                  </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] text-gray-400">Marks</span>
                   <span className="text-[12px] font-bold text-[#25a194] bg-[#25a194]/10 rounded-full w-8 h-8 flex items-center justify-center border border-[#25a194]/20">{s.m}</span>
                 </div>
               </div>
             ))}
          </CardContent>
        </Card>

        {/* Top Instructor */}
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Top Instructor</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-4 space-y-4 pt-4">
            {[
              { name: 'Dianne Russell', id: 'Agent ID: 36254', stars: 5, revs: 25 },
              { name: 'Wade Warren', id: 'Agent ID: 36254', stars: 5, revs: 25 },
              { name: 'Albert Flores', id: 'Agent ID: 36254', stars: 5, revs: 25 },
              { name: 'Bessie Cooper', id: 'Agent ID: 36254', stars: 5, revs: 25 },
              { name: 'Arlene McCoy', id: 'Agent ID: 36254', stars: 5, revs: 25 },
            ].map((s, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-2 rounded-lg">
                <div className="flex items-center gap-3">
                   <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name.replace(' ', '')}`} />
                  </Avatar>
                  <div>
                    <h4 className="text-[13px] font-semibold text-gray-800">{s.name}</h4>
                    <p className="text-[11px] text-gray-400">{s.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex text-orange-400 mb-0.5">
                    {[1,2,3,4,5].map(st => <Star key={st} fill="currentColor" stroke="none" className="w-3.5 h-3.5" />)}
                  </div>
                  <p className="text-[10px] text-gray-400">{s.revs} Reviews</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Row 4: Recent Enrolled Courses & Course Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Enrolled Courses Table */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Recent Enrolled Courses</CardTitle>
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <div className="overflow-x-auto p-0 border-t border-gray-50">
            <table className="w-full text-sm text-center">
               <thead className="text-xs text-gray-800 bg-gray-50/50 font-semibold border-b border-gray-100 text-left">
                <tr>
                   <th className="px-5 py-4 min-w-[100px]">Invoice</th>
                   <th className="px-4 py-4 min-w-[150px]">Student</th>
                   <th className="px-4 py-4 min-w-[200px]">Courses Name</th>
                   <th className="px-4 py-4 text-center">Amount</th>
                   <th className="px-4 py-4 text-center min-w-[120px]">Payment By</th>
                   <th className="px-4 py-4 text-center min-w-[120px]">Date</th>
                </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 text-left">
                 {[
                   { inv: '#829776', name: 'John Doe', cs: 'Scrum drawing course', amt: '$29.00', pmt: 'PayPal', dt: '04 Feb, 2025' },
                   { inv: '#829777', name: 'Emily Carter', cs: 'Advanced UI/UX Design', amt: '$49.00', pmt: 'Stripe', dt: '06 Feb, 2025' },
                   { inv: '#829778', name: 'Michael Smith', cs: 'Full-Stack Development', amt: '$79.00', pmt: 'MasterCard', dt: '08 Feb, 2025' },
                   { inv: '#829779', name: 'Sarah Johnson', cs: 'Digital Marketing Pro', amt: '$39.00', pmt: 'Visa', dt: '10 Feb, 2025' },
                   { inv: '#829780', name: 'David Wilson', cs: 'Laravel API Development', amt: '$59.00', pmt: 'PayPal', dt: '12 Feb, 2025' },
                 ].map((row, idx) => (
                   <tr key={idx} className="hover:bg-gray-50/50">
                     <td className="px-5 py-3 text-gray-500 font-medium">{row.inv}</td>
                     <td className="px-4 py-3 font-semibold text-gray-700">{row.name}</td>
                     <td className="px-4 py-3 text-gray-500">{row.cs}</td>
                     <td className="px-4 py-3 text-gray-800 font-bold text-center">{row.amt}</td>
                     <td className="px-4 py-3 text-gray-500 text-center">{row.pmt}</td>
                     <td className="px-4 py-3 text-gray-500 text-center">{row.dt}</td>
                   </tr>
                 ))}
               </tbody>
            </table>
          </div>
        </Card>

        {/* Course Activity Chart */}
        <Card className="border border-gray-100 shadow-sm rounded-xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Course Activity</CardTitle>
            <select className="text-[11px] border-gray-200 rounded text-gray-600 p-1 shadow-none">
              <option>Yearly</option>
            </select>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div className="flex justify-center gap-6 mb-6 mt-2">
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600">
                <span className="h-2.5 w-2.5 bg-[#25a194] rounded-full"></span> Paid Course: 500
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-600">
                <span className="h-2.5 w-2.5 bg-orange-400 rounded-full"></span> Free Course: 200
              </div>
            </div>
            
            {/* Recharts Area Chart */}
            <div className="h-56 w-full -ml-4 mt-4">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={[
                  { name: 'Jan', paid: 180, free: 140 },
                  { name: 'Feb', paid: 290, free: 250 },
                  { name: 'Mar', paid: 200, free: 120 },
                  { name: 'Apr', paid: 395, free: 280 },
                  { name: 'May', paid: 210, free: 100 },
                  { name: 'Jun', paid: 405, free: 390 },
                  { name: 'Jul', paid: 320, free: 250 },
                  { name: 'Aug', paid: 500, free: 320 },
                  { name: 'Sep', paid: 415, free: 280 },
                ]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="free" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey="paid" stroke="#25a194" fill="#25a194" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

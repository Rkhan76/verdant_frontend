'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, Eye, Edit, Trash2 } from 'lucide-react';

const scheduleData = [
  { sl: '01', class: 'Class 1 (A)', subject: 'English', examDate: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', duration: '3 hrs', room: '101' },
  { sl: '02', class: 'Class 1 (A)', subject: 'English', examDate: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', duration: '3 hrs', room: '101' },
  { sl: '03', class: 'Class 2 (B)', subject: 'Mathematics', examDate: '12 Jul 2016', startTime: '09:30 AM', endTime: '12:30 PM', duration: '3 hrs', room: '102' },
  { sl: '04', class: 'Class 3 (C)', subject: 'Science', examDate: '18 Sep 2017', startTime: '11:00 AM', endTime: '02:00 PM', duration: '3 hrs', room: '103' },
  { sl: '05', class: 'Class 4 (A)', subject: 'History', examDate: '02 Jan 2018', startTime: '08:30 AM', endTime: '11:30 AM', duration: '3 hrs', room: '104' },
  { sl: '06', class: 'Class 5 (B)', subject: 'Geography', examDate: '10 Mar 2019', startTime: '12:00 PM', endTime: '03:00 PM', duration: '3 hrs', room: '105' },
  { sl: '07', class: 'Class 6 (A)', subject: 'Bangla', examDate: '20 Apr 2020', startTime: '09:00 AM', endTime: '12:00 PM', duration: '3 hrs', room: '106' },
  { sl: '08', class: 'Class 7 (C)', subject: 'Computer', examDate: '15 Aug 2021', startTime: '01:00 PM', endTime: '04:00 PM', duration: '3 hrs', room: '107' },
  { sl: '09', class: 'Class 8 (B)', subject: 'Physics', examDate: '09 Oct 2022', startTime: '10:30 AM', endTime: '01:30 PM', duration: '3 hrs', room: '108' },
  { sl: '10', class: 'Class 9 (A)', subject: 'Chemistry', examDate: '25 Dec 2023', startTime: '09:45 AM', endTime: '12:45 PM', duration: '3 hrs', room: '109' },
];

export default function ExamSchedulePage() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Exam Schedule</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/examinations" className="hover:text-[#25a194] transition-colors">Examinations</Link>
            <span>/</span>
            <span className="text-gray-400">Exam Schedule</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded shadow-sm">
          + Add Schedule
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="export">
              <SelectTrigger className="w-[110px] h-10 bg-white border-gray-200 text-gray-600 rounded">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-9 h-10 bg-white border-gray-200 rounded text-sm w-full focus-visible:ring-[#25a194]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-sm text-gray-500 hidden sm:inline-block">Rows per page:</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-10 bg-white border-gray-200 text-gray-600 rounded">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th scope="col" className="px-4 py-4 w-20">S.L</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Class</th>
                <th scope="col" className="px-4 py-4 min-w-[150px]">Subject</th>
                <th scope="col" className="px-4 py-4 min-w-[130px]">Exam Date</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Start Time</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">End Time</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Duration</th>
                <th scope="col" className="px-4 py-4 w-24">Room</th>
                <th scope="col" className="px-4 py-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {scheduleData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-4 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-4 text-gray-500">{row.class}</td>
                  <td className="px-4 py-4 text-gray-500">{row.subject}</td>
                  <td className="px-4 py-4 text-gray-500">{row.examDate}</td>
                  <td className="px-4 py-4 text-gray-500">{row.startTime}</td>
                  <td className="px-4 py-4 text-gray-500">{row.endTime}</td>
                  <td className="px-4 py-4 text-gray-500">{row.duration}</td>
                  <td className="px-4 py-4 text-gray-500">{row.room}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of 11 entries
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-[#25a194] text-white font-medium text-sm transition-colors">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-transparent text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

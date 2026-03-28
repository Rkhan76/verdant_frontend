'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, Eye, Edit, Trash2 } from 'lucide-react';

const examData = [
  { sl: '01', examName: 'Monthly Test', examDate: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', status: 'Active' },
  { sl: '02', examName: 'Weekly Assessment', examDate: '10 Jun 2015', startTime: '09:00 AM', endTime: '11:00 AM', status: 'Pending' },
  { sl: '03', examName: 'Mid Term Exam', examDate: '15 Jun 2015', startTime: '12:00 PM', endTime: '03:00 PM', status: 'Scheduled' },
  { sl: '04', examName: 'Final Term Exam', examDate: '22 Jun 2015', startTime: '10:00 AM', endTime: '01:30 PM', status: 'Closed' },
  { sl: '05', examName: 'Mock Test', examDate: '28 Jun 2015', startTime: '11:00 AM', endTime: '01:00 PM', status: 'Active' },
  { sl: '06', examName: 'Quiz Exam', examDate: '03 Jul 2015', startTime: '02:00 PM', endTime: '02:30 PM', status: 'Pending' },
  { sl: '07', examName: 'Group Discussion', examDate: '08 Jul 2015', startTime: '03:30 PM', endTime: '05:00 PM', status: 'Scheduled' },
  { sl: '08', examName: 'Presentation', examDate: '12 Jul 2015', startTime: '09:30 AM', endTime: '10:30 AM', status: 'Active' },
  { sl: '09', examName: 'Lab Performance', examDate: '15 Jul 2015', startTime: '01:00 PM', endTime: '03:00 PM', status: 'Closed' },
  { sl: '10', examName: 'Project Demo', examDate: '20 Jul 2015', startTime: '02:00 PM', endTime: '04:00 PM', status: 'Upcoming' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-[#10b981]/10 text-[#10b981]';
    case 'Pending': return 'bg-orange-50 text-orange-500';
    case 'Scheduled': return 'bg-sky-100 text-sky-500';
    case 'Closed': return 'bg-red-50 text-red-500';
    case 'Upcoming': return 'bg-[#0ea5e9]/10 text-[#0ea5e9]';
    default: return 'bg-gray-50 text-gray-500';
  }
};

export default function ExamListPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Exam List</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/examinations" className="hover:text-[#25a194] transition-colors">Examinations</Link>
            <span>/</span>
            <span className="text-gray-400">Exam List</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded shadow-sm">
          + Add Exam
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
                <th scope="col" className="px-4 py-4 min-w-[200px]">Exam Name</th>
                <th scope="col" className="px-4 py-4 min-w-[150px]">Exam Date</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Start Time</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">End Time</th>
                <th scope="col" className="px-4 py-4 w-32">Status</th>
                <th scope="col" className="px-4 py-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {examData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-4 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-4 text-gray-500">{row.examName}</td>
                  <td className="px-4 py-4 text-gray-500">{row.examDate}</td>
                  <td className="px-4 py-4 text-gray-500">{row.startTime}</td>
                  <td className="px-4 py-4 text-gray-500">{row.endTime}</td>
                  <td className="px-4 py-4">
                    <span className={`px-4 py-1.5 rounded text-xs font-semibold ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
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

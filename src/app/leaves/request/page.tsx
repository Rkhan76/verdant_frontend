'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, ChevronLeft, ChevronRight, Download, MoreVertical, 
  Stethoscope, Sun, Clock, Plane, Book, CircleDollarSign, 
  Briefcase, Users, Ban
} from 'lucide-react';

const leaveRequestData = [
  { sl: '01', applyDate: '07 May 2025', name: 'Jerome Bell', userType: 'Teacher', leaveType: 'Medical Leave', TypeIcon: Stethoscope, dateRange: '07 May 2025 - 08 May 2025', duration: '1', status: 'Approved' },
  { sl: '02', applyDate: '10 May 2025', name: 'Jane Cooper', userType: 'Student', leaveType: 'Casual Leave', TypeIcon: Sun, dateRange: '10 May 2025 - 12 May 2025', duration: '2', status: 'Pending' },
  { sl: '03', applyDate: '12 May 2025', name: 'Devon Lane', userType: 'Teacher', leaveType: 'Half Day Leave', TypeIcon: Clock, dateRange: '12 May 2025', duration: '0.5', status: 'Rejected' },
  { sl: '04', applyDate: '13 May 2025', name: 'Cody Fisher', userType: 'Admin', leaveType: 'Vacation Leave', TypeIcon: Plane, dateRange: '13 May 2025 - 20 May 2025', duration: '7', status: 'Approved' },
  { sl: '05', applyDate: '14 May 2025', name: 'Theresa Webb', userType: 'Teacher', leaveType: 'Study Leave', TypeIcon: Book, dateRange: '14 May 2025 - 16 May 2025', duration: '2', status: 'Pending' },
  { sl: '06', applyDate: '15 May 2025', name: 'Darrell Steward', userType: 'Student', leaveType: 'Paid Leave', TypeIcon: CircleDollarSign, dateRange: '15 May 2025 - 17 May 2025', duration: '2', status: 'Approved' },
  { sl: '07', applyDate: '17 May 2025', name: 'Leslie Alexander', userType: 'Teacher', leaveType: 'Emergency Leave', TypeIcon: Briefcase, dateRange: '17 May 2025 - 18 May 2025', duration: '1', status: 'Rejected' },
  { sl: '08', applyDate: '18 May 2025', name: 'Guy Hawkins', userType: 'Admin', leaveType: 'Maternity Leave', TypeIcon: Users, dateRange: '18 May 2025 - 28 May 2025', duration: '10', status: 'Approved' },
  { sl: '09', applyDate: '19 May 2025', name: 'Brooklyn Simmons', userType: 'Teacher', leaveType: 'Paternity Leave', TypeIcon: Users, dateRange: '19 May 2025 - 24 May 2025', duration: '5', status: 'Pending' },
  { sl: '10', applyDate: '20 May 2025', name: 'Kristin Watson', userType: 'Student', leaveType: 'Unpaid Leave', TypeIcon: Ban, dateRange: '20 May 2025 - 21 May 2025', duration: '1', status: 'Rejected' },
];

export default function LeaveRequestPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Leave Request</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Leave Request</span>
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Export Dropdown */}
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

            {/* Search Input */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-5 py-4 w-14">S.L</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Apply Date</th>
                <th scope="col" className="px-4 py-4 min-w-[150px]">Name</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">User Type</th>
                <th scope="col" className="px-4 py-4 min-w-[180px]">Leave Type</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Date</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Duration</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Status</th>
                <th scope="col" className="px-4 py-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leaveRequestData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-3 text-gray-600">{row.applyDate}</td>
                  <td className="px-4 py-3 text-[#25a194] font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.userType}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <row.TypeIcon className="h-4 w-4 text-gray-400" />
                      {row.leaveType}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.dateRange}</td>
                  <td className="px-4 py-3 text-gray-600">{row.duration}</td>
                  <td className="px-4 py-3">
                    <span className={`px-4 py-1.5 rounded text-xs font-semibold ${
                      row.status === 'Approved' ? 'bg-[#10b981]/10 text-[#10b981]' 
                      : row.status === 'Pending' ? 'bg-orange-50 text-orange-500' 
                      : 'bg-red-50 text-red-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button className="h-8 w-8 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of 10 entries
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded bg-[#25a194] text-white font-medium text-sm transition-colors">
              1
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

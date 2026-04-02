'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, Eye, Edit, Trash2 } from 'lucide-react';

const leaveTypesData = [
  { sl: '01', type: 'Medical Leave', status: 'Active' },
  { sl: '02', type: 'Special Leave', status: 'Inactive' },
  { sl: '03', type: 'Casual Leave', status: 'Active' },
  { sl: '04', type: 'Sick Leave', status: 'Inactive' },
  { sl: '05', type: 'Maternity Leave', status: 'Active' },
  { sl: '06', type: 'Paternity Leave', status: 'Active' },
  { sl: '07', type: 'Annual Leave', status: 'Inactive' },
  { sl: '08', type: 'Emergency Leave', status: 'Active' },
  { sl: '09', type: 'Study Leave', status: 'Active' },
  { sl: '10', type: 'Unpaid Leave', status: 'Inactive' },
];

export default function LeaveTypesPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Leave Type</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Leave Type</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded font-medium">
          + Add Leave Type
        </Button>
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
                <th scope="col" className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th scope="col" className="px-4 py-4 w-20">S.L</th>
                <th scope="col" className="px-4 py-4 min-w-[300px]">Leave Type</th>
                <th scope="col" className="px-4 py-4 min-w-[150px]">Status</th>
                <th scope="col" className="px-4 py-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leaveTypesData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-3 text-gray-600">{row.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-4 py-1.5 rounded text-xs font-semibold ${
                      row.status === 'Active' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-red-50 text-red-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
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

        {/* Pagination Toolbar */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of 12 entries
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

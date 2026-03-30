'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, MoreVertical, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const feesCollectionData = [
  { sl: '01', admissionNo: 'AD52365', name: 'Kathryn Murphy', rollNo: '12', className: 'Class 1 (A)', amount: '$700.50', paid: '$700.50', due: '$0.00', date: '12 May 2025', status: 'Paid' },
  { sl: '02', admissionNo: 'AD52366', name: 'Jerome Bell', rollNo: '8', className: 'Class 2 (B)', amount: '$850.00', paid: '$450.00', due: '$400.00', date: '10 May 2025', status: 'Partial' },
  { sl: '03', admissionNo: 'AD52367', name: 'Theresa Webb', rollNo: '15', className: 'Class 3 (A)', amount: '$600.00', paid: '$0.00', due: '$600.00', date: '08 May 2025', status: 'Unpaid' },
  { sl: '04', admissionNo: 'AD52368', name: 'Courtney Henry', rollNo: '5', className: 'Class 4 (C)', amount: '$1200.00', paid: '$1200.00', due: '$0.00', date: '05 May 2025', status: 'Paid' },
];

export default function FeesCollectionPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Fees Collection</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Fees</span>
            <span>/</span>
            <span className="text-gray-400">Fees Collection</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded font-medium flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Collect Fees
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

            {/* Filter Dropdown */}
            <Select defaultValue="filter">
              <SelectTrigger className="w-[100px] h-10 bg-white border-gray-200 text-gray-600 rounded">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filter">Filter</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
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
                <th scope="col" className="px-4 py-4 w-14">S.L</th>
                <th scope="col" className="px-4 py-4 w-32">Admission No</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Name</th>
                <th scope="col" className="px-4 py-4 min-w-[80px]">Roll No</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Class</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Amount</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Paid</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Due</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Date</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Status</th>
                <th scope="col" className="px-4 py-4 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {feesCollectionData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-3 font-medium text-[#25a194]">
                    <Link href="#" className="hover:underline">{row.admissionNo}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name.replace(' ', '')}`} />
                        <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] font-medium text-xs">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.rollNo}</td>
                  <td className="px-4 py-3 text-gray-500">{row.className}</td>
                  <td className="px-4 py-3 text-gray-600">{row.amount}</td>
                  <td className="px-4 py-3 text-gray-600">{row.paid}</td>
                  <td className="px-4 py-3 text-gray-600">{row.due}</td>
                  <td className="px-4 py-3 text-gray-500">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      row.status === 'Paid' 
                        ? 'bg-[#10b981]/10 text-[#10b981]' 
                        : row.status === 'Partial'
                          ? 'bg-orange-50 text-orange-500'
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
            Showing 1 to 4 of 4 entries
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

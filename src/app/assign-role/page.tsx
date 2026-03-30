'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, MoreVertical } from 'lucide-react';

const assignRoleData = [
  { sl: '01', date: '05 Jan 2018', role: 'Administrator', features: 'User Management, System Settings, Notifications' },
  { sl: '02', date: '12 Mar 2019', role: 'Accountant', features: 'Payroll, Ledger Management, Expense Tracking' },
  { sl: '03', date: '22 Jul 2020', role: 'Teacher', features: 'Class Management, Attendance, Student Reports' },
  { sl: '04', date: '09 Sep 2017', role: 'Librarian', features: 'Book Records, Issue/Return, Fine Collection' },
  { sl: '05', date: '15 Nov 2021', role: 'Receptionist', features: 'Visitor Entry, Call Handling, Appointment Scheduling' },
  { sl: '06', date: '10 Dec 2016', role: 'HR Manager', features: 'Staff Management, Recruitment, Attendance Control' },
  { sl: '07', date: '03 Apr 2022', role: 'IT Support', features: 'Technical Support, Software Maintenance, Network Issues' },
  { sl: '08', date: '18 Jun 2020', role: 'Parent', features: 'Student Monitoring, Fee Checking, Communication' },
  { sl: '09', date: '25 Aug 2019', role: 'Student', features: 'Online Classes, Exam Portal, Assignments' },
  { sl: '10', date: '14 Oct 2018', role: 'Exam Coordinator', features: 'Exam Schedule, Question Papers, Result Publishing' },
];

export default function AssignRolePage() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Assign Role</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Assign Role</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded font-medium disabled:opacity-50">
          + Assign New Role
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Export Dropdown */}
            <Select defaultValue="export">
              <SelectTrigger className="w-[110px] h-10 bg-white border-gray-200 text-gray-600 rounded shadow-none">
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
                className="pl-9 h-10 bg-white border-gray-200 shadow-none rounded text-sm w-full focus-visible:ring-[#25a194]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-sm text-gray-500 hidden sm:inline-block">Rows per page:</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] h-10 bg-white border-gray-200 text-gray-600 shadow-none rounded">
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
          <table className="w-full text-sm text-center whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-5 py-4 w-12 text-left">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th scope="col" className="px-4 py-4 w-20 text-left">S.L</th>
                <th scope="col" className="px-4 py-4 min-w-[150px] text-left">Date</th>
                <th scope="col" className="px-4 py-4 min-w-[200px] text-left">Role Name</th>
                <th scope="col" className="px-4 py-4 min-w-[350px] text-left">Features</th>
                <th scope="col" className="px-4 py-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assignRoleData.map((row) => (
                <tr key={row.sl} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-left">{row.sl}</td>
                  <td className="px-4 py-3 text-gray-600 text-left">{row.date}</td>
                  <td className="px-4 py-3 text-gray-600 text-left">{row.role}</td>
                  <td className="px-4 py-3 text-[#25a194] text-left font-medium">{row.features}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button className="h-8 w-8 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <MoreVertical className="h-5 w-5" />
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

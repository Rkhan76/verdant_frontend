'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, Download, Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const studentAttendanceData = [
  { sl: '01', admissionNo: 'AD52365', name: 'Marvin McKinney', rollNo: '12', className: 'Class 1 (A)', attendance: 'Present', note: '' },
  { sl: '02', admissionNo: 'AD52366', name: 'Cody Fisher', rollNo: '8', className: 'Class 2 (B)', attendance: 'Present', note: '' },
  { sl: '03', admissionNo: 'AD52367', name: 'Jenny Wilson', rollNo: '9', className: 'Class 3 (C)', attendance: 'Late', note: '' },
  { sl: '04', admissionNo: 'AD52368', name: 'Guy Hawkins', rollNo: '5', className: 'Class 2 (A)', attendance: 'Absent', note: 'Sick leave' },
  { sl: '05', admissionNo: 'AD52369', name: 'Esther Howard', rollNo: '15', className: 'Class 3 (B)', attendance: 'Present', note: '' },
  { sl: '06', admissionNo: 'AD52370', name: 'Jane Cooper', rollNo: '18', className: 'Class 4 (A)', attendance: 'Halfday', note: 'Medical appointment' },
  { sl: '07', admissionNo: 'AD52371', name: 'Robert Fox', rollNo: '7', className: 'Class 4 (B)', attendance: 'Present', note: '' },
  { sl: '08', admissionNo: 'AD52372', name: 'Theresa Webb', rollNo: '11', className: 'Class 5 (A)', attendance: 'Late', note: 'Traffic delay' },
  { sl: '09', admissionNo: 'AD52373', name: 'Courtney Henry', rollNo: '14', className: 'Class 5 (B)', attendance: 'Present', note: '' },
  { sl: '10', admissionNo: 'AD52374', name: 'Wade Warren', rollNo: '10', className: 'Class 6 (A)', attendance: 'Present', note: '' },
];

export default function StudentAttendancePage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Student Attendance</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Student Attendance</span>
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

            {/* Filter Dropdown */}
            <Select defaultValue="filter">
              <SelectTrigger className="w-[100px] h-10 bg-white border-gray-200 text-gray-600 rounded">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filter">Filter</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
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
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th scope="col" className="px-4 py-4 w-14">S.L</th>
                <th scope="col" className="px-4 py-4 w-32">Admission No</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Name</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Class</th>
                <th scope="col" className="px-4 py-4 min-w-[350px]">Attendance</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {studentAttendanceData.map((row, idx) => (
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
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{row.name}</span>
                        <span className="text-[11px] text-gray-400">Roll No: {row.rollNo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.className}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-5">
                      {['Present', 'Late', 'Absent', 'Halfday', 'Holiday'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name={`attendance-${row.sl}`} 
                            value={opt}
                            defaultChecked={row.attendance === opt}
                            className={`w-4 h-4 cursor-pointer focus:ring-0 ${
                              opt === 'Present' ? 'text-[#10b981]' : 
                              opt === 'Absent' ? 'text-[#25a194]' : 
                              'text-[#25a194]'
                            } bg-white border-gray-300`}
                          />
                          <span className={`text-sm ${row.attendance === opt ? (
                            opt === 'Present' ? 'text-[#10b981]' : 
                            'text-[#25a194]'
                          ) : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Input 
                      placeholder="Write note..." 
                      defaultValue={row.note}
                      className="h-9 w-full min-w-[150px] border-gray-200 text-sm focus-visible:ring-[#25a194]"
                    />
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
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
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
      
      {/* Save Button Container */}
      <div className="mt-4 flex justify-end">
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-6 h-11 rounded font-medium flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Attendance
        </Button>
      </div>
    </div>
  );
}

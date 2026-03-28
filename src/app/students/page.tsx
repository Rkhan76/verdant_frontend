'use client';

import { 
  MoreVertical, MoreHorizontal, Filter, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

// Dummy data from mock
const students = [
  { s_l: '01', admissionNo: 'AD52365', name: 'Kathryn Murphy', rollNo: '12', class: 'Class 1 (A)', dob: '05 May 2012', gender: 'Male', mobile: '209.555.0104', category: 'General', status: 'Active', color: 'bg-green-100 text-green-700', avatar: 'https://i.pravatar.cc/150?u=12' },
  { s_l: '02', admissionNo: 'AD52366', name: 'Floyd Miles', rollNo: '1', class: 'Class 2 (B)', dob: '05 May 2012', gender: 'Female', mobile: '209.555.0104', category: 'Special', status: 'Inactive', color: 'bg-red-100 text-red-700', avatar: 'https://i.pravatar.cc/150?u=1' },
];

export default function StudentsPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Student List</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Student List</span>
          </p>
        </div>
        <Link href="/students/add">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
            Add Student
          </Button>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 w-full overflow-hidden">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-9 font-normal text-gray-600 border-gray-200">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-8 pr-4 h-9 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] focus:border-[#25a194]"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Button variant="outline" className="h-9 font-normal text-gray-600 border-gray-200">
              Filter <Filter className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <select className="h-9 border border-gray-200 rounded-md bg-white px-2 focus:outline-none focus:ring-1 focus:ring-[#25a194]">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-4 w-12"><Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" /></th>
                <th className="p-4 py-5">S.L</th>
                <th className="p-4">Admission No</th>
                <th className="p-4">Name</th>
                <th className="p-4">Class</th>
                <th className="p-4">Date of Birth</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 w-12"><Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" /></td>
                  <td className="p-4 text-gray-500">{student.s_l}</td>
                  <td className="p-4 text-[#25a194] font-medium">{student.admissionNo}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-full object-cover border border-gray-100" />
                      <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll No: <span className="font-medium text-gray-700">{student.rollNo}</span></p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{student.class}</td>
                  <td className="p-4 text-gray-600">{student.dob}</td>
                  <td className="p-4 text-gray-600">{student.gender}</td>
                  <td className="p-4 text-gray-600">{student.mobile}</td>
                  <td className="p-4 text-gray-600">{student.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded ${student.color}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">Showing 1 to 2 of 2 entries</p>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-[#25a194] text-white font-medium">1</button>
            <button className="h-8 w-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition-colors font-medium">2</button>
            <button className="h-8 w-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

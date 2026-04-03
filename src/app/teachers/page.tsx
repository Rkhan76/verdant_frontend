'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ChevronLeft, ChevronRight, Download, Filter, Eye, Edit, Trash2 } from 'lucide-react';

const teachersData = [
  { sl: '01', id: 'AD52365', name: 'Marvin McKinney', subject: 'Mathematics', class: '1 (A), 2(A), 3(A)', email: 'chinthaka@hotmail.com', phone: '209.555.0104', date: '05 May 2012', gender: 'male', status: 'Active' },
  { sl: '02', id: 'AD52366', name: 'Ralph Edwards', subject: 'Physics', class: '9 (A), 10 (B)', email: 'mobileip@mac.com', phone: '209.555.0104', date: '05 May 2012', gender: 'male', status: 'Active' },
  { sl: '03', id: 'AD52367', name: 'Courtney Henry', subject: 'Biology', class: '6 (A), 7 (B)', email: 'courtney@edu.com', phone: '209.555.0134', date: '18 Jan 2014', gender: 'female', status: 'Inactive' },
  { sl: '04', id: 'AD52368', name: 'Eleanor Pena', subject: 'Chemistry', class: '8 (B), 9 (A)', email: 'eleanor.pena@school.org', phone: '209.555.0189', date: '22 Aug 2016', gender: 'female', status: 'Active' },
  { sl: '05', id: 'AD52369', name: 'Cody Fisher', subject: 'English', class: '5 (A), 6 (A)', email: 'cody.fisher@school.com', phone: '209.555.0192', date: '14 Mar 2015', gender: 'male', status: 'Active' },
  { sl: '06', id: 'AD52370', name: 'Devon Lane', subject: 'Geography', class: '7 (C), 8 (A)', email: 'devon@edu.org', phone: '209.555.0119', date: '09 Jul 2018', gender: 'male', status: 'Active' },
  { sl: '07', id: 'AD52371', name: 'Bessie Cooper', subject: 'History', class: '9 (B), 10 (A)', email: 'bessie.cooper@school.org', phone: '209.555.0156', date: '23 Feb 2013', gender: 'female', status: 'Active' },
  { sl: '08', id: 'AD52372', name: 'Arlene McCoy', subject: 'Economics', class: '11 (B), 12 (A)', email: 'arlene.mccoy@edu.org', phone: '209.555.0172', date: '16 Oct 2019', gender: 'female', status: 'Inactive' },
  { sl: '09', id: 'AD52373', name: 'Annette Black', subject: 'ICT', class: '8 (A), 9 (B)', email: 'annette@school.edu', phone: '209.555.0195', date: '05 May 2020', gender: 'female', status: 'Active' },
  { sl: '10', id: 'AD52374', name: 'Guy Hawkins', subject: 'Accounting', class: '10 (A), 11 (A)', email: 'guy.hawkins@edu.com', phone: '209.555.0184', date: '11 Dec 2017', gender: 'male', status: 'Active' },
];

export default function TeachersPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Teacher List</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Teacher</span>
            <span>/</span>
            <span className="text-gray-400">Teacher List</span>
          </p>
        </div>
        <Link href="/teachers/add">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
            + Add New
          </Button>
        </Link>
      </div>

      {/* Main Card container */}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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

        {/* Table Overflow Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-800 bg-gray-50/50 uppercase font-semibold border-b border-gray-100">
              <tr>
                <th scope="col" className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                </th>
                <th scope="col" className="px-4 py-4 w-14">S.L</th>
                <th scope="col" className="px-4 py-4 w-24">ID</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Name</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Subject</th>
                <th scope="col" className="px-4 py-4 min-w-[150px]">Class</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Email</th>
                <th scope="col" className="px-4 py-4 min-w-[140px]">Phone Number</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Join Date</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Status</th>
                <th scope="col" className="px-4 py-4 min-w-[100px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {teachersData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-3 font-medium text-[#25a194]">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 relative group cursor-pointer">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${row.name.replace(' ', '')}`} />
                        <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] font-medium text-xs">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800 group-hover:text-[#25a194] transition-colors">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.subject}</td>
                  <td className="px-4 py-3 text-gray-500">{row.class}</td>
                  <td className="px-4 py-3 text-gray-500">{row.email}</td>
                  <td className="px-4 py-3 text-gray-500">{row.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${row.status === 'Active' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-red-50 text-red-500'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href='/teachers/detail' className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
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

        {/* Custom scrollbar track for the overflow (visual detail from design) */}
        <div className="w-full h-1.5 bg-gray-100 hidden sm:block">
          <div className="h-full bg-gray-400 w-3/4 rounded-full mx-1"></div>
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

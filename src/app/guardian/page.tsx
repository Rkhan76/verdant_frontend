'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ChevronLeft, ChevronRight, Download, Eye, Edit, Trash2 } from 'lucide-react';

const guardiansData = [
  { sl: '01', id: 'AD52365', name: 'Marvin McKinney', childName: 'Darlene Robertson', childClass: 'Class: 1 (A)', email: 'chinthaka@hotmail.com', phone: '209.555.0104', date: '05 May 2012' },
  { sl: '02', id: 'AD65412', name: 'Esther Howard', childName: 'Jane Cooper', childClass: 'Class: 2 (B)', email: 'esther@example.com', phone: '305.442.0899', date: '10 Feb 2014' },
  { sl: '03', id: 'AD76548', name: 'Cody Fisher', childName: 'Robert Fox', childClass: 'Class: 3 (A)', email: 'codyf@example.com', phone: '312.900.0981', date: '08 Mar 2016' },
  { sl: '04', id: 'AD33221', name: 'Jenny Wilson', childName: 'Albert Flores', childClass: 'Class: 4 (B)', email: 'jenny@example.com', phone: '404.788.1120', date: '15 Aug 2017' },
  { sl: '05', id: 'AD77231', name: 'Theresa Webb', childName: 'Leslie Alexander', childClass: 'Class: 5 (A)', email: 'theresa.webb@example.com', phone: '213.987.7770', date: '22 Sep 2018' },
  { sl: '06', id: 'AD52366', name: 'John Smith', childName: 'Kathryn Murphy', childClass: 'Class: 2 (B)', email: 'kathryn.murphy@example.com', phone: '208.555.1122', date: '12 Jan 2013' },
  { sl: '07', id: 'AD52367', name: 'Theresa Webb', childName: 'Guy Hawkins', childClass: 'Class: 3 (C)', email: 'guy.hawkins@example.com', phone: '203.555.2145', date: '27 Mar 2014' },
  { sl: '08', id: 'AD52368', name: 'Courtney Henry', childName: 'Eleanor Pena', childClass: 'Class: 4 (A)', email: 'eleanor.pena@example.com', phone: '210.555.1098', date: '08 Sep 2014' },
  { sl: '09', id: 'AD52369', name: 'Albert Flores', childName: 'Jenny Wilson', childClass: 'Class: 5 (B)', email: 'jenny.wilson@example.com', phone: '212.555.3223', date: '11 Nov 2015' },
  { sl: '10', id: 'AD52370', name: 'Jerome Bell', childName: 'Esther Howard', childClass: 'Class: 6 (A)', email: 'esther.howard@example.com', phone: '210.555.7766', date: '22 Feb 2016' },
];

export default function GuardianList() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Guardian List</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Guardian</span>
            <span>/</span>
            <span className="text-gray-400">Guardian List</span>
          </p>
        </div>
        <Link href="/guardian/add">
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded">
            + Add New
          </Button>
        </Link>
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

        {/* Table */}
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
                <th scope="col" className="px-4 py-4 min-w-[200px]">Child</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Email</th>
                <th scope="col" className="px-4 py-4 min-w-[140px]">Phone Number</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Join Date</th>
                <th scope="col" className="px-4 py-4 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {guardiansData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-3 font-medium text-[#25a194]">
                    <Link href="/guardian/detail" className="hover:underline">{row.id}</Link>
                  </td>
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${row.childName.replace(' ', '')}`} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-xs">
                          {row.childName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-blue-500">{row.childName}</span>
                        <span className="text-xs text-gray-400">{row.childClass}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{row.email}</td>
                  <td className="px-4 py-3 text-gray-500">{row.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{row.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link href="/guardian/detail" className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href="/guardian/edit" className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Edit className="h-4 w-4" />
                      </Link>
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

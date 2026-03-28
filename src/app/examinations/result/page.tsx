'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const resultData = [
  { sl: '01', admissionNo: 'AD52365', name: 'Kathryn Murphy', rollNo: '12', class: 'Class 1 (A)', exam: 'Monthly Test', total: '644', percent: '92', grade: 'A+', result: 'Pass' },
  { sl: '02', admissionNo: 'AD52366', name: 'Jerome Bell', rollNo: '14', class: 'Class 2 (B)', exam: 'Final Exam', total: '578', percent: '82', grade: 'A', result: 'Pass' },
  { sl: '03', admissionNo: 'AD52367', name: 'Theresa Webb', rollNo: '16', class: 'Class 3 (C)', exam: 'Mid Term', total: '430', percent: '70', grade: 'B+', result: 'Pass' },
  { sl: '04', admissionNo: 'AD52368', name: 'Cody Fisher', rollNo: '19', class: 'Class 4 (A)', exam: 'Quarterly Test', total: '380', percent: '64', grade: 'B', result: 'Fail' },
  { sl: '05', admissionNo: 'AD52369', name: 'Annette Black', rollNo: '10', class: 'Class 5 (B)', exam: 'Final Exam', total: '698', percent: '96', grade: 'A+', result: 'Pass' },
  { sl: '06', admissionNo: 'AD52370', name: 'Jenny Wilson', rollNo: '7', class: 'Class 6 (A)', exam: 'Half Yearly', total: '612', percent: '89', grade: 'A', result: 'Pass' },
  { sl: '07', admissionNo: 'AD52371', name: 'Darlene Robertson', rollNo: '18', class: 'Class 7 (C)', exam: 'Monthly Test', total: '325', percent: '58', grade: 'C', result: 'Fail' },
  { sl: '08', admissionNo: 'AD52372', name: 'Wade Warren', rollNo: '22', class: 'Class 8 (A)', exam: 'Final Exam', total: '510', percent: '75', grade: 'B+', result: 'Pass' },
  { sl: '09', admissionNo: 'AD52373', name: 'Esther Howard', rollNo: '9', class: 'Class 9 (B)', exam: 'Mid Term', total: '285', percent: '46', grade: 'D', result: 'Fail' },
  { sl: '10', admissionNo: 'AD52374', name: 'Guy Hawkins', rollNo: '11', class: 'Class 10 (C)', exam: 'Final Exam', total: '715', percent: '98', grade: 'A+', result: 'Pass' },
];

export default function ExamResultPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Exam Result</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/examinations" className="hover:text-[#25a194] transition-colors">Examinations</Link>
            <span>/</span>
            <span className="text-gray-400">Exam Result</span>
          </p>
        </div>
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
                <th scope="col" className="px-4 py-4 w-12">S.L</th>
                <th scope="col" className="px-4 py-4 min-w-[120px]">Admission No</th>
                <th scope="col" className="px-4 py-4 min-w-[200px]">Name</th>
                <th scope="col" className="px-4 py-4 min-w-[80px]">Roll No</th>
                <th scope="col" className="px-4 py-4 min-w-[130px]">Class</th>
                <th scope="col" className="px-4 py-4 min-w-[130px]">Exam</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Grand Total</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Percent (%)</th>
                <th scope="col" className="px-4 py-4 min-w-[80px]">Grade</th>
                <th scope="col" className="px-4 py-4 min-w-[100px]">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {resultData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-[#25a194] focus:ring-[#25a194] h-4 w-4" />
                  </td>
                  <td className="px-4 py-4 text-gray-500">{row.sl}</td>
                  <td className="px-4 py-4 text-[#25a194] font-medium">{row.admissionNo}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${row.name.replace(' ', '')}`} />
                        <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] text-xs font-medium">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{row.rollNo}</td>
                  <td className="px-4 py-4 text-gray-500">{row.class}</td>
                  <td className="px-4 py-4 text-gray-500">{row.exam}</td>
                  <td className="px-4 py-4 text-gray-500">{row.total}</td>
                  <td className="px-4 py-4 text-gray-500">{row.percent}</td>
                  <td className="px-4 py-4 text-gray-500 font-medium">{row.grade}</td>
                  <td className="px-4 py-4">
                    <span className={`px-4 py-1.5 rounded text-xs font-semibold ${row.result === 'Pass' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-red-50 text-red-500'}`}>
                      {row.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

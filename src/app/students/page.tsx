'use client';

import { useEffect, useState } from 'react';
import { 
  MoreVertical, Filter, Download, Trash2, Eye, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { toast } from 'sonner';
import { studentApi, StudentResponse } from '@/lib/api/students';

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to fetch students');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await studentApi.deleteStudent(id);
      toast.success('Student deleted successfully');
      setStudents(students.filter(s => s.id !== id));
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to delete student');
    }
  };

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
           {/* Replace original messy toolbar with a simpler one for now */}
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
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-4 w-12"><Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" /></th>
                <th className="p-4">Admission No</th>
                <th className="p-4">Name & Email</th>
                <th className="p-4">Class/Sec</th>
                <th className="p-4">Date of Birth</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {isLoading ? (
                <tr><td colSpan={8} className="p-8 text-center text-gray-500">Loading students...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-gray-500">No students found.</td></tr>
              ) : students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 w-12"><Checkbox className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" /></td>
                  <td className="p-4 text-[#25a194] font-medium">{student.admissionNumber || '-'}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex shrink-0 items-center justify-center rounded-full bg-[#25a194] text-white font-semibold">
                        {student.fullName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{student.fullName}</p>
                        <p className="text-xs text-gray-500">{student.email || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="block text-sm">{student.classId?.substring(0,8) || '-'}</span>
                    <span className="block text-xs text-gray-400 ml-1">{student.sectionId?.substring(0,8) || ''}</span>
                  </td>
                  <td className="p-4 text-gray-600">{student.dateOfBirth || '-'}</td>
                  <td className="p-4 text-gray-600">{student.phone || '-'}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/students/${student.id}`} className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/students/edit/${student.id}`} className="h-8 w-8 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDelete(student.id)} className="h-8 w-8 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-white">
          <p className="text-sm text-gray-500">Showing {students.length} entries</p>
        </div>

      </div>
    </div>
  );
}

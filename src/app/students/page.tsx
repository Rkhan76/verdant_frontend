'use client';

import { useEffect, useState } from 'react';
import {
  Filter, Download, Trash2, Eye, Edit, RefreshCcw, X, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { toast } from 'sonner';
import { studentApi, StudentResponse } from '@/lib/api/students';

export default function StudentsPage() {
  const [students, setStudents]               = useState<StudentResponse[]>([]);
  const [isLoading, setIsLoading]             = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentResponse | null>(null);
  const [isModalOpen, setIsModalOpen]         = useState(false);
  const [isModalLoading, setIsModalLoading]   = useState(false);

  useEffect(() => { fetchStudents(); }, []);

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

  const handleView = async (id: string) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    setSelectedStudent(null);
    try {
      const data = await studentApi.getStudentById(id);
      setSelectedStudent(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to fetch student details');
      setIsModalOpen(false);
    } finally {
      setIsModalLoading(false);
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
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-9 font-normal text-gray-600 border-gray-200">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => fetchStudents()}
              disabled={isLoading}
              className="h-9 font-normal text-gray-600 border-gray-200"
            >
              <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
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

        {/* Table */}
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
                    <span className="block text-sm">{student.class?.name || student.classId?.substring(0, 8) || '-'}</span>
                    <span className="block text-xs text-gray-400">{student.section?.name ? `Section ${student.section.name}` : ''}</span>
                  </td>
                  <td className="p-4 text-gray-600">{student.dateOfBirth || '-'}</td>
                  <td className="p-4 text-gray-600">{student.phone || '-'}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">Active</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleView(student.id)}
                        className="h-8 w-8 rounded text-gray-400 hover:text-[#25a194] hover:bg-[#25a194]/10 flex items-center justify-center transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
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

      {/* Student Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">Student Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              {isModalLoading ? (
                <div className="flex items-center justify-center py-16 text-gray-400">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : selectedStudent ? (
                <div className="space-y-6">

                  {/* Avatar + name */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-[#25a194] flex items-center justify-center text-white text-2xl font-bold shrink-0">
                      {selectedStudent.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{selectedStudent.fullName || '-'}</p>
                      <p className="text-sm text-gray-500">{selectedStudent.email || '-'}</p>
                      {selectedStudent.admissionNumber && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-[#25a194]/10 text-[#25a194] rounded">
                          {selectedStudent.admissionNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <Section title="Personal Information">
                    <Row label="Gender"       value={selectedStudent.gender} />
                    <Row label="Date of Birth" value={selectedStudent.dateOfBirth} />
                    <Row label="Phone"         value={selectedStudent.phone} />
                    <Row label="Category"      value={selectedStudent.category} />
                    <Row label="Blood Group"   value={selectedStudent.medicalDetails?.bloodGroup} />
                    <Row label="Height"        value={selectedStudent.medicalDetails?.height ? `${selectedStudent.medicalDetails.height} cm` : undefined} />
                    <Row label="Weight"        value={selectedStudent.medicalDetails?.weight ? `${selectedStudent.medicalDetails.weight} kg` : undefined} />
                  </Section>

                  {/* Academic Info */}
                  <Section title="Academic Information">
                    <Row label="Roll Number" value={selectedStudent.rollNumber} />
                    <Row label="Year"        value={selectedStudent.year} />
                    <Row label="Class"       value={selectedStudent.class?.name} />
                    <Row label="Grade"       value={selectedStudent.class?.grade} />
                    <Row label="Section"     value={selectedStudent.section?.name} />
                  </Section>

                  {/* Parent Info */}
                  {(selectedStudent.fatherInfo?.name || selectedStudent.motherInfo?.name) && (
                    <Section title="Parent / Guardian">
                      {selectedStudent.fatherInfo?.name && (
                        <Row label="Father" value={[selectedStudent.fatherInfo.name, selectedStudent.fatherInfo.phone, selectedStudent.fatherInfo.occupation].filter(Boolean).join(' · ')} />
                      )}
                      {selectedStudent.motherInfo?.name && (
                        <Row label="Mother" value={[selectedStudent.motherInfo.name, selectedStudent.motherInfo.phone, selectedStudent.motherInfo.occupation].filter(Boolean).join(' · ')} />
                      )}
                    </Section>
                  )}

                  {/* Address */}
                  {selectedStudent.addressInfo && (
                    <Section title="Address">
                      <Row label="Current"   value={selectedStudent.addressInfo.currentAddress} />
                      <Row label="Permanent" value={selectedStudent.addressInfo.permanentAddress} />
                    </Section>
                  )}

                  {/* Previous School */}
                  {selectedStudent.previousSchoolName && (
                    <Section title="Previous School">
                      <Row label="School"  value={selectedStudent.previousSchoolName} />
                      <Row label="Address" value={selectedStudent.previousSchoolAddress} />
                    </Section>
                  )}

                  {/* Hostel */}
                  {selectedStudent.hostelName && (
                    <Section title="Hostel">
                      <Row label="Hostel" value={selectedStudent.hostelName} />
                      <Row label="Room"   value={selectedStudent.roomNumber} />
                    </Section>
                  )}

                </div>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="h-9 text-sm border-gray-200 text-gray-600">
                Close
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm text-gray-700 font-medium">{value}</span>
    </div>
  );
}

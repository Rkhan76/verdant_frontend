'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Lock, User, Calendar, Clock, Edit, FileText } from 'lucide-react';
import Link from 'next/link';
import { useTeachersStore } from '@/store/teachersStore';

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function TeacherDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const { currentTeacher, isLoading, error, fetchTeacherById, clearCurrentTeacher } = useTeachersStore();

  useEffect(() => {
    if (!id) { router.push('/teachers'); return; }
    fetchTeacherById(id);
    return () => clearCurrentTeacher();
  }, [id, fetchTeacherById, router, clearCurrentTeacher]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">Loading teacher details...</div>
    );
  }

  if (error || !currentTeacher) {
    return (
      <div className="flex items-center justify-center py-24 text-red-400 text-sm">
        {error ?? 'Teacher not found.'}
      </div>
    );
  }

  const t = currentTeacher;
  const initials = (t.fullName ?? 'T').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Teacher Details</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/teachers" className="hover:text-[#25a194] transition-colors">Teacher</Link>
            <span>/</span>
            <span className="text-gray-400">Teacher Details</span>
          </p>
        </div>
        <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-white h-10 px-4 font-medium flex items-center gap-2 rounded shadow-sm">
          <Lock className="h-4 w-4" />
          Login Details
        </Button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 mb-6">
        {/* Profile Card */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white text-center pt-8 pb-6 px-6">
          <Avatar className="h-[120px] w-[120px] mx-auto mb-4 border-4 border-[#25a194]/10">
            <AvatarImage src={t.profileImage ?? undefined} />
            <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] text-2xl font-bold">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">{t.fullName ?? '-'}</h2>
          <p className="text-sm text-gray-500 mt-1">ID: <span className="text-[#25a194] font-medium">{t.employeeCode}</span></p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-10 shadow-sm font-medium">
              <span className="mr-2">✕</span> Suspend
            </Button>
            <Link href={`/teachers/add?id=${t.id}`}>
              <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-10 shadow-sm font-medium flex items-center gap-2 w-full">
                <Edit className="h-4 w-4" /> Edit
              </Button>
            </Link>
          </div>
        </Card>

        {/* Personal Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
            <span className="bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded text-xs font-semibold">Active</span>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Contract Type</span>
                <span className="text-gray-800">: {t.contractType ?? '-'}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Shift</span>
                <span className="text-gray-800">: {t.shift ?? '-'}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Work Location</span>
                <span className="text-gray-800">: {t.workLocation ?? '-'}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Date Of Birth</span>
                <span className="text-gray-800">: {formatDate(t.dateOfBirth)}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Gender</span>
                <span className="text-gray-800">: {t.gender ?? '-'}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Join Date</span>
                <span className="text-gray-800">: {formatDate(t.joiningDate)}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Phone Number</span>
                <span className="text-[#25a194] font-medium">: {t.phone ?? '-'}</span>
              </div>
              <div className="grid grid-cols-[140px_1fr]">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="text-[#25a194] font-medium">: {t.email ?? '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-6 overflow-x-auto">
        <button className="flex items-center gap-2 pb-3 border-b-2 border-[#25a194] text-[#25a194] font-medium text-sm whitespace-nowrap">
          <User className="h-4 w-4" /> Teacher Details
        </button>
        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm whitespace-nowrap transition-colors">
          <Calendar className="h-4 w-4" /> Class Routine
        </button>
        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm whitespace-nowrap transition-colors">
          <Clock className="h-4 w-4" /> Attendance
        </button>
        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm whitespace-nowrap transition-colors">
          <FileText className="h-4 w-4" /> Leave
        </button>
        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm whitespace-nowrap transition-colors">
          <FileText className="h-4 w-4" /> Payroll
        </button>
      </div>

      {/* Details Content */}
      <div className="space-y-6">

        {/* Profile Detail */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800">Profile Detail</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Date Of Birth</p>
                <p className="text-sm text-gray-500 font-medium">{formatDate(t.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Marital Status</p>
                <p className="text-sm text-gray-500 font-medium">{t.maritalStatus ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Qualification</p>
                <p className="text-sm text-gray-500 font-medium">{t.qualification ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Experience</p>
                <p className="text-sm text-gray-500 font-medium">{t.experience ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Father Name</p>
                <p className="text-sm text-gray-500 font-medium">{t.fathersName ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Mother Name</p>
                <p className="text-sm text-gray-500 font-medium">{t.mothersName ?? '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Previous School */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Previous School Details</h2>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Previous School Name</p>
                <p className="text-sm text-gray-500 font-medium">{t.previousSchoolName ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Previous School Address</p>
                <p className="text-sm text-gray-500 font-medium">{t.previousSchoolAddress ?? '-'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Address</h2>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Current Address</p>
                <p className="text-sm text-gray-500 font-medium">{t.addressInfo?.currentAddress ?? '-'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Permanent Address</p>
                <p className="text-sm text-gray-500 font-medium">{t.addressInfo?.permanentAddress ?? '-'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Bank Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Bank Name</p>
                  <p className="text-sm text-gray-500 font-medium">{t.bankDetails?.bankName ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Account Number</p>
                  <p className="text-sm text-gray-500 font-medium">{t.bankDetails?.accountNumber ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">IFSC Code</p>
                  <p className="text-sm text-gray-500 font-medium">{t.bankDetails?.ifscCode ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">National ID</p>
                  <p className="text-sm text-gray-500 font-medium">{t.bankDetails?.nationalId ?? '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Details */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Medical Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Blood Group</p>
                  <p className="text-sm text-gray-500 font-medium">{t.medicalDetails?.bloodGroup ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Height</p>
                  <p className="text-sm text-gray-500 font-medium">{t.medicalDetails?.height ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Weight</p>
                  <p className="text-sm text-gray-500 font-medium">{t.medicalDetails?.weight ?? '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Documents</h2>
            </div>
            <CardContent className="p-6 space-y-2">
              {t.documents && t.documents.length > 0 ? t.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between border border-gray-200 rounded-md p-3 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200/50 p-2 rounded text-gray-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{doc.documentName ?? 'Document'}</span>
                  </div>
                  {doc.file && (
                    <a href={doc.file} target="_blank" rel="noreferrer" className="text-[#25a194] hover:bg-[#25a194]/10 p-2 rounded transition-colors">
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )) : (
                <p className="text-sm text-gray-400">No documents uploaded.</p>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Social Media</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Facebook</p>
                  <p className="text-sm text-gray-500 font-medium">{t.socialLinks?.facebook ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">LinkedIn</p>
                  <p className="text-sm text-gray-500 font-medium">{t.socialLinks?.linkedin ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Instagram</p>
                  <p className="text-sm text-gray-500 font-medium">{t.socialLinks?.instagram ?? '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">YouTube</p>
                  <p className="text-sm text-gray-500 font-medium">{t.socialLinks?.youtube ?? '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Description */}
        {t.additionalDetails && (
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Description</h2>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{t.additionalDetails}</p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}

export default function TeacherDetailsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24 text-gray-400 text-sm">Loading...</div>}>
      <TeacherDetailContent />
    </Suspense>
  );
}

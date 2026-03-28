'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Lock, User, Calendar, Clock, Edit, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TeacherDetailsPage() {
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
        {/* Left Profile Card */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white text-center pt-8 pb-6 px-6 relative">
          <Avatar className="h-[120px] w-[120px] mx-auto mb-4 border-4 border-[#25a194]/10">
            <AvatarImage src="https://i.pravatar.cc/150?u=teacher_marvin" />
            <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] text-2xl font-bold">MM</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Marvin McKinney</h2>
          <p className="text-sm text-gray-500 mt-1">ID: <span className="text-[#25a194] font-medium">AD1256589</span></p>
          <p className="text-sm text-gray-500 mt-1">Subject: <span className="font-medium text-gray-700">Mathematics</span></p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-10 shadow-sm font-medium">
              <span className="mr-2">✕</span> Suspend
            </Button>
            <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-10 shadow-sm font-medium flex items-center gap-2">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </div>
        </Card>

        {/* Right Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
            <span className="bg-[#10b981]/10 text-[#10b981] px-3 py-1 rounded text-xs font-semibold">Active</span>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Class</span>
                <span className="text-gray-800">: Class 6 (2025-26)</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Contract Type</span>
                <span className="text-gray-800">: Permanent</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Shift</span>
                <span className="text-gray-800">: Morning</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Work Location</span>
                <span className="text-gray-800">: 2nd Floor</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Date Of Birth</span>
                <span className="text-gray-800">: 10 Nov 2006</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Gender</span>
                <span className="text-gray-800">: Male</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Join Date</span>
                <span className="text-gray-800">: 05 May 2012</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Phone Number</span>
                <span className="text-[#25a194] font-medium">: 789578456</span>
              </div>
              <div className="grid grid-cols-[130px_1fr]">
                <span className="text-gray-500 font-medium">Email</span>
                <span className="text-[#25a194] font-medium">: set@example.com</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
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
        <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm whitespace-nowrap transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          Library
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
                <p className="text-sm text-gray-500 font-medium">10 Nov 2006</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Martial Status</p>
                <p className="text-sm text-gray-500 font-medium">Married</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Qualification</p>
                <p className="text-sm text-gray-500 font-medium">MBA</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Experience</p>
                <p className="text-sm text-gray-500 font-medium">7 Years</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Father Name</p>
                <p className="text-sm text-gray-500 font-medium">Ralph Edwards</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Mother Name</p>
                <p className="text-sm text-gray-500 font-medium">Floyd Miles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Previous School Details */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Previous School Details</h2>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Previous School Name</p>
                <p className="text-sm text-gray-500 font-medium">Stuyvesant High School</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Current School Name</p>
                <p className="text-sm text-gray-500 font-medium">Bronx High School of Science</p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Address</h2>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Current Address</p>
                <p className="text-sm text-gray-500 font-medium">8502 Preston Rd. Inglewood, Maine 98380</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Permanent Address</p>
                <p className="text-sm text-gray-500 font-medium">2118 Thornridge Cir. Syracuse, Connecticut 35624</p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Bank Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Bank Name</p>
                  <p className="text-sm text-gray-500 font-medium">Bank of America</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Branch</p>
                  <p className="text-sm text-gray-500 font-medium">New York</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">IFSC Code</p>
                  <p className="text-sm text-gray-500 font-medium">5283209832</p>
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
                  <p className="text-sm text-gray-500 font-medium">O+</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Height</p>
                  <p className="text-sm text-gray-500 font-medium">5.2</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Weight</p>
                  <p className="text-sm text-gray-500 font-medium">60kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Documents</h2>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200/50 p-2 rounded text-gray-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">BirthCertificate.pdf</span>
                </div>
                <button className="text-[#25a194] hover:bg-[#25a194]/10 p-2 rounded transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Social Media</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Facebook</p>
                  <p className="text-sm text-gray-500 font-medium">www.facebook.com</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">LinkedIn</p>
                  <p className="text-sm text-gray-500 font-medium">www.linkedin.com</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">Instagram</p>
                  <p className="text-sm text-gray-500 font-medium">www.instagram.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Description */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800">Description</h2>
          </div>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Known for their punctuality and positive attitude, [he/she/they] consistently demonstrates a strong commitment to academic excellence and co-curricular participation. [He/She/They] maintains good behavior, shows respect toward teachers and peers, and actively engages in classroom discussions and group activities.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

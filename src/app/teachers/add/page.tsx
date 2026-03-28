'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AddTeacherPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Add New Teacher</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/teachers" className="hover:text-[#25a194] transition-colors">Teacher</Link>
          <span>/</span>
          <span className="text-gray-400">Add New Teacher</span>
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Personal Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:shadow-none">
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Teacher ID <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter Teacher ID" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter your Full Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Subject</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select a Subject</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>English</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Class</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select a Class</option>
                  <option>Class 1</option>
                  <option>Class 6</option>
                  <option>Class 9</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input placeholder="dd-mm-yyyy" className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10 shadow-none" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Fathers Name</Label>
                <Input placeholder="Enter Fathers Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mothers Name</Label>
                <Input placeholder="Enter mothers Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Marital Status</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select a Marital Status</option>
                  <option>Married</option>
                  <option>Unmarried</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Contract Type</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select a Contract Type</option>
                  <option>Full Time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Shift</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select a shift</option>
                  <option>Morning</option>
                  <option>Day</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Work Location</Label>
                <Input placeholder="Enter work location" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Join Date</Label>
                <div className="relative">
                  <Input placeholder="dd-mm-yyyy" className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10 shadow-none" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter your Phone Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter your Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Experience <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter experience" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Qualification <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter Qualification" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Teacher Photo <span className="text-red-500">*</span></Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Medical Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Medical Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Blood Group</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Select blood group</option>
                  <option>A+</option>
                  <option>O+</option>
                  <option>B+</option>
                  <option>AB+</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Height</Label>
                <Input placeholder="Enter height" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Weight</Label>
                <Input placeholder="Enter Weight" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Bank Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Account Number</Label>
                <Input placeholder="Enter bank account number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                <Input placeholder="Enter bank name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                <Input placeholder="Enter IFSC Code" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">National Identification Number</Label>
                <Input placeholder="Enter national identification number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Documents Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Upload Documents</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Doc Name</Label>
                <Input placeholder="Enter Doc Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Upload File</Label>
                <div className="flex w-full items-center h-10 border border-gray-200 rounded-md overflow-hidden bg-white">
                  <div className="bg-gray-50 text-gray-600 px-4 py-2 border-r border-gray-200 text-sm font-medium whitespace-nowrap">
                    Choose File
                  </div>
                  <div className="px-4 text-gray-400 text-sm w-full">
                    No file chosen
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Previous School Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Previous School Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">School Name</Label>
                  <Input placeholder="Enter School Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Address</Label>
                  <Input placeholder="Enter Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Address</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Current Address</Label>
                  <Input placeholder="Enter Current Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Permanent Address</Label>
                  <Input placeholder="Enter Permanent Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Teacher Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Teacher Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Teacher Details</Label>
              <Textarea placeholder="Enter details" className="min-h-[100px] resize-y border-gray-200 focus-visible:ring-[#25a194] shadow-none text-sm" />
            </div>
          </CardContent>
        </Card>

        {/* Social Links Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Social Links</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Facebook</Label>
                <Input placeholder="Enter your facebook link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">LinkedIn</Label>
                <Input placeholder="Enter your LinkedIn link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Instagram</Label>
                <Input placeholder="Enter your Instagram link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">YouTube</Label>
                <Input placeholder="Enter your YouTube link" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Details Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Login Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter Email" type="email" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input placeholder="Enter your password" type="password" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none pr-10" />
                  <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-11 px-10 min-w-[140px] font-medium bg-red-50/10">
            Reset
          </Button>
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-11 px-8 min-w-[150px] font-medium">
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  );
}

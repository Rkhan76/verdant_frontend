'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AddStudentPage() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Add New Student</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/students" className="hover:text-[#25a194] transition-colors">Student</Link>
          <span>/</span>
          <span className="text-gray-400">Add New Student</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Academic Year <span className="text-red-500">*</span></Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select an year</option>
                  <option>2026-2027</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Class <span className="text-red-500">*</span></Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select a class</option>
                  <option>Class 1</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Section <span className="text-red-500">*</span></Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select section</option>
                  <option>Section A</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Roll Number</Label>
                <Input placeholder="Enter your rollNumber" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Admission No <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter admission number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter your Full Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select a Category</option>
                  <option>General</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input placeholder="dd-mm-yyyy" className="h-10 border-gray-200 focus-visible:ring-[#25a194] pr-10" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter Your Phone Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter Your Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Student Photo <span className="text-red-500">*</span></Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parent & Guardian Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Parent & Guardian Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Fathers Name</Label>
                <Input placeholder="Enter Father Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input placeholder="Enter Father Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Occupation</Label>
                <Input placeholder="Enter Father Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Father Photo <span className="text-red-500">*</span></Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mothers Name</Label>
                <Input placeholder="Enter Mother Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                <Input placeholder="Enter Mother Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Occupation</Label>
                <Input placeholder="Enter Mother Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Mother Photo <span className="text-red-500">*</span></Label>
                <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                  Drag & drop a file here or click
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-800 mb-3 block">Select a Guardian</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" defaultChecked />
                  Father
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" />
                  Mother
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="radio" name="guardian" className="w-4 h-4 text-[#25a194] focus:ring-[#25a194] accent-[#25a194]" />
                  Others
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Name</Label>
                <Input placeholder="Enter Gaurdian Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Email</Label>
                <Input placeholder="Enter Gaurdian Email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Phone</Label>
                <Input placeholder="Enter Gaurdian Number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Occupation</Label>
                <Input placeholder="Enter Gaurdian Occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label className="text-sm font-semibold text-gray-700">Guardian Address</Label>
                <Input placeholder="Enter Gaurdian Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Photo <span className="text-red-500">*</span></Label>
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
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600">
                  <option>Select blood group</option>
                  <option>A+</option>
                  <option>O+</option>
                  <option>B+</option>
                  <option>AB+</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Height</Label>
                <Input placeholder="Enter height" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Weight</Label>
                <Input placeholder="Enter Weight" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                <Input placeholder="Enter bank account number" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Bank Name</Label>
                <Input placeholder="Enter bank name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">IFSC Code</Label>
                <Input placeholder="Enter IFSC Code" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">National Identification Number</Label>
                <Input placeholder="Enter national identification nu" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <Input placeholder="Enter School Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Address</Label>
                  <Input placeholder="Enter Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
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
                  <Input placeholder="Enter Current Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Permanent Address</Label>
                  <Input placeholder="Enter Permanent Address" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hostel Details */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Hostel Details</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Hostel</Label>
                  <Input placeholder="Enter Hostel" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Room No</Label>
                  <Input placeholder="Enter Room No" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Documents */}
          <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
            <div className="px-6 py-4 border-b border-gray-100 bg-white">
              <h2 className="text-base font-semibold text-gray-800">Upload Documents</h2>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Doc Name</Label>
                  <Input placeholder="Enter Doc Name" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Guardian Photo <span className="text-red-500">*</span></Label>
                  <div className="border border-dashed border-gray-200 rounded-md h-10 flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 bg-white">
                    Drag & drop a file here or click
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Details */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Student Details</h2>
          </div>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Details</Label>
              <Textarea placeholder="Enter details" className="min-h-[120px] resize-y border-gray-200 focus-visible:ring-[#25a194]" />
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
                <Input placeholder="Enter Email" type="email" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
              <div className="space-y-2 relative">
                <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
                <Input placeholder="Enter your password" type="password" className="h-10 border-gray-200 focus-visible:ring-[#25a194]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="pt-6 flex items-center justify-center gap-4">
          <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 h-11 px-8 min-w-[120px]">
            Cancel
          </Button>
          <Button className="bg-[#25a194] hover:bg-[#208b80] text-white h-11 px-8 min-w-[140px]">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

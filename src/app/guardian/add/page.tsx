'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export default function AddGuardianPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Guardian Add</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/guardian" className="hover:text-[#25a194] transition-colors">Guardian</Link>
          <span>/</span>
          <span className="text-gray-400">Guardian Add</span>
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Personal Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-md overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100 bg-white">
            <h2 className="text-base font-semibold text-gray-800">Personal Info</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 hover:shadow-none">
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Type</Label>
                <select className="w-full h-10 border border-gray-200 rounded-md bg-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#25a194] text-gray-600 shadow-none">
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Name</Label>
                <Input placeholder="Enter guardian name" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Instagram</Label>
                <Input placeholder="Enter phone number" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Occupation</Label>
                <Input placeholder="Enter occupation" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Guardian Address</Label>
                <Input placeholder="Enter guardian address" className="h-10 border-gray-200 focus-visible:ring-[#25a194] shadow-none" />
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
          <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-11 px-10 min-w-[140px] font-medium bg-white">
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

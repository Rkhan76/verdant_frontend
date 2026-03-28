'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

export default function AddTeacherPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl">
      <Card className="border-none shadow-sm rounded-xl overflow-hidden">
        <div className="bg-[#208b80]/5 px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Personal Details</h2>
        </div>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">First Name <span className="text-red-500">*</span></Label>
              <Input placeholder="James" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Last Name <span className="text-red-500">*</span></Label>
              <Input placeholder="Lee" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Email <span className="text-red-500">*</span></Label>
              <Input placeholder="hello@example.com" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Phone Number <span className="text-red-500">*</span></Label>
              <Input placeholder="+123456789" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Address <span className="text-red-500">*</span></Label>
              <Textarea placeholder="" className="bg-white border-gray-200 focus-visible:ring-[#25a194] min-h-[148px] resize-none" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2 flex flex-col gap-1">
                <Label className="text-gray-500 font-medium text-sm">Photo <span className="text-red-500">*</span></Label>
                <div className="h-24 w-24 bg-gray-100 rounded flex flex-col items-center justify-center text-gray-400">
                  <User className="h-10 w-10" />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-[#208b80] hover:bg-[#197067] text-white rounded font-medium h-9 text-xs px-4 text-center">Choose File</Button>
                  <Button variant="ghost" className="text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded font-medium h-9 text-xs px-4">Remove</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-500 font-medium text-sm">Place of Birth <span className="text-red-500">*</span></Label>
                <Input placeholder="USA" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Date of Birth <span className="text-red-500">*</span></Label>
              <Input type="date" placeholder="02/28/2026" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-xl overflow-hidden pb-4">
        <div className="bg-[#208b80]/5 px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Education</h2>
        </div>
        <CardContent className="p-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">University <span className="text-red-500">*</span></Label>
              <Input placeholder="University of Oxford" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Degree <span className="text-red-500">*</span></Label>
              <Input placeholder="B.Tech" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">Start & End Date <span className="text-red-500">*</span></Label>
              <div className="flex gap-4">
                <Input type="date" placeholder="03/28/2026" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
                <Input type="date" placeholder="03/28/2026" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500 font-medium text-sm">City <span className="text-red-500">*</span></Label>
              <Input placeholder="USA" className="bg-white border-gray-200 focus-visible:ring-[#25a194] h-12" />
            </div>

          </div>
        </CardContent>
        <CardFooter className="px-8 mt-2 flex justify-end gap-4">
          <Button variant="outline" className="border-[#25a194] text-[#25a194] hover:bg-[#e9f7f6] font-semibold px-8 h-12 rounded-full">Save as Draft</Button>
          <Button className="bg-[#208b80] hover:bg-[#197067] text-white font-semibold px-10 h-12 rounded-full">Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

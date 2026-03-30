'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GeneralSettingsPage() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">General Settings</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-gray-400">Settings</span>
            <span>/</span>
            <span className="text-gray-400">General</span>
          </p>
        </div>
        <Button className="bg-[#25a194] hover:bg-[#208b80] text-white px-5 h-10 rounded font-medium disabled:opacity-50">
          + Add General
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input 
                defaultValue="Verdant Public School"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input 
                defaultValue="contact@verdantschool.com"
                type="email"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">
                Phone Number
              </label>
              <Input 
                defaultValue="+1 (555) 123-4567"
                type="tel"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">
                Website
              </label>
              <Input 
                defaultValue="https://www.verdantschool.com"
                type="url"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                Country <span className="text-red-500">*</span>
              </label>
              <Select defaultValue="usa">
                <SelectTrigger className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                City <span className="text-red-500">*</span>
              </label>
              <Select defaultValue="washington">
                <SelectTrigger className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="washington">Washington</SelectItem>
                  <SelectItem value="newyork">New York</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                State <span className="text-red-500">*</span>
              </label>
              <Select defaultValue="washington_state">
                <SelectTrigger className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="washington_state">Washington</SelectItem>
                  <SelectItem value="ny_state">New York</SelectItem>
                  <SelectItem value="ca_state">California</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <Input 
                defaultValue="20001"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>
            
            {/* Address - Full width */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-medium text-gray-700 flex items-center gap-1">
                Address <span className="text-red-500">*</span>
              </label>
              <Input 
                defaultValue="123 Education Street, Downtown"
                className="h-11 shadow-none border-gray-200 focus-visible:ring-[#25a194]"
              />
            </div>

            {/* Primary Logo */}
            <div className="space-y-3">
              <label className="text-[13px] font-medium text-gray-700">
                Primary Logo (140px x 140px)
              </label>
              <div className="flex items-center gap-3 w-full border border-gray-200 rounded p-1">
                <Button type="button" variant="outline" className="shadow-none border-gray-200 h-9 font-normal text-gray-700">
                  Choose File
                </Button>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
              <div className="h-[100px] w-[100px] rounded border border-gray-200 bg-gray-50/50 flex items-center justify-center mt-2">
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            </div>

            {/* Secondary Logo */}
            <div className="space-y-3">
              <label className="text-[13px] font-medium text-gray-700">
                Secondary Logo (140px x 140px)
              </label>
              <div className="flex items-center gap-3 w-full border border-gray-200 rounded p-1">
                <Button type="button" variant="outline" className="shadow-none border-gray-200 h-9 font-normal text-gray-700">
                  Choose File
                </Button>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
              <div className="h-[100px] w-[100px] rounded border border-gray-200 bg-gray-50/50 flex items-center justify-center mt-2">
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            </div>

          </div>

          <div className="pt-6 mt-8 border-t border-gray-100 flex items-center justify-center gap-4">
            <Button type="button" variant="outline" className="shadow-none border-red-500 text-red-500 hover:bg-red-50 h-11 px-8 rounded font-medium">
              Reset
            </Button>
            <Button type="button" className="bg-[#25a194] hover:bg-[#208b80] text-white shadow-none h-11 px-8 rounded font-medium">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

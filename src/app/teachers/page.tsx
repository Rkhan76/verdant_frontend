'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User, Mail, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const subjects = [
  { name: 'Mathematics', color: 'bg-green-100 text-green-600' },
  { name: 'Science', color: 'bg-orange-100 text-orange-600' },
  { name: 'Art', color: 'bg-red-100 text-red-500' }
];

const teachersData = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: 'Dimitres Viga',
  role: 'Teacher',
  avatarId: (i % 8) + 1, // varied avatars
  subjects: subjects
}));

export default function TeachersPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px]">
      {/* Top Filter and Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input 
            placeholder="Search here..." 
            className="pl-12 h-12 bg-gray-50/50 border-gray-200 rounded-full focus-visible:ring-[#25a194]" 
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[140px] h-12 rounded-full border-gray-200 bg-white font-medium text-gray-600">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="name_asc">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/teachers/add" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#25a194] hover:bg-[#208b80] text-white font-semibold h-12 px-6 rounded-full flex gap-2">
              <span className="text-xl leading-none -mt-1">+</span> New Teacher
            </Button>
          </Link>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teachersData.map((teacher) => (
          <Card key={teacher.id} className="border-none shadow-sm rounded-xl overflow-hidden relative group hover:shadow-md transition-shadow">
            <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-10 h-8 w-8 rounded-full bg-[#e9f7f6]/50 text-[#25a194] hover:bg-[#25a194] hover:text-white transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            
            <CardContent className="flex flex-col items-center p-8 pt-10 text-center">
              <Avatar className="h-[104px] w-[104px] mb-4 border-2 border-white shadow-sm">
                <AvatarImage src={`https://i.pravatar.cc/150?u=teacher_${teacher.avatarId}`} />
                <AvatarFallback>{teacher.name[0]}</AvatarFallback>
              </Avatar>

              <h3 className="text-xl font-bold text-[#2A2B3D] tracking-tight">{teacher.name}</h3>
              <p className="text-sm text-[#A0A5BB] mb-6 font-medium mt-1">{teacher.role}</p>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                {teacher.subjects.map((sub, i) => (
                  <span key={i} className={`text-[10px] font-bold px-3 py-1 rounded-full ${sub.color}`}>
                    {sub.name}
                  </span>
                ))}
              </div>

              <div className="flex w-full gap-3 mt-auto">
                <Button className="flex-1 rounded-full h-11 bg-[#25a194] hover:bg-[#208b80] text-white font-semibold gap-2 shadow-sm">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" className="flex-1 rounded-full h-11 bg-white hover:bg-gray-50 border-gray-200 text-[#2A2B3D] font-semibold gap-2">
                  <Mail className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 pt-2">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          Showing 1 - 12 from 100 data
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded bg-transparent border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded bg-transparent border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 shadow-sm transition-colors">
            1
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded bg-[#25a194] text-white font-medium shadow-sm transition-colors">
            2
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded bg-transparent border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 shadow-sm transition-colors">
            3
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded bg-transparent border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
    </div>
  );
}

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, User, Phone, MapPin, Mail, Calendar, Clock } from "lucide-react";

const schedules = [
  { subject: 'World History', class: 'Class VII-B', date: 'March 20, 2022', time: '09.00 - 10.00 AM', teacherId: 1, borderColor: 'border-l-[#25a194]' },
  { subject: 'Ancient History', class: 'Class VII-A', date: 'March 20, 2022', time: '09.00 - 10.00 AM', teacherId: 2, borderColor: 'border-l-orange-500' },
  { subject: 'Culture', class: 'Class VIII-A', date: 'March 20, 2022', time: '09.00 - 10.00 AM', teacherId: 3, borderColor: 'border-l-yellow-400' },
  { subject: 'World History', class: 'Class VII-C', date: 'March 20, 2022', time: '09.00 - 10.00 AM', teacherId: 4, borderColor: 'border-l-[#25a194]' },
];

export default function TeacherDetailPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Profile Card */}
          <Card className="border-none shadow-sm rounded-xl overflow-hidden relative">
            <div className="h-32 bg-[#25a194] w-full relative overflow-hidden">
              <div className="absolute right-4 -top-8 w-40 h-40 border-[12px] border-orange-400 rounded-full"></div>
              <div className="absolute right-28 -top-12 w-40 h-40 border-[12px] border-yellow-400 rounded-full"></div>
            </div>
            
            <CardContent className="px-8 pb-8 relative">
              <div className="flex justify-between items-start">
                <div className="-mt-16">
                  <Avatar className="h-32 w-32 border-[6px] border-white bg-white shadow-sm">
                    <AvatarImage src="https://i.pravatar.cc/150?u=maria_historia" className="object-cover" />
                    <AvatarFallback>MH</AvatarFallback>
                  </Avatar>
                </div>
                <div className="pt-4">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#25a194] hover:bg-[#e9f7f6]">
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <h2 className="text-[28px] font-bold text-[#2A2B3D] tracking-tight">Maria Historia</h2>
                <p className="font-semibold text-[#25a194] text-sm mt-1">History Teacher</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mt-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
                    <User className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Parents:</p>
                    <p className="font-semibold text-gray-800">Justin Hope</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
                    <MapPin className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Address:</p>
                    <p className="font-semibold text-gray-800">Jakarta, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
                    <Phone className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Phone:</p>
                    <p className="font-semibold text-gray-800">+12 345 6789 0</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
                    <Mail className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email:</p>
                    <p className="font-semibold text-gray-800">Historia@mail.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About & Expertise Card */}
          <Card className="border-none shadow-sm rounded-xl">
            <CardContent className="p-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-[#2A2B3D] mb-3">About</h3>
                <p className="text-sm text-gray-400 leading-relax font-medium max-w-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#2A2B3D] mb-4">Education:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 rounded-full bg-[#25a194] shrink-0"></div>
                    <div>
                      <p className="font-bold text-[#2A2B3D] text-sm">History Major, University Akademi Historia</p>
                      <p className="text-xs text-gray-400 mt-1">2013-2017</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 rounded-full bg-[#25a194] shrink-0"></div>
                    <div>
                      <p className="font-bold text-[#2A2B3D] text-sm">Master of History, University Akademi Historia</p>
                      <p className="text-xs text-gray-400 mt-1">2013-2017</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#2A2B3D] mb-3">Expertise:</h3>
                <p className="text-sm text-gray-400 font-medium">
                  World History, Philosophy, Prehistoric, Culture, Ancient
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Column */}
        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-sm rounded-xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#2A2B3D]">Schedule Details</h3>
              <p className="text-sm text-gray-400 mt-1 font-medium">Thursday, 10th April, 2022</p>
            </CardContent>
          </Card>

          {schedules.map((schedule, i) => (
            <Card key={i} className={`border-none shadow-sm rounded-xl overflow-hidden border-l-4 ${schedule.borderColor}`}>
              <CardContent className="p-5 flex justify-between items-start">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-[#2A2B3D] text-[15px]">{schedule.subject}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{schedule.class}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      {schedule.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      {schedule.time}
                    </div>
                  </div>
                </div>
                <Avatar className="h-10 w-10 border border-gray-100">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=schedule_user_${schedule.teacherId}`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full h-12 rounded-full bg-[#e9f7f6]/50 hover:bg-[#d3efed] border-none text-[#25a194] font-semibold">
            View More
          </Button>
        </div>
      </div>
    </div>
  );
}

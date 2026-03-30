'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lock, Edit, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function GuardianDetailsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Guardian Details</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Link href="/" className="hover:text-[#25a194] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/guardian" className="hover:text-[#25a194] transition-colors">Guardian</Link>
            <span>/</span>
            <span className="text-gray-400">Guardian Details</span>
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
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white text-center pt-8 pb-6 px-6 relative flex flex-col items-center">
          <Avatar className="h-[100px] w-[100px] mx-auto mb-4 border-4 border-[#25a194]/10 bg-green-100 p-2">
            {/* Using a placeholder character avatar like the one in the design */}
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marvin" />
            <AvatarFallback className="bg-[#25a194]/10 text-[#25a194] text-2xl font-bold">MM</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold text-gray-800 tracking-tight mb-1">Marvin McKinney</h2>
          <p className="text-sm text-gray-500 mb-6">ID: <span className="text-[#25a194] font-medium">AD1256589</span></p>

          <Link href="/guardian/edit" className="w-full block">
            <Button className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-10 shadow-sm font-medium flex items-center justify-center gap-2">
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </Link>
        </Card>

        {/* Right Info Card */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white px-6 py-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-4 border-b border-gray-100">Personal Info</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-[140px_1fr] text-sm">
              <span className="text-gray-800 font-semibold">Guardians Type</span>
              <span className="text-gray-500 font-medium">: Father</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] text-sm">
              <span className="text-gray-800 font-semibold">Phone Number</span>
              <span className="text-gray-500 font-medium">: +1 21541214</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] text-sm">
              <span className="text-gray-800 font-semibold">Occupation</span>
              <span className="text-gray-500 font-medium">: N/A</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] text-sm">
              <span className="text-gray-800 font-semibold">Address</span>
              <span className="text-gray-500 font-medium">: 8502 Preston Rd, Inglewood, Maine 98380</span>
            </div>
            <div className="grid grid-cols-[140px_1fr] text-sm">
              <span className="text-gray-800 font-semibold">Join Date</span>
              <span className="text-gray-500 font-medium">: 10 Nov 2006</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Details Content */}
      <div className="space-y-6">
        
        {/* Profile Detail */}
        <Card className="shadow-sm border-gray-100 rounded-lg overflow-hidden bg-white">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Profile Detail</h2>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-x-6 gap-y-8">
              
              {/* Row 1 */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-full border border-gray-100">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Robert`} />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-xs">RF</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Robert Fox</h3>
                  <p className="text-sm text-gray-500 mt-1">Father</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Class</p>
                <p className="text-sm text-gray-500 font-medium">+19854 65642</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Roll No</p>
                <p className="text-sm text-gray-500 font-medium">father@example.com</p>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-full border border-gray-100">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Brooklyn`} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-xs">BS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">Brooklyn Simmons</h3>
                  <p className="text-sm text-gray-500 mt-1">Mother</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Class</p>
                <p className="text-sm text-gray-500 font-medium">+19854 65642</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Roll No</p>
                <p className="text-sm text-gray-500 font-medium">mother@example.com</p>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

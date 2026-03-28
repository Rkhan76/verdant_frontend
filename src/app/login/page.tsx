'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeOff, Eye, Globe, Grid, User, Layout, Users, BookMarked, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white w-full">
      {/* Left side hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
          alt="Classroom" 
          className="object-cover w-full h-full"
        />
        {/* Optional overlay if needed, currently leaving clean per reference */}
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-orange-500 rounded-lg p-1.5 flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none px-1">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 leading-tight">Verdant Public School</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Welcome Back <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2">Log in to your account to continue</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></Label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-11 border-gray-200 focus-visible:ring-[#25a194]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="h-11 border-gray-200 focus-visible:ring-[#25a194] pr-10"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm font-medium text-[#25a194] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-11 text-base font-semibold">
              Log In
            </Button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full " />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-400">or login as</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            <Button type="button" variant="outline" className="bg-[#10b981] hover:bg-[#059669] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <Globe className="w-3.5 h-3.5" /> <span className="text-xs font-semibold">Super Admin</span>
            </Button>
            <Button type="button" variant="outline" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <Grid className="w-3.5 h-3.5" /> <span className="text-xs font-semibold">Admin</span>
            </Button>
            <Button type="button" variant="outline" className="bg-[#f97316] hover:bg-[#ea580c] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <GraduationCap className="w-4 h-4" /> <span className="text-xs font-semibold">Student</span>
            </Button>
            <Button type="button" variant="outline" className="bg-[#a855f7] hover:bg-[#9333ea] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <Layout className="w-3.5 h-3.5" /> <span className="text-xs font-semibold">Teacher</span>
            </Button>
            <Button type="button" variant="outline" className="bg-[#25a194] hover:bg-[#1d8277] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <Users className="w-3.5 h-3.5" /> <span className="text-xs font-semibold">Guardians</span>
            </Button>
            <Button type="button" variant="outline" className="bg-[#ec4899] hover:bg-[#db2777] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors">
              <BookMarked className="w-3.5 h-3.5" /> <span className="text-xs font-semibold">Librarian</span>
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account? <Link href="#" className="font-semibold text-[#25a194] hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

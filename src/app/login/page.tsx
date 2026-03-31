'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeOff, Eye, Globe, Grid, User, Layout, Users, BookMarked, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/lib/types';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, setMfaToken, setSetupToken, isAuthenticated, deviceToken } = useAuthStore();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboards');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
        deviceToken: deviceToken || undefined
      });

      const data = response.data;

      if (data.requiresMfa && data.mfaToken) {
        setMfaToken(data.mfaToken);
        router.push('/mfa-verify');
      } else if (data.requiresMfaSetup && data.setupToken) {
        setSetupToken(data.setupToken);
        router.push('/mfa-setup');
      } else if (data.accessToken && data.refreshToken && data.user) {
        setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          deviceToken: data.deviceToken
        });
        
        // Role-based redirection
        const role = data.user.role;
        if (role === 'SUPERADMIN' || role === 'ADMIN') {
          router.push('/dashboards/admin');
        } else if (role === 'TEACHER') {
          router.push('/dashboards/teacher');
        } else if (role === 'STUDENT') {
          router.push('/dashboards/student');
        } else if (role === 'PARENT') {
          router.push('/dashboards/guardian');
        } else {
          router.push('/dashboards');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password@123'); // Example password
  };

  return (
    <div className="min-h-screen flex bg-white w-full">
      {/* Left side hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" 
          alt="Classroom" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-[#25a194] rounded-lg p-1.5 flex items-center justify-center">
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></Label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-11 border-gray-200 focus-visible:ring-[#25a194]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="h-11 border-gray-200 focus-visible:ring-[#25a194] pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  disabled={isLoading}
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

            <Button 
              type="submit" 
              className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-11 text-base font-semibold transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : 'Log In'}
            </Button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-400 font-medium">or login as</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('superadmin@verdant.com')}
              className="bg-[#10b981] hover:bg-[#059669] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <Globe className="w-3.5 h-3.5" /> <span className="text-[11px] font-semibold">Super Admin</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('admin@verdant.com')}
              className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <Grid className="w-3.5 h-3.5" /> <span className="text-[11px] font-semibold">Admin</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('student@verdant.com')}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <GraduationCap className="w-4 h-4" /> <span className="text-[11px] font-semibold">Student</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('teacher@verdant.com')}
              className="bg-[#a855f7] hover:bg-[#9333ea] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <Layout className="w-3.5 h-3.5" /> <span className="text-[11px] font-semibold">Teacher</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('guardian@verdant.com')}
              className="bg-[#25a194] hover:bg-[#1d8277] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <Users className="w-3.5 h-3.5" /> <span className="text-[11px] font-semibold">Guardians</span>
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleRoleQuickLogin('librarian@verdant.com')}
              className="bg-[#ec4899] hover:bg-[#db2777] text-white border-0 h-10 px-0 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <BookMarked className="w-3.5 h-3.5" /> <span className="text-[11px] font-semibold">Librarian</span>
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

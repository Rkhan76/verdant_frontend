'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';
import { AuthResponse } from '@/lib/types';
import { AxiosError } from 'axios';

export default function MfaVerifyPage() {
  const router = useRouter();
  const { mfaToken, setAuth, setDeviceToken } = useAuthStore();
  
  const [code, setCode] = useState('');
  const [trustDevice, setTrustDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mfaToken) {
      router.push('/login');
    }
  }, [mfaToken, router]);

  if (!mfaToken) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/auth/mfa/verify', {
        mfaToken,
        code,
        trustDevice
      });

      const data = response.data;

      if (data.accessToken && data.refreshToken && data.user) {
        if (data.deviceToken) {
          setDeviceToken(data.deviceToken);
        }

        setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          deviceToken: data.deviceToken
        });
        
        // Need user role to redirect correctly, but assuming Admin/SuperAdmin for MFA
        if (data.user.role === 'SUPERADMIN' || data.user.role === 'ADMIN') {
          router.push('/');
        } else {
          router.push('/dashboards/teacher'); // Fallback if other roles somehow trigger MFA
        }
      }
    } catch (err) {
      console.error('MFA verify error:', err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-[#25a194]/10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-[#25a194]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Two-Step Verification</h1>
            <p className="text-sm text-gray-500 mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Verification Code</Label>
              <Input 
                type="text" 
                placeholder="000000" 
                className="h-14 text-center text-2xl font-bold tracking-[0.5em] border-gray-200 focus-visible:ring-[#25a194] focus-visible:border-[#25a194]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                required
                maxLength={6}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="trust" 
                checked={trustDevice}
                onCheckedChange={(checked) => setTrustDevice(checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-[#25a194] data-[state=checked]:border-[#25a194]" 
              />
              <label
                htmlFor="trust"
                className="text-sm font-medium text-gray-500 leading-none cursor-pointer select-none"
              >
                Trust this device for 30 days
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-12 text-base font-semibold shadow-lg shadow-[#25a194]/20 transition-all duration-200"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : 'Verify & Continue'}
            </Button>
          </form>

          <button 
            type="button" 
            onClick={() => router.push('/login')}
            className="w-full mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

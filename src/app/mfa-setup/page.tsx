'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft, Download, CheckCircle2, Copy } from 'lucide-react';
import api from '@/lib/api/axios';
import { useAuthStore } from '@/store/authStore';
import { MfaSetupResponse, MfaSetupConfirmResponse } from '@/lib/types';
import { AxiosError } from 'axios';

export default function MfaSetupPage() {
  const router = useRouter();
  const { setupToken } = useAuthStore();
  
  const [step, setStep] = useState<1 | 2>(1); // 1: QR Scan/Setup, 2: Backup codes
  const [setupData, setSetupData] = useState<MfaSetupResponse | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!setupToken) {
      router.push('/login');
      return;
    }

    const fetchSetup = async () => {
      setIsLoading(true);
      try {
        const response = await api.post<MfaSetupResponse>('/auth/mfa/setup', { setupToken });
        setSetupData(response.data);
      } catch (err) {
        console.error('MFA setup error:', err);
        setError('Failed to initialize MFA setup. Please go back to login.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetup();
  }, [setupToken, router]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupData) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<MfaSetupConfirmResponse>('/auth/mfa/setup/confirm', {
        setupToken,
        secret: setupData.secret,
        code
      });

      if (response.data.success) {
        setBackupCodes(response.data.backupCodes);
        setStep(2);
      }
    } catch (err) {
      console.error('MFA setup confirm error:', err);
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadBackupCodes = () => {
    const element = document.createElement("a");
    const file = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "verdant-backup-codes.txt";
    document.body.appendChild(element);
    element.click();
  };

  const copySecret = () => {
    if (setupData?.secret) {
      navigator.clipboard.writeText(setupData.secret);
      // Optional: show a small toast or temporary icon change
    }
  };

  if (!setupToken) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 font-sans text-gray-900">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100 overflow-hidden relative">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`w-16 h-16 ${step === 1 ? 'bg-[#25a194]/10 text-[#25a194]' : 'bg-green-100 text-green-600'} rounded-full flex items-center justify-center mb-4 transition-colors duration-500`}>
              {step === 1 ? <ShieldCheck className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              {step === 1 ? 'Setup Two-Factor Authentication' : 'MFA Setup Successful'}
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              {step === 1 
                ? 'Enhance your security by linking your account to an authenticator app.' 
                : 'Please save these backup codes. They are required if you lose access to your authenticator app.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* QR Code Section */}
              <div className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                {isLoading && !setupData ? (
                  <div className="h-48 w-48 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#25a194]" />
                  </div>
                ) : setupData && (
                  <>
                    <img 
                      src={setupData.qrCodeUrl} 
                      alt="MFA QR Code" 
                      className="h-48 w-48 shadow-sm rounded-lg"
                    />
                    <div className="mt-6 flex flex-col items-center">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Can't scan? Use secret key</p>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                        <code className="text-sm font-mono font-bold text-[#25a194]">{setupData.secret}</code>
                        <button onClick={copySecret} className="text-gray-400 hover:text-[#25a194] transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <p className="text-sm text-gray-600">Scan the QR code above with Google Authenticator, Authy, or any TOTP app.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <p className="text-sm text-gray-600">Enter the 6-digit verification code generated by the app below.</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleConfirm} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Enter 6-digit code" 
                    className="h-14 text-center text-2xl font-bold tracking-[0.5em] border-gray-200 focus:visible:ring-[#25a194] focus-visible:border-[#25a194]"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-12 text-base font-semibold shadow-xl shadow-[#25a194]/20 transition-all active:scale-[0.98]"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : 'Finish Setup'}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              {/* Backup Codes Section */}
              <div className="bg-[#f0fdf4] p-6 rounded-2xl border border-green-100">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {backupCodes.map((c, i) => (
                    <div key={i} className="bg-white px-3 py-2 rounded-lg border border-green-100 text-center font-mono text-sm font-bold text-green-700 shadow-sm">
                      {c}
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={downloadBackupCodes}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-11 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Download className="w-4 h-4" /> Download Backup Codes
                </Button>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Each backup code can only be used once. Please store them in a secure location, like a password manager.
                </p>
              </div>

              <Button 
                onClick={() => router.push('/login')} 
                className="w-full bg-[#25a194] hover:bg-[#208b80] text-white h-12 text-base font-semibold transition-all active:scale-[0.98]"
              >
                I've Saved the Codes, Return to Login
              </Button>
            </div>
          )}

          {step === 1 && (
            <button 
              type="button" 
              onClick={() => router.push('/login')}
              className="w-full mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

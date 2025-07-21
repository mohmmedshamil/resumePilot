'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { apiService } from '@/services/apiService';
import { useRouter } from 'next/navigation';

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // passed from signup success

  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      return toast.error('Please enter a valid 6-digit OTP');
    }

    try {
      setIsSubmitting(true);
      const response = await apiService.verifyOtp(userId, otp);
      console.log("response", response)
      if (response.data) {
        toast.success('OTP verified successfully!');
        router.push('/auth/signin'); // or wherever the user should go next
      } else {
        toast.error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              This code will expire in 10 minutes.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

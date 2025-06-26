'use client';

import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome } from 'lucide-react';
import Loading from '@/app/loading';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (loading || user) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-20rem)]">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome</CardTitle>
          <CardDescription>Sign in to continue to Further</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} className="w-full" variant="default">
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

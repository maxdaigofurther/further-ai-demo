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
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If auth is done loading and we have a user with a valid email, redirect to home.
    if (!loading && user && user.email?.endsWith('@gofurther.com')) {
      router.push('/');
    }
    // If the user is present but has an invalid email, the `handleSignIn` function
    // is responsible for signing them out and showing a toast. We do nothing here
    // to avoid a premature redirect that would hide the toast message.
  }, [user, loading, router]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user?.email?.endsWith('@gofurther.com')) {
        // The useEffect will handle redirecting the user.
      } else {
        await auth.signOut();
        toast({
          title: 'Access Denied',
          description: 'You must use a @gofurther.com email address to sign in.',
          variant: 'destructive',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
      toast({
        title: 'Sign In Error',
        description: 'An error occurred during sign-in. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  if (loading || (user && user.email?.endsWith('@gofurther.com'))) {
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

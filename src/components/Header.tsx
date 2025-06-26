'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };
  
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Further Home">
            <Image
              src="/logo.png"
              alt="Further Logo"
              width={235}
              height={48}
              priority
            />
          </Link>
          <nav className="flex items-center space-x-4">
            {loading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-9 w-9 rounded-full bg-white/20" />
                <Skeleton className="h-9 w-24 rounded-md bg-white/20" />
              </div>
            ) : user ? (
              <>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="hover:bg-primary/80">
                  Sign Out
                  <LogOut className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              null
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

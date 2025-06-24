'use client'; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h2 className="text-3xl font-headline font-bold text-destructive mb-4">Oops, Something Went Wrong!</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        We encountered an unexpected issue. Please try again, or if the problem persists, contact support.
      </p>
      {error?.digest && (
        <p className="text-xs text-muted-foreground mb-2">Error Digest: {error.digest}</p>
      )}
      <Button
        onClick={() => reset()}
        variant="destructive"
        size="lg"
      >
        Try Again
      </Button>
    </div>
  );
}

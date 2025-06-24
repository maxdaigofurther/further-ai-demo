import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-h based on header/footer */}
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <p className="text-xl font-semibold text-foreground">Loading Further...</p>
      <p className="text-muted-foreground">Please wait a moment.</p>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info, CheckCircle } from "lucide-react";

export default function ModelDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs Skeleton */}
      <div className="mb-8 flex space-x-2">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-4 rounded" />
        <Skeleton className="h-5 w-24 rounded" />
      </div>

      <article className="space-y-12">
        <header className="text-center space-y-3">
          <Skeleton className="h-16 w-16 rounded-full mx-auto bg-muted" />
          <Skeleton className="h-12 w-3/4 mx-auto bg-muted" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-muted" />
          <Skeleton className="h-8 w-24 mx-auto bg-muted" />
        </header>

        <Card className="overflow-hidden shadow-lg rounded-xl">
          <Skeleton className="w-full h-96 bg-muted" /> {/* Adjusted height for image */}
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <div className="flex items-center">
              <Info className="mr-2 h-6 w-6 text-muted-foreground" />
              <Skeleton className="h-7 w-48 bg-muted" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-3/4 bg-muted" />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-6 w-6 text-muted-foreground" />
                <Skeleton className="h-7 w-40 bg-muted" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-5/6 bg-muted" />
              <Skeleton className="h-4 w-full bg-muted" />
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <Skeleton className="h-7 w-44 bg-muted" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-2/3 bg-muted" />
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center py-8">
          <Skeleton className="h-12 w-48 mx-auto rounded-md bg-muted" />
        </div>
      </article>
    </div>
  );
}

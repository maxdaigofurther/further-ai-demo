import Link from 'next/link';
import Image from 'next/image';
import type { AIModel } from '@/lib/models';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ArrowUpRightSquare, Info, CheckCircle } from 'lucide-react';

interface ModelCardProps {
  model: AIModel;
}

export default function ModelCard({ model }: ModelCardProps) {
  const IconComponent = model.icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-xl cursor-pointer">
          <CardHeader className="p-0 relative">
            <Image
              src={model.imageUrl}
              alt={`Promotional image for ${model.name}`}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              data-ai-hint={model.dataAiHint || "technology abstract"}
            />
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <div className="flex items-center mb-2">
              {IconComponent && <IconComponent className="h-6 w-6 mr-2 text-primary" />}
              <CardTitle className="font-headline text-xl leading-tight">{model.name}</CardTitle>
            </div>
            <Badge variant="secondary" className="mb-3">{model.category}</Badge>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {model.shortDescription}
            </p>
            {model.tags && model.tags.length > 0 && (
              <div className="mb-4">
                {model.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="mr-1 mb-1 text-xs">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="p-6 pt-0 flex flex-col gap-2 items-stretch mt-auto">
            <Button variant="default" className="w-full group bg-primary hover:bg-primary/90 transition-colors duration-300 pointer-events-none">
              Learn More
              <Info className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="default"
              className="w-full group bg-primary hover:bg-primary/90 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Link href={model.demoUrl} target="_blank" rel="noopener noreferrer">
                Launch Demo
                <ArrowUpRightSquare className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start space-x-4">
            {IconComponent && <IconComponent className="h-10 w-10 text-primary flex-shrink-0 mt-1" />}
            <div className="flex-grow">
              <DialogTitle className="text-3xl font-headline mb-1">{model.name}</DialogTitle>
              <DialogDescription>{model.shortDescription}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4 overflow-y-auto pr-4 -mr-4">
            <div className="relative aspect-video">
                <Image
                    src={model.imageUrl}
                    alt={`Visual representation of ${model.name}`}
                    fill
                    className="object-cover rounded-md"
                    data-ai-hint={model.dataAiHint || "technology detail"}
                />
            </div>

            <div>
                <h3 className="font-headline text-xl mb-2 text-foreground flex items-center">
                    <Info className="mr-2 h-5 w-5 text-primary" />
                    About
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {model.longDescription}
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-headline text-xl mb-2 flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        Capabilities
                    </h3>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                        {model.capabilities.map((capability, index) => (
                            <li key={index}>{capability}</li>
                        ))}
                    </ul>
                </div>
                {model.examples && model.examples.length > 0 && (
                    <div>
                        <h3 className="font-headline text-xl mb-2">Use Case Examples</h3>
                        <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                            {model.examples.map((example, index) => (
                                <li key={index}>{example}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            {model.tags && model.tags.length > 0 && (
                <div>
                    <h3 className="font-headline text-xl mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {model.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <DialogFooter className="mt-auto pt-4 border-t">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={model.demoUrl} target="_blank" rel="noopener noreferrer">
                  Launch Live Demo
                  <ArrowUpRightSquare className="ml-2 h-4 w-4" />
              </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

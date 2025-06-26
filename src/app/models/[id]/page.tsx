'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getModelById } from '@/lib/models';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRightSquare, CheckCircle, Info } from 'lucide-react';
import ModelDetailLoading from './loading';

interface ModelPageProps {
  params: {
    id: string;
  };
}

export default function ModelPage({ params }: ModelPageProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const model = getModelById(params.id);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!model) {
      // If user is loaded and authenticated but model is not found, redirect
      router.push('/');
    }
  }, [user, authLoading, model, router]);

  if (authLoading || !user || !model) {
    return <ModelDetailLoading />;
  }

  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: `/models/${model.id}`, label: model.name },
  ];

  const IconComponent = model.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbItems} />

      <article className="space-y-12">
        <header className="text-center">
          {IconComponent && <IconComponent className="h-16 w-16 text-primary mx-auto mb-4" />}
          <h1 className="text-5xl font-headline font-bold text-primary mb-3">{model.name}</h1>
          <p className="text-xl text-muted-foreground">{model.shortDescription}</p>
          <Badge variant="secondary" className="mt-4 text-md px-4 py-1">{model.category}</Badge>
        </header>

        <Card className="overflow-hidden shadow-lg rounded-xl">
          <Image
            src={model.imageUrl}
            alt={`Visual representation of ${model.name}`}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            data-ai-hint={model.dataAiHint || "technology detail"}
            priority
          />
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <Info className="mr-2 h-6 w-6 text-primary" />
              About {model.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {model.longDescription}
            </p>
            {model.tags && model.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="font-headline text-lg mb-2 text-foreground">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <CheckCircle className="mr-2 h-6 w-6 text-primary" />
                Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                {model.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {model.examples && model.examples.length > 0 && (
            <Card className="shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Use Case Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {model.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="text-center py-8">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform duration-200 hover:scale-105 group text-lg px-8 py-6">
            <Link href={model.demoUrl} target="_blank" rel="noopener noreferrer">
              View Live Demo
              <ArrowUpRightSquare className="ml-2 h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import type { AIModel } from '@/lib/models';
import { getModels, getModelCategories } from '@/lib/models';
import ModelCard from '@/components/ModelCard';
import ModelFilters from '@/components/ModelFilters';
import { Skeleton } from '@/components/ui/skeleton';
import Loading from './loading';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [allModels, setAllModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const loadModels = () => {
      setIsLoading(true);
      const all = getModels();
      const cats = getModelCategories();
      
      setAllModels(all);
      setFilteredModels(all);
      setCategories(cats);
      setIsLoading(false);
    };
    loadModels();
  }, [user, authLoading, router]);

  const handleFilterChange = (category: string) => {
    setCurrentFilter(category);
    if (category === 'All') {
      setFilteredModels(allModels);
    } else {
      setFilteredModels(allModels.filter(model => model.category === category));
    }
  };

  const renderModelGrid = (models: AIModel[]) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (models.length === 0) {
      return <p className="text-center text-muted-foreground col-span-full">No models found for "{currentFilter}".</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    );
  };

  const CardSkeleton = () => (
    <div className="flex flex-col space-y-3 p-4 border rounded-xl shadow-lg bg-card">
      <Skeleton className="h-48 w-full rounded-lg bg-muted" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 bg-muted" />
        <Skeleton className="h-4 w-1/4 bg-muted" />
        <Skeleton className="h-12 w-full bg-muted" />
      </div>
      <Skeleton className="h-10 w-full bg-muted" />
    </div>
  );

  if (authLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="space-y-16">
      <section id="ai-applications" aria-labelledby="ai-applications-title">
        <h2 id="ai-applications-title" className="text-4xl font-headline font-bold text-center mb-6 text-primary">
          AI Applications
        </h2>
        {!isLoading && categories.length > 0 && (
          <ModelFilters categories={categories} currentFilter={currentFilter} onFilterChange={handleFilterChange} />
        )}
        {renderModelGrid(filteredModels)}
      </section>
    </div>
  );
}

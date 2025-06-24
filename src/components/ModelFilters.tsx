'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModelFiltersProps {
  categories: string[];
  currentFilter: string;
  onFilterChange: (category: string) => void;
}

export default function ModelFilters({ categories, currentFilter, onFilterChange }: ModelFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map(category => (
        <Button
          key={category}
          variant={currentFilter === category ? 'default' : 'outline'}
          onClick={() => onFilterChange(category)}
          className={cn(
            "transition-all duration-200 ease-in-out transform hover:scale-105",
            currentFilter === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card hover:bg-secondary'
          )}
          aria-pressed={currentFilter === category}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

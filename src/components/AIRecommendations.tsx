'use client';

import { useState, useTransition } from 'react';
import { getAIModelRecommendations, AIModelRecommendationsInput } from '@/ai/flows/ai-model-recommendations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

export default function AIRecommendations() {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!preferences.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please describe your preferences for AI model recommendations.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const input: AIModelRecommendationsInput = { userPreferences: preferences };
        const result = await getAIModelRecommendations(input);
        if (result && result.recommendations) {
          setRecommendations(result.recommendations);
          if (result.recommendations.length === 0) {
            toast({
              title: 'No Recommendations Found',
              description: 'We couldn\'t find any specific models matching your preferences. Try being more general or specific.',
            });
          }
        } else {
          throw new Error('Invalid response from AI');
        }
      } catch (error) {
        console.error('Error getting AI recommendations:', error);
        toast({
          title: 'Error',
          description: 'Failed to get AI recommendations. Please try again later.',
          variant: 'destructive',
        });
        setRecommendations([]);
      }
    });
  };

  return (
    <Card className="shadow-xl border-accent/50 rounded-xl overflow-hidden">
      <CardHeader className="bg-accent/10 p-6">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-8 w-8 text-accent" />
          <CardTitle className="font-headline text-2xl text-accent">AI Model Recommender</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground pt-1">
          Tell us what you&apos;re looking for, and our AI will suggest models you might like!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Textarea
          placeholder="e.g., 'I need models for image generation with a focus on artistic styles' or 'Looking for AI that can help with coding in Python and JavaScript'"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={4}
          className="focus:border-accent focus:ring-accent"
          aria-label="Describe your AI model preferences"
        />
        <Button onClick={handleSubmit} disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendations...
            </>
          ) : (
            'Get Recommendations'
          )}
        </Button>
      </CardContent>
      {recommendations.length > 0 && (
        <CardFooter className="p-6 bg-muted/30">
          <div className="w-full">
            <h4 className="font-headline text-lg mb-3 text-foreground">Recommended Models:</h4>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// This is an autogenerated file from Firebase Studio.

'use server';

/**
 * @fileOverview Provides AI model recommendations based on user preferences.
 *
 * - getAIModelRecommendations - A function that provides AI model recommendations.
 * - AIModelRecommendationsInput - The input type for the getAIModelRecommendations function.
 * - AIModelRecommendationsOutput - The return type for the getAIModelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIModelRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the users preferences, history, and past interactions with AI models.'
    ),
});
export type AIModelRecommendationsInput = z.infer<typeof AIModelRecommendationsInputSchema>;

const AIModelRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended AI models based on user preferences.'),
});
export type AIModelRecommendationsOutput = z.infer<typeof AIModelRecommendationsOutputSchema>;

export async function getAIModelRecommendations(
  input: AIModelRecommendationsInput
): Promise<AIModelRecommendationsOutput> {
  return aiModelRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiModelRecommendationsPrompt',
  input: {schema: AIModelRecommendationsInputSchema},
  output: {schema: AIModelRecommendationsOutputSchema},
  prompt: `Based on the following user preferences: {{{userPreferences}}}, recommend a list of AI models that the user might be interested in. Return the models as a list of strings.
`,
});

const aiModelRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiModelRecommendationsFlow',
    inputSchema: AIModelRecommendationsInputSchema,
    outputSchema: AIModelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

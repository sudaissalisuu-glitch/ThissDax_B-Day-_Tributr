'use server';

/**
 * @fileOverview A birthday poem generator for Thissdax, incorporating keywords related to his name,
 * interests, and the Quasimodo trading strategy.
 *
 * - generateBirthdayPoem - A function that generates a birthday poem.
 * - GenerateBirthdayPoemInput - The input type for the generateBirthdayPoem function.
 * - GenerateBirthdayPoemOutput - The return type for the generateBirthdayPoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBirthdayPoemInputSchema = z.object({
  name: z.string().describe('The name of the birthday celebrant.'),
  tradingStrategy: z
    .string()
    .describe('The trading strategy used by the birthday celebrant.'),
  interests: z.string().describe('The interests of the birthday celebrant.'),
});
export type GenerateBirthdayPoemInput = z.infer<typeof GenerateBirthdayPoemInputSchema>;

const GenerateBirthdayPoemOutputSchema = z.object({
  poem: z.string().describe('The generated birthday poem.'),
});
export type GenerateBirthdayPoemOutput = z.infer<typeof GenerateBirthdayPoemOutputSchema>;

export async function generateBirthdayPoem(input: GenerateBirthdayPoemInput): Promise<GenerateBirthdayPoemOutput> {
  return generateBirthdayPoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'birthdayPoemPrompt',
  input: {schema: GenerateBirthdayPoemInputSchema},
  output: {schema: GenerateBirthdayPoemOutputSchema},
  prompt: `You are a creative poet specializing in writing personalized birthday poems.

  Write a birthday poem for {{name}}, who is celebrating their birthday. Incorporate their interests and their favorite trading strategy, {{tradingStrategy}}.

  Interests: {{interests}}

The poem should be creative, engaging, and tailored to the individual.
`,
});

const generateBirthdayPoemFlow = ai.defineFlow(
  {
    name: 'generateBirthdayPoemFlow',
    inputSchema: GenerateBirthdayPoemInputSchema,
    outputSchema: GenerateBirthdayPoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

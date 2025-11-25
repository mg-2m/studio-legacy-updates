'use server';

/**
 * @fileOverview An evidence suggestion AI agent.
 *
 * - suggestEvidence - A function that handles the evidence suggestion process.
 * - SuggestEvidenceInput - The input type for the suggestEvidence function.
 * - SuggestEvidenceOutput - The return type for the suggestEvidence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEvidenceInputSchema = z.object({
  selectedFacts: z
    .array(z.string())
    .describe('A list of selected fact ids.'),
});
export type SuggestEvidenceInput = z.infer<typeof SuggestEvidenceInputSchema>;

const SuggestEvidenceOutputSchema = z.object({
  suggestedEvidence: z.array(z.string()).describe('A list of suggested evidence ids.'),
});
export type SuggestEvidenceOutput = z.infer<typeof SuggestEvidenceOutputSchema>;

export async function suggestEvidence(input: SuggestEvidenceInput): Promise<SuggestEvidenceOutput> {
  return suggestEvidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEvidencePrompt',
  input: {schema: SuggestEvidenceInputSchema},
  output: {schema: SuggestEvidenceOutputSchema},
  prompt: `You are an expert legal assistant specializing in suggesting relevant evidence based on the facts of a case.

Given the following selected fact ids: {{{selectedFacts}}},

suggest a list of evidence ids that would be helpful in supporting these facts. Only return evidence IDs, not the description of each evidence.

Return the evidence ids as a JSON array of strings.
`,
});

const suggestEvidenceFlow = ai.defineFlow(
  {
    name: 'suggestEvidenceFlow',
    inputSchema: SuggestEvidenceInputSchema,
    outputSchema: SuggestEvidenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An evidence suggestion AI agent.
 *
 * - suggestEvidence - A function that handles the evidence suggestion process.
 * - SuggestEvidenceInput - The input type for the suggestEvidence function.
 * - SuggestEvidenceOutput - The return type for the suggestEvidence function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

import { Fact, EvidenceRegistry } from '@/lib/types';

const SuggestEvidenceInputSchema = z.object({
  selectedFacts: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      legalText: z.string(),
    })
  ).describe('An array of fact objects the user has selected.'),

  evidenceRegistry: z.record(
    z.string(), 
    z.object({
      id: z.string(),
      label: z.string(),
      type: z.string(),
      credentialLabel: z.string(),
      credentialPlaceholder: z.string(),
    })
  ).describe('A dictionary of all possible evidence items available in the system.'),

  autoLinkedEvidenceIds: z.array(z.string()).describe(
    'A list of evidence IDs that are already automatically linked to the selected facts. DO NOT suggest these items.'
  ),
});
export type SuggestEvidenceInput = z.infer<typeof SuggestEvidenceInputSchema>;

const SuggestEvidenceOutputSchema = z.object({
  suggestedEvidence: z.array(z.string()).describe(
    'A list of suggested evidence ids that are most relevant to the selected facts.'
  ),
});
export type SuggestEvidenceOutput = z.infer<typeof SuggestEvidenceOutputSchema>;

export async function suggestEvidence(
  input: SuggestEvidenceInput
): Promise<SuggestEvidenceOutput> {
  // Return an empty list if no facts are selected to avoid unnecessary AI calls.
  if (input.selectedFacts.length === 0) {
    return { suggestedEvidence: [] };
  }
  return suggestEvidenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEvidencePrompt',
  input: { schema: SuggestEvidenceInputSchema },
  output: { schema: SuggestEvidenceOutputSchema },
  prompt: `You are an expert legal assistant AI for Ethiopian law. Your task is to suggest relevant evidence based on the facts of a case.

Analyze the user's selected facts provided below.
Based on these facts, determine which pieces of evidence from the provided evidence registry would be most helpful to prove the user's claims.

IMPORTANT: Do NOT suggest any evidence that is already listed in the 'autoLinkedEvidenceIds'. Your suggestions must be additive and provide new, relevant options.

## User's Selected Facts:
{{#each selectedFacts}}
- Fact ID: {{{id}}}, Description: {{{legalText}}}
{{/each}}

## Evidence Already Linked Automatically (DO NOT SUGGEST):
{{#each autoLinkedEvidenceIds}}
- {{{this}}}
{{/each}}

## Available Evidence Registry (Suggest from this list):
You can choose one or more of the following items. Return only the 'id' of the evidence you select.
{{#each evidenceRegistry}}
- Evidence ID: {{{id}}}, Label: {{{label}}}
{{/each}}

Your response must be a JSON object containing only the 'suggestedEvidence' key, which should be an array of the most relevant evidence IDs. Only suggest additional, helpful evidence not already auto-linked.
`,
});

const suggestEvidenceFlow = ai.defineFlow(
  {
    name: 'suggestEvidenceFlow',
    inputSchema: SuggestEvidenceInputSchema,
    outputSchema: SuggestEvidenceOutputSchema,
  },
  async (input: SuggestEvidenceInput): Promise<SuggestEvidenceOutput> => {
    const { output } = await prompt(input);
    return output!;
  }
);

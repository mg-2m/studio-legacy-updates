'use server';

/**
 * @fileOverview A Genkit flow to provide context to the maintenance calculator results.
 *
 * - provideMaintenanceContext - A function that provides context to the maintenance calculator results.
 * - MaintenanceContextInput - The input type for the provideMaintenanceContext function.
 * - MaintenanceContextOutput - The return type for the provideMaintenanceContext function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod'; 

const MaintenanceContextInputSchema = z.object({
  income: z.number().describe('The respondent monthly income.'),
  children: z.number().describe('The number of children.'),
});
export type MaintenanceContextInput = z.infer<typeof MaintenanceContextInputSchema>;

const MaintenanceContextOutputSchema = z.object({
  context: z.string().describe('The context to the maintenance calculator results.'),
});
export type MaintenanceContextOutput = z.infer<typeof MaintenanceContextOutputSchema>;

export async function provideMaintenanceContext(
  input: MaintenanceContextInput
): Promise<MaintenanceContextOutput> {
  return maintenanceCalculatorAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceCalculatorAssistancePrompt',
  input: { schema: MaintenanceContextInputSchema },
  output: { schema: MaintenanceContextOutputSchema },
  prompt: `You are an expert in family law, specializing in providing context to maintenance calculator results.

  Given the respondent monthly income is {{{income}}} and the number of children is {{{children}}},
  provide a context (in Amharic) to the maintenance calculator results, such as different scenarios,
  that would be helpful to the user.
  The context should not be too long, no more than 200 words.
  `,
});

const maintenanceCalculatorAssistanceFlow = ai.defineFlow(
  {
    name: 'maintenanceCalculatorAssistanceFlow',
    inputSchema: MaintenanceContextInputSchema,
    outputSchema: MaintenanceContextOutputSchema,
  },
  async (input: MaintenanceContextInput): Promise<MaintenanceContextOutput> => {
    const { output } = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview An AI-driven risk analyzer flow that predicts potential sprint risks based on past project data.
 *
 * - analyzeSprintRisks - A function that analyzes sprint risks.
 * - AnalyzeSprintRisksInput - The input type for the analyzeSprintRisks function.
 * - AnalyzeSprintRisksOutput - The return type for the analyzeSprintRisks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSprintRisksInputSchema = z.object({
  pastSprintData: z
    .string()
    .describe(
      'Data from past sprints, including completed tasks, identified risks, and encountered issues.'
    ),
  upcomingSprintGoal: z.string().describe('The goal of the upcoming sprint.'),
});
export type AnalyzeSprintRisksInput = z.infer<typeof AnalyzeSprintRisksInputSchema>;

const AnalyzeSprintRisksOutputSchema = z.object({
  predictedRisks: z
    .array(z.string())
    .describe('A list of potential risks predicted for the upcoming sprint.'),
  suggestedRiskTemplates: z
    .array(z.string())
    .describe('A list of risk templates suggested for the identified risks.'),
});
export type AnalyzeSprintRisksOutput = z.infer<typeof AnalyzeSprintRisksOutputSchema>;

export async function analyzeSprintRisks(input: AnalyzeSprintRisksInput): Promise<AnalyzeSprintRisksOutput> {
  return analyzeSprintRisksFlow(input);
}

const analyzeSprintRisksPrompt = ai.definePrompt({
  name: 'analyzeSprintRisksPrompt',
  input: {schema: AnalyzeSprintRisksInputSchema},
  output: {schema: AnalyzeSprintRisksOutputSchema},
  prompt: `You are an AI-powered risk analyzer for sprint planning. Analyze the past sprint data and upcoming sprint goal to predict potential risks and suggest relevant risk templates.

Past Sprint Data: {{{pastSprintData}}}
Upcoming Sprint Goal: {{{upcomingSprintGoal}}}

Based on this information, predict potential risks for the upcoming sprint and suggest relevant risk templates.

Output a list of predicted risks and a list of suggested risk templates.

Predicted Risks:
{{#each predictedRisks}}- {{{this}}}
{{/each}}

Suggested Risk Templates:
{{#each suggestedRiskTemplates}}- {{{this}}}
{{/each}}`,
});

const analyzeSprintRisksFlow = ai.defineFlow(
  {
    name: 'analyzeSprintRisksFlow',
    inputSchema: AnalyzeSprintRisksInputSchema,
    outputSchema: AnalyzeSprintRisksOutputSchema,
  },
  async input => {
    const {output} = await analyzeSprintRisksPrompt(input);
    return output!;
  }
);

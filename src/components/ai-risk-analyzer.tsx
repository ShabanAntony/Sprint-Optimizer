"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { analyzeSprintRisks, AnalyzeSprintRisksOutput } from "@/ai/flows/ai-driven-risk-analyzer";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Loader2, Wand2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  pastSprintData: z.string().min(50, {
    message: "Please provide more detailed data from past sprints.",
  }),
  upcomingSprintGoal: z.string().min(20, {
    message: "Please provide a more detailed sprint goal.",
  }),
});

export default function AiRiskAnalyzer() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeSprintRisksOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pastSprintData: "Last sprint, we completed 35/40 story points. A major blocker was a delay in the external payments API (risk was identified). We also had an unexpected infrastructure issue that took 2 days to resolve (new issue).",
      upcomingSprintGoal: "Launch the new user checkout flow. This involves integrating with the payments API and creating a new order confirmation page.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeSprintRisks(values);
      setResult(analysisResult);
    } catch (error) {
      console.error("AI Risk Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing the sprint risks. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Analyze Risks with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
             <Wand2 className="text-primary"/>
            AI-Driven Risk Analyzer
          </DialogTitle>
          <DialogDescription>
            Let AI predict potential risks for your upcoming sprint based on past data and future goals.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-semibold">Analysis Complete</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Predicted Risks</h4>
                  <ul className="space-y-2">
                    {result.predictedRisks.map((risk, i) => (
                      <li key={i} className="text-sm p-2 bg-muted rounded-md">{risk}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Suggested Templates</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedRiskTemplates.map((template, i) => (
                      <Badge key={i} variant="secondary">{template}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setResult(null)}>Run New Analysis</Button>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pastSprintData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Sprint Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe completed tasks, identified risks, and encountered issues from past sprints."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="upcomingSprintGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upcoming Sprint Goal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What is the main goal of the upcoming sprint?"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Sprint"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

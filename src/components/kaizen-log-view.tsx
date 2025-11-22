"use client";

import { Download, FileText, CheckCircle, AlertCircle, TrendingUp, Sparkles, Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { kaizenLog } from '@/app/lib/mock-data';

export default function KaizenLogView() {
  const { predictedRisks, actualIssues, improvementPlan } = kaizenLog;
  return (
    <div>
       <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Kaizen Log: Sprint #42</h2>
          <p className="text-muted-foreground">Review outcomes and plan improvements for the next cycle.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export to Confluence
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Generate Release Notes
          </Button>
        </div>
      </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted Risks</CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{predictedRisks.total}</div>
          <p className="text-xs text-muted-foreground">{predictedRisks.critical} critical, {predictedRisks.unused} false alarms</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actual Issues</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{actualIssues.triggeredRisks + actualIssues.newIssues}</div>
          <p className="text-xs text-muted-foreground">{actualIssues.newIssues} new issues not predicted</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Improvement Actions</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{improvementPlan.length}</div>
          <p className="text-xs text-muted-foreground">Actionable suggestions for next sprint</p>
        </CardContent>
      </Card>
    </div>
    <Card className="mt-8">
      <CardHeader>
          <CardTitle>Sprint Analysis</CardTitle>
          <CardDescription>A detailed breakdown of risks and improvements from the sprint.</CardDescription>
      </CardHeader>
      <CardContent>
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              Improvement Plan
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <ul className="space-y-4">
              {improvementPlan.map(item => (
                 <li key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                   <div>
                    <p>{item.suggestion}</p>
                    {item.jiraTask && <p className="text-xs text-muted-foreground">Jira Task: <span className="font-mono text-primary">{item.jiraTask}</span></p>}
                   </div>
                   {!item.jiraTask && (
                     <Button size="sm" variant="outline">
                       <Plus className="mr-2 h-4 w-4" /> Create Task
                     </Button>
                   )}
                 </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Actual Issues Summary
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <p className="text-muted-foreground">{actualIssues.impactSummary}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              Risk Prediction Summary
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <p className="text-muted-foreground">
                The team predicted {predictedRisks.total} risks, with {actualIssues.triggeredRisks} of them materializing.
                There were {predictedRisks.unused} "false alarms" and {actualIssues.newIssues} completely new issues.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </CardContent>
    </Card>
    </div>
  );
}

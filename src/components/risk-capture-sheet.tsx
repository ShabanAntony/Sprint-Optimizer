"use client";

import { useState } from 'react';
import { Plus, Tag, Trash2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import type { Task, Risk, RiskTemplate } from '@/app/lib/mock-data';
import { riskTemplates } from '@/app/lib/mock-data';

const riskPriorityColors = {
  Critical: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-yellow-400',
  Low: 'bg-green-500',
};

const RiskItem = ({ risk }: { risk: Risk }) => (
  <div className="flex items-start gap-4 rounded-lg border p-3">
    <div className={`mt-1.5 h-2.5 w-2.5 rounded-full ${riskPriorityColors[risk.priority]}`} />
    <div className="flex-1">
      <p className="font-semibold">{risk.name}</p>
      <p className="text-sm text-muted-foreground">{risk.description}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <Badge variant="secondary">P: {risk.probability}</Badge>
        <Badge variant="secondary">I: {risk.impact}</Badge>
        {risk.fallbackScenario && <Badge variant="outline">Fallback: {risk.fallbackScenario}</Badge>}
      </div>
    </div>
    <Button variant="ghost" size="icon" className="h-7 w-7">
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

export default function RiskCaptureSheet({
  task,
  open,
  onOpenChange,
}: {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <span className="text-muted-foreground">{task.id}:</span> {task.title}
          </SheetTitle>
          <SheetDescription>
            Manage potential risks for this task. Risks help in creating robust fallback scenarios.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Existing Risks ({task.risks.length})</h3>
            {task.risks.length > 0 ? (
              task.risks.map(risk => <RiskItem key={risk.id} risk={risk} />)
            ) : (
              <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
                <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                No risks identified for this task.
              </div>
            )}
          </div>
          
          {showAddForm ? (
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold">Add New Risk</h3>
              <div className="grid gap-2">
                <Label htmlFor="risk-template">Start from template</Label>
                <Select>
                  <SelectTrigger id="risk-template">
                    <SelectValue placeholder="Select a risk template" />
                  </SelectTrigger>
                  <SelectContent>
                    {riskTemplates.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="risk-name">Name</Label>
                <Input id="risk-name" placeholder="e.g., Backend API Delay" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="risk-description">Description</Label>
                <Textarea id="risk-description" placeholder="Describe the risk..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Probability</Label>
                  <Select defaultValue="Medium">
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Impact</Label>
                  <Select defaultValue="Medium">
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
               <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button>Save Risk</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Risk
            </Button>
          )}
        </div>
        
        <SheetFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

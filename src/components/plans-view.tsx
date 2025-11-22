"use client";

import { useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, GripVertical } from 'lucide-react';
import { allTasks, plans as mockPlans, type Task, type Plan } from '@/app/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AiRiskAnalyzer from './ai-risk-analyzer';
import RiskCaptureSheet from './risk-capture-sheet';

const priorityColors = {
  High: 'text-red-500',
  Medium: 'text-yellow-500',
  Low: 'text-gray-400',
};

const TaskCard = ({ task, onSelectTask, onMove }: { task: Task; onSelectTask: (task: Task) => void; onMove: (taskId: string) => void; isIncluded: boolean }) => (
  <Card className="hover:bg-muted/50 transition-colors">
    <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
      <div className="flex-1 space-y-1">
        <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => onSelectTask(task)}>
          {task.title}
        </Button>
        <p className="text-sm text-muted-foreground">{task.id} &middot; {task.epic}</p>
      </div>
      <div className="flex items-center space-x-2">
        {task.risks.length > 0 && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {task.risks.length}
          </Badge>
        )}
        <div className={`font-bold w-6 text-center ${priorityColors[task.priority]}`}>{task.sp}</div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(task.id)}>
          {onMove.name.includes('exclude') ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        </Button>
      </div>
    </CardHeader>
  </Card>
);

export default function PlansView() {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [activePlanId, setActivePlanId] = useState<Plan['id']>('A');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const activePlan = plans.find(p => p.id === activePlanId)!;

  const moveTask = (taskId: string, to: 'included' | 'excluded') => {
    setPlans(prevPlans =>
      prevPlans.map(plan => {
        if (plan.id === activePlanId) {
          const newPlan = { ...plan };
          if (to === 'included') {
            newPlan.excludedTasks = newPlan.excludedTasks.filter(id => id !== taskId);
            newPlan.includedTasks.push(taskId);
          } else {
            newPlan.includedTasks = newPlan.includedTasks.filter(id => id !== taskId);
            newPlan.excludedTasks.push(taskId);
          }
          return newPlan;
        }
        return plan;
      })
    );
  };

  const excludeTask = (taskId: string) => moveTask(taskId, 'excluded');
  const includeTask = (taskId: string) => moveTask(taskId, 'included');
  
  const includedTasks = allTasks.filter(t => activePlan.includedTasks.includes(t.id));
  const excludedTasks = allTasks.filter(t => activePlan.excludedTasks.includes(t.id));

  const totalSP = includedTasks.reduce((acc, task) => acc + task.sp, 0);
  const affectedEpics = new Set(includedTasks.map(t => t.epic)).size;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Select value={activePlanId} onValueChange={(val: Plan['id']) => setActivePlanId(val)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              {plans.map(plan => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">Create Scenario</Button>
        </div>
        <AiRiskAnalyzer />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Included in Plan</CardTitle>
            <CardDescription>{includedTasks.length} tasks in this scenario.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 max-h-[60vh] overflow-y-auto p-4">
            {includedTasks.map(task => (
              <TaskCard key={task.id} task={task} onSelectTask={setSelectedTask} onMove={excludeTask} isIncluded={true} />
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Apply Plan</Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Plan Summary & Exclusions</CardTitle>
            <CardDescription>{excludedTasks.length} tasks excluded.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Story Points</p>
                    <p className="text-2xl font-bold">{totalSP}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Number of Issues</p>
                    <p className="text-2xl font-bold">{includedTasks.length}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Affected Epics</p>
                    <p className="text-2xl font-bold">{affectedEpics}</p>
                </div>
            </div>
            {totalSP > 50 && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertTriangle className="h-4 w-4" />
                    <p className="text-sm font-medium">SP is above average velocity (50 SP)</p>
                </div>
            )}
            <div className="max-h-[40vh] overflow-y-auto p-1 -m-1">
                {excludedTasks.map(task => (
                <TaskCard key={task.id} task={task} onSelectTask={setSelectedTask} onMove={includeTask} isIncluded={false}/>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTask && (
        <RiskCaptureSheet
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={(isOpen) => !isOpen && setSelectedTask(null)}
        />
      )}
    </>
  );
}

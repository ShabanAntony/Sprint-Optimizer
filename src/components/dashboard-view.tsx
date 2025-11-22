"use client";

import { Activity, AlertTriangle, ListChecks, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { scenarios, allTasks } from '@/app/lib/mock-data';

const chartData = [
  { sprint: 'Sprint 40', sp: 45 },
  { sprint: 'Sprint 41', sp: 52 },
  { sprint: 'Sprint 42', sp: 48 },
  { sprint: 'Sprint 43', sp: 61 },
  { sprint: 'Sprint 44', sp: 55 },
];

const chartConfig = {
  sp: {
    label: 'Story Points',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DashboardView() {
  const currentScenario = scenarios[1]; // Scenario B
  const criticalRisksCount = allTasks.reduce((acc, task) => {
    if (currentScenario.includedTasks.includes(task.id)) {
      return acc + task.risks.filter(r => r.priority === 'Critical').length;
    }
    return acc;
  }, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Scenario</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentScenario.name}</div>
          <p className="text-xs text-muted-foreground">
            {currentScenario.includedTasks.length} tasks included
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Story Points</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentScenario.includedTasks.reduce(
              (acc, taskId) =>
                acc + (allTasks.find(t => t.id === taskId)?.sp || 0),
              0
            )}
          </div>
          <p className="text-xs text-muted-foreground">vs. 52 in last sprint</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Excluded Tasks</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentScenario.excludedTasks.length}
          </div>
          <p className="text-xs text-muted-foreground">
            {currentScenario.excludedTasks
              .reduce(
                (acc, taskId) =>
                  acc + (allTasks.find(t => t.id === taskId)?.sp || 0),
                0
              )}{' '}
            SP deferred
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{criticalRisksCount}</div>
          <p className="text-xs text-muted-foreground">Across all included tasks</p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            A look at recently updated tasks in the active scenario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Story Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTasks
                .filter(t => currentScenario.includedTasks.includes(t.id))
                .slice(0, 5)
                .map(task => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {task.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{task.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{task.sp}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Velocity</CardTitle>
          <CardDescription>Story points completed over the last 5 sprints.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="sprint"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="sp" fill="var(--color-sp)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { comparisonData } from '@/app/lib/mock-data';

export default function ScenarioComparisonView() {
  const [showOnlyDiffs, setShowOnlyDiffs] = useState(false);
  const planNames = Object.keys(comparisonData.plans);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Scenario Comparison</CardTitle>
            <CardDescription>
              Compare your sprint plans to make an informed decision.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-diffs"
              checked={showOnlyDiffs}
              onCheckedChange={setShowOnlyDiffs}
            />
            <Label htmlFor="show-diffs">Show only differences</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              {planNames.map(name => (
                <TableHead key={name} className="text-right">
                  {name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonData.metrics.map(metric => {
              const values = planNames.map(
                name => comparisonData.plans[name as keyof typeof comparisonData.plans][metric as keyof typeof comparisonData.plans['Plan A']]
              );
              const isDifferent = new Set(values).size > 1;

              if (showOnlyDiffs && !isDifferent) return null;

              return (
                <TableRow key={metric}>
                  <TableCell className="font-medium">{metric}</TableCell>
                  {planNames.map(name => (
                    <TableCell key={name} className="text-right">
                      {comparisonData.plans[name as keyof typeof comparisonData.plans][metric as keyof typeof comparisonData.plans['Plan A']].toString()}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
             <TableRow>
              <TableCell className="font-medium">Excluded Issues</TableCell>
              {planNames.map(name => (
                <TableCell key={name} className="text-right text-xs text-muted-foreground">
                  {comparisonData.plans[name as keyof typeof comparisonData.plans]['Excluded issues'].join(', ') || 'None'}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

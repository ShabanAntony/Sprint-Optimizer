"use client";

import { PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import { riskTemplates } from '@/app/lib/mock-data';

export default function RiskTemplatesView() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Templates</CardTitle>
            <CardDescription>
              Manage reusable risk templates for your project.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Restore Defaults
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Template
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Enabled</TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riskTemplates.map(template => (
              <TableRow key={template.id}>
                <TableCell>
                  <Switch
                    checked={template.enabled}
                    aria-label={`Enable ${template.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-sm">
                  {template.description}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

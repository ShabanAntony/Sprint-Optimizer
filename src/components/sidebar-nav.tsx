"use client";

import type { Dispatch, SetStateAction } from 'react';
import {
  BookOpenCheck,
  ClipboardList,
  Columns,
  LayoutDashboard,
  ShieldAlert,
  Bot,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from '@/components/ui/sidebar';
import type { View } from '@/app/page';

interface SidebarNavProps {
  activeView: View;
  setActiveView: Dispatch<SetStateAction<View>>;
}

export default function SidebarNav({ activeView, setActiveView }: SidebarNavProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 p-2">
        <Bot className="w-8 h-8 text-primary" />
        <span className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden font-headline">
          Kaizen Optimizer
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('dashboard')}
              isActive={activeView === 'dashboard'}
              tooltip="Dashboard"
            >
              <LayoutDashboard />
              <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('plans')}
              isActive={activeView === 'plans'}
              tooltip="Sprint Plans"
            >
              <ClipboardList />
              <span className="group-data-[collapsible=icon]:hidden">Sprint Plans</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('risk-templates')}
              isActive={activeView === 'risk-templates'}
              tooltip="Risk Templates"
            >
              <ShieldAlert />
              <span className="group-data-[collapsible=icon]:hidden">Risk Templates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('scenario-comparison')}
              isActive={activeView === 'scenario-comparison'}
              tooltip="Compare Scenarios"
            >
              <Columns />
              <span className="group-data-[collapsible=icon]:hidden">Compare Scenarios</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setActiveView('kaizen-log')}
              isActive={activeView === 'kaizen-log'}
              tooltip="Kaizen Log"
            >
              <BookOpenCheck />
              <span className="group-data-[collapsible=icon]:hidden">Kaizen Log</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-sidebar-foreground/50 p-4 group-data-[collapsible=icon]:hidden">
          <p>Version 1.0</p>
          <p>Kaizen for Sprint Planning</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

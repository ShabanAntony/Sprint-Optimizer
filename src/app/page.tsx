"use client";

import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import SidebarNav from "@/components/sidebar-nav";
import DashboardView from "@/components/dashboard-view";
import ScenariosView from "@/components/scenarios-view";
import RiskTemplatesView from "@/components/risk-templates-view";
import ScenarioComparisonView from "@/components/scenario-comparison-view";
import KaizenLogView from "@/components/kaizen-log-view";

export type View = "dashboard" | "scenarios" | "risk-templates" | "scenario-comparison" | "kaizen-log";

export const viewTitles: Record<View, string> = {
  dashboard: "Dashboard",
  scenarios: "Sprint Scenarios",
  "risk-templates": "Risk Templates",
  "scenario-comparison": "Scenario Comparison",
  "kaizen-log": "Kaizen Log",
};

const viewComponents: Record<View, React.ComponentType> = {
  dashboard: DashboardView,
  scenarios: ScenariosView,
  "risk-templates": RiskTemplatesView,
  "scenario-comparison": ScenarioComparisonView,
  "kaizen-log": KaizenLogView,
};

export default function Home() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const ActiveComponent = viewComponents[activeView];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarNav activeView={activeView} setActiveView={setActiveView} />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header activeView={activeView} />
          <main className="flex flex-1 flex-col gap-4 bg-muted/20 p-4 md:gap-8 md:p-8">
            <ActiveComponent />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

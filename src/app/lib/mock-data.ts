export type Task = {
  id: string;
  title: string;
  sp: number;
  status: 'To Do' | 'In Progress' | 'Done';
  epic: string;
  priority: 'Low' | 'Medium' | 'High';
  risks: Risk[];
};

export type Risk = {
  id: string;
  name: string;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  fallbackPlan?: 'Plan B' | 'Plan C';
  tags: string[];
};

export type Plan = {
  id: 'A' | 'B' | 'C';
  name: string;
  includedTasks: string[];
  excludedTasks: string[];
};

export type RiskTemplate = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  enabled: boolean;
};

const allRisks: Risk[] = [
  { id: 'r1', name: 'Design Dependency', description: 'Blocked by final design approval.', probability: 'Medium', impact: 'High', priority: 'High', tags: ['Dependency'], fallbackPlan: 'Plan B' },
  { id: 'r2', name: 'Backend Dependency', description: 'Requires new endpoint from the backend team.', probability: 'High', impact: 'High', priority: 'Critical', tags: ['Dependency'] },
  { id: 'r3', name: 'Technical Uncertainty', description: 'Involves a new library with a steep learning curve.', probability: 'Medium', impact: 'Medium', priority: 'Medium', tags: ['Technical'] },
  { id: 'r4', name: 'Scope Creep', description: 'Stakeholder might add more requirements.', probability: 'Low', impact: 'High', priority: 'Medium', tags: ['Scope'] },
];

export const allTasks: Task[] = [
  { id: 'UI-123', title: 'Profile Page', sp: 5, status: 'In Progress', epic: 'User Management', priority: 'High', risks: [allRisks[0], allRisks[3]] },
  { id: 'BE-144', title: 'Auth Refactor', sp: 8, status: 'To Do', epic: 'Infrastructure', priority: 'High', risks: [allRisks[1]] },
  { id: 'UI-121', title: 'Cosmetic Improvements', sp: 3, status: 'To Do', epic: 'User Experience', priority: 'Low', risks: [] },
  { id: 'UX-201', title: 'Tooltips for new features', sp: 2, status: 'To Do', epic: 'User Experience', priority: 'Low', risks: [] },
  { id: 'FE-312', title: 'Implement new Dashboard grid', sp: 5, status: 'To Do', epic: 'Dashboard', priority: 'High', risks: [allRisks[2]] },
  { id: 'BE-150', title: 'Database optimization', sp: 8, status: 'To Do', epic: 'Infrastructure', priority: 'Medium', risks: [] },
  { id: 'QA-50', title: 'E2E tests for checkout', sp: 3, status: 'In Progress', epic: 'Checkout', priority: 'High', risks: [] },
  { id: 'DOC-10', title: 'Update API documentation', sp: 2, status: 'To Do', epic: 'Infrastructure', priority: 'Low', risks: [] },
];

export const plans: Plan[] = [
  {
    id: 'A',
    name: 'Plan A (Ambitious)',
    includedTasks: ['UI-123', 'BE-144', 'UI-121', 'UX-201', 'FE-312', 'BE-150', 'QA-50', 'DOC-10'],
    excludedTasks: [],
  },
  {
    id: 'B',
    name: 'Plan B (Balanced)',
    includedTasks: ['UI-123', 'BE-144', 'FE-312', 'QA-50'],
    excludedTasks: ['UI-121', 'UX-201', 'BE-150', 'DOC-10'],
  },
  {
    id: 'C',
    name: 'Plan C (Safe)',
    includedTasks: ['UI-123', 'FE-312', 'QA-50'],
    excludedTasks: ['BE-144', 'UI-121', 'UX-201', 'BE-150', 'DOC-10'],
  },
];

export const riskTemplates: RiskTemplate[] = [
  { id: 'rt1', name: 'Design Dependency', description: 'Risk of delay due to pending design decisions or assets.', tags: ['Dependency'], enabled: true },
  { id: 'rt2', name: 'Backend Dependency', description: 'Work is dependent on a backend team delivering an API or service.', tags: ['Dependency', 'Technical'], enabled: true },
  { id: 'rt3', name: 'External API Delay', description: 'Risk related to the availability or performance of a third-party API.', tags: ['External'], enabled: true },
  { id: 'rt4', name: 'Technical Uncertainty', description: 'The implementation involves unknown technical challenges or new technologies.', tags: ['Technical'], enabled: true },
  { id: 'rt5', name: 'Scope Creep', description: 'Risk of uncontrolled changes or continuous growth in project scope.', tags: ['Scope'], enabled: false },
  { id: 'rt6', name: 'Legacy Instability', description: 'Working with unstable or poorly documented legacy code.', tags: ['Technical'], enabled: true },
  { id: 'rt7', name: 'QA Capacity Risk', description: 'Not enough QA resources to cover all testing scenarios.', tags: ['Team'], enabled: true },
  { id: 'rt8', name: 'Team Availability Risk', description: 'Key team members may be unavailable (vacation, sickness).', tags: ['Team'], enabled: true },
];

export const comparisonData = {
  metrics: ['Story Points', 'Issues', 'Epics covered', 'Critical risks'],
  plans: {
    'Plan A': { 'Story Points': 58, 'Issues': 8, 'Epics covered': 7, 'Critical risks': 4, 'Excluded issues': [] },
    'Plan B': { 'Story Points': 41, 'Issues': 4, 'Epics covered': 5, 'Critical risks': 2, 'Excluded issues': ['UI-121', 'UX-201'] },
    'Plan C': { 'Story Points': 32, 'Issues': 3, 'Epics covered': 4, 'Critical risks': 1, 'Excluded issues': ['UI-121', 'UX-201', 'BE-150'] },
  },
};

export const kaizenLog = {
  predictedRisks: {
    total: 8,
    critical: 2,
    unused: 3,
  },
  actualIssues: {
    triggeredRisks: 5,
    newIssues: 2,
    impactSummary: 'Medium overall impact, one critical issue caused a 2-day delay.',
  },
  improvementPlan: [
    { id: 'imp1', suggestion: 'Introduce early design-dev sync meetings to mitigate design dependency risks.', jiraTask: null },
    { id: 'imp2', suggestion: 'Allocate time for writing documentation for the legacy auth module.', jiraTask: 'INFRA-205' },
    { id: 'imp3', suggestion: 'Create a formal process for vetting third-party APIs before integration.', jiraTask: null },
  ],
};

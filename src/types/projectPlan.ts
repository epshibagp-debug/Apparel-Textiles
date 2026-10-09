export interface Persona {
  id: string;
  name: string;
  role: string;
  segment: 'D2C' | 'B2B';
  avatarInitials: string;
  demographics: {
    age: string;
    location: string;
    incomeOrBudget: string;
    techProficiency: string;
  };
  goals: string[];
  painPoints: string[];
  keyFeaturesNeeded: string[];
  quote: string;
}

export interface IndustryTrend {
  id: string;
  title: string;
  category: 'Sustainability' | 'Technology' | 'Consumer Behavior' | 'Supply Chain';
  impact: 'High' | 'Critical' | 'Medium';
  statistic: string;
  description: string;
  strategicImplication: string;
}

export interface WebBestPractice {
  id: string;
  pillar: 'Accessibility (WCAG 2.2 AA)' | 'Responsive Design' | 'Performance & Core Web Vitals' | 'Security & Trust';
  requirement: string;
  specification: string;
  implementationDetail: string;
  complianceTarget: string;
}

export interface CoreFunctionality {
  id: string;
  module: 'Cataloguing & Taxonomy' | 'Product Presentation' | 'Customer Interaction' | 'Checkout & Samples';
  featureName: string;
  priority: 'Must Have (P0)' | 'Should Have (P1)' | 'Nice to Have (P2)';
  description: string;
  technicalConsideration: string;
}

export interface TechStackItem {
  id: string;
  layer: 'Frontend & UI' | 'Backend & Headless APIs' | 'Catalog & Search' | 'Hosting & CDN' | 'Analytics & Compliance';
  technology: string;
  justification: string;
  alternativesConsidered: string[];
  tradeoffs: string;
}

export interface TimelineMilestone {
  id: string;
  phase: string;
  durationWeeks: string;
  weekRange: string;
  keyDeliverables: string[];
  iterationFocus: string;
  status: 'Completed' | 'In Progress' | 'Planned';
}

export interface WorkBreakdownTask {
  id: string;
  dayOrPhase: string;
  taskTitle: string;
  hours: number;
  category: 'Research' | 'Analysis' | 'Documentation' | 'Review & Polish';
  deliverable: string;
}

export interface ProjectPlanConfig {
  brandName: string;
  projectTitle: string;
  authorName: string;
  studentOrTeamId: string;
  submissionDate: string;
  targetLaunchDate: string;
  nicheFocus: string;
  estimatedBudget: string;
  targetMarket: string;
}

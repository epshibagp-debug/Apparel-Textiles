/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CustomizeModal } from './components/CustomizeModal';
import { WordReaderModal } from './components/WordReaderModal';
import { FabricSimulatorModal } from './components/FabricSimulatorModal';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { MarketTrends } from './components/MarketTrends';
import { AudiencePersonas } from './components/AudiencePersonas';
import { WebBestPractices } from './components/WebBestPractices';
import { ProjectScope } from './components/ProjectScope';
import { TechStack } from './components/TechStack';
import { TimelineWBS } from './components/TimelineWBS';
import { EvaluationAudit } from './components/EvaluationAudit';

import { ProjectPlanConfig } from './types/projectPlan';
import {
  initialConfig,
  executiveSummary,
  industryTrends,
  buyerPersonas,
  webBestPractices,
  coreFunctionalities,
  techStackItems,
  projectMilestones,
  workBreakdownHours,
  riskMitigations,
  evaluationCriteriaAudit
} from './data/defaultPlanData';
import { generateAndDownloadDocx } from './utils/docxGenerator';

export default function App() {
  const [config, setConfig] = useState<ProjectPlanConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [isWordReaderOpen, setIsWordReaderOpen] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isFabricDemoOpen, setIsFabricDemoOpen] = useState<boolean>(false);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDownloadDocx = async () => {
    try {
      setIsDownloading(true);
      await generateAndDownloadDocx({
        config,
        executiveSummary,
        industryTrends,
        buyerPersonas,
        webBestPractices,
        coreFunctionalities,
        techStackItems,
        projectMilestones,
        workBreakdownHours,
        riskMitigations,
        evaluationCriteriaAudit
      });
    } catch (err) {
      console.error('Error generating docx:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = async () => {
    const textPlan = `# ${config.projectTitle}
${config.brandName} - ${config.nicheFocus}
Lead: ${config.authorName} (${config.studentOrTeamId}) | Date: ${config.submissionDate} | Budget: ${config.estimatedBudget}

============================================================
1. EXECUTIVE SUMMARY & STRATEGIC VISION
============================================================
Vision: ${executiveSummary.vision}

Objectives:
${executiveSummary.strategicObjectives.map((o) => `• ${o}`).join('\n')}

KPI Targets:
${executiveSummary.keyMetrics.map((k) => `• ${k.label}: ${k.target} (Baseline: ${k.baseline})`).join('\n')}

============================================================
2. MARKET RESEARCH & APPAREL / TEXTILE INDUSTRY TRENDS
============================================================
${industryTrends
  .map(
    (t) => `• ${t.title} [${t.impact} Impact]
  Evidence: ${t.statistic}
  Context: ${t.description}
  Strategic Response: ${t.strategicImplication}`
  )
  .join('\n\n')}

============================================================
3. TARGET AUDIENCE & BUYER PERSONAS
============================================================
${buyerPersonas
  .map(
    (p) => `Persona: ${p.name} (${p.segment} - ${p.role})
Demographics: Age ${p.demographics.age}, ${p.demographics.location}, Budget: ${p.demographics.incomeOrBudget}
Quote: "${p.quote}"
Goals: ${p.goals.join('; ')}
Pain Points: ${p.painPoints.join('; ')}
Needed Features: ${p.keyFeaturesNeeded.join(', ')}`
  )
  .join('\n\n')}

============================================================
4. WEB BEST PRACTICES & ACCESSIBILITY (WCAG 2.2 AA)
============================================================
${webBestPractices
  .map(
    (b) => `• ${b.pillar} - ${b.requirement}
  Target: ${b.complianceTarget}
  Spec: ${b.specification}
  Implementation: ${b.implementationDetail}`
  )
  .join('\n\n')}

============================================================
5. PROJECT SCOPE & CORE FUNCTIONALITIES
============================================================
${coreFunctionalities
  .map(
    (f) => `• [${f.priority}] ${f.module}: ${f.featureName}
  Description: ${f.description}
  Technical Note: ${f.technicalConsideration}`
  )
  .join('\n\n')}

============================================================
6. RECOMMENDED TECHNOLOGY STACK
============================================================
${techStackItems
  .map(
    (s) => `• ${s.layer}: ${s.technology}
  Justification: ${s.justification}
  Alternatives: ${s.alternativesConsidered.join(', ')}
  Tradeoffs: ${s.tradeoffs}`
  )
  .join('\n\n')}

============================================================
7. 16-WEEK PROJECT TIMELINE & MILESTONES
============================================================
${projectMilestones
  .map(
    (m) => `• ${m.phase} (${m.weekRange})
  Deliverables: ${m.keyDeliverables.join(', ')}
  Iteration Focus: ${m.iterationFocus}`
  )
  .join('\n\n')}

============================================================
8. WEEK 1 30-35 HOUR WORK BREAKDOWN STRUCTURE (WBS)
============================================================
${workBreakdownHours
  .map((w) => `• ${w.dayOrPhase} (${w.hours} hrs) - ${w.taskTitle}: ${w.deliverable}`)
  .join('\n')}
Total Week 1 Hours: 34 Hours

============================================================
9. EVALUATION CRITERIA AUDIT
============================================================
${evaluationCriteriaAudit
  .map((e) => `• ${e.criterion} (${e.weight}): ${e.status} - ${e.details}`)
  .join('\n')}
`;

    try {
      await navigator.clipboard.writeText(textPlan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header with Navigation and Word Export Actions */}
      <Header
        config={config}
        onDownloadDocx={handleDownloadDocx}
        onOpenWordReader={() => setIsWordReaderOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenFabricDemo={() => setIsFabricDemoOpen(true)}
        onCopyText={handleCopyText}
        isDownloading={isDownloading}
        copied={copied}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <ExecutiveOverview
            config={config}
            onExploreTimeline={() => setActiveTab('timeline')}
            onDownloadDocx={handleDownloadDocx}
          />
        )}

        {activeTab === 'trends' && <MarketTrends />}

        {activeTab === 'personas' && <AudiencePersonas />}

        {activeTab === 'standards' && <WebBestPractices />}

        {activeTab === 'scope' && <ProjectScope />}

        {activeTab === 'techstack' && <TechStack />}

        {activeTab === 'timeline' && <TimelineWBS />}

        {activeTab === 'audit' && (
          <EvaluationAudit
            onDownloadDocx={handleDownloadDocx}
            onOpenWordReader={() => setIsWordReaderOpen(true)}
            onOpenFabricDemo={() => setIsFabricDemoOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">
              {config.brandName}
            </span>
            <span aria-hidden="true">·</span>
            <span>Week 1 Task: Web Project Planning & Strategy</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400">Formal DOC File Roadmap</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadDocx}
              disabled={isDownloading}
              className="text-amber-400 hover:text-amber-300 font-medium transition disabled:opacity-50"
            >
              Export .DOCX
            </button>
            <button
              onClick={() => setIsWordReaderOpen(true)}
              className="hover:text-slate-200 transition"
            >
              Print / Word Preview
            </button>
            <button
              onClick={() => setIsFabricDemoOpen(true)}
              className="hover:text-slate-200 transition"
            >
              Interactive Weave Prototype
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        config={config}
        onSave={(newCfg) => setConfig(newCfg)}
        onReset={() => setConfig(initialConfig)}
      />

      <WordReaderModal
        isOpen={isWordReaderOpen}
        onClose={() => setIsWordReaderOpen(false)}
        config={config}
        onDownloadDocx={handleDownloadDocx}
        isDownloading={isDownloading}
      />

      <FabricSimulatorModal
        isOpen={isFabricDemoOpen}
        onClose={() => setIsFabricDemoOpen(false)}
      />
    </div>
  );
}

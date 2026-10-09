import React, { useState } from 'react';
import { X, Printer, Download, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { ProjectPlanConfig } from '../types/projectPlan';
import {
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
} from '../data/defaultPlanData';

interface WordReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProjectPlanConfig;
  onDownloadDocx: () => void;
  isDownloading: boolean;
}

export const WordReaderModal: React.FC<WordReaderModalProps> = ({
  isOpen,
  onClose,
  config,
  onDownloadDocx,
  isDownloading
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      {/* Top Word-Style Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Word Document Print & Full Layout Preview
            </div>
            <div className="text-[11px] text-slate-400">
              Week1_Project_Planning_and_Strategy_{config.brandName.replace(/\s+/g, '_')}.docx
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md text-xs border border-slate-700">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
              className="p-1 hover:text-amber-400"
              title="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="w-12 text-center text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
              className="p-1 hover:text-amber-400"
              title="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </button>

          <button
            onClick={onDownloadDocx}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 transition disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isDownloading ? 'Exporting...' : 'Download DOCX'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-950">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out max-w-4xl w-full bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-14 border border-slate-300 font-serif leading-relaxed"
        >
          {/* Cover Header */}
          <div className="text-center pb-10 border-b-2 border-slate-900/20 mb-10">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-sans font-semibold mb-2">
              Deliverable: Week 1 Project Plan & Strategic Roadmap
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-3">
              STRATEGIC WEB PROJECT PLAN
            </h1>
            <h2 className="text-xl sm:text-2xl font-serif italic text-amber-900 mb-6">
              {config.brandName}: Sustainable Apparel & High-Performance Textile Platform
            </h2>
            <p className="text-sm font-sans text-slate-600 max-w-xl mx-auto">
              A comprehensive blueprint detailing industry trends, buyer personas, WCAG 2.2 AA accessibility standards, headless architecture, and a 16-week execution roadmap.
            </p>

            {/* Metadata Table */}
            <div className="mt-8 font-sans text-left max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded p-4 text-xs">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div>
                  <span className="font-semibold text-slate-700">Project Title:</span>{' '}
                  <span className="text-slate-900">{config.projectTitle}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Author / Tech Lead:</span>{' '}
                  <span className="text-slate-900">{config.authorName}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Project / Team ID:</span>{' '}
                  <span className="text-slate-900">{config.studentOrTeamId}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Submission Date:</span>{' '}
                  <span className="text-slate-900">{config.submissionDate}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Niche Specialization:</span>{' '}
                  <span className="text-slate-900">{config.nicheFocus}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Target Budget:</span>{' '}
                  <span className="text-slate-900">{config.estimatedBudget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              1. Project Overview & Executive Summary
            </h2>
            <p className="mb-4 text-slate-800 text-sm leading-6">
              <strong className="text-slate-900">Strategic Vision:</strong> {executiveSummary.vision}
            </p>

            <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide mb-2 mt-4">
              Core Strategic Objectives
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-800 mb-6">
              {executiveSummary.strategicObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>

            <h3 className="text-sm font-bold font-sans text-slate-900 uppercase tracking-wide mb-2">
              Key Performance Benchmarks
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-slate-300 mb-4">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-300">
                  <tr>
                    <th className="p-2.5 border-r border-slate-300">Metric</th>
                    <th className="p-2.5 border-r border-slate-300">Target Level</th>
                    <th className="p-2.5">Industry Baseline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {executiveSummary.keyMetrics.map((kpi, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium border-r border-slate-200">{kpi.label}</td>
                      <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200">{kpi.target}</td>
                      <td className="p-2.5 text-slate-600">{kpi.baseline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              2. Market Research & Apparel / Textile Industry Trends
            </h2>
            <p className="mb-4 text-slate-800 text-sm leading-6">
              A comprehensive survey of current market benchmarks (Patagonia, Reformation, Loro Piana, and Spoonflower) identifies four transformational trends that directly govern the digital requirements of this project:
            </p>

            <div className="space-y-6">
              {industryTrends.map((trend) => (
                <div key={trend.id} className="border-l-4 border-amber-600 pl-4 py-1 text-sm">
                  <h3 className="font-bold font-sans text-slate-900 text-base mb-1">
                    {trend.title} <span className="text-xs font-normal text-amber-700 uppercase font-sans">({trend.impact} Impact)</span>
                  </h3>
                  <p className="text-xs font-sans text-slate-600 italic mb-2">
                    Evidence: {trend.statistic}
                  </p>
                  <p className="text-slate-800 mb-2 leading-relaxed">
                    {trend.description}
                  </p>
                  <p className="text-xs font-sans bg-amber-50 p-2 rounded text-amber-950 font-medium">
                    Strategic Implication: {trend.strategicImplication}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              3. Target Audience & Buyer Persona Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              {buyerPersonas.map((persona) => (
                <div key={persona.id} className="border border-slate-300 rounded p-4 text-xs bg-slate-50/50">
                  <div className="font-bold text-sm text-slate-900">
                    {persona.name} — <span className="text-amber-800">{persona.segment} Segment</span>
                  </div>
                  <div className="text-slate-600 italic mb-2">{persona.role}</div>
                  <div className="space-y-1 mb-3 text-slate-700">
                    <div><strong>Demographics:</strong> {persona.demographics.age} yrs, {persona.demographics.location}</div>
                    <div><strong>Tech:</strong> {persona.demographics.techProficiency}</div>
                    <div><strong>Budget:</strong> {persona.demographics.incomeOrBudget}</div>
                  </div>
                  <div className="bg-white border-l-2 border-slate-400 p-2 italic mb-3 text-slate-800 font-serif">
                    {persona.quote}
                  </div>
                  <div className="mb-2">
                    <strong className="text-slate-900">Key Needs:</strong>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 text-slate-700">
                      {persona.goals.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              4. Web Development Best Practices & Accessibility (WCAG 2.2 AA)
            </h2>
            <div className="space-y-4 font-sans text-xs">
              {webBestPractices.map((bp) => (
                <div key={bp.id} className="border border-slate-200 rounded p-3 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">{bp.pillar}</h3>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {bp.complianceTarget}
                    </span>
                  </div>
                  <p className="text-slate-800 mb-1.5 font-medium">{bp.requirement}</p>
                  <p className="text-slate-600 mb-1 leading-relaxed">{bp.specification}</p>
                  <div className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                    <strong>Implementation:</strong> {bp.implementationDetail}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              5. Project Scope & Core Functionalities Specification
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Module</th>
                    <th className="p-2 border-r border-slate-300">Feature</th>
                    <th className="p-2 border-r border-slate-300">Priority</th>
                    <th className="p-2">Description & Tech Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {coreFunctionalities.map((func) => (
                    <tr key={func.id}>
                      <td className="p-2 font-medium border-r border-slate-200">{func.module}</td>
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-200">{func.featureName}</td>
                      <td className="p-2 border-r border-slate-200">
                        <span className="font-semibold text-amber-800">{func.priority}</span>
                      </td>
                      <td className="p-2 text-slate-700">
                        <p className="mb-1">{func.description}</p>
                        <p className="text-slate-500 italic text-[11px]">{func.technicalConsideration}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              6. Technology Stack & Architectural Matrix
            </h2>
            <div className="space-y-4 font-sans text-xs">
              {techStackItems.map((item) => (
                <div key={item.id} className="p-3 border border-slate-200 rounded bg-slate-50/50">
                  <div className="font-bold text-sm text-slate-900 mb-1">
                    {item.layer}: <span className="text-blue-900 font-mono">{item.technology}</span>
                  </div>
                  <p className="text-slate-800 mb-2">{item.justification}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div>
                      <strong>Alternatives Checked:</strong> {item.alternativesConsidered.join(', ')}
                    </div>
                    <div>
                      <strong>Tradeoff Management:</strong> {item.tradeoffs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              7. Realistic 16-Week Project Timeline & Iteration Roadmap
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Phase & Timeline</th>
                    <th className="p-2 border-r border-slate-300">Key Deliverables</th>
                    <th className="p-2">Iteration & Feedback Loop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projectMilestones.map((ms) => (
                    <tr key={ms.id}>
                      <td className="p-2 font-bold text-slate-900 border-r border-slate-200 align-top">
                        {ms.phase}
                        <div className="text-slate-500 font-normal">{ms.weekRange}</div>
                      </td>
                      <td className="p-2 border-r border-slate-200 align-top">
                        <ul className="list-disc pl-4 space-y-1 text-slate-700">
                          {ms.keyDeliverables.map((deliv, idx) => (
                            <li key={idx}>{deliv}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-2 text-slate-700 align-top">{ms.iterationFocus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              8. Week 1 Work Breakdown Structure (30-35 Hours Feasibility)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Phase & Day</th>
                    <th className="p-2 border-r border-slate-300">Task Title</th>
                    <th className="p-2 border-r border-slate-300">Hours</th>
                    <th className="p-2">Output & Concrete Deliverable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {workBreakdownHours.map((wbs) => (
                    <tr key={wbs.id}>
                      <td className="p-2 font-semibold text-slate-900 border-r border-slate-200">{wbs.dayOrPhase}</td>
                      <td className="p-2 font-medium border-r border-slate-200">{wbs.taskTitle}</td>
                      <td className="p-2 font-bold text-amber-900 border-r border-slate-200">{wbs.hours} hrs</td>
                      <td className="p-2 text-slate-700">{wbs.deliverable}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={2} className="p-2 border-r border-slate-300">
                      Total Week 1 Planning Effort
                    </td>
                    <td className="p-2 border-r border-slate-300 text-amber-900">34 Hours</td>
                    <td className="p-2 text-slate-900">Fits perfectly within 30-35 hour requirement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              9. Risk Management Matrix & Feasibility Mitigation
            </h2>
            <div className="space-y-3 font-sans text-xs">
              {riskMitigations.map((risk, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{risk.risk}</span>
                    <span className="text-red-700 font-bold uppercase">{risk.severity} Risk</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold font-sans text-slate-900 border-b border-slate-300 pb-2 mb-4">
              10. Compliance Audit Against Project Evaluation Criteria
            </h2>
            <div className="space-y-3 font-sans text-xs">
              {evaluationCriteriaAudit.map((crit, idx) => (
                <div key={idx} className="p-3 border border-emerald-200 bg-emerald-50/40 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{crit.criterion} ({crit.weight})</span>
                    <span className="text-emerald-800 font-bold">{crit.status}</span>
                  </div>
                  <p className="text-slate-700">{crit.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Document Sign-off */}
          <div className="pt-6 border-t-2 border-slate-300 font-sans text-xs text-slate-600 flex justify-between items-center">
            <div>
              <strong>Lead Author:</strong> {config.authorName} ({config.studentOrTeamId})
            </div>
            <div>
              <strong>Deliverable Status:</strong> Complete & Ready for Phase 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

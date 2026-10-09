import React from 'react';
import { Target, Compass, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { ProjectPlanConfig } from '../types/projectPlan';
import { executiveSummary } from '../data/defaultPlanData';

interface ExecutiveOverviewProps {
  config: ProjectPlanConfig;
  onExploreTimeline: () => void;
  onDownloadDocx: () => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  config,
  onExploreTimeline,
  onDownloadDocx
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <Compass className="h-4 w-4" />
            <span>Foundational Roadmap · Week 1 Deliverable</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Strategic Web Project Plan for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              {config.brandName}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-6">
            {executiveSummary.vision}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-5">
            <div>
              <span className="text-slate-500">Author:</span>{' '}
              <strong className="text-slate-200">{config.authorName}</strong>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-slate-500">Effort Budget:</span>{' '}
              <strong className="text-amber-400">30–35 Hours</strong>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-slate-500">Timeline:</span>{' '}
              <strong className="text-slate-200">{config.targetLaunchDate}</strong>
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <span className="text-slate-500">MVP Budget:</span>{' '}
              <strong className="text-slate-200">{config.estimatedBudget}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Target className="h-4 w-4 text-amber-400" />
              <span>Core Strategic Objectives</span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              {executiveSummary.strategicObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/20">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Serves as future development roadmap</span>
            <button
              onClick={onExploreTimeline}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              <span>View 16-Week Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Quantitative Benchmark Cards */}
        <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <Award className="h-4 w-4 text-sky-400" />
              <span>Measurable KPI Targets</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {executiveSummary.keyMetrics.map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-850 border border-slate-800 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-medium text-slate-400">{kpi.label}</span>
                  <div className="my-1.5 text-base sm:text-lg font-bold text-white font-mono">
                    {kpi.target}
                  </div>
                  <span className="text-[10px] text-slate-500">{kpi.baseline}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Audited weekly across agile sprints</span>
            <button
              onClick={onDownloadDocx}
              className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
            >
              <span>Export Full Plan (.docx)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Week 1 Context Callout */}
      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Estimated Completion: 30–35 Hours of Strategic Groundwork
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              This plan establishes the architecture, research foundation, and functional scope necessary for all subsequent engineering sprints.
            </p>
          </div>
        </div>
        <div className="shrink-0 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20">
          Status: Ready for Evaluation
        </div>
      </div>
    </div>
  );
};

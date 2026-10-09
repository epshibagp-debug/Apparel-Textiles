import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Milestone, ArrowRight, Layers, AlertTriangle } from 'lucide-react';
import { projectMilestones, workBreakdownHours, riskMitigations } from '../data/defaultPlanData';
import { TimelineMilestone } from '../types/projectPlan';

export const TimelineWBS: React.FC = () => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(projectMilestones[0].id);

  const selectedPhase =
    projectMilestones.find((m) => m.id === selectedPhaseId) || projectMilestones[0];

  const totalWbsHours = workBreakdownHours.reduce((acc, task) => acc + task.hours, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Calendar className="h-4 w-4" />
          <span>Key Step 3: Realistic Timeline, Milestones & Iteration Planning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          16-Week Master Roadmap & 30–35h Work Breakdown
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          A structured agile roadmap moving from Week 1 strategy through architecture, sprint iterations, launch, and continuous post-launch optimization.
        </p>
      </div>

      {/* Week 1 30-35 Hour Feasibility Focus Callout */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Week 1 Work Breakdown Structure (WBS)
              </h3>
              <p className="text-xs text-slate-400">
                Detailed time budget demonstrating full feasibility within the 30–35 hour benchmark.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-850 px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Week 1 Total:</span>
            <span className="font-bold text-amber-400 font-mono text-sm">{totalWbsHours} Hours</span>
            <span className="text-emerald-400 font-medium">✓ Fits 30–35h Target</span>
          </div>
        </div>

        {/* WBS Task Breakdown Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Timeline & Day</th>
                <th className="py-2.5 px-3 font-semibold">Strategic Task Activity</th>
                <th className="py-2.5 px-3 font-semibold text-center">Allocated Hours</th>
                <th className="py-2.5 px-3 font-semibold">Concrete Deliverable Produced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {workBreakdownHours.map((task) => (
                <tr key={task.id} className="hover:bg-slate-850/40 transition">
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap align-top">
                    {task.dayOrPhase}
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-medium align-top">
                    {task.taskTitle}
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                      Category: {task.category}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center align-top">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold font-mono">
                      {task.hours} hrs
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 leading-relaxed align-top">
                    {task.deliverable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 16-Week Phase Selector & Details */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Milestone className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            16-Week Project Lifecycle & Iteration Roadmap
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Click any phase below to inspect deliverables, iteration checkpoints, and stakeholder feedback focus.
        </p>

        {/* Phase Pills Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {projectMilestones.map((ms, index) => {
            const isSelected = ms.id === selectedPhaseId;
            return (
              <button
                key={ms.id}
                onClick={() => setSelectedPhaseId(ms.id)}
                className={`p-2.5 rounded-lg text-left transition border text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-amber-400 font-bold">
                    P{index + 1}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      ms.status === 'Completed' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                </div>
                <div className="font-semibold truncate text-[11px] text-white">
                  {ms.weekRange}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {ms.durationWeeks}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Showcase */}
        <div className="rounded-xl bg-slate-850 border border-slate-750 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-750">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                {selectedPhase.weekRange} · {selectedPhase.durationWeeks}
              </div>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {selectedPhase.phase}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                  selectedPhase.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-700/60 text-slate-300 border border-slate-600'
                }`}
              >
                {selectedPhase.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Key Deliverables in this Phase
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {selectedPhase.keyDeliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Iteration Focus & Feedback Checkpoint
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedPhase.iterationFocus}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-750/80 text-[11px] text-slate-400">
                Subsequent phases build directly upon approved deliverables of this sprint.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Management Matrix */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Risk Management & Timeline Feasibility Safeguards
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Proactive mitigations preventing schedule slippage and technological bottlenecks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {riskMitigations.map((risk, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-850 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">{risk.risk}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      risk.severity === 'High'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {risk.severity} Risk
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-amber-400">Mitigation: </strong>
                {risk.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

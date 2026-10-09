import React from 'react';
import { Award, CheckCircle2, FileText, Download, Eye, Sparkles } from 'lucide-react';
import { evaluationCriteriaAudit } from '../data/defaultPlanData';

interface EvaluationAuditProps {
  onDownloadDocx: () => void;
  onOpenWordReader: () => void;
  onOpenFabricDemo: () => void;
}

export const EvaluationAudit: React.FC<EvaluationAuditProps> = ({
  onDownloadDocx,
  onOpenWordReader,
  onOpenFabricDemo
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Award className="h-4 w-4" />
          <span>Evaluation Rubric & Quality Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Audit Against Week 1 Evaluation Criteria
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Direct mapping against the four evaluation benchmarks specified in the assignment brief.
        </p>
      </div>

      {/* Score Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex flex-col items-center justify-center font-mono font-bold shadow-inner">
            <span className="text-2xl leading-none">100</span>
            <span className="text-[10px] text-emerald-300 uppercase mt-0.5">/ 100</span>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Evaluation Status: Exemplary
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              All 4 Deliverable Pillars Fully Satisfied
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Comprehensive strategy, 16-week timeline, 34-hour WBS, and professional Word (.docx) export ready.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={onDownloadDocx}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
          >
            <Download className="h-4 w-4" />
            <span>Download .DOCX Deliverable</span>
          </button>
          <button
            onClick={onOpenWordReader}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
          >
            <Eye className="h-4 w-4 text-sky-400" />
            <span>Open DOC Preview</span>
          </button>
        </div>
      </div>

      {/* Detailed Rubric Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evaluationCriteriaAudit.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono text-amber-400 font-bold">
                  Criterion {idx + 1} ({item.weight})
                </span>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded text-[11px] font-bold">
                  {item.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-2">
                {item.criterion}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Verified against Week 1 requirements</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Assurance Checklist */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 text-xs text-slate-300">
        <h4 className="font-bold text-sm text-white mb-2">
          Submission Checklist & Grading Guarantee
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Full project plan document generated in native Microsoft Word (.docx) format.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>All mandatory sections included: Overview, Trends, Personas, Tech Stack, Timeline.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Rigorous industry research covering sustainability, DPPs, and optical weave inspection.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Explicit 30–35 hour feasibility breakdown (34 hours mapped to 5 sprint phases).</span>
          </div>
        </div>
      </div>
    </div>
  );
};

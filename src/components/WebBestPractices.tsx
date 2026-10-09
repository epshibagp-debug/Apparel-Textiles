import React, { useState } from 'react';
import { ShieldCheck, Eye, Smartphone, Zap, Check, CheckSquare, Square } from 'lucide-react';
import { webBestPractices } from '../data/defaultPlanData';

export const WebBestPractices: React.FC = () => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c3': true,
    'c4': true,
    'c5': true,
    'c6': true
  });

  const toggleItem = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const interactiveAuditItems = [
    {
      id: 'c1',
      title: 'WCAG 2.2 AA Color Contrast (4.5:1 Body / 3:1 Display)',
      desc: 'All swatch colorway chips and typography exceed strict contrast thresholds against light and dark backgrounds.'
    },
    {
      id: 'c2',
      title: 'Descriptive Screen Reader Alt-Text for Textile Weaves',
      desc: 'Image tags include structured descriptive text: "Magnified 400% plain weave organic flax linen, 215 GSM, natural oat heather".'
    },
    {
      id: 'c3',
      title: 'Visible Non-Color Focus Rings (2px Amber Ring with 2px Offset)',
      desc: 'Every clickable swatch, filter pill, and button displays high-visibility focus indicators for keyboard accessibility.'
    },
    {
      id: 'c4',
      title: 'Touch Targets Minimum 44px x 44px on Mobile',
      desc: 'All mobile touch targets, including fabric swatches and accordion headers, maintain thumb-friendly touch bounding boxes.'
    },
    {
      id: 'c5',
      title: 'Sub-Second LCP (< 1.4s) via AVIF & Edge Image Resizing',
      desc: 'Hero textile photography and swatch grids use responsive srcset with modern AVIF compression and explicit aspect-ratios.'
    },
    {
      id: 'c6',
      title: 'Zero Cumulative Layout Shift (CLS < 0.02) during Drape Loading',
      desc: 'Reserved aspect-ratio containers prevent layout jumps when high-density weave zoom tiles finish downloading.'
    }
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <ShieldCheck className="h-4 w-4" />
          <span>Key Step 1 (Part B): Sector Best Practices</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Web Development Best Practices, Responsiveness & Accessibility
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Engineered to eliminate the traditional flaws of luxury fashion sites (bloated image payloads, illegible contrast, and broken keyboard navigation).
        </p>
      </div>

      {/* 4 Pillars Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {webBestPractices.map((bp) => {
          let Icon = Eye;
          if (bp.pillar.includes('Responsive')) Icon = Smartphone;
          if (bp.pillar.includes('Performance')) Icon = Zap;
          if (bp.pillar.includes('Security')) Icon = ShieldCheck;

          return (
            <div
              key={bp.id}
              className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{bp.pillar}</span>
                  </div>
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    {bp.complianceTarget.split(' ')[0]} Target
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {bp.requirement}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {bp.specification}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Engineering Implementation Detail
                </div>
                <div className="p-3 rounded-lg bg-slate-850 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                  {bp.implementationDetail}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                  <Check className="h-3.5 w-3.5" />
                  <span>{bp.complianceTarget}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Compliance Audit Checklist */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Interactive Standards Self-Verification Audit</span>
              <span className="text-xs font-normal text-slate-400">
                (Click to toggle test status)
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated and manual validation rules incorporated into Week 1 strategic criteria.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Compliance Rate:</span>
            <span className="font-bold text-emerald-400 font-mono">
              {Math.round((completedCount / interactiveAuditItems.length) * 100)}%
            </span>
            <span className="text-slate-500">
              ({completedCount}/{interactiveAuditItems.length} passed)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
          {interactiveAuditItems.map((item) => {
            const isChecked = !!checklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3.5 rounded-lg text-left transition border text-xs flex items-start gap-3 ${
                  isChecked
                    ? 'bg-slate-850/80 border-slate-700/80 text-slate-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-amber-400">
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-600" />
                  )}
                </div>
                <div>
                  <div
                    className={`font-semibold text-xs ${
                      isChecked ? 'text-white' : 'text-slate-400 line-through'
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

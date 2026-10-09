import React from 'react';
import { Cpu, Server, Database, Cloud, Shield, Check, ArrowRight, GitFork } from 'lucide-react';
import { techStackItems } from '../data/defaultPlanData';
import { TechStackItem } from '../types/projectPlan';

export const TechStack: React.FC = () => {
  const monolithComparison = [
    {
      criterion: 'Catalog Page Load Speed (LCP)',
      headless: '< 1.4s (Edge SSR / SSG Pre-rendered)',
      monolith: '3.2s – 4.5s (Server DB queries & heavy plugins)'
    },
    {
      criterion: 'Custom Optical Weave Zoom & Drape',
      headless: 'Tailored React/WebGL component without bloat',
      monolith: 'Restricted by third-party plugin wrappers'
    },
    {
      criterion: 'Dual D2C Retail & B2B Swatch Cart',
      headless: 'Decoupled GraphQL cart schema with tiered pricing',
      monolith: 'Complex conflicts between wholesale & retail themes'
    },
    {
      criterion: 'Digital Product Passport (DPP) Extensibility',
      headless: 'Structured JSON schemas via Sanity Headless CMS',
      monolith: 'Static blog posts or custom rigid metafields'
    },
    {
      criterion: 'Omni-channel Scalability & Multi-Region',
      headless: 'Unified API for web, mobile apps, and trade show kiosks',
      monolith: 'Requires duplicate regional store instances'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Cpu className="h-4 w-4" />
          <span>Section 6: Expected Technologies & Methodologies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Technology Stack & Architectural Rationale
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          An API-first, decoupled headless commerce architecture chosen for sub-second catalog speeds, flexible fabric data schemas, and seamless multi-channel scaling.
        </p>
      </div>

      {/* Architecture Visual Diagram */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-md">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitFork className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Headless Commerce Data Flow Architecture
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Decoupled & Edge Cached</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Layer 1: Client Edge */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                Client Layer
              </div>
              <div className="font-bold text-white text-sm mb-2">Next.js 15 & React 19</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Server-Side Rendered (SSR) storefront with Tailwind CSS and responsive AVIF image picture elements.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              Vercel Global Edge CDN
            </div>
          </div>

          {/* Layer 2: API Gateway */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mb-1">
                API Layer
              </div>
              <div className="font-bold text-white text-sm mb-2">GraphQL & Edge Workers</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Unified schema gateway stitching product catalog, B2B volume pricing, and customer cart sessions.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              Sub-50ms Global TTFB
            </div>
          </div>

          {/* Layer 3: Headless Core */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">
                Commerce Engine
              </div>
              <div className="font-bold text-white text-sm mb-2">Medusa / Storefront API</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Dual cart engine handling retail garment sizing alongside B2B swatch orders and yardage calculations.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              PostgreSQL & Stripe SAQ-A
            </div>
          </div>

          {/* Layer 4: CMS & Search */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1">
                Content & Discovery
              </div>
              <div className="font-bold text-white text-sm mb-2">Sanity + Algolia</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Structured textile schemas (GSM, certifications, farm provenance) with instant typo-tolerant filtering.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              Millisecond Facet Index
            </div>
          </div>
        </div>
      </div>

      {/* Layer-by-Layer Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStackItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-400 uppercase tracking-wide">
                  {item.layer}
                </span>
                <span className="font-mono text-amber-400 text-[11px]">Production Standard</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 font-mono">
                {item.technology}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {item.justification}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-400">
                <strong className="text-slate-300 shrink-0">Evaluated Alternatives:</strong>
                <span>{item.alternativesConsidered.join(', ')}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-850 border border-slate-800 text-[11px] text-amber-300/90 leading-relaxed">
                <strong className="text-white">Tradeoff Management:</strong> {item.tradeoffs}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architectural Justification: Headless vs Monolithic Comparison */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <h3 className="text-base font-bold text-white mb-2">
          Architecture Defense: Headless Modern Web vs Legacy Monolith
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Rigorous justification explaining why our planned architecture outperforms legacy platforms (e.g., standard WooCommerce or monolithic themes) for an apparel & textile brand.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Evaluation Dimension</th>
                <th className="py-2.5 px-3 font-semibold text-amber-400">
                  Recommended Headless Stack
                </th>
                <th className="py-2.5 px-3 font-semibold text-slate-500">
                  Traditional Monolith
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {monolithComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40">
                  <td className="py-3 px-3 font-medium text-white">{row.criterion}</td>
                  <td className="py-3 px-3 text-emerald-300 font-medium">{row.headless}</td>
                  <td className="py-3 px-3 text-slate-400">{row.monolith}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Box, Layers, ShoppingCart, SlidersHorizontal, Sparkles, Network } from 'lucide-react';
import { coreFunctionalities } from '../data/defaultPlanData';
import { CoreFunctionality } from '../types/projectPlan';

export const ProjectScope: React.FC = () => {
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [moduleFilter, setModuleFilter] = useState<string>('All');

  const priorities = ['All', 'Must Have (P0)', 'Should Have (P1)', 'Nice to Have (P2)'];
  const modules = ['All', 'Cataloguing & Taxonomy', 'Product Presentation', 'Customer Interaction'];

  const filteredFeatures = coreFunctionalities.filter((func) => {
    const matchPriority = priorityFilter === 'All' || func.priority === priorityFilter;
    const matchModule = moduleFilter === 'All' || func.module === moduleFilter;
    return matchPriority && matchModule;
  });

  const sitemapNodes = [
    {
      title: 'Home / Editorial Flagship',
      children: [
        { title: 'Seasonal Fabric Showcase', meta: 'AVIF 4K Drape Hero' },
        { title: 'Material Traceability Map', meta: 'Supply Chain Provenance' },
        { title: 'Dual Path Selector', meta: 'Retail Garments or B2B Swatches' }
      ]
    },
    {
      title: 'Textile & Apparel Catalog',
      children: [
        { title: 'Multi-Facet Material Filter', meta: 'GSM, Fiber, Weave, Certifications' },
        { title: 'Product Detail Page (PDP)', meta: '400% Weave Zoom + Drape Player' },
        { title: 'Dual Order Action', meta: 'Buy Finished Piece / Order $4 Swatch' }
      ]
    },
    {
      title: 'B2B Atelier Portal',
      children: [
        { title: 'Wholesale Yardage Calculator', meta: 'Volume Discount Estimator' },
        { title: 'Direct Spec Sheet Download', meta: 'Martindale, Flame Retardancy' },
        { title: 'Sample Swatch Book Binder', meta: 'Curated 10-Swatch Designer Kit' }
      ]
    },
    {
      title: 'Account & Transparency',
      children: [
        { title: 'Digital Product Passport (DPP)', meta: 'GS1 Standards & QR Ledger' },
        { title: 'Order Tracking & Net-30 Terms', meta: 'B2B Invoicing & D2C Delivery' },
        { title: 'Care & Repair Services', meta: 'Circular Resale & Mending Portal' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Box className="h-4 w-4" />
          <span>Key Step 2 & 3: Project Scope & Core Functionalities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Product Cataloguing, Presentation & Interaction Scope
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Granular functional specifications prioritized via MoSCoW framework to establish clear boundaries for development.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
        {/* Priority Filter */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-slate-400 font-semibold px-2 shrink-0">Priority:</span>
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-2.5 py-1 rounded whitespace-nowrap transition ${
                priorityFilter === p
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Module Filter */}
        <div className="flex items-center gap-1 overflow-x-auto border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-slate-400 font-semibold px-2 shrink-0">Module:</span>
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setModuleFilter(m)}
              className={`px-2.5 py-1 rounded whitespace-nowrap transition ${
                moduleFilter === m
                  ? 'bg-sky-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeatures.map((func) => (
          <div
            key={func.id}
            className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-slate-400 uppercase tracking-wide">
                  {func.module}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    func.priority.includes('Must')
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : func.priority.includes('Should')
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                  }`}
                >
                  {func.priority}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {func.featureName}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {func.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 bg-slate-850/60 -mx-6 -mb-6 p-4 rounded-b-xl">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Technical Consideration & Architecture Hook
              </div>
              <p className="text-xs text-amber-300/90 font-mono leading-relaxed">
                {func.technicalConsideration}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Information Architecture & Sitemap Tree */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Network className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Information Architecture (IA) & Core Sitemap Blueprint
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6 max-w-3xl">
          Dual-hierarchy navigation ensuring that retail shoppers and B2B studio specifiers find relevant paths within 2 clicks from the homepage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sitemapNodes.map((node, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-slate-850 border border-slate-800 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="font-bold text-sm text-amber-400 mb-3 pb-2 border-b border-slate-750">
                  {node.title}
                </div>
                <div className="space-y-2.5">
                  {node.children.map((child, cIdx) => (
                    <div key={cIdx} className="text-xs">
                      <div className="text-slate-200 font-medium">{child.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{child.meta}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Tier 1 Node</span>
                <span className="text-emerald-400">Indexed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

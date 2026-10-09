import React, { useState } from 'react';
import { TrendingUp, Globe, CheckCircle2, Search, ExternalLink, BarChart3 } from 'lucide-react';
import { industryTrends } from '../data/defaultPlanData';
import { IndustryTrend } from '../types/projectPlan';

export const MarketTrends: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Sustainability', 'Technology', 'Consumer Behavior', 'Supply Chain'];

  const filteredTrends = industryTrends.filter((trend) => {
    const matchesCat = selectedCategory === 'All' || trend.category === selectedCategory;
    const matchesSearch =
      trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.strategicImplication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const competitorBenchmarks = [
    {
      brand: 'Patagonia',
      strength: 'Worn Wear circular resale, 100% organic cotton tracing, Footprint Chronicles supply chain transparency.',
      gapIdentified: 'Lacks tactile high-resolution yarn magnification; B2B wholesale swatch sampling is offline.',
      ourAdvantage: 'Direct B2B swatch sample ordering integrated with real-time bolt yardage calculations.'
    },
    {
      brand: 'Reformation',
      strength: 'RefScale environmental metrics (carbon, water, waste) displayed transparently on every product page.',
      gapIdentified: 'No deep fiber weave inspection; predominantly fashion-trend driven with limited technical data.',
      ourAdvantage: 'Full Digital Product Passport (DPP) with precise GSM, Martindale rub count, and GOTS certificates.'
    },
    {
      brand: 'Loro Piana',
      strength: 'Superlative luxury cashmere/vicuña sensory storytelling and artisanal provenance prestige.',
      gapIdentified: 'Slow desktop loads (>3.5s LCP), zero accessible focus states, gated wholesale ordering.',
      ourAdvantage: 'Sub-second headless performance (<1.4s LCP) paired with 100% WCAG 2.2 AA accessibility.'
    },
    {
      brand: 'Spoonflower',
      strength: 'Massive catalog of custom on-demand digital textile printing with swatch samples.',
      gapIdentified: 'Crowded interface, low luxury aesthetic, limited focus on regenerative natural luxury fibers.',
      ourAdvantage: 'Curated organic luxury fiber palette with optical 400% weave zoom and seamless sample cart.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <TrendingUp className="h-4 w-4" />
            <span>Key Step 1: Research & Industry Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Apparel & Textile Industry Trends (2026–2027)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Empirical data synthesized from global textile industry reports, circularity mandates, and luxury e-commerce benchmarks.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search trends or impact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-850 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-slate-400 uppercase tracking-wide">
                  {trend.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    trend.impact === 'Critical'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {trend.impact} Impact
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {trend.title}
              </h3>

              {/* Statistic Callout */}
              <div className="my-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 font-medium">
                <strong className="text-white">Industry Metric:</strong> {trend.statistic}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {trend.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 bg-slate-850/50 -mx-6 -mb-6 p-4 rounded-b-xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                Strategic Platform Implication
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {trend.strategicImplication}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Competitive Benchmarking Section */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Competitive Benchmarking & Strategic Differentiation
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6 max-w-3xl">
          An audit of leading apparel and textile platforms informed our strategy by pinpointing industry gaps in tactile inspection and B2B/D2C hybrid cart mechanics.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Benchmark Entity</th>
                <th className="py-2.5 px-3 font-semibold">Key Industry Strengths</th>
                <th className="py-2.5 px-3 font-semibold">Identified Web Limitations</th>
                <th className="py-2.5 px-3 font-semibold text-amber-400">Our Strategic Edge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {competitorBenchmarks.map((comp, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition">
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap align-top">
                    {comp.brand}
                  </td>
                  <td className="py-3 px-3 text-slate-300 align-top">{comp.strength}</td>
                  <td className="py-3 px-3 text-slate-400 align-top">{comp.gapIdentified}</td>
                  <td className="py-3 px-3 text-amber-300 font-medium align-top">
                    {comp.ourAdvantage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

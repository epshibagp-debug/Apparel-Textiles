import React, { useState } from 'react';
import { Users, User, Briefcase, ShoppingBag, CheckCircle, AlertCircle, Quote } from 'lucide-react';
import { buyerPersonas } from '../data/defaultPlanData';
import { Persona } from '../types/projectPlan';

export const AudiencePersonas: React.FC = () => {
  const [activePersonaId, setActivePersonaId] = useState<string>(buyerPersonas[0].id);

  const activePersona = buyerPersonas.find((p) => p.id === activePersonaId) || buyerPersonas[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Users className="h-4 w-4" />
          <span>Key Step 2: Target Audience & Buyer Profiles</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Target Audience & Buyer Persona Profiles
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          A dual-funnel strategy designed to capture high-value individual apparel purchasers (D2C) and high-volume studio designers (B2B).
        </p>
      </div>

      {/* Persona Toggle Segmented Control */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-md">
        {buyerPersonas.map((persona) => {
          const isSelected = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              onClick={() => setActivePersonaId(persona.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {persona.segment === 'D2C' ? (
                <ShoppingBag className="h-3.5 w-3.5" />
              ) : (
                <Briefcase className="h-3.5 w-3.5" />
              )}
              <span>
                {persona.name} ({persona.segment})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Persona Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {/* Top Card Hero Banner */}
        <div className="bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 p-6 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-lg font-bold font-mono shadow-inner">
              {activePersona.avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">
                <span>{activePersona.segment} Segment</span>
                <span aria-hidden="true">·</span>
                <span>Primary User Cohort</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activePersona.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {activePersona.role}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs w-full md:w-auto">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Age</span>
              <span className="font-semibold text-white">{activePersona.demographics.age}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Location</span>
              <span className="font-semibold text-white">{activePersona.demographics.location}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Tech Fluency</span>
              <span className="font-semibold text-white">{activePersona.demographics.techProficiency.split(' ')[0]}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Spend / Budget</span>
              <span className="font-semibold text-amber-300">{activePersona.demographics.incomeOrBudget}</span>
            </div>
          </div>
        </div>

        {/* Persona Quote Banner */}
        <div className="p-4 sm:px-8 bg-amber-500/5 border-b border-amber-500/10 flex items-center gap-3 text-xs sm:text-sm italic text-amber-200/90 font-serif">
          <Quote className="h-5 w-5 text-amber-400 shrink-0" />
          <p>{activePersona.quote}</p>
        </div>

        {/* Detailed 3-Column Breakdown */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Goals & Motivations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Jobs-to-be-Done & Goals</span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              {activePersona.goals.map((goal, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 leading-relaxed">
                  {goal}
                </div>
              ))}
            </div>
          </div>

          {/* Friction & Pain Points */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              <span>Friction Points & Frustrations</span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              {activePersona.painPoints.map((pain, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-850 border border-slate-800 leading-relaxed text-rose-200/90">
                  {pain}
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Feature Requirements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <User className="h-4 w-4 text-amber-400" />
              <span>Essential Website Features</span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              {activePersona.keyFeaturesNeeded.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 leading-relaxed text-amber-200 font-medium">
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

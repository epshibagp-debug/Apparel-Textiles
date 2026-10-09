import React from 'react';
import {
  FileText,
  Download,
  Eye,
  Sliders,
  Copy,
  Check,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { ProjectPlanConfig } from '../types/projectPlan';

interface HeaderProps {
  config: ProjectPlanConfig;
  onDownloadDocx: () => void;
  onOpenWordReader: () => void;
  onOpenCustomize: () => void;
  onOpenFabricDemo: () => void;
  onCopyText: () => void;
  isDownloading: boolean;
  copied: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onDownloadDocx,
  onOpenWordReader,
  onOpenCustomize,
  onOpenFabricDemo,
  onCopyText,
  isDownloading,
  copied,
  activeTab,
  setActiveTab
}) => {
  const tabs = [
    { id: 'overview', label: '1. Executive Overview' },
    { id: 'trends', label: '2. Market Research' },
    { id: 'personas', label: '3. Personas & Audience' },
    { id: 'standards', label: '4. Web Best Practices & A11y' },
    { id: 'scope', label: '5. Scope & Cataloguing' },
    { id: 'techstack', label: '6. Tech Stack' },
    { id: 'timeline', label: '7. 16-Wk Timeline & 34h WBS' },
    { id: 'audit', label: '8. Evaluation Audit' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner with Brand and Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase">
              <span>Week 1 Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>Web Project Planning & Strategy</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {config.brandName}
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                ({config.nicheFocus})
              </span>
            </h1>
          </div>
        </div>

        {/* Global Primary Action Controls */}
        <div className="flex items-center flex-wrap gap-2 justify-end w-full md:w-auto">
          {/* Interactive Drape Simulator Preview */}
          <button
            onClick={onOpenFabricDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Interactive Weave & Drape Demo"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Inspect Weave Prototype</span>
            <span className="sm:hidden">Prototype</span>
          </button>

          {/* Customize Plan Metadata */}
          <button
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Customize Project Details"
          >
            <Sliders className="h-3.5 w-3.5 text-slate-400" />
            <span>Customize</span>
          </button>

          {/* Full Word Document Layout Preview */}
          <button
            onClick={onOpenWordReader}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Preview formatted Word document page layout"
          >
            <Eye className="h-3.5 w-3.5 text-sky-400" />
            <span>DOC Preview</span>
          </button>

          {/* Copy Plain Text */}
          <button
            onClick={onCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Copy entire document text to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          {/* Primary Download DOCX Action */}
          <button
            onClick={onDownloadDocx}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 transition disabled:opacity-50"
            title="Generate and download genuine Microsoft Word (.docx) file"
          >
            <Download className="h-4 w-4" />
            <span>{isDownloading ? 'Generating DOCX...' : 'Download DOC (.docx)'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="bg-slate-950/70 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 py-1 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 font-medium rounded whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

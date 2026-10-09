import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Play, Pause, FileDown, ShoppingBag, Eye, Layers } from 'lucide-react';

interface FabricSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TextileSample {
  id: string;
  name: string;
  composition: string;
  weightGsm: number;
  weaveType: string;
  certification: string;
  colorName: string;
  colorHex: string;
  patternCss: string;
  priceGarment: number;
  swatchPrice: number;
  textureScale: number;
}

export const FabricSimulatorModal: React.FC<FabricSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const fabrics: TextileSample[] = [
    {
      id: 'linen-1',
      name: 'Organic Belgian Heritage Linen',
      composition: '100% Certified European Flax',
      weightGsm: 215,
      weaveType: 'Plain Weave (Warp 48 / Weft 44)',
      certification: 'GOTS & Masters of Linen Certified',
      colorName: 'Raw Oatmeal Sand',
      colorHex: '#d8cdb8',
      patternCss:
        'radial-gradient(#ab9b82 1px, transparent 1px), radial-gradient(#8c7d66 1px, #e4dacb 1px)',
      priceGarment: 195,
      swatchPrice: 4.0,
      textureScale: 6
    },
    {
      id: 'wool-2',
      name: 'Regenerative Merino Wool Twill',
      composition: '100% ZQ-Certified Saxon Merino',
      weightGsm: 290,
      weaveType: '2/2 Twill Weave with S-Twist Yarn',
      certification: 'OEKO-TEX Standard 100 & RWS',
      colorName: 'Charcoal Espresso Heather',
      colorHex: '#2b2927',
      patternCss:
        'repeating-linear-gradient(45deg, #1f1d1b, #1f1d1b 3px, #3d3935 3px, #3d3935 6px)',
      priceGarment: 280,
      swatchPrice: 4.5,
      textureScale: 5
    },
    {
      id: 'silk-3',
      name: 'Wild Mulberry Slub Silk',
      composition: '100% Peace (Ahimsa) Organic Silk',
      weightGsm: 110,
      weaveType: 'Textured Slub Weave',
      certification: 'Fair-Trade Certified Dyehouse',
      colorName: 'Tuscan Terracotta',
      colorHex: '#b45b41',
      patternCss:
        'repeating-linear-gradient(90deg, #9a4830 0px, #b45b41 2px, #c96e53 4px, #9a4830 6px)',
      priceGarment: 240,
      swatchPrice: 5.0,
      textureScale: 4
    },
    {
      id: 'denim-4',
      name: 'Circular Selvedge Cotton-Hemp',
      composition: '70% Recycled Cotton, 30% True Hemp',
      weightGsm: 380,
      weaveType: '3/1 Right-Hand Shuttle Loom Selvedge',
      certification: 'Cradle to Cradle Gold Certified',
      colorName: 'Natural Indigo Wash',
      colorHex: '#22384d',
      patternCss:
        'repeating-linear-gradient(60deg, #1a2c3d, #1a2c3d 4px, #2f4e6b 4px, #2f4e6b 8px)',
      priceGarment: 220,
      swatchPrice: 4.0,
      textureScale: 7
    }
  ];

  const [selectedFabric, setSelectedFabric] = useState<TextileSample>(fabrics[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(200); // 100% - 400%
  const [isDraping, setIsDraping] = useState<boolean>(true);
  const [cartToast, setCartToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setCartToast(msg);
    setTimeout(() => setCartToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Interactive Weave Zoom & Dual-Funnel PDP Prototype
              </h2>
              <p className="text-[11px] text-slate-400">
                Live simulation of Core Functional Requirement #2 & #3 from Week 1 Plan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Simulator Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Canvas: Interactive Weave & Drape Magnifier */}
          <div className="md:col-span-7 flex flex-col">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center shadow-inner group">
              {/* Dynamic Texture Swatch with Interactive Zoom and Wave Animation */}
              <div
                style={{
                  backgroundColor: selectedFabric.colorHex,
                  backgroundImage: selectedFabric.patternCss,
                  backgroundSize: `${selectedFabric.textureScale * (zoomLevel / 100)}px ${
                    selectedFabric.textureScale * (zoomLevel / 100)
                  }px`,
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'center center'
                }}
                className={`w-full h-full transition-all duration-300 ${
                  isDraping ? 'animate-pulse' : ''
                }`}
              />

              {/* Grid overlay for microscopic yarn inspection */}
              {zoomLevel >= 300 && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              )}

              {/* Viewport Overlay Info Badge */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono border border-slate-700 text-slate-300">
                Magnification: <span className="text-amber-400 font-bold">{zoomLevel}%</span>
              </div>

              {/* Drape Status */}
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] border border-slate-700 text-slate-300 flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isDraping ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                  }`}
                />
                <span>{isDraping ? 'Fluid Drape Active' : 'Static Tension'}</span>
              </div>

              {/* Bottom In-Canvas Controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/90 backdrop-blur-md p-2 rounded-lg border border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(100, prev - 50))}
                    disabled={zoomLevel <= 100}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-slate-300 text-[11px]">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(400, prev + 50))}
                    disabled={zoomLevel >= 400}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => setIsDraping(!isDraping)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                >
                  {isDraping ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isDraping ? 'Pause Drape' : 'Simulate Drape Motion'}</span>
                </button>
              </div>
            </div>

            {/* Microscopic Inspection Tip */}
            <p className="mt-2 text-[11px] text-slate-400 italic">
              Notice: At &gt;300% zoom, the warp and weft interlace grid activates, allowing specifiers to inspect yarn twist and density before ordering samples.
            </p>
          </div>

          {/* Right Column: Spec Sheet & Dual Action Funnel */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Textile Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Fabric Grade:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {fabrics.map((f) => {
                    const isSelected = f.id === selectedFabric.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFabric(f)}
                        className={`p-2 rounded-md text-left transition border text-xs flex items-center gap-2 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white font-medium shadow-sm'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0 border border-white/20"
                          style={{ backgroundColor: f.colorHex }}
                        />
                        <span className="truncate">{f.name.split(' ')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Spec Box */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3.5 text-xs space-y-2">
                <div className="font-bold text-white text-sm">{selectedFabric.name}</div>
                <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-slate-300 border-t border-slate-700/60 pt-2">
                  <div>
                    <span className="text-slate-400">Weight:</span> {selectedFabric.weightGsm} GSM
                  </div>
                  <div>
                    <span className="text-slate-400">Color:</span> {selectedFabric.colorName}
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Weave:</span> {selectedFabric.weaveType}
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Material:</span> {selectedFabric.composition}
                  </div>
                  <div className="col-span-2 text-emerald-400 font-medium">
                    ✓ {selectedFabric.certification}
                  </div>
                </div>
              </div>

              {/* Toast Feedback */}
              {cartToast && (
                <div className="p-2.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs text-center font-medium animate-in fade-in">
                  {cartToast}
                </div>
              )}
            </div>

            {/* Dual Funnel Actions */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800">
              {/* Path 1: D2C Retail Garment Purchase */}
              <button
                onClick={() =>
                  triggerToast(`Added finished ${selectedFabric.name} garment to Bag ($${selectedFabric.priceGarment})`)
                }
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add Tailored Garment to Bag — ${selectedFabric.priceGarment}</span>
              </button>

              {/* Path 2: B2B Physical Swatch Sample Order */}
              <button
                onClick={() =>
                  triggerToast(`Added physical 10cm x 10cm Swatch Card to sample pack ($${selectedFabric.swatchPrice.toFixed(2)})`)
                }
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                <Layers className="h-4 w-4 text-amber-400" />
                <span>Order Physical Swatch Card — ${selectedFabric.swatchPrice.toFixed(2)}</span>
              </button>

              {/* Path 3: B2B Spec Sheet Download */}
              <button
                onClick={() =>
                  triggerToast(`Downloading PDF Technical Spec Sheet for ${selectedFabric.name}...`)
                }
                className="w-full py-1.5 px-3 rounded text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition"
              >
                <FileDown className="h-3.5 w-3.5" />
                <span>Download Spec Sheet & Fire Rating (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Compass, ShieldCheck, Check, Clock, X, Filter, 
  Share2, Eye, Calendar, Sparkles, Scale, Info, CheckCircle2 
} from 'lucide-react';
import { PlotUnit } from '@/types';
import { formatLakhs, formatCent, formatSqFt } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface LivePlotExplorerProps {
  projectTitle?: string;
  embedded?: boolean;
}

export default function LivePlotExplorer({ 
  projectTitle = "Tech Valley — Saravanampatti (Near CHIL SEZ)", 
  embedded = false 
}: LivePlotExplorerProps) {
  const { plots, reservePlot, openSiteVisitModal, showToast } = useApp();

  const [selectedPlotId, setSelectedPlotId] = useState<string>('tv-p14');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');
  const [sizeFilter, setSizeFilter] = useState<'all' | 'under3' | '3to4' | 'above4'>('all');
  const [facingFilter, setFacingFilter] = useState<'all' | 'North' | 'East' | 'West' | 'Corner Plot'>('all');
  const [comparePlotIds, setComparePlotIds] = useState<string[]>([]);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  // Selected plot object
  const selectedPlot = useMemo(() => {
    return plots.find((p) => p.id === selectedPlotId) || plots[0];
  }, [plots, selectedPlotId]);

  // Filtered plots
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      if (statusFilter !== 'all' && plot.status !== statusFilter) return false;
      if (facingFilter !== 'all' && plot.facing !== facingFilter) return false;
      if (sizeFilter === 'under3' && plot.areaCents >= 3.0) return false;
      if (sizeFilter === '3to4' && (plot.areaCents < 3.0 || plot.areaCents > 4.0)) return false;
      if (sizeFilter === 'above4' && plot.areaCents <= 4.0) return false;
      return true;
    });
  }, [plots, statusFilter, sizeFilter, facingFilter]);

  // Statistics
  const availableCount = plots.filter((p) => p.status === 'available').length;
  const reservedCount = plots.filter((p) => p.status === 'reserved').length;
  const soldCount = plots.filter((p) => p.status === 'sold').length;

  const handlePlotClick = (plot: PlotUnit) => {
    setSelectedPlotId(plot.id);
  };

  const handleSharePlot = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/plot-explorer?plot=${selectedPlot.plotNumber}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Shareable Plot Blueprint URL copied! 📋', 'success');
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim()) {
      showToast('Please enter your name and phone number', 'error');
      return;
    }
    const success = reservePlot(selectedPlot.id, buyerName, buyerPhone);
    if (success) {
      setIsReserveModalOpen(false);
      setBuyerName('');
      setBuyerPhone('');
    }
  };

  // Helper color for status
  const getPlotStyling = (plot: PlotUnit) => {
    const isSelected = plot.id === selectedPlotId;
    let base = '';
    
    if (plot.status === 'available') {
      base = isSelected 
        ? 'fill-brand-electric stroke-brand-navy stroke-[3px] text-white shadow-sm' 
        : 'fill-white stroke-brand-electric stroke-[1.5px] hover:fill-brand-ice text-brand-navy cursor-pointer';
    } else if (plot.status === 'reserved') {
      base = isSelected
        ? 'fill-amber-500 stroke-brand-navy stroke-[3px] text-white'
        : 'fill-amber-50 stroke-amber-400 stroke-[1.5px] hover:fill-amber-100 text-amber-900 cursor-pointer';
    } else {
      // Sold
      base = isSelected
        ? 'fill-brand-navy stroke-brand-steel stroke-[3px] text-white'
        : 'fill-brand-divider stroke-brand-border stroke-[1px] text-brand-subtext cursor-pointer';
    }

    return base;
  };

  return (
    <div className={`w-full ${embedded ? 'py-2' : 'py-6'} text-left`}>
      
      {/* Title & Stats Bar */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-subtle border border-brand-border mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-brand-divider">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-brand-ice text-brand-electric rounded text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-foliage" />
              CAD Site Layout Planning Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
              Tech Valley — Master Plotted Layout
            </h2>
            <p className="text-xs text-brand-subtext mt-0.5">
              Select any plot on the architectural blueprint to inspect Vedic orientations, dimensions, and reserve for 24-hr review.
            </p>
          </div>

          {/* Status Legend Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setStatusFilter(statusFilter === 'available' ? 'all' : 'available')}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all ${
                statusFilter === 'available' 
                  ? 'bg-brand-botanical text-brand-darkgreen border-brand-foliage font-bold' 
                  : 'bg-brand-cloudwhite border-brand-border text-brand-text hover:bg-brand-ice'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-brand-foliage inline-block" />
              <span>Available ({availableCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'reserved' ? 'all' : 'reserved')}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all ${
                statusFilter === 'reserved'
                  ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                  : 'bg-brand-cloudwhite border-brand-border text-brand-text hover:bg-amber-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
              <span>Reserved ({reservedCount})</span>
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'sold' ? 'all' : 'sold')}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all ${
                statusFilter === 'sold'
                  ? 'bg-brand-navy text-white border-brand-navy font-bold'
                  : 'bg-brand-cloudwhite border-brand-border text-brand-subtext hover:bg-brand-divider'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-brand-subtext inline-block" />
              <span>Sold ({soldCount})</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-brand-subtext uppercase mb-1">Facing / Vaastu</label>
            <select
              value={facingFilter}
              onChange={(e) => setFacingFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg border border-brand-border bg-brand-cloudwhite font-semibold text-brand-navy focus:outline-none focus:border-brand-electric"
            >
              <option value="all">All Facings</option>
              <option value="North">North Facing</option>
              <option value="East">East Facing (Sunlight)</option>
              <option value="West">West Facing</option>
              <option value="Corner Plot">Corner Plots Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-subtext uppercase mb-1">Plot Area</label>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value as any)}
              className="w-full px-3 py-1.5 rounded-lg border border-brand-border bg-brand-cloudwhite font-semibold text-brand-navy focus:outline-none focus:border-brand-electric"
            >
              <option value="all">All Sizes (2.75 - 5.78 Cents)</option>
              <option value="under3">Under 3.0 Cents</option>
              <option value="3to4">3.0 - 4.0 Cents</option>
              <option value="above4">Above 4.0 Cents (Executive)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setStatusFilter('all');
                setSizeFilter('all');
                setFacingFilter('all');
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-brand-border hover:border-brand-electric text-brand-subtext hover:text-brand-electric font-semibold transition-colors"
            >
              Reset Filters ({filteredPlots.length} Plots Matching)
            </button>
          </div>
        </div>
      </div>

      {/* Blueprint Grid & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Blueprint Canvas */}
        <div className="lg:col-span-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-subtle border border-brand-border overflow-hidden blueprint-grid">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-divider text-xs">
            <span className="font-bold text-brand-navy flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-electric" />
              North Orientation Blueprint • 40 FT & 33 FT Boulevards
            </span>
            <span className="text-[11px] text-brand-subtext hidden sm:inline font-mono">
              SCALE: 1:100 (DTCP APPROVED)
            </span>
          </div>

          <div className="relative w-full overflow-x-auto bg-brand-cloudwhite/80 rounded-xl border border-brand-border p-2 sm:p-4">
            <svg
              viewBox="0 0 840 520"
              className="w-full h-auto min-w-[700px] select-none"
            >
              {/* Grand Entrance Arch */}
              <rect x="20" y="220" width="80" height="80" rx="4" fill="#102B50" />
              <text x="60" y="255" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">ENTRANCE</text>
              <text x="60" y="275" fill="#39A8F4" fontSize="9" fontWeight="bold" textAnchor="middle">ARCH</text>

              {/* 40 FT Main Road Highway */}
              <rect x="100" y="235" width="700" height="50" fill="#EAF0F6" />
              <line x1="100" y1="260" x2="800" y2="260" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 6" />
              <text x="450" y="265" fill="#65758B" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                40 FT MAIN BOULEVARD ROAD (BLACKTOP ASPHALT)
              </text>

              {/* 33 FT Cross Road */}
              <rect x="360" y="40" width="50" height="440" fill="#EAF0F6" />
              <line x1="385" y1="40" x2="385" y2="480" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 6" />

              {/* Central Park Reserve */}
              <rect x="425" y="40" width="130" height="70" rx="4" fill="#DCEFE3" stroke="#2D8A57" strokeWidth="1.5" />
              <text x="490" y="75" fill="#176B48" fontSize="11" fontWeight="bold" textAnchor="middle">CENTRAL PARK</text>
              <text x="490" y="92" fill="#2D8A57" fontSize="9" textAnchor="middle">& Children Play Area</text>

              {/* Top Row: Plots 01 to 06 */}
              {plots.slice(0, 6).map((plot, i) => {
                const x = 120 + i * 110;
                const y = 140;
                const width = 95;
                const height = 80;
                const isSelected = plot.id === selectedPlotId;
                const isMatching = filteredPlots.some((fp) => fp.id === plot.id);

                return (
                  <g 
                    key={plot.id} 
                    onClick={() => handlePlotClick(plot)}
                    className="cursor-pointer"
                    opacity={isMatching ? 1 : 0.2}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="4"
                      className={getPlotStyling(plot)}
                    />
                    <text
                      x={x + width / 2}
                      y={y + 30}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'sold' ? '#65758B' : '#102B50'}
                    >
                      #{plot.plotNumber}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 48}
                      fontSize="10"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#65758B'}
                    >
                      {plot.areaCents} Cts
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 65}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'available' ? '#087FE8' : plot.status === 'reserved' ? '#D97706' : '#94A3B8'}
                    >
                      {plot.status.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Middle Row Plots */}
              {plots.slice(6, 12).map((plot, i) => {
                const x = 120 + i * 110;
                const y = 40;
                if (i >= 3 && i <= 4) return null;
                const width = 95;
                const height = 85;
                const isSelected = plot.id === selectedPlotId;
                const isMatching = filteredPlots.some((fp) => fp.id === plot.id);

                return (
                  <g 
                    key={plot.id} 
                    onClick={() => handlePlotClick(plot)}
                    className="cursor-pointer"
                    opacity={isMatching ? 1 : 0.2}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="4"
                      className={getPlotStyling(plot)}
                    />
                    <text
                      x={x + width / 2}
                      y={y + 32}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'sold' ? '#65758B' : '#102B50'}
                    >
                      #{plot.plotNumber}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 50}
                      fontSize="10"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#65758B'}
                    >
                      {plot.areaCents} Cts
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 68}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'available' ? '#087FE8' : plot.status === 'reserved' ? '#D97706' : '#94A3B8'}
                    >
                      {plot.status.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* South Row Plots */}
              {plots.slice(12, 18).map((plot, i) => {
                const x = 120 + i * 110;
                const y = 300;
                const width = 95;
                const height = 85;
                const isSelected = plot.id === selectedPlotId;
                const isMatching = filteredPlots.some((fp) => fp.id === plot.id);

                return (
                  <g 
                    key={plot.id} 
                    onClick={() => handlePlotClick(plot)}
                    className="cursor-pointer"
                    opacity={isMatching ? 1 : 0.2}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="4"
                      className={getPlotStyling(plot)}
                    />
                    <text
                      x={x + width / 2}
                      y={y + 32}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'sold' ? '#65758B' : '#102B50'}
                    >
                      #{plot.plotNumber}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 50}
                      fontSize="10"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#65758B'}
                    >
                      {plot.areaCents} Cts
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 68}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'available' ? '#087FE8' : plot.status === 'reserved' ? '#D97706' : '#94A3B8'}
                    >
                      {plot.status.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Row 4 Plots */}
              {plots.slice(18, 24).map((plot, i) => {
                const x = 120 + i * 110;
                const y = 400;
                const width = 95;
                const height = 85;
                const isSelected = plot.id === selectedPlotId;
                const isMatching = filteredPlots.some((fp) => fp.id === plot.id);

                return (
                  <g 
                    key={plot.id} 
                    onClick={() => handlePlotClick(plot)}
                    className="cursor-pointer"
                    opacity={isMatching ? 1 : 0.2}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx="4"
                      className={getPlotStyling(plot)}
                    />
                    <text
                      x={x + width / 2}
                      y={y + 32}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'sold' ? '#65758B' : '#102B50'}
                    >
                      #{plot.plotNumber}
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 50}
                      fontSize="10"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#65758B'}
                    >
                      {plot.areaCents} Cts
                    </text>
                    <text
                      x={x + width / 2}
                      y={y + 68}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : plot.status === 'available' ? '#087FE8' : plot.status === 'reserved' ? '#D97706' : '#94A3B8'}
                    >
                      {plot.status.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-brand-subtext">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-foliage" />
              DTCP Sanctioned Layout #118/2023 • All Demarcations Survey-Verified
            </span>
            <button
              onClick={() => showToast('Opening high-resolution master blueprint...', 'info')}
              className="text-brand-electric font-semibold hover:underline"
            >
              Blueprint PDF
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Inspector Card */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-subtle border border-brand-border">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-electric tracking-widest">
                  Plot Technical Dossier
                </span>
                <h3 className="text-2xl font-black text-brand-navy">
                  Plot #{selectedPlot.plotNumber}
                </h3>
                <p className="text-[11px] text-brand-subtext mt-0.5">
                  Tech Valley, Saravanampatti (Near CHIL SEZ)
                </p>
              </div>

              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded ${
                selectedPlot.status === 'available'
                  ? 'bg-brand-botanical text-brand-darkgreen border border-brand-foliage/30'
                  : selectedPlot.status === 'reserved'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-brand-divider text-brand-subtext'
              }`}>
                {selectedPlot.status.toUpperCase()}
              </span>
            </div>

            {/* Price Box */}
            <div className="p-3.5 rounded-xl bg-brand-cloudwhite border border-brand-border">
              <span className="text-[10px] uppercase tracking-wider text-brand-subtext font-bold block">
                Total Acquisition Cost
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-black text-brand-navy">
                  {formatLakhs(selectedPlot.totalPrice)}
                </span>
                <span className="text-xs text-brand-subtext font-medium">
                  (₹{selectedPlot.pricePerCent.toFixed(2)} L / Cent)
                </span>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-brand-cloudwhite border border-brand-divider">
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Area</span>
                <strong className="text-xs font-bold text-brand-navy">{selectedPlot.areaCents} Cts</strong>
                <span className="text-[9px] text-brand-subtext block">{selectedPlot.areaSqFt} Sq.Ft</span>
              </div>

              <div className="p-2.5 rounded-lg bg-brand-cloudwhite border border-brand-divider">
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Dimensions</span>
                <strong className="text-xs font-bold text-brand-navy">{selectedPlot.dimensions} FT</strong>
              </div>

              <div className="p-2.5 rounded-lg bg-brand-cloudwhite border border-brand-divider">
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Facing</span>
                <strong className="text-xs font-bold text-brand-navy flex items-center gap-1">
                  <Compass className="w-3 h-3 text-brand-electric" />
                  {selectedPlot.facing}
                </strong>
              </div>

              <div className="p-2.5 rounded-lg bg-brand-cloudwhite border border-brand-divider">
                <span className="text-[9px] uppercase font-bold text-brand-subtext block">Road Width</span>
                <strong className="text-xs font-bold text-brand-navy">{selectedPlot.roadWidth}</strong>
              </div>
            </div>

            {selectedPlot.cornerPlot && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Prime Corner Plot with dual road frontage</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-brand-divider mt-4">
            {selectedPlot.status === 'available' ? (
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="w-full py-2.5 px-4 bg-brand-electric hover:bg-brand-royal text-white font-bold rounded-lg text-xs transition-colors shadow-subtle flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve Plot #{selectedPlot.plotNumber}</span>
              </button>
            ) : selectedPlot.status === 'reserved' ? (
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-lg text-xs text-center font-medium">
                Plot #{selectedPlot.plotNumber} is currently under 24-hr token hold.
              </div>
            ) : (
              <div className="p-2.5 bg-brand-cloudwhite text-brand-subtext rounded-lg text-xs text-center font-medium">
                Plot #{selectedPlot.plotNumber} is sold and registered.
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => openSiteVisitModal('Tech Valley', `Plot #${selectedPlot.plotNumber}`)}
                className="py-2 px-3 rounded-lg border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Site Tour</span>
              </button>

              <button
                onClick={handleSharePlot}
                className="py-2 px-3 rounded-lg border border-brand-border text-brand-text hover:border-brand-navy font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <Share2 className="w-3 h-3 text-brand-subtext" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Reservation Dialog Modal */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-border relative text-left">
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-brand-cloudwhite text-brand-navy flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-brand-navy mb-1">
              Hold Plot #{selectedPlot.plotNumber} for 24 Hours
            </h3>
            <p className="text-xs text-brand-subtext mb-3">
              Zero payment required. Our coordinator will verify legal documentation with you.
            </p>

            <form onSubmit={handleConfirmReservation} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-brand-navy mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandran"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:border-brand-electric"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-brand-navy mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98422 12345"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:border-brand-electric"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-electric hover:bg-brand-royal text-white font-bold rounded-lg text-xs transition-colors shadow-subtle"
                >
                  Confirm Free 24-Hr Hold
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

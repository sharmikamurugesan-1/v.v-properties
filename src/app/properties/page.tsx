'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, MapPin, Building2, SlidersHorizontal, 
  RotateCcw, Sparkles, ShieldCheck 
} from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import { PROPERTIES } from '@/data/mockData';

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedFacing, setSelectedFacing] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches = 
          prop.title.toLowerCase().includes(term) ||
          prop.projectTitle.toLowerCase().includes(term) ||
          prop.location.toLowerCase().includes(term) ||
          prop.corridor.toLowerCase().includes(term);
        if (!matches) return false;
      }

      // Location
      if (selectedLocation !== 'all' && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Type
      if (selectedType !== 'all' && prop.type !== selectedType) {
        return false;
      }

      // Facing
      if (selectedFacing !== 'all' && prop.facing !== selectedFacing) {
        return false;
      }

      // Budget
      if (selectedBudget === 'under20' && prop.totalPrice > 25) return false;
      if (selectedBudget === '20to50' && (prop.totalPrice < 20 || prop.totalPrice > 55)) return false;
      if (selectedBudget === 'above50' && prop.totalPrice < 50) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.totalPrice - b.totalPrice;
      if (sortBy === 'price-high') return b.totalPrice - a.totalPrice;
      if (sortBy === 'area-high') return b.areaCents - a.areaCents;
      return 0;
    });
  }, [searchTerm, selectedLocation, selectedType, selectedBudget, selectedFacing, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedType('all');
    setSelectedBudget('all');
    setSelectedFacing('all');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-20 bg-brand-warmwhite min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-secondary mb-2">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <span className="text-brand-navy font-semibold">Properties</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary block mb-1">
                COIMBATORE LAND PORTFOLIO
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight">
                Verified Land & Residential Plots
              </h1>
              <p className="text-sm text-brand-secondary mt-2 max-w-2xl leading-relaxed">
                Explore verified DTCP & RERA sanctioned residential land and villas across the Saravanampatti IT corridor and Kovilpalayam growth belt.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1.5 bg-brand-foliage/10 text-brand-darkgreen font-bold rounded-md border border-brand-foliage/20 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-foliage" />
                Verified Clear Title Scrutiny
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-brand-border mb-10 space-y-4">
          
          {/* Search bar input */}
          <div className="relative">
            <Search className="w-5 h-5 text-brand-secondary absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, highway, or landmark (e.g. CHIL SEZ, Kovilpalayam, Tech Valley)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-brand-border bg-brand-cloudwhite text-sm text-brand-navy focus:outline-none focus:border-brand-primary font-medium transition-colors"
            />
          </div>

          {/* Detailed Filters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            
            <div>
              <label className="block text-[11px] font-mono font-bold text-brand-secondary uppercase mb-1">Corridor</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-border bg-brand-cloudwhite text-brand-navy font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="all">All Corridors</option>
                <option value="saravanampatti">Saravanampatti</option>
                <option value="kovilpalayam">Kovilpalayam</option>
                <option value="kalapatti">Kalapatti</option>
                <option value="kovaipudur">Kovaipudur</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-brand-secondary uppercase mb-1">Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-border bg-brand-cloudwhite text-brand-navy font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="all">All Property Types</option>
                <option value="plot">DTCP Plots</option>
                <option value="villa">Turnkey Villas</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-brand-secondary uppercase mb-1">Budget</label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-border bg-brand-cloudwhite text-brand-navy font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="all">All Budgets</option>
                <option value="under20">Under ₹20 Lakhs</option>
                <option value="20to50">₹20L - ₹50 Lakhs</option>
                <option value="above50">Above ₹50 Lakhs</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-brand-secondary uppercase mb-1">Facing / Vaastu</label>
              <select
                value={selectedFacing}
                onChange={(e) => setSelectedFacing(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-border bg-brand-cloudwhite text-brand-navy font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="all">All Facings</option>
                <option value="North">North Facing</option>
                <option value="East">East Facing</option>
                <option value="West">West Facing</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-brand-secondary uppercase mb-1">Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-brand-border bg-brand-cloudwhite text-brand-navy font-medium focus:outline-none focus:border-brand-primary"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-high">Area: Largest First</option>
              </select>
            </div>

          </div>

          {/* Active summary bar */}
          <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs text-brand-secondary">
            <span>Showing <strong className="text-brand-navy">{filteredProperties.length}</strong> active listings</span>
            <button
              onClick={handleReset}
              className="text-brand-primary hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-16 text-center border border-brand-border shadow-sm">
            <h3 className="text-xl font-bold text-brand-navy">No Properties Matched Your Filter</h3>
            <p className="text-xs text-brand-secondary mt-1 max-w-sm mx-auto">
              We couldn&apos;t find listings matching your specific parameters. Try resetting your search or call our sales team for off-market inventory.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-royal text-white text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

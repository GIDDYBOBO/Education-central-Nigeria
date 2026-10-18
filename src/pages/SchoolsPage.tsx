import React, { useState, useMemo } from 'react';
import { MOCK_SCHOOLS, NIGERIAN_STATES, ACADEMIC_YEARS, SCHOOL_LEVELS, OWNERSHIP_TYPES } from '../data/mockDatabase';
import { School, FilterCriteria } from '../types';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Layers,
  Building,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowRight,
  Award,
  Users,
  Dna,
  ShieldCheck,
  LayoutGrid,
  List
} from 'lucide-react';

interface SchoolsPageProps {
  onSelectSchool: (school: School) => void;
  initialStateFilter?: string;
  onOpenVerification: (prefilledNsin?: string) => void;
}

export const SchoolsPage: React.FC<SchoolsPageProps> = ({
  onSelectSchool,
  initialStateFilter = 'All States',
  onOpenVerification,
}) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchQuery: '',
    state: initialStateFilter,
    academicYear: 'All Academic Years',
    level: 'All Levels',
    ownership: 'All Ownerships',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered schools
  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter((school) => {
      // Search text
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = school.name.toLowerCase().includes(query);
        const matchesAcronym = school.acronym.toLowerCase().includes(query);
        const matchesCity = school.city.toLowerCase().includes(query);
        const matchesLga = school.lga.toLowerCase().includes(query);
        const matchesMotto = school.motto.toLowerCase().includes(query);
        const matchesAccreditation = school.accreditationNumber.toLowerCase().includes(query);
        if (!matchesName && !matchesAcronym && !matchesCity && !matchesLga && !matchesMotto && !matchesAccreditation) {
          return false;
        }
      }

      // State filter
      if (filters.state !== 'All States' && school.state !== filters.state) {
        return false;
      }

      // Academic year filter
      if (filters.academicYear !== 'All Academic Years') {
        const hasYear = school.academicYears.includes(filters.academicYear);
        if (!hasYear) return false;
      }

      // Level filter
      if (filters.level !== 'All Levels' && school.level !== filters.level) {
        return false;
      }

      // Ownership filter
      if (filters.ownership !== 'All Ownerships' && school.ownership !== filters.ownership) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.state !== 'All States' ||
    filters.academicYear !== 'All Academic Years' ||
    filters.level !== 'All Levels' ||
    filters.ownership !== 'All Ownerships';

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      state: 'All States',
      academicYear: 'All Academic Years',
      level: 'All Levels',
      ownership: 'All Ownerships',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Title & Mission */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Centralized National Education Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nigerian Accredited Schools Directory &amp; Ledger
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Filter and explore participating primary schools, unity secondary colleges, federal/state universities, and polytechnics across Nigeria. Access verified student cohorts, official achievements, and bioscience research data.
        </p>
      </div>

      {/* Robust Search & Multi-Filter Engine Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by institution name (e.g., King's College, UNILAG), acronym, LGA, or city..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters({ ...filters, searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdown Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          
          {/* State Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nigerian State / FCT</span>
            </label>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academic Year</span>
            </label>
            <select
              value={filters.academicYear}
              onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {ACADEMIC_YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institution Level</span>
            </label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {SCHOOL_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Ownership Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ownership Type</span>
            </label>
            <select
              value={filters.ownership}
              onChange={(e) => setFilters({ ...filters, ownership: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {OWNERSHIP_TYPES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Filter Summary & View Mode Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              Showing {filteredSchools.length} of {MOCK_SCHOOLS.length} Accredited Institutions
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold px-2.5 py-1 bg-emerald-50 rounded-md border border-emerald-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Layout:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-xs transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Detailed Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Zero Results Feedback */}
      {filteredSchools.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching institutions found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, broadening your state selection, or resetting the academic year filter.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-800 transition-colors"
          >
            Clear Search Filters
          </button>
        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              onClick={() => onSelectSchool(school)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/80 p-6 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
                    {school.acronym.substring(0, 3)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                      {school.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {school.ownership}
                    </span>
                  </div>
                </div>

                {/* Institution Name & Location */}
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {school.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{school.city}, {school.state} State ({school.lga} LGA)</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {school.description}
                  </p>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 text-center">
                    <span className="font-bold text-slate-800 block">{school.studentProfiles.length}</span>
                    <span className="text-slate-400">Profiles</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-center">
                    <span className="font-bold text-slate-800 block">{school.achievements.length}</span>
                    <span className="text-slate-400">Honours</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-center">
                    <span className="font-bold text-emerald-800 block">{school.bioscienceRecords.length}</span>
                    <span className="text-emerald-600">Research</span>
                  </div>
                </div>

                {/* Cryptographic Ledger Seal Preview */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    Seal:
                  </span>
                  <span className="truncate max-w-[170px] select-all font-semibold text-slate-700">
                    {school.encryptionSealHash}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span className="flex items-center gap-1 text-slate-500 font-normal">
                  Accreditation: <strong className="text-slate-700">{school.accreditationNumber}</strong>
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Records &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List / Table View Mode */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-3">State / LGA</th>
                  <th className="py-3 px-3">Level &amp; Ownership</th>
                  <th className="py-3 px-3 text-center">Student Profiles</th>
                  <th className="py-3 px-3 text-center">Bioscience Papers</th>
                  <th className="py-3 px-3">Accreditation Code</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchools.map((school) => (
                  <tr
                    key={school.id}
                    onClick={() => onSelectSchool(school)}
                    className="hover:bg-emerald-50/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{school.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{school.acronym} &bull; Est. {school.establishedYear}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{school.state} State</div>
                      <div className="text-[11px] text-slate-500">{school.city}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 mr-1.5">
                        {school.level}
                      </span>
                      <span className="text-slate-600">{school.ownership}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-800">
                      {school.studentProfiles.length}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {school.bioscienceRecords.length}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">
                      {school.accreditationNumber}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs">
                        View Records
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

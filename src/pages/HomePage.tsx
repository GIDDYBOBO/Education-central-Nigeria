import React, { useState } from 'react';
import { ThreeDNationalHub } from '../components/ThreeDNationalHub';
import { MOCK_SCHOOLS, NIGERIAN_STATES } from '../data/mockDatabase';
import { School, StudentProfile } from '../types';
import { NationalAcademicNews } from '../components/NationalAcademicNews';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  School as SchoolIcon,
  Award,
  Lock,
  Dna,
  Users,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
  ArrowLeftRight,
  GraduationCap,
  UserCheck
} from 'lucide-react';

interface HomePageProps {
  onSelectSchool: (school: School) => void;
  onNavigateToSchools: (initialStateFilter?: string) => void;
  onOpenVerification: (prefilledNsin?: string) => void;
  onOpenTransfers: () => void;
  onViewStudentTranscript: (student: StudentProfile, school: School) => void;
  onOpenStudentProfileManager?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSchool,
  onNavigateToSchools,
  onOpenVerification,
  onOpenTransfers,
  onViewStudentTranscript,
  onOpenStudentProfileManager,
}) => {
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedStateChip, setSelectedStateChip] = useState('All States');

  const popularStates = ['Lagos', 'FCT Abuja', 'Oyo', 'Kaduna', 'Enugu', 'Ogun', 'Osun', 'Kano', 'Rivers'];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) {
      onNavigateToSchools();
      return;
    }
    // Check if query looks like an NSIN
    if (quickSearch.toUpperCase().startsWith('NSIN-') || quickSearch.toUpperCase().startsWith('SHA256:')) {
      onOpenVerification(quickSearch.trim());
    } else {
      onNavigateToSchools();
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* 3D Interactive Hero Section */}
      <section className="relative">
        {/* Three.js Interactive National Academic Data Sphere */}
        <ThreeDNationalHub />

        {/* Hero Overlay / Intro Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-10">
            <div className="max-w-3xl space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Nigeria National Centralized Academic Records System (N-SEAR)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Where All Nigerian Schools Meet &amp; Access <span className="text-[#008751]">Encrypted Records</span>.
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A secure, centralized federal database connecting primary, secondary, and tertiary institutions across all 36 States and the FCT. Verify student profiles, browse institution achievements, inspect bioscience research, and transfer official transcripts seamlessly.
              </p>

              {/* Quick Action Search Bar */}
              <form onSubmit={handleHeroSearch} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-slate-50 border border-slate-300 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition-all">
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
                    <input
                      type="text"
                      value={quickSearch}
                      onChange={(e) => setQuickSearch(e.target.value)}
                      placeholder="Search school name (e.g. UNILAG, King's College) or NSIN..."
                      className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-[#008751] hover:bg-[#00703c] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <span>Explore Directory</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenVerification()}
                      className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Verify NSIN</span>
                    </button>
                    {onOpenStudentProfileManager && (
                      <button
                        type="button"
                        onClick={onOpenStudentProfileManager}
                        className="w-full sm:w-auto px-5 py-3 bg-emerald-100/80 hover:bg-emerald-200/90 text-emerald-950 font-bold text-sm rounded-xl border border-emerald-300 transition-all flex items-center justify-center gap-2 shrink-0"
                      >
                        <UserCheck className="w-4 h-4 text-emerald-800" />
                        <span>Student Portal</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Popular State Quick Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Filter by State:
                </span>
                {popularStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => onNavigateToSchools(state)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100/70 hover:text-emerald-900 text-slate-700 font-medium transition-colors border border-slate-200"
                  >
                    {state}
                  </button>
                ))}
                <button
                  onClick={() => onNavigateToSchools()}
                  className="px-2.5 py-1 rounded-lg text-emerald-700 hover:text-emerald-900 font-bold underline transition-colors"
                >
                  View All 37 &rarr;
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* National Academic Infrastructure Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">36 + 1</span>
              <span className="text-xs text-slate-500 font-medium">States &amp; FCT Covered</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <SchoolIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">1,420+</span>
              <span className="text-xs text-slate-500 font-medium">Accredited Schools</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">2.8M+</span>
              <span className="text-xs text-slate-500 font-medium">Encrypted Student Records</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">100%</span>
              <span className="text-xs text-slate-500 font-medium">Tamper-Proof Verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accredited Nigerian Institutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Federal &amp; State Accredited Repository</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Institutions &amp; Records Portals
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select any school to inspect student cohorts, academic honors, term grades, and scientific research.
            </p>
          </div>

          <button
            onClick={() => onNavigateToSchools()}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#008751] hover:text-[#005a36] bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors shrink-0"
          >
            <span>View Full National Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Schools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SCHOOLS.slice(0, 6).map((school) => (
            <div
              key={school.id}
              onClick={() => onSelectSchool(school)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/80 p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Card Top Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                    {school.acronym.substring(0, 3)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900">
                      {school.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Est. {school.establishedYear}
                    </span>
                  </div>
                </div>

                {/* Institution Details */}
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {school.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{school.city}, {school.state} State</span>
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {school.description}
                  </p>
                </div>

                {/* Quick Stats Badges */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-50 text-center">
                    <span className="font-bold text-slate-800 block">{school.studentProfiles.length}</span>
                    <span className="text-slate-400">Sample Profiles</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-center">
                    <span className="font-bold text-slate-800 block">{school.achievements.length}</span>
                    <span className="text-slate-400">Awards</span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-center">
                    <span className="font-bold text-emerald-800 block">{school.bioscienceRecords.length}</span>
                    <span className="text-emerald-600">Research</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted Ledger Sync</span>
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Access Portal &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* National Academic News Section (Policy Updates & Research Findings) */}
      <NationalAcademicNews />

      {/* Bioscience & Academic Research National Registry (Science Skill Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wide">
              <Dna className="w-4 h-4 text-emerald-400" />
              <span>National Bioscience &amp; STEM Research Registry</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Curated Scientific Discovery in Nigerian Institutions
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Pursuant to national STEM development goals, EduCentral indexes verified bioscience, genomic, and pharmaceutical research conducted by Nigerian universities and secondary science clubs. Verified with international UniProt, PDB, and NCBI accessions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">Sickle Cell (HbS) Therapeutics</span>
                  <span className="font-mono text-[10px] text-slate-400">UniProt: P68871</span>
                </div>
                <p className="text-xs text-slate-300">
                  UNILAG &amp; UI investigations on bioactive flavonoids from indigenous plants (Cajanus cajan) inhibiting deoxy-HbS polymer formation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">Lassa Virus GPC Cryo-EM</span>
                  <span className="font-mono text-[10px] text-slate-400">UniProt: P08669 / PDB: 7PUY</span>
                </div>
                <p className="text-xs text-slate-300">
                  World Bank ACEGID Centre of Excellence at Redeemer&apos;s University mapping neutralizing antibody escape mutations across clinical Nigerian survivor cohorts.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigateToSchools()}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Browse All Bioscience Records</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenTransfers}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-medium border border-white/20 transition-all flex items-center gap-2"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inter-Institutional Research Exchange</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Architecture & Anti-Forgery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Cryptographic Integrity &bull; NDPR Compliant
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How The Centralized Database Protects Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Eliminating forged certificates, lost transcripts, and bureaucratic delays across Nigerian education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">AES-256 GCM Record Seals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every student grade, terminal remark, and disciplinary record is encrypted at rest using military-grade AES-256 Galois/Counter Mode authenticated encryption.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Immutable Registrars Ledger</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grade sheets require dual cryptographic signatures from the certifying School Registrar and the State SUBEB/NUC verification node prior to ledger commitment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Inter-School Record Portability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students relocating from Lagos to Abuja or transitioning from secondary to tertiary education can transfer their authenticated transcript dossier in under 60 seconds.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

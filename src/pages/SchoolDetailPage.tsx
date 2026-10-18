import React, { useState } from 'react';
import { School, StudentProfile, Achievement, AchievementCategory } from '../types';
import { AddAchievementModal } from '../components/AddAchievementModal';
import {
  ShieldCheck,
  Building,
  Users,
  Award,
  Dna,
  Calendar,
  Lock,
  ArrowLeft,
  Search,
  FileText,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Clock,
  Printer,
  ArrowLeftRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  GraduationCap,
  HeartHandshake,
  PlusCircle,
  Filter,
  UserPlus
} from 'lucide-react';

interface SchoolDetailPageProps {
  school: School;
  onBack: () => void;
  onViewStudentTranscript: (student: StudentProfile, school: School) => void;
  onOpenVerification: (nsin?: string) => void;
  onOpenTransfers: () => void;
  onOpenStudentProfileManager?: (student?: StudentProfile) => void;
}

export const SchoolDetailPage: React.FC<SchoolDetailPageProps> = ({
  school,
  onBack,
  onViewStudentTranscript,
  onOpenVerification,
  onOpenTransfers,
  onOpenStudentProfileManager,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'achievements' | 'bioscience' | 'transfers' | 'calendar'>('students');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('All');
  
  // Achievements showcase state
  const [achievementsList, setAchievementsList] = useState<Achievement[]>(school.achievements);
  const [achievementCategoryFilter, setAchievementCategoryFilter] = useState<string>('All');
  const [isAddAchievementOpen, setIsAddAchievementOpen] = useState(false);

  // Filter students
  const filteredStudents = school.studentProfiles.filter((s) => {
    if (studentSearch.trim()) {
      const q = studentSearch.toLowerCase();
      const matchName = s.fullName.toLowerCase().includes(q);
      const matchNsin = s.nsin.toLowerCase().includes(q);
      const matchDept = s.departmentOrTrack.toLowerCase().includes(q);
      if (!matchName && !matchNsin && !matchDept) return false;
    }
    if (selectedLevelFilter !== 'All' && !s.currentLevel.includes(selectedLevelFilter)) {
      return false;
    }
    return true;
  });

  const filteredAchievements = achievementsList.filter((ach) => {
    if (achievementCategoryFilter === 'All') return true;
    return ach.category === achievementCategoryFilter;
  });

  const handleAddAchievement = (newAch: Achievement) => {
    setAchievementsList([newAch, ...achievementsList]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to National Schools Directory</span>
      </button>

      {/* Institution Master Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Crest / Acronym Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shadow-md shrink-0">
              {school.acronym.substring(0, 3)}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                  {school.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {school.ownership} Institution
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {school.accreditationStatus}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {school.name}
              </h1>

              <p className="text-xs sm:text-sm font-medium text-slate-500 italic">
                &ldquo;{school.motto}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {school.address}
                </span>
                <span>&bull;</span>
                <span>Established <strong>{school.establishedYear}</strong></span>
                <span>&bull;</span>
                <span className="font-mono text-emerald-800 font-bold">
                  Accreditation: {school.accreditationNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Verification & Sync Pill */}
          <div className="flex flex-col items-start lg:items-end gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Federal Ledger Synchronized</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Last Sync: {new Date(school.lastSyncTimestamp).toLocaleDateString()}
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate max-w-[240px]">
              Seal: {school.encryptionSealHash}
            </div>
            <button
              onClick={() => onOpenVerification()}
              className="mt-1 w-full px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Verify Records for this School</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs for Subheadings */}
        <div className="flex overflow-x-auto gap-2 pt-4 border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'students'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subheading 2: Student Profiles &amp; Ledger ({school.studentProfiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'achievements'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Subheading 3: School Achievements ({school.achievements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bioscience')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'bioscience'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>Subheading 4: Bioscience &amp; Research ({school.bioscienceRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Subheading 1: Institution Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('transfers')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'transfers'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Subheading 5: Inter-School Transfers</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'calendar'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Subheading 6: Academic Calendar</span>
          </button>
        </div>

      </div>

      {/* SECTION 2: STUDENT PROFILES & ACADEMIC LEDGER */}
      {activeTab === 'students' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Users className="w-4 h-4" />
                <span>Subheading 2: Student Profiles &amp; Centralized Academic Ledger</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Verified Student Records ({filteredStudents.length} Available)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                All student records are cryptographically sealed with individual NSINs. Click &ldquo;Inspect Official Transcript&rdquo; to review certified term grades and subject assessments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              {/* In-school student search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search student or NSIN..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {onOpenStudentProfileManager && (
                <button
                  type="button"
                  onClick={() => onOpenStudentProfileManager()}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create / Update Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-5 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">
                      {student.fullName}
                    </h3>
                    <p className="font-mono text-xs text-emerald-800 font-bold">
                      {student.nsin}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {student.status}
                  </span>
                </div>

                {/* Dossier Data Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 block">Class / Level</span>
                    <span className="font-bold text-slate-800">{student.currentLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Department / Major</span>
                    <span className="font-bold text-slate-800">{student.departmentOrTrack}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">State of Origin</span>
                    <span className="font-semibold text-slate-800">{student.stateOfOrigin} State</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Cumulative GPA</span>
                    <span className="font-extrabold text-emerald-700">
                      {student.cumulativeGpa} / {student.gpaScale}
                    </span>
                  </div>
                </div>

                {/* Term reports count & awards badge */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                  <span>{student.termReports.length} Certified Term Grade Reports</span>
                  {student.awards && student.awards.length > 0 && (
                    <span className="font-medium text-amber-700 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      {student.awards[0]}
                    </span>
                  )}
                </div>

                {/* Cryptographic Hash */}
                <div className="p-2 rounded bg-slate-100 text-[10px] font-mono text-slate-600 truncate">
                  SHA-256: {student.encryptedHash}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onViewStudentTranscript(student, school)}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>Inspect Official Digital Transcript</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: SCHOOL ACHIEVEMENTS SHOWCASE & ACCREDITED HONOURS */}
      {activeTab === 'achievements' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Award className="w-4 h-4" />
                <span>Subheading 3: Institutional Achievements &amp; National Accolades</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Verified Honours, Rankings &amp; Community Impact
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Comprehensive repository of school rankings, awards received, notable alumni achievements, infrastructure developments, and community impact.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddAchievementOpen(true)}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Add School Achievement</span>
            </button>
          </div>

          {/* Achievement Category Filter Pills */}
          <div className="flex overflow-x-auto gap-2 pb-1 text-xs">
            {[
              { id: 'All', label: 'All Showcase' },
              { id: 'Rankings', label: 'School Rankings', icon: TrendingUp },
              { id: 'Awards', label: 'Awards Received', icon: Award },
              { id: 'Notable Alumni', label: 'Notable Alumni', icon: GraduationCap },
              { id: 'Infrastructure', label: 'Infrastructure Dev', icon: Building },
              { id: 'Community Impact', label: 'Community Impact', icon: HeartHandshake },
              { id: 'STEM & Robotics', label: 'STEM & Robotics', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = achievementCategoryFilter === tab.id;
              const count = tab.id === 'All'
                ? achievementsList.length
                : achievementsList.filter((a) => a.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setAchievementCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAchievements.map((ach) => {
              const isRanking = ach.category === 'Rankings';
              const isAlumni = ach.category === 'Notable Alumni';
              const isInfra = ach.category === 'Infrastructure';
              const isImpact = ach.category === 'Community Impact';

              return (
                <div
                  key={ach.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header Pill & Category */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isRanking
                          ? 'bg-sky-100 text-sky-800'
                          : isAlumni
                          ? 'bg-purple-100 text-purple-800'
                          : isInfra
                          ? 'bg-teal-100 text-teal-800'
                          : isImpact
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isRanking ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : isAlumni ? (
                          <GraduationCap className="w-5 h-5" />
                        ) : isInfra ? (
                          <Building className="w-5 h-5" />
                        ) : isImpact ? (
                          <HeartHandshake className="w-5 h-5" />
                        ) : (
                          <Award className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isRanking
                            ? 'bg-sky-100 text-sky-900 border border-sky-200'
                            : isAlumni
                            ? 'bg-purple-100 text-purple-900 border border-purple-200'
                            : isInfra
                            ? 'bg-teal-100 text-teal-900 border border-teal-200'
                            : isImpact
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {ach.category}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">{ach.year}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {ach.title}
                    </h3>

                    {/* Ranking Specific Banner */}
                    {isRanking && ach.rankingPosition && (
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-2 text-xs">
                        <TrendingUp className="w-4 h-4 text-sky-700 shrink-0" />
                        <span className="font-bold text-sky-900">Official Position: {ach.rankingPosition}</span>
                      </div>
                    )}

                    {/* Notable Alumni Specific Banner */}
                    {isAlumni && ach.alumniName && (
                      <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-purple-950">
                          <GraduationCap className="w-4 h-4 text-purple-700" />
                          <span>{ach.alumniName}</span>
                        </div>
                        {ach.alumniRole && (
                          <p className="text-purple-800 text-[11px] font-medium">{ach.alumniRole}</p>
                        )}
                      </div>
                    )}

                    {/* Infrastructure / Community Impact Metric Pill */}
                    {(isInfra || isImpact) && ach.impactMetric && (
                      <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs ${
                        isInfra
                          ? 'bg-teal-50 border-teal-200 text-teal-950'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      }`}>
                        <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-semibold">Metric / Reach: {ach.impactMetric}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[200px]">
                      Certifying Body: <strong className="text-slate-800">{ach.awardingBody}</strong>
                    </span>
                    <span className="font-semibold text-emerald-700 font-mono">
                      Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-2">
              <Award className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">No achievements recorded in this category yet</h4>
              <p className="text-xs text-slate-500">
                School administrators can click &ldquo;Add School Achievement&rdquo; above to register new rankings, alumni honours, or infrastructure milestones.
              </p>
            </div>
          )}
        </section>
      )}

      {/* SECTION 4: BIOSCIENCE & ACADEMIC RESEARCH (SCIENCE SKILL) */}
      {activeTab === 'bioscience' && (
        <section className="space-y-6">
          <div className="rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 border border-emerald-800/60 shadow-lg space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wide">
              <Dna className="w-4 h-4 text-emerald-400" />
              <span>Subheading 4: Bioscience &amp; Academic Research Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Biomedical, Genomic &amp; STEM Research Records
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Curated scientific contributions from {school.name} faculties, postgraduate researchers, and student science societies. Indexed with standard UniProt, PDB, and NCBI accessions pursuant to national bioscience research registries.
            </p>
          </div>

          <div className="space-y-6">
            {school.bioscienceRecords.map((bio) => (
              <div
                key={bio.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 uppercase">
                      {bio.department}
                    </span>
                    <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                      {bio.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      <strong>Lead Investigator:</strong> {bio.leadResearcherOrStudent} &bull; ({bio.year})
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 text-emerald-300 font-mono text-xs font-bold shadow-xs">
                      {bio.accessionNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800">
                      Status: {bio.status}
                    </span>
                  </div>
                </div>

                {/* Target & Significance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium block">Target Organism / System</span>
                    <span className="font-bold text-slate-800 italic">{bio.targetOrganism}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Biological Significance</span>
                    <span className="text-slate-700">{bio.biologicalSignificance}</span>
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Certified Abstract &amp; Findings
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                    {bio.abstract}
                  </p>
                </div>

                {/* Key Molecules & Provenance */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-500 font-medium">Investigated Targets:</span>
                    {bio.keyMoleculesOrGenes.map((mol, mIdx) => (
                      <span key={mIdx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[11px] font-medium border border-emerald-200">
                        {mol}
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-400 text-[11px] font-mono">
                    Provenance: {bio.provenance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 1: INSTITUTION OVERVIEW & LEADERSHIP */}
      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Building className="w-4 h-4" />
              <span>Subheading 1: Institution Profile &amp; Governance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Governance &amp; Campus Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Leadership Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                Executive Leadership
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Head of Institution</span>
                  <span className="font-bold text-slate-900 text-sm">{school.principalOrViceChancellor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Registrar &amp; Records Custodian</span>
                  <span className="font-bold text-slate-800">{school.registrarName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Contact Email &amp; Phone</span>
                  <span className="text-slate-700 font-mono">{school.contactEmail} &bull; {school.contactPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Official Portal</span>
                  <a href={school.website} target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline flex items-center gap-1">
                    <span>{school.website}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Facilities & Campus */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">
                Certified Campus Facilities &amp; Labs
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {school.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 5: INTER-SCHOOL TRANSFERS */}
      {activeTab === 'transfers' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Subheading 5: Inter-School Transfer &amp; Verification Portal</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Student Record Portability Gateway
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Accredited transfer clearinghouse allowing students relocating across Nigeria to transfer authentic, encrypted records between {school.name} and other institutions.
              </p>
            </div>

            <button
              onClick={onOpenTransfers}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2 shrink-0"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Launch Transfer Request Wizard</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900">
              Transfer Clearance Criteria for {school.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">1. NSIN Authentication</span>
                <span className="text-slate-500">Student must possess active National Student ID.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">2. Registrar Digital Seal</span>
                <span className="text-slate-500">Certifying transcript signed by {school.registrarName}.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">3. Instant Ledger Delivery</span>
                <span className="text-slate-500">Destination school receives certified dossiers in real-time.</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: ACADEMIC CALENDAR & EXAMINATION RECORDS */}
      {activeTab === 'calendar' && (
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Calendar className="w-4 h-4" />
              <span>Subheading 6: Official Academic Calendar &amp; Term Records</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Session Terms &amp; Grading System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">
                Registered Academic Sessions
              </h3>
              <div className="flex flex-wrap gap-2">
                {school.academicYears.map((yr) => (
                  <span key={yr} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
                    {yr} Session
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">
                Semester / Term Calendar Structure
              </h3>
              <div className="flex flex-wrap gap-2">
                {school.termsOrSemesters.map((term) => (
                  <span key={term} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-xs border border-slate-200">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Add Achievement Modal */}
      <AddAchievementModal
        isOpen={isAddAchievementOpen}
        onClose={() => setIsAddAchievementOpen(false)}
        school={school}
        onAddAchievement={handleAddAchievement}
      />

    </div>
  );
};


import React, { useState } from 'react';
import { MOCK_SCHOOLS, NIGERIAN_STATES } from '../data/mockDatabase';
import { StudentProfile, School, SubjectGrade, TermReport, ExtracurricularActivity } from '../types';
import {
  User,
  BookOpen,
  Award,
  Sparkles,
  Phone,
  Building,
  Save,
  Plus,
  Trash2,
  FileText,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  School as SchoolIcon,
  X
} from 'lucide-react';

interface StudentProfileManagerProps {
  onSaveProfile: (updatedProfile: StudentProfile, schoolId: string) => void;
  onViewTranscript: (student: StudentProfile, school: School) => void;
  initialStudent?: StudentProfile | null;
  onClose?: () => void;
}

export const StudentProfileManager: React.FC<StudentProfileManagerProps> = ({
  onSaveProfile,
  onViewTranscript,
  initialStudent,
  onClose,
}) => {
  // Available schools
  const allSchools = MOCK_SCHOOLS;

  // Selected student to manage (or new)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(
    initialStudent?.schoolId || allSchools[0].id
  );

  const [activeTab, setActiveTab] = useState<'personal' | 'school' | 'academics' | 'extracurricular' | 'awards' | 'contact'>('personal');

  // Form states
  const [id, setId] = useState<string>(initialStudent?.id || `std-custom-${Date.now()}`);
  const [nsin, setNsin] = useState<string>(
    initialStudent?.nsin || `NSIN-LA-2026-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [fullName, setFullName] = useState<string>(initialStudent?.fullName || 'Oluwaseun Tobi Adeleke');
  const [gender, setGender] = useState<'Male' | 'Female'>(initialStudent?.gender || 'Male');
  const [dob, setDob] = useState<string>(initialStudent?.dob || '2004-06-15');
  const [stateOfOrigin, setStateOfOrigin] = useState<string>(initialStudent?.stateOfOrigin || 'Lagos');
  const [lga, setLga] = useState<string>(initialStudent?.lga || 'Ikeja');
  const [enrollmentYear, setEnrollmentYear] = useState<string>(initialStudent?.enrollmentYear || '2022');
  const [currentLevel, setCurrentLevel] = useState<string>(initialStudent?.currentLevel || '400 Level (Finalist)');
  const [departmentOrTrack, setDepartmentOrTrack] = useState<string>(
    initialStudent?.departmentOrTrack || 'Computer Science & Computational Biology'
  );
  const [status, setStatus] = useState<'Active' | 'Graduated' | 'Transferred'>(
    initialStudent?.status || 'Active'
  );
  const [email, setEmail] = useState<string>(initialStudent?.email || 'o.adeleke@student.central.edu.ng');
  const [phone, setPhone] = useState<string>(initialStudent?.phone || '+234 803 456 7890');
  const [guardianContact, setGuardianContact] = useState<string>(
    initialStudent?.guardianContact || 'Mr. & Mrs. Adeleke (+234 802 123 4567)'
  );
  const [address, setAddress] = useState<string>(
    initialStudent?.address || '14 Victoria Island Boulevard, Lagos State'
  );
  const [careerAspirations, setCareerAspirations] = useState<string>(
    initialStudent?.careerAspirations || 'Biomedical AI Research Scientist & Healthcare Systems Architect'
  );

  // Awards list
  const [awards, setAwards] = useState<string[]>(
    initialStudent?.awards || [
      'National Shell STEM Merit Scholar',
      'Federal Ministry of Education Excellence Trophy',
      'Dean’s Honour Roll (Consecutive Sessions)'
    ]
  );
  const [newAwardInput, setNewAwardInput] = useState('');

  // Extracurriculars
  const [extracurriculars, setExtracurriculars] = useState<ExtracurricularActivity[]>(
    initialStudent?.extracurriculars || [
      {
        id: 'ec-1',
        title: 'President',
        organizationOrClub: 'Artificial Intelligence & Bioinformatics Society',
        role: 'Executive Leader',
        year: '2025/2026',
        description: 'Organized student workshops on genomic transformer models and algorithm design.'
      },
      {
        id: 'ec-2',
        title: 'Team Captain',
        organizationOrClub: 'University Collegiate Chess Team',
        role: 'Sports Leader',
        year: '2024/2025',
        description: 'Led university delegation to West African University Games (WAUG).'
      }
    ]
  );
  const [newEcTitle, setNewEcTitle] = useState('');
  const [newEcClub, setNewEcClub] = useState('');
  const [newEcRole, setNewEcRole] = useState('');
  const [newEcYear, setNewEcYear] = useState('2025/2026');

  // Academic Course History & Reports
  const [termReports, setTermReports] = useState<TermReport[]>(
    initialStudent?.termReports || [
      {
        academicYear: '2025/2026',
        termOrSemester: '1st (Harmattan) Semester',
        level: '400 Level',
        gpaOrAverage: 4.88,
        maxGpaOrScale: 5.0,
        positionOrRank: '1st in Department',
        attendancePercent: 99,
        conductRemark: 'Exemplary academic discipline and leadership.',
        publishedDate: '2026-02-14',
        registrarSignHash: '0xCB182903AEFF201',
        subjects: [
          { name: 'Machine Learning for Health Data (CSC 401)', score: 94, grade: 'A', remark: 'Distinction' },
          { name: 'Distributed Systems Architecture (CSC 403)', score: 91, grade: 'A', remark: 'Distinction' },
          { name: 'Bioinformatics Algorithms (BIO 405)', score: 88, grade: 'A', remark: 'Distinction' },
          { name: 'Research Project Methodology (CSC 499)', score: 95, grade: 'A', remark: 'Distinction' }
        ]
      }
    ]
  );

  // New subject draft for active term
  const [activeReportIdx, setActiveReportIdx] = useState(0);
  const [newSubName, setNewSubName] = useState('');
  const [newSubScore, setNewSubScore] = useState<number>(85);

  const [savedNotification, setSavedNotification] = useState(false);

  // Helper to compute grade from score
  const computeGrade = (score: number) => {
    if (score >= 70) return { grade: 'A' as const, remark: 'Distinction' };
    if (score >= 60) return { grade: 'B' as const, remark: 'Very Good' };
    if (score >= 50) return { grade: 'C' as const, remark: 'Credit' };
    if (score >= 45) return { grade: 'D' as const, remark: 'Pass' };
    return { grade: 'F' as const, remark: 'Fail' };
  };

  // Compute cumulative GPA automatically
  const cumulativeGpa = termReports.length > 0
    ? parseFloat(
        (termReports.reduce((acc, r) => acc + r.gpaOrAverage, 0) / termReports.length).toFixed(2)
      )
    : 4.85;

  const currentSchool = allSchools.find((s) => s.id === selectedSchoolId) || allSchools[0];

  const handleAddSubjectToActiveTerm = () => {
    if (!newSubName.trim()) return;
    const { grade, remark } = computeGrade(newSubScore);
    const newSub: SubjectGrade = {
      name: newSubName.trim(),
      score: Number(newSubScore),
      grade,
      remark,
    };

    const updatedReports = [...termReports];
    if (updatedReports[activeReportIdx]) {
      updatedReports[activeReportIdx].subjects.push(newSub);
      // Recompute term average
      const totalScores = updatedReports[activeReportIdx].subjects.reduce((sum, s) => sum + s.score, 0);
      const avg = totalScores / updatedReports[activeReportIdx].subjects.length;
      // Convert to 5.0 scale
      updatedReports[activeReportIdx].gpaOrAverage = parseFloat(( (avg / 100) * 5.0 ).toFixed(2));
      setTermReports(updatedReports);
      setNewSubName('');
      setNewSubScore(85);
    }
  };

  const handleRemoveSubject = (reportIdx: number, subIdx: number) => {
    const updatedReports = [...termReports];
    updatedReports[reportIdx].subjects.splice(subIdx, 1);
    setTermReports(updatedReports);
  };

  const handleAddAward = () => {
    if (!newAwardInput.trim()) return;
    setAwards([...awards, newAwardInput.trim()]);
    setNewAwardInput('');
  };

  const handleRemoveAward = (idx: number) => {
    setAwards(awards.filter((_, i) => i !== idx));
  };

  const handleAddEc = () => {
    if (!newEcTitle.trim() || !newEcClub.trim()) return;
    const newEc: ExtracurricularActivity = {
      id: `ec-${Date.now()}`,
      title: newEcTitle.trim(),
      organizationOrClub: newEcClub.trim(),
      role: newEcRole.trim() || 'Active Member',
      year: newEcYear.trim(),
    };
    setExtracurriculars([...extracurriculars, newEc]);
    setNewEcTitle('');
    setNewEcClub('');
    setNewEcRole('');
  };

  const handleRemoveEc = (ecId: string) => {
    setExtracurriculars(extracurriculars.filter((e) => e.id !== ecId));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate cryptographic hash from student attributes
    const rawData = `${nsin}:${fullName}:${dob}:${selectedSchoolId}:${cumulativeGpa}:${Date.now()}`;
    const hash = `SHA256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}88421b`;

    const compiledProfile: StudentProfile = {
      id,
      nsin: nsin.trim().toUpperCase(),
      fullName: fullName.trim(),
      gender,
      dob,
      stateOfOrigin,
      lga,
      enrollmentYear,
      currentLevel,
      departmentOrTrack,
      status,
      cumulativeGpa,
      gpaScale: 5.0,
      avatarSeed: fullName.toLowerCase().replace(/\s+/g, '-'),
      encryptedHash: hash,
      email,
      phone,
      guardianContact,
      address,
      careerAspirations,
      extracurriculars,
      awards,
      termReports,
      schoolId: selectedSchoolId,
      schoolName: currentSchool.name,
    };

    onSaveProfile(compiledProfile, selectedSchoolId);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-emerald-600" />
            <span>National Student Dossier Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Student Profile Management System
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl">
            Create and maintain your official encrypted student profile, update academic courses and term assessments, record extracurricular leadership, and generate certified transcripts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {savedNotification && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in duration-300 shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Profile updated successfully! Linked to {currentSchool.name} with verified NSIN ({nsin}).
            </span>
          </div>
          <button
            onClick={() => {
              const currentCompiled: StudentProfile = {
                id,
                nsin,
                fullName,
                gender,
                dob,
                stateOfOrigin,
                lga,
                enrollmentYear,
                currentLevel,
                departmentOrTrack,
                status,
                cumulativeGpa,
                gpaScale: 5.0,
                avatarSeed: 'student',
                encryptedHash: 'SHA256:7f92b493e8201a4e101fcc655829e018a3d82bc5',
                awards,
                termReports,
                schoolId: selectedSchoolId,
                schoolName: currentSchool.name
              };
              onViewTranscript(currentCompiled, currentSchool);
            }}
            className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 transition-colors shrink-0"
          >
            Inspect Official Transcript
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Student Quick Profile Header Card */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-extrabold text-2xl shadow-inner">
              {fullName.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {nsin}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white">
                  {status}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold">{fullName}</h2>
              <p className="text-xs sm:text-sm text-emerald-200">
                {currentLevel} &bull; {departmentOrTrack}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-300 pt-0.5">
                <SchoolIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-white">{currentSchool.name}</span>
                <span>({currentSchool.state} State)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
            <span className="text-xs text-emerald-300 font-medium">Cumulative Academic Average</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {cumulativeGpa} <span className="text-sm font-sans text-emerald-400">/ 5.00</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentCompiled: StudentProfile = {
                  id,
                  nsin,
                  fullName,
                  gender,
                  dob,
                  stateOfOrigin,
                  lga,
                  enrollmentYear,
                  currentLevel,
                  departmentOrTrack,
                  status,
                  cumulativeGpa,
                  gpaScale: 5.0,
                  avatarSeed: 'student',
                  encryptedHash: 'SHA256:7f92b493e8201a4e101fcc655829e018a3d82bc5',
                  awards,
                  termReports,
                  schoolId: selectedSchoolId,
                  schoolName: currentSchool.name
                };
                onViewTranscript(currentCompiled, currentSchool);
              }}
              className="mt-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Preview Official Transcript</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-1 p-2 bg-slate-50 border-b border-slate-200 text-xs font-bold">
          {[
            { id: 'personal', label: '1. Personal Information', icon: User },
            { id: 'school', label: '2. School Linkage', icon: Building },
            { id: 'academics', label: '3. Academic Courses & Grades', icon: BookOpen },
            { id: 'extracurricular', label: '4. Extracurriculars', icon: Sparkles },
            { id: 'awards', label: '5. Awards & Honours', icon: Award },
            { id: 'contact', label: '6. Contact & Guardians', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveAll} className="p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: PERSONAL INFORMATION */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-700" />
                <span>Personal Legal Identification</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Surname Firstname Middlename"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State of Origin *
                  </label>
                  <select
                    value={stateOfOrigin}
                    onChange={(e) => setStateOfOrigin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {NIGERIAN_STATES.filter((s) => s !== 'All States').map((s) => (
                      <option key={s} value={s}>
                        {s} State
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Local Government Area (LGA)
                  </label>
                  <input
                    type="text"
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    placeholder="e.g. Ikeja, Lagos Mainland, Nsukka..."
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Career Aspirations / Focus
                  </label>
                  <input
                    type="text"
                    value={careerAspirations}
                    onChange={(e) => setCareerAspirations(e.target.value)}
                    placeholder="e.g. Molecular Geneticist, Software Engineer, Jurist"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHOOL LINKAGE */}
          {activeTab === 'school' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>Institutional Affiliation &amp; Enrollment</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Associated Nigerian Institution (Accredited School) *
                  </label>
                  <select
                    value={selectedSchoolId}
                    onChange={(e) => setSelectedSchoolId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {allSchools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.acronym}) &bull; {s.state} State ({s.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    National Student Identification Number (NSIN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={nsin}
                    onChange={(e) => setNsin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-800 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Permanent national ID linking primary, secondary, and tertiary records.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrollment Cohort Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={enrollmentYear}
                    onChange={(e) => setEnrollmentYear(e.target.value)}
                    placeholder="e.g. 2022"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Level / Class *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    placeholder="e.g. SSS 3, JSS 2, 400 Level, Basic 6"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department, Faculty or Academic Track *
                  </label>
                  <input
                    type="text"
                    required
                    value={departmentOrTrack}
                    onChange={(e) => setDepartmentOrTrack(e.target.value)}
                    placeholder="e.g. Pure & Applied Sciences, Law, Commercial"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrollment Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Active">Active Student</option>
                    <option value="Graduated">Graduated / Alumnus</option>
                    <option value="Transferred">Transferred to Another School</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACADEMIC COURSES & GRADES */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Academic History &amp; Course Gradebook</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Input official course assessments, test scores, and terminal examinations.
                  </p>
                </div>

                {/* Term switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Active Term:</span>
                  <select
                    value={activeReportIdx}
                    onChange={(e) => setActiveReportIdx(Number(e.target.value))}
                    className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white font-semibold"
                  >
                    {termReports.map((r, idx) => (
                      <option key={idx} value={idx}>
                        {r.academicYear} - {r.termOrSemester}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Term Report Table */}
              {termReports[activeReportIdx] && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <div className="bg-slate-100 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span>{termReports[activeReportIdx].academicYear}</span>
                      <span>&bull;</span>
                      <span>{termReports[activeReportIdx].termOrSemester}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Attendance: <strong>{termReports[activeReportIdx].attendancePercent}%</strong></span>
                      <span className="text-emerald-800 font-bold">
                        Calculated Term GPA: {termReports[activeReportIdx].gpaOrAverage} / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Subject / Course Title</th>
                          <th className="py-2.5 px-3 text-center">Score (0-100)</th>
                          <th className="py-2.5 px-3 text-center">Certified Grade</th>
                          <th className="py-2.5 px-4">Performance Remark</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {termReports[activeReportIdx].subjects.map((sub, sIdx) => (
                          <tr key={sIdx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-semibold text-slate-800">{sub.name}</td>
                            <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">{sub.score}</td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-100 text-emerald-900">
                                {sub.grade}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">{sub.remark}</td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveSubject(activeReportIdx, sIdx)}
                                className="p-1 rounded text-red-500 hover:bg-red-50"
                                title="Remove Subject"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Subject Row */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      placeholder="Add Subject (e.g. Further Mathematics, Physics 301)..."
                      className="flex-1 min-w-[200px] px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500">Score:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newSubScore}
                        onChange={(e) => setNewSubScore(Number(e.target.value))}
                        className="w-16 px-2 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-center font-bold"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSubjectToActiveTerm}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Course Grade</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EXTRACURRICULARS */}
          {activeTab === 'extracurricular' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Extracurricular Activities &amp; Student Leadership</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extracurriculars.map((ec) => (
                  <div
                    key={ec.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-slate-900 block text-sm">{ec.title}</span>
                      <span className="text-emerald-800 font-semibold block">{ec.organizationOrClub}</span>
                      <span className="text-slate-500 block">Role: {ec.role} &bull; {ec.year}</span>
                      {ec.description && (
                        <p className="text-slate-600 mt-1">{ec.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEc(ec.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Activity */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Add New Extracurricular Role</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newEcTitle}
                    onChange={(e) => setNewEcTitle(e.target.value)}
                    placeholder="Position / Title (e.g. President, Captain)"
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newEcClub}
                    onChange={(e) => setNewEcClub(e.target.value)}
                    placeholder="Club / Society / Team"
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newEcRole}
                      onChange={(e) => setNewEcRole(e.target.value)}
                      placeholder="Role (e.g. Lead Prefect)"
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddEc}
                      className="px-3 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 shrink-0"
                    >
                      Add Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AWARDS & HONOURS */}
          {activeTab === 'awards' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Awards, Honours &amp; Distinctions</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {awards.map((award, aIdx) => (
                  <div
                    key={aIdx}
                    className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2 shadow-2xs"
                  >
                    <span>&bull; {award}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAward(aIdx)}
                      className="text-amber-700 hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Award */}
              <div className="flex gap-2 max-w-xl">
                <input
                  type="text"
                  value={newAwardInput}
                  onChange={(e) => setNewAwardInput(e.target.value)}
                  placeholder="Enter award or distinction (e.g. Cowbellpedia Mathematics State Winner)..."
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAddAward}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  Add Award
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & GUARDIANS */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Contact Details &amp; Emergency Guardians</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guardian / Parent Contact Details *
                  </label>
                  <input
                    type="text"
                    required
                    value={guardianContact}
                    onChange={(e) => setGuardianContact(e.target.value)}
                    placeholder="Name and contact phone"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Residential / Campus Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Hostel, Hall of Residence or Permanent Home Address"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>SHA-256 Ledger Synchronized on Save</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile to National Ledger</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../data/mockDatabase';
import { StudentProfile, School } from '../types';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Lock, FileText, X, ExternalLink, Calendar, Award } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNsin?: string;
  onViewStudentTranscript?: (student: StudentProfile, school: School) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  prefilledNsin = '',
  onViewStudentTranscript,
}) => {
  const [searchInput, setSearchInput] = useState(prefilledNsin || 'NSIN-LA-2023-88421');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState<{
    student: StudentProfile;
    school: School;
  } | null>(null);
  const [errorNotFound, setErrorNotFound] = useState(false);

  // Sync if prefilled changes
  React.useEffect(() => {
    if (prefilledNsin) {
      setSearchInput(prefilledNsin);
      handleVerify(prefilledNsin);
    }
  }, [prefilledNsin]);

  if (!isOpen) return null;

  const handleVerify = (query = searchInput) => {
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) return;

    setIsVerifying(true);
    setErrorNotFound(false);
    setVerifiedResult(null);

    // Simulate cryptographic verification delay (400ms)
    setTimeout(() => {
      let match: { student: StudentProfile; school: School } | null = null;

      for (const school of MOCK_SCHOOLS) {
        const found = school.studentProfiles.find(
          (s) =>
            s.nsin.toUpperCase() === trimmed ||
            s.encryptedHash.toUpperCase().includes(trimmed) ||
            s.id.toUpperCase() === trimmed
        );
        if (found) {
          match = { student: found, school };
          break;
        }
      }

      setIsVerifying(false);
      if (match) {
        setVerifiedResult(match);
      } else {
        setErrorNotFound(true);
      }
    }, 450);
  };

  const sampleNsins = [
    { label: 'King\'s College (SSS 3)', nsin: 'NSIN-LA-2023-88421' },
    { label: 'UNILAG Finalist (Genetics)', nsin: 'NSIN-LA-2022-90142' },
    { label: 'Queen\'s College (SSS 3)', nsin: 'NSIN-LA-2022-77199' },
    { label: 'Univ of Ibadan (MBBS)', nsin: 'NSIN-OY-2021-44810' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">National Academic Record Verification</h3>
                <p className="text-emerald-200 text-xs">
                  Centralized Cryptographic Ledger &bull; Federal Ministry of Education
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Input Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Enter National Student Identification Number (NSIN) or Encrypted Record Hash
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  placeholder="e.g. NSIN-LA-2023-88421"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
              <button
                onClick={() => handleVerify()}
                disabled={isVerifying}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Verify Record</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick pre-filled test pills */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Try Sample NSIN:</span>
              {sampleNsins.map((sample) => (
                <button
                  key={sample.nsin}
                  onClick={() => {
                    setSearchInput(sample.nsin);
                    handleVerify(sample.nsin);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 rounded-md font-mono text-[11px] text-slate-700 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Results */}
          {verifiedResult && (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-sm uppercase tracking-wide">
                      <span>Official Record Authenticated</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-medium">
                      Cryptographically Sealed &amp; Verified Against Central Federal Ledger
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-md font-mono text-[11px] font-semibold">
                  256-BIT ENCRYPTED
                </span>
              </div>

              {/* Verified Details Card */}
              <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm space-y-3">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {verifiedResult.student.fullName}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      NSIN: <span className="font-semibold text-emerald-700">{verifiedResult.student.nsin}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {verifiedResult.student.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Institution</span>
                    <span className="font-semibold text-slate-800">{verifiedResult.school.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">State / Level</span>
                    <span className="font-semibold text-slate-800">
                      {verifiedResult.school.state} State &bull; {verifiedResult.student.currentLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Department / Program</span>
                    <span className="font-semibold text-slate-800">{verifiedResult.student.departmentOrTrack}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Cumulative GPA / Average</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      {verifiedResult.student.cumulativeGpa} / {verifiedResult.student.gpaScale}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">State of Origin</span>
                    <span className="font-semibold text-slate-800">{verifiedResult.student.stateOfOrigin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Accreditation Code</span>
                    <span className="font-mono text-slate-700">{verifiedResult.school.accreditationNumber}</span>
                  </div>
                </div>

                {/* Cryptographic Hash Verification Block */}
                <div className="mt-2 pt-3 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg text-[11px] font-mono text-slate-600">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="flex items-center gap-1 font-sans font-medium text-slate-700">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      Cryptographic Seal Hash:
                    </span>
                    <span className="text-emerald-700 font-sans font-semibold">MATCH VERIFIED</span>
                  </div>
                  <div className="truncate text-slate-800 select-all font-mono">
                    {verifiedResult.student.encryptedHash}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap gap-2 justify-end">
                  {onViewStudentTranscript && (
                    <button
                      onClick={() => {
                        onViewStudentTranscript(verifiedResult.student, verifiedResult.school);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Official Digital Transcript</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Not Found Alert */}
          {errorNotFound && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-sm">No Matching Encrypted Record Found</h5>
                <p className="text-xs text-amber-800 mt-1">
                  The identifier &quot;{searchInput}&quot; could not be resolved in the centralized registry. Please verify the NSIN format or ensure the issuing institution has completed synchronization.
                </p>
              </div>
            </div>
          )}

          {/* Security Standards Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">AES-256 Record Vault</span>
                <span>Tamper-evident symmetric encryption on all grade logs.</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">Zero-Knowledge Seals</span>
                <span>Third-parties verify authenticity without harvesting student PII.</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block">Federal Accreditation</span>
                <span>Signed directly by Registrar keys authorized by NUC &amp; NERDC.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Federal Republic of Nigeria &bull; National Education Database Act</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

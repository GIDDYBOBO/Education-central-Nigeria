import React, { useState } from 'react';
import { StudentProfile, School } from '../types';
import { ShieldCheck, Printer, Download, X, CheckCircle2, Lock, Award, Calendar, FileText, QrCode } from 'lucide-react';

interface StudentTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile | null;
  school: School | null;
}

export const StudentTranscriptModal: React.FC<StudentTranscriptModalProps> = ({
  isOpen,
  onClose,
  student,
  school,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !student || !school) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(student.encryptedHash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate file download
      const blob = new Blob(
        [
          `FEDERAL REPUBLIC OF NIGERIA - OFFICIAL ACADEMIC TRANSCRIPT\n` +
          `============================================================\n` +
          `Institution: ${school.name}\n` +
          `Accreditation: ${school.accreditationNumber}\n` +
          `Student: ${student.fullName} (NSIN: ${student.nsin})\n` +
          `Current Level: ${student.currentLevel}\n` +
          `Cumulative GPA: ${student.cumulativeGpa} / ${student.gpaScale}\n` +
          `Verification Hash: ${student.encryptedHash}\n` +
          `Registrar: ${school.registrarName}\n` +
          `Date of Issue: ${new Date().toLocaleDateString()}\n`
        ],
        { type: 'text/plain;charset=utf-8' }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TRANSCRIPT_${student.nsin}_${school.acronym}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 print:border-none print:shadow-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-slate-200 px-5 py-3 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>N-SEAR Encrypted Academic Credential Vault</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
              title="Print Official Transcript"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-medium text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isDownloading ? 'Exporting...' : 'Export Certified File'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Watermarked Document Body */}
        <div className="p-6 sm:p-8 space-y-6 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Official Federal Transcript Header */}
          <div className="text-center border-b-2 border-emerald-900/80 pb-5">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#008751]" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#008751]">
                FEDERAL REPUBLIC OF NIGERIA
              </span>
              <span className="w-3 h-3 rounded-full bg-[#008751]" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {school.name}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5 italic">
              &ldquo;{school.motto}&rdquo;
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {school.address} &bull; Accreditation No: <span className="font-mono font-semibold">{school.accreditationNumber}</span>
            </p>

            <div className="mt-3 inline-block px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              OFFICIAL CENTRALIZED ACADEMIC TRANSCRIPT
            </div>
          </div>

          {/* Student Dossier Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Candidate Full Name</span>
              <span className="font-bold text-slate-900 text-sm">{student.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">National Student ID (NSIN)</span>
              <span className="font-mono font-bold text-emerald-800 text-sm">{student.nsin}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Current Level / Class</span>
              <span className="font-bold text-slate-800">{student.currentLevel}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Department / Major</span>
              <span className="font-bold text-slate-800">{student.departmentOrTrack}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">State of Origin</span>
              <span className="font-semibold text-slate-800">{student.stateOfOrigin} State</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Gender / DOB</span>
              <span className="font-semibold text-slate-800">{student.gender} &bull; {student.dob}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Enrollment Cohort</span>
              <span className="font-semibold text-slate-800">{student.enrollmentYear}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Cumulative GPA</span>
              <span className="font-bold text-emerald-700 text-sm">
                {student.cumulativeGpa} / {student.gpaScale}
              </span>
            </div>
          </div>

          {/* Term-by-Term Detailed Grade Ledger */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Certified Term Breakdown &amp; Subject Grade Assessment</span>
            </h4>

            {student.termReports.map((report, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                {/* Term Header */}
                <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      {report.academicYear} &bull; {report.termOrSemester}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                      {report.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-medium text-slate-600">
                    {report.positionOrRank && (
                      <span className="text-amber-700 font-bold">Rank: {report.positionOrRank}</span>
                    )}
                    <span>Attendance: <strong className="text-slate-800">{report.attendancePercent}%</strong></span>
                    <span>Term GPA: <strong className="text-emerald-700">{report.gpaOrAverage} / {report.maxGpaOrScale}</strong></span>
                  </div>
                </div>

                {/* Subject Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Subject / Course Module</th>
                        <th className="py-2.5 px-3 text-center">Score / 100</th>
                        <th className="py-2.5 px-3 text-center">Certified Grade</th>
                        <th className="py-2.5 px-4">Performance Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {report.subjects.map((sub, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50/60">
                          <td className="py-2 px-4 font-medium text-slate-900">{sub.name}</td>
                          <td className="py-2 px-3 text-center font-mono font-semibold text-slate-800">{sub.score}</td>
                          <td className="py-2 px-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                              sub.grade.startsWith('A')
                                ? 'bg-emerald-100 text-emerald-800'
                                : sub.grade.startsWith('B')
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {sub.grade}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-slate-600 text-xs">{sub.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Conduct & Remarks Bar */}
                <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    <strong>Conduct:</strong> {report.conductRemark}
                  </span>
                  <span className="font-mono text-slate-400">
                    Sign Hash: {report.registrarSignHash}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Student Special Distinctions / Awards */}
          {student.awards && student.awards.length > 0 && (
            <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Special Academic Distinctions &amp; Honours</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {student.awards.map((award, aIdx) => (
                  <span key={aIdx} className="px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-medium shadow-xs">
                    &bull; {award}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cryptographic Seal & Registrar Sign-off Block */}
          <div className="pt-4 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            
            {/* Visual Simulated QR Seal */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="p-2 bg-white rounded-lg border border-slate-300 shadow-xs">
                <QrCode className="w-10 h-10 text-emerald-900" />
              </div>
              <div className="text-[11px]">
                <span className="font-bold text-slate-800 block">N-SEAR Digital Seal</span>
                <span className="text-slate-500 block">Scan to verify cryptographic authenticity</span>
                <span className="text-emerald-700 font-mono font-semibold">VALIDATED</span>
              </div>
            </div>

            {/* SHA-256 Ledger Hash */}
            <div className="text-[11px] sm:col-span-1">
              <span className="text-slate-400 block font-sans">Immutable Ledger Hash</span>
              <div
                onClick={handleCopyHash}
                className="font-mono text-slate-700 bg-slate-100 p-1.5 rounded cursor-pointer hover:bg-slate-200 truncate transition-colors"
                title="Click to copy hash"
              >
                {student.encryptedHash}
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">
                {isCopied ? 'Hash copied to clipboard!' : 'Click to copy hash'}
              </span>
            </div>

            {/* Registrar Signature */}
            <div className="text-right sm:text-right text-xs">
              <div className="font-serif italic text-emerald-900 text-sm font-semibold border-b border-slate-400 pb-1 mb-1">
                {school.registrarName}
              </div>
              <span className="font-bold text-slate-800 block">Registrar &amp; Secretary to Council</span>
              <span className="text-slate-500 text-[11px]">{school.name}</span>
            </div>

          </div>

          {/* Anti-Forgery Regulatory Notice */}
          <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
            This document is cryptographically generated via the Nigerian Centralized School &amp; Academic Records System (N-SEAR). Any alteration or forgery is a federal offense under the Cybercrimes Act of Nigeria.
          </div>

        </div>

      </div>
    </div>
  );
};

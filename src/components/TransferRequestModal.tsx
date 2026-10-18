import React, { useState } from 'react';
import { MOCK_SCHOOLS, MOCK_TRANSFER_REQUESTS } from '../data/mockDatabase';
import { TransferRequest } from '../types';
import { ArrowLeftRight, CheckCircle2, Clock, ShieldCheck, X, PlusCircle, Search, School as SchoolIcon } from 'lucide-react';

interface TransferRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferRequestModal: React.FC<TransferRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [transfers, setTransfers] = useState<TransferRequest[]>(MOCK_TRANSFER_REQUESTS);
  const [activeTab, setActiveTab] = useState<'view' | 'create'>('view');

  // Form states
  const [studentNsin, setStudentNsin] = useState('');
  const [studentName, setStudentName] = useState('');
  const [fromSchoolId, setFromSchoolId] = useState(MOCK_SCHOOLS[0].id);
  const [toSchoolId, setToSchoolId] = useState(MOCK_SCHOOLS[1].id);
  const [reason, setReason] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNsin || !studentName || !reason) return;

    const fromSchool = MOCK_SCHOOLS.find((s) => s.id === fromSchoolId);
    const toSchool = MOCK_SCHOOLS.find((s) => s.id === toSchoolId);

    const newTransfer: TransferRequest = {
      id: `TX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      requestDate: new Date().toISOString().split('T')[0],
      studentNsin: studentNsin.trim().toUpperCase(),
      studentName: studentName.trim(),
      fromSchoolId,
      fromSchoolName: fromSchool?.name || 'Selected Origin School',
      toSchoolId,
      toSchoolName: toSchool?.name || 'Selected Destination School',
      reason: reason.trim(),
      status: 'Pending Verification',
      clearanceHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`.toUpperCase(),
    };

    setTransfers([newTransfer, ...transfers]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveTab('view');
      setStudentNsin('');
      setStudentName('');
      setReason('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
                <ArrowLeftRight className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Inter-School Transfer &amp; Transcript Exchange</h3>
                <p className="text-emerald-200 text-xs">
                  Unified National Protocol for Instant Academic Record Portability
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

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'view'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              Active Transfers ({transfers.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'create'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Initiate New Student Transfer</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'view' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Centralized Ledger Verified Inter-School Clearances</span>
                <span className="font-mono text-emerald-700">Live Sync Enabled</span>
              </div>

              <div className="space-y-3">
                {transfers.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/60 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-800 bg-slate-200/80 px-2 py-0.5 rounded">
                          {tx.id}
                        </span>
                        <span className="text-xs text-slate-500">&bull; {tx.requestDate}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        tx.status === 'Approved & Sealed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {tx.status === 'Approved & Sealed' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>{tx.status}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-400 block">Student Name &amp; NSIN</span>
                        <span className="font-bold text-slate-900">{tx.studentName}</span>
                        <span className="block font-mono text-emerald-700 font-semibold">{tx.studentNsin}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Transfer Route</span>
                        <div className="flex items-center gap-1.5 font-medium text-slate-800">
                          <span className="truncate max-w-[150px]">{tx.fromSchoolName}</span>
                          <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[150px] text-emerald-800 font-bold">{tx.toSchoolName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-100/60 p-2.5 rounded-lg flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-700">Transfer Reason:</span> {tx.reason}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>Clearance Hash: {tx.clearanceHash}</span>
                      <span className="text-emerald-700 font-sans font-medium">NDPR Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateTransfer} className="space-y-4">
              {submittedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transfer request dispatched to issuing institution registrar successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    National Student Identification Number (NSIN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentNsin}
                    onChange={(e) => setStudentNsin(e.target.value)}
                    placeholder="e.g. NSIN-LA-2023-88421"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Tariq Olawale Danjuma"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Origin Institution (Transferring From) *
                  </label>
                  <select
                    value={fromSchoolId}
                    onChange={(e) => setFromSchoolId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {MOCK_SCHOOLS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.state})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Institution (Transferring To) *
                  </label>
                  <select
                    value={toSchoolId}
                    onChange={(e) => setToSchoolId(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {MOCK_SCHOOLS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Justification / Reason for Transfer *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Federal civil service relocation, progression to unity college, or inter-university academic mobility..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  By initiating this transfer, the student’s certified encrypted transcript ledger will be securely routed through the Federal Ministry of Education’s Central Clearing House. Both registrars will be notified for digital cryptographic sign-off.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('view')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
                >
                  Submit &amp; Cryptographically Seal Request
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>N-SEAR Inter-Institutional Exchange Gateway</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

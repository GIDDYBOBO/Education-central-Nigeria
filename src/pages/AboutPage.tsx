import React from 'react';
import { CommunityKnowledgeExchange } from '../components/CommunityKnowledgeExchange';
import {
  ShieldCheck,
  Lock,
  Database,
  KeyRound,
  FileCheck,
  Building,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onOpenVerification: () => void;
  onNavigateToSchools: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenVerification,
  onNavigateToSchools,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>National Academic Infrastructure Whitepaper</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Unifying All Nigerian Academic Records in a <span className="text-[#008751]">Secure Central Database</span>.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The Nigerian Centralized School &amp; Academic Records System (N-SEAR / EduCentral) is the national digital ledger created to guarantee educational credential authenticity, eliminate transcript racketeering, protect student privacy, and empower institutions with instantaneous record interoperability.
        </p>
      </div>

      {/* Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">
            Military-Grade Data Encryption
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All student grades, personal identifiers, and term logs are encrypted both in transit (TLS 1.3) and at rest using authenticated AES-256-GCM. Unencrypted plaintext never enters the distributed database index.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">
            Universal NSIN Standard
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every Nigerian pupil is assigned an immutable National Student Identification Number (NSIN) that follows them seamlessly from Basic/Primary School to Secondary Unity Colleges, WAEC/NECO registrations, and University matriculation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">
            Inter-Institutional Transfer
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When families relocate across Nigeria or students transfer between institutions, academic records are transferred in seconds through automated registrar digital sign-offs, preserving full grade history.
          </p>
        </div>

      </div>

      {/* Deep Dive: Technical Encryption & Anti-Forgery Architecture */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900/50 shadow-2xl space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            Technical Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How The Centralized Ledger Secures Records
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Designed to withstand tampering, identity theft, and unauthorized alteration while remaining fully compliant with the Nigeria Data Protection Act (NDPA) and NDPR regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>SHA-256 Merkle Ledger Seals</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Whenever a school registrar publishes certified end-of-term results, an immutable SHA-256 cryptographic seal is generated. Any subsequent attempt to alter a single score alters the hash tree, causing instant verification failure across all national gateway nodes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <KeyRound className="w-4 h-4" />
              <span>Zero-Knowledge Proof Verification</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Embassies, employers, and foreign universities can verify that a student attained a minimum GPA or passed specific WAEC subjects without accessing the candidate&apos;s complete medical history, parental home address, or private biometric records.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>Offline-Capable Syncing for Remote LGAs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Recognizing power and internet variations across rural Nigerian local governments, local school management systems cache cryptographically signed batch records and synchronize automatically upon reconnecting to national telemetry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Building className="w-4 h-4" />
              <span>Federal Agency Synchronization</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct webhook connectors link EduCentral with the National Universities Commission (NUC), Universal Basic Education Commission (UBEC), WAEC, NECO, and the National Youth Service Corps (NYSC) call-up clearinghouse.
            </p>
          </div>
        </div>
      </div>

      {/* Stakeholders Matrix */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            National Interoperability
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Who Benefits From EduCentral?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <GraduationCap className="w-8 h-8 text-emerald-700" />
            <h4 className="font-bold text-slate-900 text-sm">Students &amp; Alumni</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant access to verifiable digital transcripts and report cards anywhere in the world without waiting months for physical mail.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <Building className="w-8 h-8 text-emerald-700" />
            <h4 className="font-bold text-slate-900 text-sm">School Registrars</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drastically reduced administrative workload for transcript requests and 100% elimination of counterfeit school letters.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <Award className="w-8 h-8 text-emerald-700" />
            <h4 className="font-bold text-slate-900 text-sm">Employers &amp; Embassies</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time background verification using NSIN or QR code seals with mathematical guarantees against fake credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
            <Globe className="w-8 h-8 text-emerald-700" />
            <h4 className="font-bold text-slate-900 text-sm">Federal Government</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accurate, real-time national educational statistics to inform policy planning, curriculum reform, and research grants.
            </p>
          </div>
        </div>
      </div>

      {/* Community Knowledge Exchange: Thread-based dialogue for verified educators & students */}
      <CommunityKnowledgeExchange />

      {/* Call to Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Verify or Explore Academic Records?
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Experience the instant verification engine or browse institutions across Nigeria’s 36 states and the Federal Capital Territory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onOpenVerification}
            className="px-6 py-3 bg-white text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-emerald-50 transition-colors"
          >
            Verify a Record Now
          </button>
          <button
            onClick={onNavigateToSchools}
            className="px-6 py-3 bg-emerald-950/60 hover:bg-emerald-950 text-white font-bold text-xs sm:text-sm rounded-xl border border-emerald-600/40 transition-colors"
          >
            Explore Schools Directory
          </button>
        </div>
      </div>

    </div>
  );
};

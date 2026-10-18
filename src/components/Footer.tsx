import React from 'react';
import { ShieldCheck, Lock, Heart, FileCheck, Landmark, Globe } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'schools' | 'about') => void;
  onOpenVerification: () => void;
  onOpenTransfers: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenVerification,
  onOpenTransfers,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Upper Badge & Security Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-200">
              National Security Classification: Official &bull; Data Encrypted under NDPR (2023)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              AES-256-GCM Cryptographic Record Seals
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">SHA-256 Distributed Ledger Consensus</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Mandate & Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                EduCentral <span className="text-emerald-400">Nigeria</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The unified, centralized academic records repository connecting all Nigerian basic, secondary, and tertiary educational institutions under the Federal Ministry of Education.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-mono">
              FME / NERDC / NUC Interoperability Framework
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              National Database
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Central Gateway Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('schools')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  All 36 States + FCT School Registry
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVerification}
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold"
                >
                  Instant Student Record Verification
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTransfers}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Inter-School Student Record Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-emerald-400 transition-colors text-slate-300"
                >
                  Community Knowledge Exchange
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Statutory Agencies & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Partner Agencies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Landmark className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>National Universities Commission (NUC)</span>
              </li>
              <li className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Universal Basic Education Commission (UBEC)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>WAEC &amp; NECO Digital Results Clearing</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Nigeria Data Protection Commission (NDPC)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Registration & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Institutional Support
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accredited Nigerian schools can synchronize student cohort records and digital certificates via encrypted API connectors.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 block">Registrar Emergency Desk:</span>
              <span className="font-mono text-emerald-400 block">+234 (0) 9 461 3000</span>
              <span className="text-slate-500 text-[11px] block">Abuja Federal Secretariat, FCT</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} EduCentral Nigeria (N-SEAR). Federal Ministry of Education. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy &amp; NDPR</span>
            <span>&bull;</span>
            <span>Security Whitepaper</span>
            <span>&bull;</span>
            <span>API Docs for Nigerian Schools</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

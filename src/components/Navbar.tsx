import React, { useState } from 'react';
import { ShieldCheck, Search, Menu, X, ArrowLeftRight, BookOpen, School as SchoolIcon, Home, Info, Lock, User } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'schools' | 'about';
  onSelectTab: (tab: 'home' | 'schools' | 'about') => void;
  onOpenVerification: () => void;
  onOpenTransfers: () => void;
  onOpenStudentProfileManager: () => void;
  selectedSchoolSlug?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenVerification,
  onOpenTransfers,
  onOpenStudentProfileManager,
  selectedSchoolSlug,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'schools' | 'about') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      
      {/* Top National Ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="h-full flex-1 bg-[#008751]" />
        <div className="h-full flex-1 bg-white border-x border-slate-200" />
        <div className="h-full flex-1 bg-[#008751]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & National Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  EduCentral <span className="text-emerald-700">Nigeria</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 uppercase">
                  N-SEAR v4.2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Federal Ministry of Education &bull; Centralized School Records Database
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentTab === 'home' && !selectedSchoolSlug
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('schools')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentTab === 'schools' || selectedSchoolSlug
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <SchoolIcon className="w-4 h-4" />
              <span>Schools Directory</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentTab === 'about'
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About &amp; Security</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenStudentProfileManager}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200 rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-300"
              title="Student Profile & Academic Record Management System"
            >
              <User className="w-3.5 h-3.5 text-emerald-800" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={onOpenTransfers}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 transition-colors"
              title="Inter-School Student Record Transfer Portal"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-700" />
              <span>Record Transfers</span>
            </button>

            <button
              onClick={onOpenVerification}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-xs hover:shadow flex items-center gap-2 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-200" />
              <span>Verify Records</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenVerification}
              className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200 shadow-xl">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentTab === 'home' && !selectedSchoolSlug
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavClick('schools')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentTab === 'schools' || selectedSchoolSlug
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700'
            }`}
          >
            <SchoolIcon className="w-4 h-4 text-emerald-600" />
            <span>Schools Directory &amp; Records</span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 ${
              currentTab === 'about'
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-700'
            }`}
          >
            <Info className="w-4 h-4 text-emerald-600" />
            <span>About Centralized Database</span>
          </button>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentProfileManager();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-950 border border-emerald-200 flex items-center gap-2.5"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>Student Profile &amp; Records Manager</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTransfers();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 flex items-center gap-2.5"
            >
              <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
              <span>Inter-School Student Record Transfers</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVerification();
              }}
              className="w-full text-center px-4 py-3 rounded-lg text-sm font-bold bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Record Verification</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

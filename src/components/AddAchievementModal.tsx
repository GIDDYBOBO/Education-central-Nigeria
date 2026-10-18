import React, { useState } from 'react';
import { School, Achievement, AchievementCategory } from '../types';
import {
  Award,
  TrendingUp,
  GraduationCap,
  Building,
  HeartHandshake,
  X,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AddAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  onAddAchievement: (achievement: Achievement) => void;
}

export const AddAchievementModal: React.FC<AddAchievementModalProps> = ({
  isOpen,
  onClose,
  school,
  onAddAchievement,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('Rankings');
  const [year, setYear] = useState('2026');
  const [awardingBody, setAwardingBody] = useState('');
  const [description, setDescription] = useState('');
  const [badgeType, setBadgeType] = useState<'Gold' | 'Silver' | 'Distinction' | 'National'>('National');
  
  // Category specific fields
  const [rankingPosition, setRankingPosition] = useState('');
  const [alumniName, setAlumniName] = useState('');
  const [alumniRole, setAlumniRole] = useState('');
  const [impactMetric, setImpactMetric] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !awardingBody) return;

    const newAch: Achievement = {
      id: `ach-${Date.now()}`,
      title: title.trim(),
      year: year.trim(),
      category,
      awardingBody: awardingBody.trim(),
      description: description.trim(),
      badgeType,
      rankingPosition: category === 'Rankings' ? rankingPosition.trim() : undefined,
      alumniName: category === 'Notable Alumni' ? alumniName.trim() : undefined,
      alumniRole: category === 'Notable Alumni' ? alumniRole.trim() : undefined,
      impactMetric: (category === 'Infrastructure' || category === 'Community Impact') ? impactMetric.trim() : undefined,
      dateAdded: new Date().toISOString(),
    };

    onAddAchievement(newAch);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20">
                <Award className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Register School Achievement</h3>
                <p className="text-emerald-200 text-xs">
                  Official Institutional Showcase &bull; {school.name} ({school.acronym})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Achievement registered &amp; cryptographically linked to {school.name}!</span>
            </div>
          )}

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Achievement Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { cat: 'Rankings' as AchievementCategory, icon: TrendingUp, label: 'School Rankings' },
                { cat: 'Awards' as AchievementCategory, icon: Award, label: 'Awards Received' },
                { cat: 'Notable Alumni' as AchievementCategory, icon: GraduationCap, label: 'Notable Alumni' },
                { cat: 'Infrastructure' as AchievementCategory, icon: Building, label: 'Infrastructure Dev' },
                { cat: 'Community Impact' as AchievementCategory, icon: HeartHandshake, label: 'Community Impact' },
                { cat: 'STEM & Robotics' as AchievementCategory, icon: Sparkles, label: 'STEM & Innovation' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.cat;
                return (
                  <button
                    key={item.cat}
                    type="button"
                    onClick={() => setCategory(item.cat)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Achievement Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  category === 'Rankings'
                    ? 'e.g. Ranked #1 in Nigeria for Biomedical Research'
                    : category === 'Notable Alumni'
                    ? 'e.g. Chief Justice of Nigeria / WHO Pandemic Director'
                    : 'e.g. Commissioning of 500-Seat Automated STEM Center'
                }
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Year / Session *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026 or Alumnus Class"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Conditional Category Specific Fields */}
          {category === 'Rankings' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ranking Position / Tier
              </label>
              <input
                type="text"
                value={rankingPosition}
                onChange={(e) => setRankingPosition(e.target.value)}
                placeholder="e.g. #1 in Nigeria / Top 500 Universities Globally"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          {category === 'Notable Alumni' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alumni Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={alumniName}
                  onChange={(e) => setAlumniName(e.target.value)}
                  placeholder="e.g. Dr. Ngozi Okonjo-Iweala"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alumni Key Role / Notable Contribution *
                </label>
                <input
                  type="text"
                  required
                  value={alumniRole}
                  onChange={(e) => setAlumniRole(e.target.value)}
                  placeholder="e.g. Director-General, World Trade Organization"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {(category === 'Infrastructure' || category === 'Community Impact') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Impact Metric / Scope *
              </label>
              <input
                type="text"
                required
                value={impactMetric}
                onChange={(e) => setImpactMetric(e.target.value)}
                placeholder={
                  category === 'Infrastructure'
                    ? 'e.g. 100 kW solar microgrid powering 6 faculties 24/7'
                    : 'e.g. Free literacy tutoring for 2,500 rural community pupils'
                }
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}

          {/* Awarding Body & Badge Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Awarding Body / Certifying Organization *
              </label>
              <input
                type="text"
                required
                value={awardingBody}
                onChange={(e) => setAwardingBody(e.target.value)}
                placeholder="e.g. National Universities Commission (NUC), WAEC, TETFund"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Honour Distinction Level *
              </label>
              <select
                value={badgeType}
                onChange={(e) => setBadgeType(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="National">National Honour</option>
                <option value="Gold">Gold Medal / 1st Place</option>
                <option value="Distinction">Distinction Grade</option>
                <option value="Silver">Silver Merit</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description &amp; Verification Background *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context on how this achievement was attained, evaluation benchmarks, or institutional milestone reached..."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              This record will be added to {school.name}&apos;s public achievement showcase and signed with the school accreditation code.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publish School Achievement</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

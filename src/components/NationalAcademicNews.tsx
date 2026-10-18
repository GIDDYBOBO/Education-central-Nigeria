import React, { useState } from 'react';
import { MOCK_ACADEMIC_NEWS } from '../data/mockDatabase';
import { AcademicNewsItem } from '../types';
import {
  Newspaper,
  BookOpen,
  Calendar,
  Building2,
  FileCheck2,
  Search,
  ExternalLink,
  X,
  Sparkles,
  Dna,
  Award,
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const NationalAcademicNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<AcademicNewsItem | null>(null);

  const categories = [
    'All',
    'Policy Update',
    'Bioscience Discovery',
    'Institutional Ranking',
    'Curriculum Reform',
    'Research Breakthrough'
  ];

  const filteredNews = MOCK_ACADEMIC_NEWS.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchSource = item.source.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchSource && !matchTag) return false;
    }
    return true;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Policy Update':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Bioscience Discovery':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Institutional Ranking':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Curriculum Reform':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Research Breakthrough':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-4 h-4 text-emerald-600" />
            <span>National Educational Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            National Academic News &amp; Policy Gazettes
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Recent educational policy updates from the Federal Ministry of Education, NUC accreditation circulars, and peer-reviewed research findings from Nigerian institutions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search policy circulars, grants..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured News Spotlight (First featured article) */}
      {filteredNews.length > 0 && filteredNews[0].featured && (
        <div
          onClick={() => setActiveArticle(filteredNews[0])}
          className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-emerald-500/30 shadow-xl cursor-pointer group hover:border-emerald-400/60 transition-all relative overflow-hidden"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30 uppercase tracking-wide">
                Featured Gazette
              </span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-slate-300">{filteredNews[0].publishedDate}</span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-emerald-400 font-mono text-[11px]">{filteredNews[0].officialDocRef}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold group-hover:text-emerald-300 transition-colors">
              {filteredNews[0].title}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
              {filteredNews[0].summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs">
              <span className="text-slate-400 font-medium">
                Authority: <strong className="text-white">{filteredNews[0].source}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                Read Full Gazette &rarr;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => setActiveArticle(news)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${getCategoryBadgeClass(news.category)}`}>
                  {news.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{news.readTime}</span>
              </div>

              <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {news.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {news.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {news.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="truncate max-w-[170px] font-medium">
                {news.institution || news.source}
              </div>
              <span className="font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Brief &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold border ${getCategoryBadgeClass(activeArticle.category)}`}>
                    {activeArticle.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
                <span>Published: <strong>{activeArticle.publishedDate}</strong></span>
                <span>&bull;</span>
                <span>Source: <strong>{activeArticle.source}</strong></span>
                {activeArticle.officialDocRef && (
                  <>
                    <span>&bull;</span>
                    <span className="font-mono text-emerald-300">Ref: {activeArticle.officialDocRef}</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                <strong>Executive Summary:</strong> {activeArticle.summary}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  Official Detailed Findings &amp; Gazetted Provisions
                </h4>
                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {activeArticle.content}
                </p>
              </div>

              {activeArticle.institution && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lead Reporting Institution:</span>
                  <span className="font-bold text-slate-900">{activeArticle.institution}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeArticle.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified by Federal Ministry of Education Registry</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg font-bold hover:bg-emerald-900 transition-colors"
              >
                Close Gazette
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import { MOCK_SCHOOLS } from '../data/mockDatabase';
import { KnowledgeThread, ThreadReply, ThreadAuthor, KnowledgeCategory } from '../types';
import {
  MessageSquare,
  Sparkles,
  Search,
  ThumbsUp,
  Share2,
  CheckCircle2,
  UserCheck,
  PlusCircle,
  X,
  Filter,
  BookOpen,
  GraduationCap,
  Building,
  Award,
  ChevronDown,
  ChevronUp,
  Send,
  ShieldCheck,
  Bookmark
} from 'lucide-react';

const INITIAL_THREADS: KnowledgeThread[] = [
  {
    id: 'thread-001',
    title: 'Inquiry-Based Learning vs. Passive Lecture: Comparative WASSCE Physics Outcomes across Lagos Unity Colleges',
    category: 'Pedagogical Methods',
    author: {
      name: 'Dr. Olumide Falade',
      role: 'Verified Educator',
      schoolName: "King's College, Lagos",
      state: 'Lagos',
      avatarInitials: 'OF',
      verified: true,
    },
    date: '2026-10-14',
    summary: 'A 2-year classroom study across senior secondary physics cohorts examining how low-cost bench micro-experiments and peer guided inquiry outperform traditional didactic blackboard lecturing in terminal WAEC/NECO distinction rates.',
    content: `Traditional science education in many Nigerian secondary schools remains predominantly didactic, centered on rote note-copying from the chalkboard. In our 2024–2026 pilot across King's College senior streams (SSS 1–SSS 3), we reorganized the physics curriculum into 45-minute modular inquiry sessions:

1. Hypothesis Formulation: Students spend the first 10 minutes predicting experimental outcomes (e.g. electromagnetic induction or refraction indices) before touching equipment.
2. Low-Cost Bench Kits: Replacing expensive imported apparatus with locally fabricated optical prisms, galvanometer coils, and standardized solar cells.
3. Peer Argumentation: Students defend their numerical anomalies in 3-person squads prior to teacher consolidation.

Results: Over 4 consecutive mock examinations and final WASSCE results, distinction rates (A1–B3) rose from 68.2% to 89.4%, with notable gains in practical alternative-to-practical test scores.`,
    tags: ['Physics', 'Inquiry Learning', 'WASSCE', 'Secondary STEM', 'Unity Schools'],
    upvotes: 42,
    repliesCount: 3,
    citations: [
      'Falade, O. & Jinadu, B. (2025). Empirical STEM Interventions in West African Federal Colleges. Journal of Nigerian Science Educators, 14(2), 45-62.',
      'NERDC Curriculum Benchmarks for Senior Secondary Sciences (2024 Edition).'
    ],
    replies: [
      {
        id: 'rep-01',
        author: {
          name: 'Mrs. Funmilayo Adeleke',
          role: 'Secondary STEM Teacher',
          schoolName: "Queen's College, Lagos",
          state: 'Lagos',
          avatarInitials: 'FA',
          verified: true,
        },
        date: '2026-10-15',
        content: "We observed a similar phenomenon at Queen's College in our chemistry wet lab. When students formulate their own titration indicators using hibiscus (Zobo) extracts before touching phenolphthalein, their conceptual retention of acid-base equilibrium increases remarkably.",
        upvotes: 18,
        isFacultyEndorsed: true,
      },
      {
        id: 'rep-02',
        author: {
          name: 'Tariq Olawale Danjuma',
          role: 'Student Scholar',
          schoolName: "King's College, Lagos",
          state: 'Lagos',
          avatarInitials: 'TD',
          verified: true,
        },
        date: '2026-10-16',
        content: "Speaking as a student in this program, the peer debates made a huge difference. In kinematics, defending our motion graphs against classmate questions made the calculus intuition click much faster than copying solved formulas.",
        upvotes: 14,
        isFacultyEndorsed: false,
      }
    ]
  },
  {
    id: 'thread-002',
    title: 'Empirical Analysis of Centralized Digital Transcripts on Nigerian Graduate Labor Mobility & NYSC Verification Latency',
    category: 'Educational Research Findings',
    author: {
      name: 'Prof. Folakemi Adeleke',
      role: 'Faculty Researcher',
      schoolName: 'University of Ibadan',
      state: 'Oyo',
      avatarInitials: 'FA',
      verified: true,
    },
    date: '2026-10-10',
    summary: 'Evaluating longitudinal clearance data across 14,000 graduates from federal and state universities under the centralized N-SEAR cryptographic records pilot (2023–2026).',
    content: `Transcript racketeering and delayed verification have historically hindered Nigerian graduates from accessing foreign postgraduate scholarships, employment offers, and National Youth Service Corps (NYSC) call-up mobilizations. 

Our research cohort compared traditional manual courier transcript requests against the centralized N-SEAR digital hash validation framework across 14,200 alumni from UI, UNILAG, UNN, and ABU Zaria:

Key Findings:
- Turnaround Time: Average transcript delivery dropped from 48.5 business days to 42 seconds via instant cryptographic verification.
- Fraud Suppression: Zero incidences of counterfeit academic transcripts survived algorithmic verification against the registrar's digital seal.
- Economic Savings: Students and institutions saved an estimated ₦1.8 billion annually in courier logistics, notarization costs, and repeated physical visits to university campuses.`,
    tags: ['Higher Education', 'Digital Governance', 'NYSC', 'Economic Impact', 'University of Ibadan'],
    upvotes: 68,
    repliesCount: 2,
    citations: [
      'Adeleke, F. & Saliu, G. (2026). Digital Ledgers in African Tertiary Administration: The Nigerian Paradigm. African Higher Education Review, 28(1), 112-135.',
      'National Universities Commission (NUC) Annual Registry Audit Report 2025.'
    ],
    replies: [
      {
        id: 'rep-03',
        author: {
          name: 'Mrs. Olakunle E. Makinde',
          role: 'Curriculum Specialist',
          schoolName: 'University of Lagos',
          state: 'Lagos',
          avatarInitials: 'OM',
          verified: true,
        },
        date: '2026-10-11',
        content: 'From the UNILAG registry perspective, the reduction in physical human traffic to the records office has freed our staff to concentrate on archival digitization and rapid inter-institutional student transfers.',
        upvotes: 27,
        isFacultyEndorsed: true,
      }
    ]
  },
  {
    id: 'thread-003',
    title: 'Bilingual Vernacular Scaffolding in Early Basic Education: Integrating Indigenous Concepts with English Numeracy',
    category: 'Pedagogical Methods',
    author: {
      name: 'Mrs. Funmilayo Babatunde',
      role: 'Verified Educator',
      schoolName: 'Grange School, Ikeja',
      state: 'Lagos',
      avatarInitials: 'FB',
      verified: true,
    },
    date: '2026-10-06',
    summary: 'Classroom trials showing that anchoring foundational arithmetic using indigenous linguistic counting systems (Yoruba, Hausa, Igbo base concepts) accelerates early numeracy comprehension before introducing abstract English notation.',
    content: `Language barriers in primary education frequently compound math anxiety. When children are forced to process both unfamiliar English linguistic constructs and abstract numerical logic simultaneously, foundational deficits emerge.

In our early-years trial across Basic 1–3:
- We scaffolded place-value concepts using indigenous tactile counting games (such as Ayo Olopon / Mancala grids).
- Mathematical word problems were presented first in the child's mother tongue (Yoruba, Hausa, or Igbo) before formal English translation.
- Retention rates and mental arithmetic speed improved by 41% compared to control cohorts taught exclusively in English.`,
    tags: ['Basic Education', 'Numeracy', 'Indigenous Pedagogy', 'Linguistics', 'Primary School'],
    upvotes: 35,
    repliesCount: 1,
    citations: [
      'Babatunde, F. (2025). Indigenous Cognitive Scaffolding in Early Childhood Mathematics. Nigerian Journal of Basic Education, 9(3), 88-104.'
    ],
    replies: [
      {
        id: 'rep-04',
        author: {
          name: 'Mallam Rabiu Samaila',
          role: 'Curriculum Specialist',
          schoolName: 'Ahmadu Bello University',
          state: 'Kaduna',
          avatarInitials: 'RS',
          verified: true,
        },
        date: '2026-10-08',
        content: 'This aligns with research from the Institute for Education at ABU Zaria. Using Hausa base-10 numerical idioms in rural primary schools significantly improved pupil engagement with multiplication tables.',
        upvotes: 19,
        isFacultyEndorsed: true,
      }
    ]
  },
  {
    id: 'thread-004',
    title: 'Virtual Biological Simulation in Resource-Constrained Environments: Offline WebGL & Mobile Phenotype Mapping',
    category: 'EdTech & Laboratory Innovation',
    author: {
      name: 'Amarachi Chioma Eze',
      role: 'Student Scholar',
      schoolName: "Redeemer's University (ACEGID)",
      state: 'Osun',
      avatarInitials: 'AE',
      verified: true,
    },
    date: '2026-09-29',
    summary: 'How undergraduate researchers and secondary science teachers can deploy offline WebGL simulators to teach molecular biology, CRISPR gene editing, and microbial genetics without expensive laboratory consumables.',
    content: `Many state-owned and rural secondary schools lack uninterrupted electricity and chilled reagent storage for wet biology experiments. Through our ACEGID outreach initiative, we designed offline-first web interactives running on standard Android smartphones and low-power tablets:

1. Offline Vector Graphics: Simulating DNA restriction enzyme digestion and gel electrophoresis migration in real time.
2. Low Data Footprint: Models pre-cache in local browser storage, requiring zero cellular data during class hours.
3. Student Diagnostic Competence: Students who trained on virtual micropipetting and PCR cycle simulations demonstrated 75% higher manual accuracy when subsequently given access to physical laboratories.`,
    tags: ['EdTech', 'Genomics', 'Offline Learning', 'ACEGID', 'Laboratory Innovation'],
    upvotes: 53,
    repliesCount: 1,
    citations: [
      'Happi, C. & Eze, A. (2025). Mobile Genomic Literacy Toolkits for West African Classrooms. African Pathogen Journal, 11(2), 200-215.'
    ],
    replies: [
      {
        id: 'rep-05',
        author: {
          name: 'Dr. Mojisola Olarinde',
          role: 'Faculty Researcher',
          schoolName: 'University of Lagos',
          state: 'Lagos',
          avatarInitials: 'MO',
          verified: true,
        },
        date: '2026-09-30',
        content: 'Superb initiative. We have adopted this exact mobile simulation pipeline in our UNILAG undergraduate genetics tutorials for over 800 students per session with outstanding feedback.',
        upvotes: 21,
        isFacultyEndorsed: true,
      }
    ]
  }
];

export const CommunityKnowledgeExchange: React.FC = () => {
  const [threads, setThreads] = useState<KnowledgeThread[]>(INITIAL_THREADS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeThread, setActiveThread] = useState<KnowledgeThread | null>(null);

  // New thread modal
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<KnowledgeCategory>('Pedagogical Methods');
  const [newAuthorName, setNewAuthorName] = useState('Dr. Kingsley Nnamdi');
  const [newAuthorRole, setNewAuthorRole] = useState<ThreadAuthor['role']>('Verified Educator');
  const [newSchoolName, setNewSchoolName] = useState(MOCK_SCHOOLS[0].name);
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Pedagogy, Curriculum, Active Learning');
  const [newCitation, setNewCitation] = useState('');

  // Inline reply form state
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthorName, setReplyAuthorName] = useState('Engr. Amina Bello');
  const [replyAuthorRole, setReplyAuthorRole] = useState<ThreadAuthor['role']>('Secondary STEM Teacher');
  const [replySchoolName, setReplySchoolName] = useState(MOCK_SCHOOLS[1].name);

  const categories = [
    'All',
    'Pedagogical Methods',
    'Educational Research Findings',
    'Curriculum & Assessment',
    'EdTech & Laboratory Innovation',
  ];

  const filteredThreads = threads.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchAuthor = t.author.name.toLowerCase().includes(q);
      const matchSchool = t.author.schoolName.toLowerCase().includes(q);
      const matchSummary = t.summary.toLowerCase().includes(q);
      const matchTag = t.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchSchool && !matchSummary && !matchTag) {
        return false;
      }
    }
    return true;
  });

  const handleUpvoteThread = (threadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setThreads(
      threads.map((t) => (t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
    if (activeThread && activeThread.id === threadId) {
      setActiveThread({ ...activeThread, upvotes: activeThread.upvotes + 1 });
    }
  };

  const handleUpvoteReply = (replyId: string) => {
    if (!activeThread) return;
    const updatedReplies = activeThread.replies.map((r) =>
      r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r
    );
    const updatedThread = { ...activeThread, replies: updatedReplies };
    setActiveThread(updatedThread);
    setThreads(threads.map((t) => (t.id === activeThread.id ? updatedThread : t)));
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeThread) return;

    const newReply: ThreadReply = {
      id: `rep-${Date.now()}`,
      author: {
        name: replyAuthorName.trim(),
        role: replyAuthorRole,
        schoolName: replySchoolName,
        state: 'Verified Federal Node',
        avatarInitials: replyAuthorName
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
        verified: true,
      },
      date: new Date().toISOString().split('T')[0],
      content: replyContent.trim(),
      upvotes: 1,
      isFacultyEndorsed: replyAuthorRole === 'Verified Educator' || replyAuthorRole === 'Faculty Researcher',
    };

    const updatedThread: KnowledgeThread = {
      ...activeThread,
      replies: [...activeThread.replies, newReply],
      repliesCount: activeThread.repliesCount + 1,
    };

    setActiveThread(updatedThread);
    setThreads(threads.map((t) => (t.id === activeThread.id ? updatedThread : t)));
    setReplyContent('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const createdThread: KnowledgeThread = {
      id: `thread-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      author: {
        name: newAuthorName.trim(),
        role: newAuthorRole,
        schoolName: newSchoolName,
        state: 'Federal Republic of Nigeria',
        avatarInitials: newAuthorName
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
        verified: true,
      },
      date: new Date().toISOString().split('T')[0],
      summary: newSummary.trim() || newContent.trim().substring(0, 160) + '...',
      content: newContent.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Pedagogy', 'Research'],
      upvotes: 1,
      repliesCount: 0,
      replies: [],
      citations: newCitation.trim() ? [newCitation.trim()] : undefined,
    };

    setThreads([createdThread, ...threads]);
    setIsNewThreadOpen(false);
    setActiveThread(createdThread);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900/60 shadow-2xl space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wide">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Structured Peer Deliberation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Community Knowledge Exchange
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A structured, thread-based forum where verified Nigerian educators, academic researchers, and student scholars exchange empirical pedagogical methods, classroom innovations, and educational policy findings.
          </p>
        </div>

        <button
          onClick={() => setIsNewThreadOpen(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start Knowledge Thread</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussion threads..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800/90 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-400"
          />
        </div>

      </div>

      {/* Main Discussions Grid & Active Thread View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Thread List (6 or 5 cols when active, 12 when not) */}
        <div className={`${activeThread ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
          <div className="text-xs text-slate-400 flex items-center justify-between font-mono">
            <span>SHOWING {filteredThreads.length} RESEARCH THREADS</span>
            <span className="text-emerald-400">CREDENTIALS VERIFIED</span>
          </div>

          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isSelected = activeThread?.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThread(thread)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/80 shadow-lg'
                      : 'bg-slate-850/80 hover:bg-slate-800/90 border-slate-800'
                  }`}
                >
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {thread.category}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{thread.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base text-white leading-snug line-clamp-2">
                    {thread.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {thread.summary}
                  </p>

                  {/* Author Banner */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-bold flex items-center justify-center">
                        {thread.author.avatarInitials}
                      </div>
                      <div className="truncate max-w-[170px]">
                        <span className="font-semibold text-white block">{thread.author.name}</span>
                        <span className="text-slate-400 text-[10px] truncate block">{thread.author.schoolName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <button
                        onClick={(e) => handleUpvoteThread(thread.id, e)}
                        className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                        title="Upvote thread"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-mono">{thread.upvotes}</span>
                      </button>

                      <div className="flex items-center gap-1 text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono">{thread.repliesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Thread Discussion Inspector */}
        {activeThread && (
          <div className="lg:col-span-7 bg-slate-850 rounded-2xl border border-slate-700/80 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            
            {/* Top Toolbar */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-700/80 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    {activeThread.category}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">{activeThread.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {activeThread.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveThread(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Close Thread Detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author Dossier */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-emerald-200 font-bold flex items-center justify-center text-sm shadow-xs">
                  {activeThread.author.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <span>{activeThread.author.name}</span>
                    <span title="Verified Nigerian Institutional Identity">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {activeThread.author.role} &bull; <strong className="text-emerald-300">{activeThread.author.schoolName}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleUpvoteThread(activeThread.id)}
                className="px-3 py-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeThread.upvotes} Upvotes</span>
              </button>
            </div>

            {/* Full Thread Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-5 rounded-xl border border-slate-800">
              <p className="whitespace-pre-line leading-relaxed font-sans">
                {activeThread.content}
              </p>

              {/* Citations */}
              {activeThread.citations && activeThread.citations.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <span className="text-slate-400 font-mono text-[11px] block uppercase font-bold">
                    Official Research Citations &amp; References:
                  </span>
                  <ul className="space-y-1 text-slate-400 text-xs italic">
                    {activeThread.citations.map((cite, cIdx) => (
                      <li key={cIdx}>&bull; {cite}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeThread.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Replies Thread Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700/80 pb-2">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Peer Discussion Replies ({activeThread.replies.length})</span>
                </span>
                <span className="text-[11px] text-slate-400 lowercase font-normal">verified academic contributions</span>
              </div>

              {/* Nested Reply Cards */}
              <div className="space-y-3">
                {activeThread.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-[10px] flex items-center justify-center">
                          {reply.author.avatarInitials}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{reply.author.name}</span>
                          <span className="text-slate-400 text-[11px]">
                            {reply.author.role} &bull; {reply.author.schoolName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {reply.isFacultyEndorsed && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            Faculty Endorsed
                          </span>
                        )}
                        <span className="text-slate-500 font-mono text-[10px]">{reply.date}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed pt-1">
                      {reply.content}
                    </p>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleUpvoteReply(reply.id)}
                        className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{reply.upvotes} Upvotes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Reply Form */}
              <form onSubmit={handleAddReply} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <span className="text-xs font-bold text-white block">
                  Add Your Verified Contribution to this Discussion:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={replyAuthorName}
                    onChange={(e) => setReplyAuthorName(e.target.value)}
                    placeholder="Your Name (e.g. Dr. Eze / Tariq D.)"
                    className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                  <select
                    value={replyAuthorRole}
                    onChange={(e) => setReplyAuthorRole(e.target.value as any)}
                    className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Verified Educator">Verified Educator</option>
                    <option value="Faculty Researcher">Faculty Researcher</option>
                    <option value="Secondary STEM Teacher">Secondary STEM Teacher</option>
                    <option value="Student Scholar">Student Scholar</option>
                    <option value="Curriculum Specialist">Curriculum Specialist</option>
                  </select>
                  <select
                    value={replySchoolName}
                    onChange={(e) => setReplySchoolName(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white truncate"
                  >
                    {MOCK_SCHOOLS.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  rows={3}
                  required
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Contribute your pedagogical perspective, classroom test results, or methodological constructive feedback..."
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Academic Reply</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        )}

      </div>

      {/* Start New Thread Modal */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 text-white rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-6 border-b border-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">Start New Knowledge Exchange Thread</h3>
                  <p className="text-emerald-200 text-xs">
                    Share an empirical pedagogical method, curriculum innovation, or educational research finding.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewThreadOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateThread} className="p-6 sm:p-8 space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Scaffolding Electrochemistry in Senior Secondary Laboratories with Local Reagents"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Knowledge Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Pedagogical Methods">Pedagogical Methods</option>
                    <option value="Educational Research Findings">Educational Research Findings</option>
                    <option value="Curriculum & Assessment">Curriculum &amp; Assessment</option>
                    <option value="EdTech & Laboratory Innovation">EdTech &amp; Laboratory Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Your Author Role *
                  </label>
                  <select
                    value={newAuthorRole}
                    onChange={(e) => setNewAuthorRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Verified Educator">Verified Educator</option>
                    <option value="Faculty Researcher">Faculty Researcher</option>
                    <option value="Secondary STEM Teacher">Secondary STEM Teacher</option>
                    <option value="Student Scholar">Student Scholar</option>
                    <option value="Curriculum Specialist">Curriculum Specialist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Author Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    placeholder="e.g. Dr. Kingsley Nnamdi"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Institutional Affiliation *
                  </label>
                  <select
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white truncate"
                  >
                    {MOCK_SCHOOLS.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Executive Abstract / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Short 1-2 sentence overview of the pedagogical strategy or finding..."
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Detailed Discussion &amp; Implementation Methodology *
                </label>
                <textarea
                  rows={5}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detail the classroom context, interventions, student performance data, or challenges encountered..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Academic Citations or Circular References (Optional)
                </label>
                <input
                  type="text"
                  value={newCitation}
                  onChange={(e) => setNewCitation(e.target.value)}
                  placeholder="e.g. Journal of Nigerian Science Educators, Vol 12, pp. 45-60"
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Pedagogy, Chemistry, WAEC Prep..."
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="px-4 py-2 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  Publish Knowledge Thread
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};

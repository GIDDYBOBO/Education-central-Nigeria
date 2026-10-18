export type SchoolLevel = 'Primary' | 'Secondary' | 'Tertiary' | 'Polytechnic' | 'College of Education';
export type OwnershipType = 'Federal' | 'State' | 'Private' | 'Faith-Based';
export type AccreditationStatus = 'Fully Accredited' | 'Provisional' | 'National Centre of Excellence';

export interface SubjectGrade {
  name: string;
  code?: string;
  score: number;
  grade: 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9' | 'A' | 'B' | 'C' | 'D' | 'F';
  remark: string;
}

export interface TermReport {
  academicYear: string;
  termOrSemester: string;
  level: string;
  gpaOrAverage: number;
  maxGpaOrScale: number;
  positionOrRank?: string;
  attendancePercent: number;
  conductRemark: string;
  publishedDate: string;
  registrarSignHash: string;
  subjects: SubjectGrade[];
}

export interface ExtracurricularActivity {
  id: string;
  title: string;
  role: string;
  organizationOrClub: string;
  year: string;
  description?: string;
}

export interface StudentProfile {
  id: string;
  nsin: string; // National Student Identification Number
  fullName: string;
  gender: 'Male' | 'Female';
  dob: string;
  stateOfOrigin: string;
  lga?: string;
  enrollmentYear: string;
  currentLevel: string; // e.g. SSS 3, JSS 2, 400 Level
  departmentOrTrack: string;
  status: 'Active' | 'Graduated' | 'Transferred';
  cumulativeGpa: number;
  gpaScale: number;
  avatarSeed: string;
  encryptedHash: string;
  email?: string;
  phone?: string;
  guardianContact?: string;
  address?: string;
  careerAspirations?: string;
  extracurriculars?: ExtracurricularActivity[];
  awards: string[];
  termReports: TermReport[];
  schoolId?: string;
  schoolName?: string;
}

export type AchievementCategory = 
  | 'Rankings'
  | 'Awards'
  | 'Notable Alumni'
  | 'Infrastructure'
  | 'Community Impact'
  | 'Academic Excellence'
  | 'STEM & Robotics'
  | 'Bioscience Innovation'
  | 'Sports'
  | 'National Olympiad';

export interface Achievement {
  id: string;
  title: string;
  year: string;
  category: AchievementCategory;
  description: string;
  awardingBody: string;
  badgeType: 'Gold' | 'Silver' | 'Distinction' | 'National';
  alumniName?: string;
  alumniRole?: string;
  impactMetric?: string;
  rankingPosition?: string;
  dateAdded?: string;
}

export interface BioscienceRecord {
  id: string;
  title: string;
  leadResearcherOrStudent: string;
  department: string;
  accessionNumber: string; // e.g. UniProt P68871 (HBB Sickle Cell), PDB 8B21, GenBank
  targetOrganism: string;
  biologicalSignificance: string;
  status: 'Published' | 'Peer Reviewed' | 'In Progress';
  year: string;
  abstract: string;
  keyMoleculesOrGenes: string[];
  provenance: string; // e.g., "UniProtKB Curated", "ACEGID Genomic Lab", "NCBI RefSeq"
}

export interface School {
  id: string;
  slug: string;
  name: string;
  acronym: string;
  motto: string;
  level: SchoolLevel;
  ownership: OwnershipType;
  state: string;
  lga: string;
  city: string;
  address: string;
  establishedYear: number;
  accreditationNumber: string;
  accreditationStatus: AccreditationStatus;
  studentCount: number;
  staffCount: number;
  principalOrViceChancellor: string;
  registrarName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  crestIcon: string;
  themeColor: string;
  encryptionSealHash: string;
  lastSyncTimestamp: string;
  description: string;
  facilities: string[];
  academicYears: string[];
  termsOrSemesters: string[];
  achievements: Achievement[];
  studentProfiles: StudentProfile[];
  bioscienceRecords: BioscienceRecord[];
}

export interface FilterCriteria {
  searchQuery: string;
  state: string;
  academicYear: string;
  level: string;
  ownership: string;
}

export interface TransferRequest {
  id: string;
  requestDate: string;
  studentNsin: string;
  studentName: string;
  fromSchoolId: string;
  fromSchoolName: string;
  toSchoolId: string;
  toSchoolName: string;
  reason: string;
  status: 'Pending Verification' | 'Approved & Sealed' | 'Under Review';
  clearanceHash: string;
}

export interface AcademicNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Policy Update' | 'Bioscience Discovery' | 'Institutional Ranking' | 'Curriculum Reform' | 'Research Breakthrough';
  source: string;
  institution?: string;
  publishedDate: string;
  readTime: string;
  officialDocRef?: string;
  tags: string[];
  featured?: boolean;
}

export type KnowledgeCategory = 
  | 'Pedagogical Methods'
  | 'Educational Research Findings'
  | 'Curriculum & Assessment'
  | 'EdTech & Laboratory Innovation';

export interface ThreadAuthor {
  name: string;
  role: 'Verified Educator' | 'Faculty Researcher' | 'Secondary STEM Teacher' | 'Student Scholar' | 'Curriculum Specialist';
  schoolName: string;
  state: string;
  avatarInitials: string;
  verified: boolean;
}

export interface ThreadReply {
  id: string;
  author: ThreadAuthor;
  date: string;
  content: string;
  upvotes: number;
  isFacultyEndorsed?: boolean;
}

export interface KnowledgeThread {
  id: string;
  title: string;
  category: KnowledgeCategory;
  author: ThreadAuthor;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  upvotes: number;
  repliesCount: number;
  replies: ThreadReply[];
  citations?: string[];
}


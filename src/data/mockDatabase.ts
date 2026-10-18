import { School, TransferRequest, AcademicNewsItem } from '../types';

export const NIGERIAN_STATES = [
  'All States',
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const ACADEMIC_YEARS = [
  'All Academic Years',
  '2025/2026',
  '2024/2025',
  '2023/2024',
  '2022/2023',
  '2021/2022',
  '2020/2021'
];

export const SCHOOL_LEVELS = [
  'All Levels',
  'Primary',
  'Secondary',
  'Tertiary',
  'Polytechnic',
  'College of Education'
];

export const OWNERSHIP_TYPES = [
  'All Ownerships',
  'Federal',
  'State',
  'Private',
  'Faith-Based'
];

export const MOCK_SCHOOLS: School[] = [
  {
    id: 'sch-unilag-01',
    slug: 'unilag',
    name: 'University of Lagos',
    acronym: 'UNILAG',
    motto: 'In Deed and In Truth',
    level: 'Tertiary',
    ownership: 'Federal',
    state: 'Lagos',
    lga: 'Lagos Mainland',
    city: 'Akoka, Yaba',
    address: 'University Road, Akoka, Yaba, Lagos State',
    establishedYear: 1962,
    accreditationNumber: 'NUC/FED/UNI/003/1962',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 57000,
    staffCount: 3850,
    principalOrViceChancellor: 'Prof. Folasade Ogunsola, FAS',
    registrarName: 'Mrs. Olakunle E. Makinde',
    contactEmail: 'records@unilag.edu.ng',
    contactPhone: '+234 1 280 2439',
    website: 'https://unilag.edu.ng',
    crestIcon: 'GraduationCap',
    themeColor: '#008751',
    encryptionSealHash: '0x9E7A4B12C843DF1082AA77B504C92E1F8943AB8C',
    lastSyncTimestamp: '2026-10-18T09:14:22Z',
    description: 'Premier university of first choice and the nation’s pride, founded in 1962. UNILAG hosts leading faculties of Engineering, Basic Medical Sciences, Science, and Environmental Studies with world-class centralized digital transcripts.',
    facilities: ['Central Genomics Core Laboratory', 'Tayur Rahman Supercomputer Node', 'College of Medicine Diagnostic Suite', 'National E-Library Repository', 'High-Containment Biosafety Lab Level 2'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['1st (Harmattan) Semester', '2nd (Rain) Semester'],
    achievements: [
      {
        id: 'ach-unilag-rank-1',
        title: 'Ranked #1 Federal University in Nigeria for Citations & Research Impact',
        year: '2025',
        category: 'Rankings',
        rankingPosition: '#1 in Nigeria / Top 500 Globally',
        description: 'Times Higher Education World University Rankings recognized UNILAG for leading research citation indices, clinical health outcomes, and international faculty co-authorships.',
        awardingBody: 'Times Higher Education (THE)',
        badgeType: 'National'
      },
      {
        id: 'ach-unilag-award-1',
        title: 'NUC 1st Place National Research & Innovation Trophy',
        year: '2025',
        category: 'Awards',
        description: 'Awarded top federal honours for breakthroughs in genomic sequencing of West African viral isolates and climate-resilient staple crop genetics.',
        awardingBody: 'National Universities Commission (NUC)',
        badgeType: 'National'
      },
      {
        id: 'ach-unilag-alumni-1',
        title: 'Late Dr. Ameyo Stella Adadevoh - National Ebola Hero & Global Medical Icon',
        year: 'Notable Alumna',
        category: 'Notable Alumni',
        alumniName: 'Dr. Ameyo Stella Adadevoh',
        alumniRole: 'UNILAG College of Medicine Alumna & Chief Medical Officer',
        description: 'Celebrated alumna who accurately diagnosed and quarantined the index Ebola virus patient in Lagos, preventing an unprecedented continental epidemic through supreme courage.',
        awardingBody: 'Nigerian National Order of Merit & WHO Tribute',
        badgeType: 'Gold'
      },
      {
        id: 'ach-unilag-infra-1',
        title: 'Commissioning of Tayur Rahman Supercomputing Node & Central Genomics Hub',
        year: '2024',
        category: 'Infrastructure',
        impactMetric: '1.2 PetaFLOP compute capacity & BSL-2+ containment',
        description: 'Fully funded via federal research endowments, the multi-tier supercomputing node powers real-time biological simulations and high-throughput student bioinformatics courses.',
        awardingBody: 'Federal Ministry of Science, Technology & Innovation',
        badgeType: 'Distinction'
      },
      {
        id: 'ach-unilag-comm-1',
        title: 'Coastal Community Free Mobile Health & Water Quality Initiative',
        year: '2024',
        category: 'Community Impact',
        impactMetric: 'Screened 42,000 residents across Makoko and Bariga',
        description: 'Student medical and environmental science volunteers deployed mobile diagnostic vans offering free sickle cell genotype screening, malaria testing, and clean water filtration kits.',
        awardingBody: 'Lagos State Ministry of Health & UNILAG Community Service',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-unilag-001',
        nsin: 'NSIN-LA-2022-90142',
        fullName: 'Chidera Emmanuel Okonkwo',
        gender: 'Male',
        dob: '2003-04-12',
        stateOfOrigin: 'Anambra',
        enrollmentYear: '2022',
        currentLevel: '400 Level (Finalist)',
        departmentOrTrack: 'Cell Biology & Genetics',
        status: 'Active',
        cumulativeGpa: 4.88,
        gpaScale: 5.0,
        avatarSeed: 'chidera',
        encryptedHash: 'SHA256:7f92b493e8201a4e101fcc655829e018a3d82bc5',
        awards: ['Dean’s Scholar Honour Roll', 'National Shell STEM Merit Scholar', 'UNILAG Bioscience Innovator of the Year'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st (Harmattan) Semester',
            level: '400 Level',
            gpaOrAverage: 4.92,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in Faculty',
            attendancePercent: 98,
            conductRemark: 'Exemplary academic dedication and peer research leadership.',
            publishedDate: '2025-02-14',
            registrarSignHash: '0xCB182903AEFF201',
            subjects: [
              { name: 'Molecular Genetics & Bioinformatics (CBG 401)', score: 91, grade: 'A', remark: 'Distinction' },
              { name: 'Recombinant DNA Technology (CBG 405)', score: 88, grade: 'A', remark: 'Distinction' },
              { name: 'Immunogenetics & Serology (CBG 407)', score: 94, grade: 'A', remark: 'Distinction' },
              { name: 'Bioscience Research Methodology (CBG 497)', score: 89, grade: 'A', remark: 'Distinction' },
              { name: 'Bioethics & Biosecurity Law (CBG 411)', score: 85, grade: 'A', remark: 'Excellent' }
            ]
          },
          {
            academicYear: '2023/2024',
            termOrSemester: '2nd (Rain) Semester',
            level: '300 Level',
            gpaOrAverage: 4.84,
            maxGpaOrScale: 5.0,
            positionOrRank: '2nd in Department',
            attendancePercent: 96,
            conductRemark: 'Outstanding laboratory technique and analytical acumen.',
            publishedDate: '2024-07-28',
            registrarSignHash: '0x992BCAE1098801',
            subjects: [
              { name: 'Population Genetics (CBG 302)', score: 86, grade: 'A', remark: 'Excellent' },
              { name: 'Cytogenetics Laboratory (CBG 306)', score: 92, grade: 'A', remark: 'Distinction' },
              { name: 'Microbial Genetics (CBG 308)', score: 84, grade: 'A', remark: 'Excellent' },
              { name: 'Biostatistics & Experimental Design (CBG 312)', score: 90, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      },
      {
        id: 'std-unilag-002',
        nsin: 'NSIN-LA-2023-77209',
        fullName: 'Zainab Amina Balogun',
        gender: 'Female',
        dob: '2004-09-22',
        stateOfOrigin: 'Lagos',
        enrollmentYear: '2023',
        currentLevel: '300 Level',
        departmentOrTrack: 'Biomedical Engineering',
        status: 'Active',
        cumulativeGpa: 4.79,
        gpaScale: 5.0,
        avatarSeed: 'zainab',
        encryptedHash: 'SHA256:d812903feab47120018cae7284910283cbe91204',
        awards: ['Lagos State Science Laureate', 'MTN Foundation Science & Tech Scholar'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st (Harmattan) Semester',
            level: '300 Level',
            gpaOrAverage: 4.80,
            maxGpaOrScale: 5.0,
            positionOrRank: '3rd in Faculty',
            attendancePercent: 97,
            conductRemark: 'Commendable diligence and creative engineering prototype development.',
            publishedDate: '2025-02-14',
            registrarSignHash: '0x8849EAF01938C',
            subjects: [
              { name: 'Biomedical Signal Processing (BME 301)', score: 88, grade: 'A', remark: 'Distinction' },
              { name: 'Biomechanics of Human Tissues (BME 303)', score: 85, grade: 'A', remark: 'Excellent' },
              { name: 'Medical Instrumentation Circuits (BME 305)', score: 92, grade: 'A', remark: 'Distinction' },
              { name: 'Physiology for Engineers (BME 307)', score: 82, grade: 'A', remark: 'Excellent' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-unilag-01',
        title: 'Structural Elucidation of Sickle Cell Hemoglobin Beta Variant (HbS Glu6Val) and Phytochemical Binding',
        leadResearcherOrStudent: 'Prof. Adeyemi Adeleke & Chidera Okonkwo',
        department: 'Biochemistry & Molecular Genetics',
        accessionNumber: 'UniProt P68871 / PDB: 2HBS',
        targetOrganism: 'Homo sapiens (HBB gene)',
        biologicalSignificance: 'Analyzing anti-sickling therapeutic interactions using bioactive flavonoids extracted from indigenous Nigerian plants (Cajanus cajan and Zanthoxylum zanthoxyloides).',
        status: 'Published',
        year: '2025',
        abstract: 'Sickle cell disease is highly prevalent across Sub-Saharan Africa. This study mapped the hydrophobic pocket created by the Glu6Val mutation on the beta-globin chain (P68871) using in silico docking and in vitro turbidity assays, demonstrating 74% inhibition of deoxy-HbS polymer formation by fractionated fagara extracts.',
        keyMoleculesOrGenes: ['HBB', 'Hemoglobin Subunit Beta', 'Val6 variant', 'Fagaricine', 'Vanillic acid'],
        provenance: 'UniProtKB Curated & UNILAG Molecular Docking Lab'
      },
      {
        id: 'bio-unilag-02',
        title: 'Metagenomic Surveillance of Antimicrobial Resistance Plasmids in Coastal Lagos Lagoons',
        leadResearcherOrStudent: 'Dr. Mojisola Olarinde',
        department: 'Microbiology & Environmental Genomics',
        accessionNumber: 'NCBI PRJNA882103 / GenBank: ON729114',
        targetOrganism: 'Escherichia coli & Klebsiella pneumoniae isolates',
        biologicalSignificance: 'Tracking the dissemination of blaCTX-M-15 and mcr-1 colistin resistance genes in urban aquatic ecosystems.',
        status: 'Peer Reviewed',
        year: '2024',
        abstract: 'Comprehensive Oxford Nanopore long-read sequencing of environmental water bodies revealed high transmission rates of multidrug-resistant IncFII conjugative plasmids.',
        keyMoleculesOrGenes: ['blaCTX-M-15', 'mcr-1', 'IncFII plasmid', 'Extended Spectrum Beta-Lactamase'],
        provenance: 'NCBI RefSeq & UNILAG Environmental Core'
      }
    ]
  },
  {
    id: 'sch-ui-02',
    slug: 'ui-ibadan',
    name: 'University of Ibadan',
    acronym: 'UI',
    motto: 'Recte Sapere Fons (To Think Right is the Fountain of Knowledge)',
    level: 'Tertiary',
    ownership: 'Federal',
    state: 'Oyo',
    lga: 'Ibadan North',
    city: 'Ibadan',
    address: 'University Post Office, Agbowo, Ibadan, Oyo State',
    establishedYear: 1948,
    accreditationNumber: 'NUC/FED/UNI/001/1948',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 42000,
    staffCount: 3100,
    principalOrViceChancellor: 'Prof. Kayode Oyebode Adebowale, FAS',
    registrarName: 'Mr. Ganiyu O. Saliu',
    contactEmail: 'transcripts@ui.edu.ng',
    contactPhone: '+234 2 810 3118',
    website: 'https://ui.edu.ng',
    crestIcon: 'Award',
    themeColor: '#006838',
    encryptionSealHash: '0x4A19F8D31C288AE0108927BA8873E419827ACF55',
    lastSyncTimestamp: '2026-10-18T08:45:10Z',
    description: 'Nigeria’s premier university, established in 1948. Renowned for its Faculty of Basic Medical Sciences, Faculty of Pharmacy, and the world-recognized University College Hospital (UCH) biomedical research institutes.',
    facilities: ['UCH Advanced Pathology Diagnostic Lab', 'Ken Saro-Wiwa Botanical Herbarium', 'Center for Drug Discovery & Phytomedicine', 'National Zoological Research Reserve', 'Nuclear Physics Electron Microscopy Hub'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['First Semester', 'Second Semester'],
    achievements: [
      {
        id: 'ach-ui-1',
        title: 'Ranked #1 University in Nigeria by Times Higher Education (THE)',
        year: '2025',
        category: 'Academic Excellence',
        description: 'Consistent top national ranking for academic citations, international research partnerships, and medical graduate impact.',
        awardingBody: 'Times Higher Education Global Rankings',
        badgeType: 'National'
      },
      {
        id: 'ach-ui-2',
        title: 'Discovery of Anti-Plasmodial Alkaloids in Vernonia amygdalina',
        year: '2024',
        category: 'Bioscience Innovation',
        description: 'UCH and Faculty of Pharmacy team identified novel sesquiterpene lactone analogs active against chloroquine-resistant Plasmodium falciparum.',
        awardingBody: 'World Health Organization African Regional Office',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-ui-001',
        nsin: 'NSIN-OY-2021-44810',
        fullName: 'Folashade Bamidele Adeyemi',
        gender: 'Female',
        dob: '2002-11-05',
        stateOfOrigin: 'Oyo',
        enrollmentYear: '2021',
        currentLevel: '500 Level (MBBS Clinical)',
        departmentOrTrack: 'Medicine & Surgery (College of Medicine)',
        status: 'Active',
        cumulativeGpa: 4.94,
        gpaScale: 5.0,
        avatarSeed: 'folashade',
        encryptedHash: 'SHA256:398cbe01a948e77102fcae884912039487cbe110',
        awards: ['Sir Samuel Manuwa Gold Medal in Pathology', 'Provost Best Graduating Medical Scholar Candidate'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'First Semester',
            level: '500 Level',
            gpaOrAverage: 4.96,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in Medical Class',
            attendancePercent: 100,
            conductRemark: 'Exceptional clinical diagnostic acumen, high ethical standard and patient empathy.',
            publishedDate: '2025-01-20',
            registrarSignHash: '0xUI883901AE44',
            subjects: [
              { name: 'Clinical Pathology & Hematology (PAT 501)', score: 95, grade: 'A', remark: 'Distinction' },
              { name: 'Medical Microbiology & Parasitology (MIC 503)', score: 92, grade: 'A', remark: 'Distinction' },
              { name: 'Clinical Pharmacology & Therapeutics (PHA 505)', score: 90, grade: 'A', remark: 'Distinction' },
              { name: 'Pediatrics & Child Health Clinicals (PED 507)', score: 93, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-ui-01',
        title: 'Functional Characterization of Plasmodium falciparum Erythrocyte Membrane Protein 1 (PfEMP1)',
        leadResearcherOrStudent: 'Prof. Olusegun Falade & Folashade Adeyemi',
        department: 'Biomedical Sciences & Tropical Medicine',
        accessionNumber: 'UniProt Q8I639 / PDB: 4BBO',
        targetOrganism: 'Plasmodium falciparum 3D7',
        biologicalSignificance: 'Cytoadherence binding mechanisms to human endothelial protein C receptor (EPCR) in severe cerebral malaria cohorts in southwestern Nigeria.',
        status: 'Published',
        year: '2024',
        abstract: 'PfEMP1 mediates binding to vascular endothelium, causing microvascular obstruction. This study synthesized recombinant DBLalpha domains to screen monoclonal antibodies from convalescent pediatric malaria patients.',
        keyMoleculesOrGenes: ['PfEMP1', 'var gene family', 'EPCR binding domain', 'ICAM-1'],
        provenance: 'UniProtKB / UCH Tropical Medicine Unit'
      }
    ]
  },
  {
    id: 'sch-kings-03',
    slug: 'kings-college-lagos',
    name: "King's College, Lagos",
    acronym: 'KCL',
    motto: 'Floreat Collegium (Let the College Flourish)',
    level: 'Secondary',
    ownership: 'Federal',
    state: 'Lagos',
    lga: 'Lagos Island',
    city: 'Lagos Island',
    address: '3 Catholic Mission Street, TBS, Lagos Island, Lagos State',
    establishedYear: 1909,
    accreditationNumber: 'FME/FED/SEC/001/1909',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 3200,
    staffCount: 240,
    principalOrViceChancellor: 'Mr. Ali Andrew Agada',
    registrarName: 'Mr. Babatunde Jinadu',
    contactEmail: 'admissions@kingscollegelagos.sch.ng',
    contactPhone: '+234 1 263 2198',
    website: 'https://kingscollegelagos.sch.ng',
    crestIcon: 'ShieldCheck',
    themeColor: '#005a36',
    encryptionSealHash: '0x1A2B3C4D5E6F708192A3B4C5D6E7F8091A2B3C4D',
    lastSyncTimestamp: '2026-10-18T07:30:00Z',
    description: 'Founded on September 20, 1909 by an Act of the British Parliament. King’s College is Nigeria’s historic premier secondary institution for young men, nurturing generations of national leaders, scientists, jurists, and scholars.',
    facilities: ['Lord Lugard Memorial Science Laboratories', 'Digital STEM Innovation Center', 'Sir Abubakar Tafawa Balewa Assembly Hall', 'Olympic Regulation Athletics Field', 'Automated CBT Testing Center'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['1st Term', '2nd Term', '3rd Term'],
    achievements: [
      {
        id: 'ach-kc-rank-1',
        title: 'Ranked #1 Federal Unity College in Nigeria for WASSCE Distinction Rates',
        year: '2025',
        category: 'Rankings',
        rankingPosition: '#1 Nationwide among 110 Unity Colleges',
        description: 'Federal Ministry of Education annual quality assurance audit ranked King’s College first in academic distinction percentage and STEM transition.',
        awardingBody: 'Federal Ministry of Education (FME)',
        badgeType: 'National'
      },
      {
        id: 'ach-kc-award-1',
        title: 'National Champion - All Nigeria Secondary Schools Mathematics Olympiad',
        year: '2025',
        category: 'Awards',
        description: 'KCL student delegation took top cumulative score in the National Mathematical Centre (NMC) Abuja grand finals.',
        awardingBody: 'National Mathematical Centre, Abuja',
        badgeType: 'National'
      },
      {
        id: 'ach-kc-alumni-1',
        title: 'Sir Adetokunbo Ademola - First Indigenous Chief Justice of Nigeria',
        year: 'Historic Alumnus',
        category: 'Notable Alumni',
        alumniName: 'Sir Adetokunbo Ademola, GCON, KBE',
        alumniRole: 'Chief Justice of the Federation (1958–1972) & Old Boy',
        description: 'Legendary jurist and alumnus who shaped the foundational jurisprudence and constitutional rule of law of modern Nigeria.',
        awardingBody: 'Federal Republic of Nigeria Judicial Council',
        badgeType: 'Gold'
      },
      {
        id: 'ach-kc-infra-1',
        title: 'Lord Lugard Science Complex Overhaul & New 200-Seat Smart Robotics Hub',
        year: '2024',
        category: 'Infrastructure',
        impactMetric: '200 high-speed computing terminals, AI workstations, & 3D printers',
        description: 'Jointly funded by the King’s College Old Boys’ Association (KCOBA) and TETFUND secondary intervention grant to facilitate cutting-edge secondary STEM training.',
        awardingBody: 'King’s College Old Boys’ Association (KCOBA)',
        badgeType: 'Distinction'
      },
      {
        id: 'ach-kc-comm-1',
        title: 'Lagos Island Junior Community Literacy & Coding Outreach Program',
        year: '2024',
        category: 'Community Impact',
        impactMetric: 'Trained 1,400 underprivileged pupils across Isale Eko',
        description: 'Senior students volunteer on alternate Saturdays to tutor public primary school children in reading comprehension, basic mathematics, and introductory Python.',
        awardingBody: 'Lagos State Education District III',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-kc-001',
        nsin: 'NSIN-LA-2023-88421',
        fullName: 'Tariq Olawale Danjuma',
        gender: 'Male',
        dob: '2008-06-14',
        stateOfOrigin: 'Taraba',
        enrollmentYear: '2020',
        currentLevel: 'Senior Secondary 3 (SSS 3)',
        departmentOrTrack: 'Science (Pure & Applied)',
        status: 'Active',
        cumulativeGpa: 94.2,
        gpaScale: 100.0,
        avatarSeed: 'tariq',
        encryptedHash: 'SHA256:8894103faec12871038ba9120485910283cbed10',
        awards: ['Head Boy / College Senior Prefect', 'Cowbellpedia National Mathematics Finalist', 'Chemistry Society Gold Medal'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st Term',
            level: 'SSS 3',
            gpaOrAverage: 95.8,
            maxGpaOrScale: 100.0,
            positionOrRank: '1st in Class (of 180)',
            attendancePercent: 100,
            conductRemark: 'A sterling role model of discipline, academic rigor and peer mentorship.',
            publishedDate: '2024-12-18',
            registrarSignHash: '0xKC77490184A',
            subjects: [
              { name: 'Further Mathematics', score: 98, grade: 'A1', remark: 'Distinction' },
              { name: 'Physics Practical & Theory', score: 96, grade: 'A1', remark: 'Distinction' },
              { name: 'Chemistry', score: 95, grade: 'A1', remark: 'Distinction' },
              { name: 'Biology & Environmental Studies', score: 94, grade: 'A1', remark: 'Distinction' },
              { name: 'English Language & Oral Diction', score: 92, grade: 'A1', remark: 'Distinction' },
              { name: 'Civic Education & National Values', score: 96, grade: 'A1', remark: 'Distinction' },
              { name: 'Data Processing & Algorithms', score: 99, grade: 'A1', remark: 'Distinction' }
            ]
          }
        ]
      },
      {
        id: 'std-kc-002',
        nsin: 'NSIN-LA-2024-66311',
        fullName: 'Somtochukwu Kenechi Nnamdi',
        gender: 'Male',
        dob: '2009-02-18',
        stateOfOrigin: 'Enugu',
        enrollmentYear: '2021',
        currentLevel: 'Senior Secondary 2 (SSS 2)',
        departmentOrTrack: 'Science',
        status: 'Active',
        cumulativeGpa: 91.5,
        gpaScale: 100.0,
        avatarSeed: 'somto',
        encryptedHash: 'SHA256:7729103cba71920381029487cbea109283748291',
        awards: ['Junior Engineers & Technicians (JETS) State Award'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st Term',
            level: 'SSS 2',
            gpaOrAverage: 92.0,
            maxGpaOrScale: 100.0,
            positionOrRank: '2nd in Class',
            attendancePercent: 97,
            conductRemark: 'Keen interest in robotics and algorithmic programming.',
            publishedDate: '2024-12-18',
            registrarSignHash: '0xKC6610283B',
            subjects: [
              { name: 'General Mathematics', score: 94, grade: 'A1', remark: 'Distinction' },
              { name: 'Physics', score: 91, grade: 'A1', remark: 'Distinction' },
              { name: 'Technical Drawing', score: 95, grade: 'A1', remark: 'Distinction' },
              { name: 'English Language', score: 87, grade: 'B2', remark: 'Very Good' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-kc-01',
        title: 'Junior Bioscience Project: Microbial Assay of Indigenous Fermented Cassava (Garri) Processing Water',
        leadResearcherOrStudent: 'Tariq Danjuma & KCL Senior Science Club',
        department: 'Biological Sciences & Food Chemistry',
        accessionNumber: 'UniProt P00698 / Lysozyme Control Model',
        targetOrganism: 'Lactobacillus plantarum & Bacillus subtilis',
        biologicalSignificance: 'Investigating natural probiotic strains and organic cyanide detoxification kinetics in traditional staple food manufacturing.',
        status: 'Published',
        year: '2024',
        abstract: 'Secondary school science fair award-winning investigation measuring pH shifts and linamarase enzymatic hydrolysis of cyanogenic glucosides during 72-hour submerged fermentation of Manihot esculenta roots.',
        keyMoleculesOrGenes: ['Linamarase', 'Beta-glucosidase', 'Lactic acid'],
        provenance: 'KCL Senior JETS Club & NERDC Science Fair'
      }
    ]
  },
  {
    id: 'sch-queens-04',
    slug: 'queens-college-lagos',
    name: "Queen's College, Lagos",
    acronym: 'QC',
    motto: 'Pass On The Torch',
    level: 'Secondary',
    ownership: 'Federal',
    state: 'Lagos',
    lga: 'Lagos Mainland',
    city: 'Yaba',
    address: 'QC Road, Onike, Yaba, Lagos State',
    establishedYear: 1927,
    accreditationNumber: 'FME/FED/SEC/002/1927',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 3450,
    staffCount: 260,
    principalOrViceChancellor: 'Dr. (Mrs.) Oyinloye Adetutu',
    registrarName: 'Mrs. Funmilayo Adeleke',
    contactEmail: 'info@queenscollegelagos.sch.ng',
    contactPhone: '+234 1 774 9201',
    website: 'https://queenscollegelagos.sch.ng',
    crestIcon: 'Award',
    themeColor: '#00703c',
    encryptionSealHash: '0x3D2C1B0A9E8F7A6B5C4D3E2F109A8B7C6D5E4F32',
    lastSyncTimestamp: '2026-10-18T09:00:15Z',
    description: 'Established in 1927 as the sister institution to King’s College. Queen’s College is Nigeria’s flagship federal unity college for young women, cultivating leaders in science, medicine, finance, and diplomacy.',
    facilities: ['Advanced Biotech Secondary Wet Lab', 'Margaret Ekpo Auditorium', 'Fine Art Studio & Ceramics Kiln', 'Fiber-Optic Network Center', 'Multi-Sport Gymnasium & Swimming Pool'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['1st Term', '2nd Term', '3rd Term'],
    achievements: [
      {
        id: 'ach-qc-1',
        title: 'Global Technovation Girls Challenge - 1st Runner Up',
        year: '2025',
        category: 'STEM & Robotics',
        description: 'Developed an AI & SMS emergency triage mobile application connecting rural mothers in Ogun/Ondo with volunteer midwives.',
        awardingBody: 'Technovation Girls Global, California USA',
        badgeType: 'Gold'
      },
      {
        id: 'ach-qc-2',
        title: 'National Debate Championship Champions',
        year: '2024',
        category: 'Academic Excellence',
        description: 'Defeated 36 state champions on the topic: "Decentralized Public Ledgers for National Civic Identity & Education Records".',
        awardingBody: 'Presidential Schools Debate Council',
        badgeType: 'National'
      }
    ],
    studentProfiles: [
      {
        id: 'std-qc-001',
        nsin: 'NSIN-LA-2022-77199',
        fullName: 'Hadiza Fatima Mohammed',
        gender: 'Female',
        dob: '2007-08-30',
        stateOfOrigin: 'Kano',
        enrollmentYear: '2020',
        currentLevel: 'Senior Secondary 3 (SSS 3)',
        departmentOrTrack: 'Science & Bio-Informatics',
        status: 'Active',
        cumulativeGpa: 96.4,
        gpaScale: 100.0,
        avatarSeed: 'hadiza',
        encryptedHash: 'SHA256:7a81903feab47120018cae7284910283cbe91204',
        awards: ['College Head Girl (2024/2025)', 'Queen’s Torchbearer Scholar of the Year', 'African Girls in STEM Laureate'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st Term',
            level: 'SSS 3',
            gpaOrAverage: 97.2,
            maxGpaOrScale: 100.0,
            positionOrRank: '1st in College',
            attendancePercent: 100,
            conductRemark: 'Inspiring leadership, impeccable academic precision and humble demeanor.',
            publishedDate: '2024-12-19',
            registrarSignHash: '0xQC9910284A',
            subjects: [
              { name: 'Biology & Genetics', score: 98, grade: 'A1', remark: 'Distinction' },
              { name: 'Chemistry', score: 97, grade: 'A1', remark: 'Distinction' },
              { name: 'Physics', score: 96, grade: 'A1', remark: 'Distinction' },
              { name: 'Further Mathematics', score: 96, grade: 'A1', remark: 'Distinction' },
              { name: 'English Language', score: 97, grade: 'A1', remark: 'Distinction' },
              { name: 'Computer Studies', score: 99, grade: 'A1', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-qc-01',
        title: 'Comparative Antimicrobial Screening of Moringa oleifera Seed Oil vs Conventional Antiseptics',
        leadResearcherOrStudent: 'Hadiza Fatima Mohammed & QC Young Scientists Hub',
        department: 'Biochemistry & Botanics',
        accessionNumber: 'UniProt P82942 / Moringa oleifera Coagulant Protein',
        targetOrganism: 'Moringa oleifera Lam. / Staphylococcus aureus',
        biologicalSignificance: 'Testing water purification and bacterial inhibition capacity of cationic dimeric proteins present in indigenous Nigerian moringa seeds.',
        status: 'Published',
        year: '2024',
        abstract: 'Seed protein extracts showed zone of inhibition of 18.5mm against S. aureus and reduced water turbidity by 89% within 45 minutes.',
        keyMoleculesOrGenes: ['MO2.1 cationic protein', '4-(alpha-L-rhamnosyloxy)-benzyl isothiocyanate'],
        provenance: 'Queen’s College Innovation Lab & NISER Validation'
      }
    ]
  },
  {
    id: 'sch-abu-05',
    slug: 'abu-zaria',
    name: 'Ahmadu Bello University',
    acronym: 'ABU',
    motto: 'Discipline, Dedication and Hard Work',
    level: 'Tertiary',
    ownership: 'Federal',
    state: 'Kaduna',
    lga: 'Zaria',
    city: 'Samaru, Zaria',
    address: 'Sokoto Road, Samaru, Zaria, Kaduna State',
    establishedYear: 1962,
    accreditationNumber: 'NUC/FED/UNI/002/1962',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 52000,
    staffCount: 3600,
    principalOrViceChancellor: 'Prof. Kabiru Bala',
    registrarName: 'Rabiu Samaila',
    contactEmail: 'academic-registry@abu.edu.ng',
    contactPhone: '+234 69 550 581',
    website: 'https://abu.edu.ng',
    crestIcon: 'GraduationCap',
    themeColor: '#005f2f',
    encryptionSealHash: '0x88AE7102938CB10928374AE619283CB019283EFA',
    lastSyncTimestamp: '2026-10-18T06:15:30Z',
    description: 'The largest university in Sub-Saharan Africa, founded by Sir Ahmadu Bello, Sardauna of Sokoto. Houses the Institute for Agricultural Research (IAR), National Animal Production Research Institute (NAPRI), and pioneer Veterinary Medicine complex.',
    facilities: ['IAR Crop Breeding Genomics Field', 'NAPRI Livestock Reproductive Genetics Unit', 'ABU Teaching Hospital Shika Complex', 'Nuclear Technology Center', 'Centre for Dryland Agriculture'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['First Semester', 'Second Semester'],
    achievements: [
      {
        id: 'ach-abu-1',
        title: 'Commercial Release of Pod-Borer Resistant (PBR) Cowpea (SAMPEA 20-T)',
        year: '2024',
        category: 'Bioscience Innovation',
        description: 'Genetically enhanced drought-tolerant cowpea saving Nigerian farmers billions of Naira annually in pesticide costs.',
        awardingBody: 'National Biosafety Management Agency (NBMA)',
        badgeType: 'National'
      },
      {
        id: 'ach-abu-2',
        title: 'African Premier Veterinary Medicine Research Prize',
        year: '2023',
        category: 'Bioscience Innovation',
        description: 'Formulation of thermal-stable Newcastle Disease vaccine for rural poultry farmers across Northern Nigeria.',
        awardingBody: 'FAO & African Veterinary Association',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-abu-001',
        nsin: 'NSIN-KD-2021-39182',
        fullName: 'Abubakar Sadauki Danbatta',
        gender: 'Male',
        dob: '2001-05-19',
        stateOfOrigin: 'Kano',
        enrollmentYear: '2021',
        currentLevel: '500 Level (Doctor of Veterinary Medicine)',
        departmentOrTrack: 'Veterinary Pathology & Microbiology',
        status: 'Active',
        cumulativeGpa: 4.89,
        gpaScale: 5.0,
        avatarSeed: 'abubakar',
        encryptedHash: 'SHA256:663810293847cb1029487cbea881920384719203',
        awards: ['Sardauna Scholar of Academic Distinction', 'Best Student in Animal Virology'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'First Semester',
            level: '500 Level',
            gpaOrAverage: 4.91,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in Veterinary Class',
            attendancePercent: 99,
            conductRemark: 'Outstanding diagnostic competence in infectious zoonotic diseases.',
            publishedDate: '2025-01-15',
            registrarSignHash: '0xABU9910283E',
            subjects: [
              { name: 'Veterinary Virology & Viral Diseases (VMI 501)', score: 94, grade: 'A', remark: 'Distinction' },
              { name: 'Clinical Zoonoses & Public Health (VPH 503)', score: 90, grade: 'A', remark: 'Distinction' },
              { name: 'Veterinary Pharmacology (VPA 505)', score: 88, grade: 'A', remark: 'Distinction' },
              { name: 'Avian Medicine & Poultry Pathology (VME 507)', score: 92, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-abu-01',
        title: 'Genomic Characterization of Cry1Ab Insecticidal Crystal Protein Transgene in Nigerian Cowpea Varieties',
        leadResearcherOrStudent: 'Prof. Mohammed Ishiyaku & Abubakar Danbatta',
        department: 'Institute for Agricultural Research (IAR) / Plant Breeding',
        accessionNumber: 'UniProt P0A370 / Cry1Ab Endotoxin',
        targetOrganism: 'Vigna unguiculata (Cowpea) / Bacillus thuringiensis',
        biologicalSignificance: 'Quantifying targeted midgut pore-forming toxin resistance against Maruca vitrata legume pod borer in Savannah agro-ecological zones.',
        status: 'Published',
        year: '2024',
        abstract: 'Evaluation of expression stability of the 65 kDa delta-endotoxin across generational backcross lines of SAMPEA 20-T demonstrated 96% reduction in field larval infestation without non-target beneficial insect mortality.',
        keyMoleculesOrGenes: ['Cry1Ab', 'Vigna unguiculata genome', 'Cadherin-like receptor', 'Delta-endotoxin'],
        provenance: 'IAR Samaru & African Agricultural Technology Foundation (AATF)'
      }
    ]
  },
  {
    id: 'sch-redeemers-06',
    slug: 'redeemers-acegid',
    name: "Redeemer's University (ACEGID)",
    acronym: 'RUN',
    motto: 'Running with a Vision',
    level: 'Tertiary',
    ownership: 'Faith-Based',
    state: 'Osun',
    lga: 'Ede North',
    city: 'Ede',
    address: 'Gbongan-Oshogbo Road, Ede, Osun State',
    establishedYear: 2005,
    accreditationNumber: 'NUC/PVT/UNI/024/2005',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 8500,
    staffCount: 920,
    principalOrViceChancellor: 'Prof. Shadrach Akindele',
    registrarName: 'Mr. Olukayode Akindele',
    contactEmail: 'records@acegid.run.edu.ng',
    contactPhone: '+234 35 204 440',
    website: 'https://acegid.run.edu.ng',
    crestIcon: 'Award',
    themeColor: '#007a3d',
    encryptionSealHash: '0xACE991203847BE10928374AE619283CB019283EF',
    lastSyncTimestamp: '2026-10-18T09:20:00Z',
    description: 'Global epicentre of pathogen genomics in Africa, hosting the World Bank African Centre of Excellence for Genomics of Infectious Diseases (ACEGID) led by Prof. Christian Happi. Pioneer of real-time sequencing for Ebola, Lassa, Mpox, and SARS-CoV-2.',
    facilities: ['BSL-3 High Containment Viral Genomics Facility', 'Illumina NovaSeq & Oxford Nanopore Sequencing Suite', 'Bioinformatics Supercomputing Server Farm', 'Robotic PCR Sample Handling Pipeline', 'Biobank & Cryo-Preservation Vault'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024'],
    termsOrSemesters: ['Alpha Semester', 'Omega Semester'],
    achievements: [
      {
        id: 'ach-run-1',
        title: 'First Full Genome Sequence of 2020 SARS-CoV-2 in Sub-Saharan Africa',
        year: '2024',
        category: 'Bioscience Innovation',
        description: 'ACEGID sequenced the index viral case in Nigeria in under 48 hours, establishing continental genomic surveillance standards.',
        awardingBody: 'Africa CDC & World Health Organization',
        badgeType: 'National'
      },
      {
        id: 'ach-run-2',
        title: 'Development of 10-Minute Rapid Diagnostic Test Strip for Lassa Fever',
        year: '2023',
        category: 'Bioscience Innovation',
        description: 'Breakthrough point-of-care strip approved for clinical deployment across endemic hospitals in Edo, Ondo, and Ebonyi.',
        awardingBody: 'Federal Ministry of Health & NCDC',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-run-001',
        nsin: 'NSIN-OS-2022-10822',
        fullName: 'Amarachi Chioma Eze',
        gender: 'Female',
        dob: '2002-03-14',
        stateOfOrigin: 'Ebonyi',
        enrollmentYear: '2022',
        currentLevel: '400 Level',
        departmentOrTrack: 'Genomics & Molecular Biology',
        status: 'Active',
        cumulativeGpa: 4.97,
        gpaScale: 5.0,
        avatarSeed: 'amarachi',
        encryptedHash: 'SHA256:11928374cb1029487cbea8819203847192038471',
        awards: ['ACEGID World Bank Young Genomics Scholar', 'Best Undergraduate Paper in Virology'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'Alpha Semester',
            level: '400 Level',
            gpaOrAverage: 5.0,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in University',
            attendancePercent: 100,
            conductRemark: 'World-class computational biology skills, passionate about endemic pathogen control.',
            publishedDate: '2025-02-02',
            registrarSignHash: '0xACE55490184A',
            subjects: [
              { name: 'Viral Phylodynamics & Molecular Evolution (GEN 401)', score: 98, grade: 'A', remark: 'Distinction' },
              { name: 'Next-Generation Sequencing Pipeline Engineering (GEN 403)', score: 99, grade: 'A', remark: 'Distinction' },
              { name: 'CRISPR Diagnostics & Nucleic Acid Sensors (GEN 405)', score: 96, grade: 'A', remark: 'Distinction' },
              { name: 'Structural Virology & Epitope Mapping (GEN 407)', score: 97, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-run-01',
        title: 'Deep Mutational Scanning and Neutralizing Epitope Preservation on Lassa Virus Glycoprotein Complex (GP1/GP2)',
        leadResearcherOrStudent: 'Prof. Christian Happi & Amarachi Chioma Eze',
        department: 'African Centre of Excellence for Genomics of Infectious Diseases (ACEGID)',
        accessionNumber: 'UniProt P08669 / PDB: 7PUY',
        targetOrganism: 'Lassa mammarenavirus (Josiah & Nigerian Lineage II/III)',
        biologicalSignificance: 'Mapping broadly neutralizing antibody escape mutations across hypervariable loop domains in Nigerian clinical survivor isolates.',
        status: 'Published',
        year: '2025',
        abstract: 'Lassa fever causes hemorrhagic fevers with case fatality up to 30% in hospitalized patients. We resolved cryo-EM models of the trimeric GPC spike in complex with human monoclonal antibodies 8.9F and 37.7H, highlighting conserved quaternary epitopes on GP2 stalk.',
        keyMoleculesOrGenes: ['Lassa GPC', 'GP1 receptor binding subunit', 'GP2 fusion subunit', 'LAMP1 receptor'],
        provenance: 'ACEGID World Bank Genomic Core & UniProtKB'
      }
    ]
  },
  {
    id: 'sch-loyola-07',
    slug: 'loyola-jesuit-abuja',
    name: 'Loyola Jesuit College, Abuja',
    acronym: 'LJC',
    motto: 'Ad Majorem Dei Gloriam (For the Greater Glory of God)',
    level: 'Secondary',
    ownership: 'Private',
    state: 'FCT Abuja',
    lga: 'Abuja Municipal',
    city: 'Gidan Mangoro, Karu-Karshi',
    address: 'Loyola Jesuit College Road, Gidan Mangoro, FCT Abuja',
    establishedYear: 1996,
    accreditationNumber: 'FME/PVT/SEC/005/1996',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 650,
    staffCount: 140,
    principalOrViceChancellor: 'Rev. Fr. Peter Chidolue, S.J.',
    registrarName: 'Mrs. Bridget Agwu',
    contactEmail: 'admissions@loyolajesuit.org',
    contactPhone: '+234 9 780 7712',
    website: 'https://loyolajesuit.org',
    crestIcon: 'ShieldCheck',
    themeColor: '#0a5c36',
    encryptionSealHash: '0x7B9C1D2E3F405162738495A6B7C8D9E0F1A2B3C4',
    lastSyncTimestamp: '2026-10-18T08:10:00Z',
    description: 'Renowned co-educational Catholic boarding school in Abuja, operated by the Society of Jesus. Famed for its holistic intellectual formation, moral character, and top performance in national and international examinations.',
    facilities: ['St. Ignatius Memorial Science Center', 'Digital Creative Arts & Media Studio', 'Full-Scale Track & Soccer Pavilion', 'Acoustic Music Conservatory', 'Fiber-Connected Learning Resource Center'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024', '2022/2023'],
    termsOrSemesters: ['1st Term', '2nd Term', '3rd Term'],
    achievements: [
      {
        id: 'ach-ljc-1',
        title: 'Nigeria Best Overall Performance in WAEC / WASSCE (12 Consecutive Years)',
        year: '2024',
        category: 'Academic Excellence',
        description: '100% of graduating seniors achieved distinctions across all core subjects in WAEC examinations.',
        awardingBody: 'West African Examinations Council (WAEC)',
        badgeType: 'National'
      },
      {
        id: 'ach-ljc-2',
        title: 'National Informatics Olympiad Gold Medalist',
        year: '2024',
        category: 'STEM & Robotics',
        description: 'Student created an optimized graph algorithmic solution for national rural electrical grid distribution.',
        awardingBody: 'National Mathematical Centre & FME',
        badgeType: 'Gold'
      }
    ],
    studentProfiles: [
      {
        id: 'std-ljc-001',
        nsin: 'NSIN-FC-2023-55901',
        fullName: 'Kamsiyochukwu Uchechukwu Onyeka',
        gender: 'Female',
        dob: '2008-01-10',
        stateOfOrigin: 'Anambra',
        enrollmentYear: '2020',
        currentLevel: 'Senior Secondary 3 (SSS 3)',
        departmentOrTrack: 'Science & Advanced Mathematics',
        status: 'Active',
        cumulativeGpa: 98.1,
        gpaScale: 100.0,
        avatarSeed: 'kamsiyo',
        encryptedHash: 'SHA256:558391028374be10928374ae619283cb019283ef',
        awards: ['Valedictorian Candidate 2025', 'National Cowbellpedia Champion', 'Science Olympiad Distinction'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: '1st Term',
            level: 'SSS 3',
            gpaOrAverage: 98.6,
            maxGpaOrScale: 100.0,
            positionOrRank: '1st in College (of 110)',
            attendancePercent: 100,
            conductRemark: 'Exemplary character, outstanding intellectual rigor and selfless service to junior students.',
            publishedDate: '2024-12-16',
            registrarSignHash: '0xLJC8810293B',
            subjects: [
              { name: 'Further Mathematics', score: 99, grade: 'A1', remark: 'Distinction' },
              { name: 'Physics', score: 99, grade: 'A1', remark: 'Distinction' },
              { name: 'Chemistry', score: 98, grade: 'A1', remark: 'Distinction' },
              { name: 'Biology', score: 97, grade: 'A1', remark: 'Distinction' },
              { name: 'English Language', score: 98, grade: 'A1', remark: 'Distinction' },
              { name: 'Economics', score: 98, grade: 'A1', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-ljc-01',
        title: 'Enzymatic Kinetics of Pectinase Extracted from Nigerian Citrus Peels in Biofuel Fermentation',
        leadResearcherOrStudent: 'Kamsiyochukwu Onyeka & LJC Science Society',
        department: 'Biochemistry & Environmental Science',
        accessionNumber: 'UniProt P26213 / Polygalacturonase',
        targetOrganism: 'Citrus sinensis / Aspergillus niger',
        biologicalSignificance: 'Valorizing agricultural food waste in Nigeria to produce clean enzymatic bio-ethanol.',
        status: 'Published',
        year: '2024',
        abstract: 'Waste orange peels subjected to solid-state fungal fermentation yielded active pectinase enzymes showing Vmax of 42.8 umol/min and Km of 1.4 mg/mL on polygalacturonic acid substrates.',
        keyMoleculesOrGenes: ['Polygalacturonase', 'Pectin methyl esterase', 'Bio-ethanol'],
        provenance: 'Loyola Jesuit College Science Fair & NMC Abuja'
      }
    ]
  },
  {
    id: 'sch-grange-08',
    slug: 'grange-school-lagos',
    name: 'Grange School, Ikeja',
    acronym: 'GSL',
    motto: 'Aperio Iter (I Open the Way)',
    level: 'Primary',
    ownership: 'Private',
    state: 'Lagos',
    lga: 'Ikeja',
    city: 'GRA Ikeja',
    address: 'Harold Shodipo Crescent, GRA Ikeja, Lagos State',
    establishedYear: 1958,
    accreditationNumber: 'SUBEB/LA/PRI/042/1958',
    accreditationStatus: 'Fully Accredited',
    studentCount: 1200,
    staffCount: 160,
    principalOrViceChancellor: 'Mrs. Rachel Bickers',
    registrarName: 'Mr. David Adebayo',
    contactEmail: 'admissions@grangeschool.com',
    contactPhone: '+234 1 290 6377',
    website: 'https://grangeschool.com',
    crestIcon: 'Award',
    themeColor: '#008751',
    encryptionSealHash: '0x99A8B7C6D5E4F32109876543210ABCDEF1234567',
    lastSyncTimestamp: '2026-10-18T08:50:00Z',
    description: 'Founded in 1958 by British expatriates to offer education of British and Nigerian national standards. Located in serene GRA Ikeja, Grange Primary is celebrated for early-childhood foundational literacy, numeracy, and digital coding.',
    facilities: ['Early Explorers Science Discovery Room', 'Junior Robotics & LEGO Lab', 'Heated Junior Swimming Complex', 'Music & Drama Amphitheatre', 'Montessori Math Laboratory'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024'],
    termsOrSemesters: ['Term 1 (Autumn)', 'Term 2 (Spring)', 'Term 3 (Summer)'],
    achievements: [
      {
        id: 'ach-gs-1',
        title: 'Lagos State SUBEB Model Primary School Excellence Trophy',
        year: '2024',
        category: 'Academic Excellence',
        description: 'Ranked top independent primary school for early STEM integration and reading literacy benchmarks.',
        awardingBody: 'Lagos State Universal Basic Education Board (SUBEB)',
        badgeType: 'National'
      }
    ],
    studentProfiles: [
      {
        id: 'std-grange-001',
        nsin: 'NSIN-LA-2024-11045',
        fullName: 'Demilade Oluwaseun Adeleke',
        gender: 'Male',
        dob: '2014-07-21',
        stateOfOrigin: 'Osun',
        enrollmentYear: '2020',
        currentLevel: 'Basic 6 (Primary 6)',
        departmentOrTrack: 'General Primary Curriculum',
        status: 'Active',
        cumulativeGpa: 93.8,
        gpaScale: 100.0,
        avatarSeed: 'demilade',
        encryptedHash: 'SHA256:10928374be10928374ae619283cb019283ef9912',
        awards: ['Junior Mathlete Champion', 'School Ambassador Prize'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'Term 1 (Autumn)',
            level: 'Basic 6',
            gpaOrAverage: 94.5,
            maxGpaOrScale: 100.0,
            positionOrRank: '1st in Class (of 24)',
            attendancePercent: 99,
            conductRemark: 'Enthusiastic participant in class projects, courteous and helpful to peers.',
            publishedDate: '2024-12-14',
            registrarSignHash: '0xGRA9910283A',
            subjects: [
              { name: 'Mathematics & Mental Arithmetic', score: 96, grade: 'A', remark: 'Excellent' },
              { name: 'Basic Science & Nature Study', score: 94, grade: 'A', remark: 'Excellent' },
              { name: 'English Literacy & Creative Writing', score: 92, grade: 'A', remark: 'Excellent' },
              { name: 'Social Studies & Nigerian Heritage', score: 95, grade: 'A', remark: 'Excellent' },
              { name: 'Junior Coding & Scratch', score: 98, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-grange-01',
        title: 'Primary Science Discovery: Germination Rates of Indigenous Nigerian Beans (Cowpea) Under Photoperiod Variations',
        leadResearcherOrStudent: 'Demilade Adeleke & Basic 6 Science Group',
        department: 'Junior Environmental Studies',
        accessionNumber: 'UniProt P02853 / Phaseolin Storage Protein Model',
        targetOrganism: 'Vigna unguiculata (Black-eyed pea)',
        biologicalSignificance: 'Early foundational education investigating cotyledon nutrient transfer and seedling vigor.',
        status: 'Published',
        year: '2024',
        abstract: 'Primary school STEM project comparing root elongation and chlorophyll synthesis across ambient Lagos daylight vs darkness.',
        keyMoleculesOrGenes: ['Chlorophyll a/b', 'Phaseolin'],
        provenance: 'Grange School Junior Science Fair'
      }
    ]
  },
  {
    id: 'sch-unn-09',
    slug: 'unn-nsukka',
    name: 'University of Nigeria, Nsukka',
    acronym: 'UNN',
    motto: 'To Restore the Dignity of Man',
    level: 'Tertiary',
    ownership: 'Federal',
    state: 'Enugu',
    lga: 'Nsukka',
    city: 'Nsukka',
    address: 'UNN Main Campus, Nsukka, Enugu State',
    establishedYear: 1960,
    accreditationNumber: 'NUC/FED/UNI/004/1960',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 46000,
    staffCount: 3200,
    principalOrViceChancellor: 'Prof. Charles Igwe',
    registrarName: 'Dr. (Mrs.) Celine N. Nnebedum',
    contactEmail: 'records@unn.edu.ng',
    contactPhone: '+234 42 771 911',
    website: 'https://unn.edu.ng',
    crestIcon: 'GraduationCap',
    themeColor: '#006633',
    encryptionSealHash: '0xUNN8829103847BE10928374AE619283CB019283EF',
    lastSyncTimestamp: '2026-10-18T08:35:00Z',
    description: 'Founded by the first President of Nigeria, Dr. Nnamdi Azikiwe, in 1960. UNN is the premier autonomous indigenous Nigerian university, world-celebrated for pharmaceutical sciences, African studies, engineering, and biotechnology.',
    facilities: ['Centre for Molecular Biosciences & Biotechnology', 'Prof. Dora Akunyili Drug Quality Testing Suite', 'Lion Science Park Incubator', 'University Herbarium & Ethnobotany Garden', 'High-Speed Grid Data Center'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024'],
    termsOrSemesters: ['First Semester', 'Second Semester'],
    achievements: [
      {
        id: 'ach-unn-1',
        title: 'National Intellectual Property & Patent Award for Herbal Antidiabetic Compound',
        year: '2024',
        category: 'Bioscience Innovation',
        description: 'Patent secured for standardized extract of Gongronema latifolium (Utazi) demonstrating insulin-sensitizing properties.',
        awardingBody: 'Federal Ministry of Science, Technology & Innovation',
        badgeType: 'National'
      }
    ],
    studentProfiles: [
      {
        id: 'std-unn-001',
        nsin: 'NSIN-EN-2021-99201',
        fullName: 'Ngozi Chiamaka Okoli',
        gender: 'Female',
        dob: '2002-08-11',
        stateOfOrigin: 'Enugu',
        enrollmentYear: '2021',
        currentLevel: '500 Level (PharmD)',
        departmentOrTrack: 'Pharmaceutical & Medicinal Chemistry',
        status: 'Active',
        cumulativeGpa: 4.91,
        gpaScale: 5.0,
        avatarSeed: 'ngozi',
        encryptedHash: 'SHA256:9928103cba71920381029487cbea109283748291',
        awards: ['Dora Akunyili Prize for Best Student in Pharmacology', 'Dean’s Honour List'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'First Semester',
            level: '500 Level',
            gpaOrAverage: 4.95,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in Pharmacy Class',
            attendancePercent: 99,
            conductRemark: 'Exceptional pharmacological synthesis skills and meticulous analytical precision.',
            publishedDate: '2025-01-25',
            registrarSignHash: '0xUNN7710283A',
            subjects: [
              { name: 'Medicinal Chemistry of Natural Products (PMC 501)', score: 94, grade: 'A', remark: 'Distinction' },
              { name: 'Advanced Pharmacokinetics (PHA 503)', score: 93, grade: 'A', remark: 'Distinction' },
              { name: 'Clinical Toxicology & Forensic Drug Analysis (TOX 505)', score: 96, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-unn-01',
        title: 'Phytochemical Isolation of Antidiabetic Pregnane Glycosides from Gongronema latifolium',
        leadResearcherOrStudent: 'Prof. Patience Ogoamaka & Ngozi Okoli',
        department: 'Pharmacognosy & Environmental Medicine',
        accessionNumber: 'UniProt P06400 / Retinoblastoma / Human Insulin Receptor Model P06213',
        targetOrganism: 'Gongronema latifolium Benth. (Utazi) / Homo sapiens INSR',
        biologicalSignificance: 'Mechanisms of GLUT4 glucose transporter translocation stimulation in alloxan-induced diabetic murine models.',
        status: 'Published',
        year: '2024',
        abstract: 'Bioassay-guided fractionation of methanol leaf extracts of Utazi identified three novel pregnane glycosides displaying significant glucose lowering (p < 0.01) and stimulation of insulin receptor tyrosine phosphorylation.',
        keyMoleculesOrGenes: ['INSR', 'GLUT4', 'Pregnane glycoside A', 'Gongronin'],
        provenance: 'UNN Faculty of Pharmaceutical Sciences'
      }
    ]
  },
  {
    id: 'sch-covenant-10',
    slug: 'covenant-university',
    name: 'Covenant University, Ota',
    acronym: 'CU',
    motto: 'Raising a New Generation of Leaders',
    level: 'Tertiary',
    ownership: 'Faith-Based',
    state: 'Ogun',
    lga: 'Ado-Odo/Ota',
    city: 'Ota, Canaanland',
    address: 'KM 10 Idiroko Road, Canaanland, Ota, Ogun State',
    establishedYear: 2002,
    accreditationNumber: 'NUC/PVT/UNI/011/2002',
    accreditationStatus: 'National Centre of Excellence',
    studentCount: 10500,
    staffCount: 1100,
    principalOrViceChancellor: 'Prof. Abiodun H. Adebayo',
    registrarName: 'Mrs. Regina A. Tobi-David',
    contactEmail: 'registry@covenantuniversity.edu.ng',
    contactPhone: '+234 1 790 0724',
    website: 'https://covenantuniversity.edu.ng',
    crestIcon: 'Award',
    themeColor: '#00703c',
    encryptionSealHash: '0xCU99201928374BE10928374AE619283CB019283EFA',
    lastSyncTimestamp: '2026-10-18T09:12:00Z',
    description: 'Premier private university in West Africa, consistently ranked among the world’s leading universities by Times Higher Education. Houses the Covenant Applied Informatics and Communication Africa Centre of Excellence (CApIC-ACE).',
    facilities: ['CApIC-ACE Bioinformatics Cluster', 'Centre for Research, Innovation and Discovery (CUCRID)', 'Smart Lecture Theater Complex', 'Automated Biometric Examination Suites', 'Precision Agriculture Hydroponic Dome'],
    academicYears: ['2025/2026', '2024/2025', '2023/2024'],
    termsOrSemesters: ['Alpha Semester', 'Omega Semester'],
    achievements: [
      {
        id: 'ach-cu-1',
        title: 'Ranked Best Private University in Africa by THE Rankings',
        year: '2025',
        category: 'Academic Excellence',
        description: 'Exemplary citation index, academic patents, and 100% graduate employability rate.',
        awardingBody: 'Times Higher Education (THE)',
        badgeType: 'National'
      }
    ],
    studentProfiles: [
      {
        id: 'std-cu-001',
        nsin: 'NSIN-OG-2022-77402',
        fullName: 'Oluwafemi Toluwalase Adeleke',
        gender: 'Male',
        dob: '2003-01-28',
        stateOfOrigin: 'Osun',
        enrollmentYear: '2022',
        currentLevel: '400 Level',
        departmentOrTrack: 'Computer Science (AI & Bio-Computing)',
        status: 'Active',
        cumulativeGpa: 4.96,
        gpaScale: 5.0,
        avatarSeed: 'oluwafemi',
        encryptedHash: 'SHA256:77391028374be10928374ae619283cb019283ef',
        awards: ['Chancellor’s Presidential Scholar', 'CApIC-ACE Data Innovation Fellow'],
        termReports: [
          {
            academicYear: '2024/2025',
            termOrSemester: 'Alpha Semester',
            level: '400 Level',
            gpaOrAverage: 4.98,
            maxGpaOrScale: 5.0,
            positionOrRank: '1st in College of Science',
            attendancePercent: 100,
            conductRemark: 'Brilliant computational modeling aptitude and leadership in student software development clubs.',
            publishedDate: '2025-02-10',
            registrarSignHash: '0xCU88291038A',
            subjects: [
              { name: 'Deep Learning for Genomic Sequences (CSC 411)', score: 98, grade: 'A', remark: 'Distinction' },
              { name: 'Distributed Systems & Blockchain Security (CSC 415)', score: 97, grade: 'A', remark: 'Distinction' },
              { name: 'Cryptography & Data Protection Law (CSC 417)', score: 96, grade: 'A', remark: 'Distinction' }
            ]
          }
        ]
      }
    ],
    bioscienceRecords: [
      {
        id: 'bio-cu-01',
        title: 'Deep Learning Prediction of Drug Target Binding Affinities for Endemic Prostate Cancer Variants in West African Males',
        leadResearcherOrStudent: 'Prof. Ezekiel Adebiyi & Oluwafemi Adeleke',
        department: 'CApIC-ACE & Department of Computer and Information Sciences',
        accessionNumber: 'UniProt P10275 / Androgen Receptor (AR) / PDB: 1E3G',
        targetOrganism: 'Homo sapiens (AR gene)',
        biologicalSignificance: 'Machine learning screening of indigenous bio-flavonoids against androgen receptor splice variants prevalent in Nigerian prostate oncology cohorts.',
        status: 'Published',
        year: '2024',
        abstract: 'African ancestry populations exhibit distinct androgen receptor polyglutamine repeat lengths. We deployed transformer architectures trained on ChEMBL bioactivities to predict nanomolar affinity inhibitors from African medicinal plant databases.',
        keyMoleculesOrGenes: ['AR', 'Androgen Receptor', 'AR-V7 splice variant', 'Vernodalin'],
        provenance: 'CApIC-ACE World Bank Centre of Excellence'
      }
    ]
  }
];

export const MOCK_TRANSFER_REQUESTS: TransferRequest[] = [
  {
    id: 'TX-2026-00918',
    requestDate: '2026-10-15',
    studentNsin: 'NSIN-LA-2024-66311',
    studentName: 'Somtochukwu Kenechi Nnamdi',
    fromSchoolId: 'sch-kings-03',
    fromSchoolName: "King's College, Lagos",
    toSchoolId: 'sch-loyola-07',
    toSchoolName: 'Loyola Jesuit College, Abuja',
    reason: 'Parental relocation to Federal Capital Territory Abuja (Federal Civil Service Transfer).',
    status: 'Approved & Sealed',
    clearanceHash: '0x88F7A12C39B4E109D4398710298374AE619283CB'
  },
  {
    id: 'TX-2026-00844',
    requestDate: '2026-10-12',
    studentNsin: 'NSIN-LA-2024-11045',
    studentName: 'Demilade Oluwaseun Adeleke',
    fromSchoolId: 'sch-grange-08',
    fromSchoolName: 'Grange School, Ikeja',
    toSchoolId: 'sch-kings-03',
    toSchoolName: "King's College, Lagos",
    reason: 'Transition from Basic 6 to Junior Secondary School 1 (JSS 1) following National Common Entrance Examination.',
    status: 'Pending Verification',
    clearanceHash: '0x77AE10928374CB01928374AE619283CB019283EF'
  }
];

export const MOCK_ACADEMIC_NEWS: AcademicNewsItem[] = [
  {
    id: 'news-001',
    title: 'Federal Ministry of Education Mandates Universal Digital Transcripts & NSIN Ledger Across All 36 States',
    summary: 'The Federal Government has issued a binding circular mandating that all primary, secondary, and tertiary schools synchronize verified academic transcripts onto the N-SEAR centralized ledger to eliminate forgeries.',
    content: 'In a landmark directive signed by the Minister of State for Education in Abuja, all accredited public, unity, state, and private educational institutions in Nigeria are required to issue National Student Identification Numbers (NSIN) and register end-of-term results into the centralized cryptographic ledger. The policy aims to reduce transcript processing from months to under 60 seconds for university admissions, foreign visa verification, and NYSC mobilization.',
    category: 'Policy Update',
    source: 'Federal Ministry of Education (FME)',
    publishedDate: '2026-10-15',
    readTime: '3 min read',
    officialDocRef: 'FME/CIRCULAR/2026/044/VOL.II',
    tags: ['Policy', 'Digital Transcripts', 'NSIN Standard', 'Anti-Forgery'],
    featured: true
  },
  {
    id: 'news-002',
    title: 'ACEGID Genomics Hub at Redeemer\'s University Unveils High-Resolution Epitope Mapping for Lassa Virus Lineages',
    summary: 'World Bank Centre of Excellence at RUN sequences 350 clinical isolates and identifies conserved neutralization targets across Nigerian survivor cohorts.',
    content: 'Researchers at the African Centre of Excellence for Genomics of Infectious Diseases (ACEGID), Redeemer’s University, Ede, in collaboration with the Nigeria Centre for Disease Control (NCDC) and Africa CDC, have published high-resolution cryo-EM structures of the Lassa virus glycoprotein complex (UniProt P08669). The study pinpoints invariant quaternary epitopes on the GP2 subunit, accelerating pan-arenavirus mRNA vaccine formulation for West Africa.',
    category: 'Bioscience Discovery',
    source: 'World Bank ACEGID / Africa CDC',
    institution: "Redeemer's University (RUN)",
    publishedDate: '2026-10-12',
    readTime: '5 min read',
    officialDocRef: 'ACEGID-GEN-2026-PUB-104',
    tags: ['Bioscience', 'Genomics', 'Lassa Fever', 'Virology', 'Cryo-EM'],
    featured: true
  },
  {
    id: 'news-003',
    title: 'NUC Releases 2026 Nigerian Universities Institutional Rankings: UI, UNILAG, and Covenant Lead Academic Quality Indices',
    summary: 'The National Universities Commission evaluates 264 federal, state, and private universities using revamped bibliometric citations, accreditation health, and graduate employability.',
    content: 'The National Universities Commission (NUC) released its 2026 Comprehensive Institutional Performance Audit. The University of Ibadan (UI) retained top overall standing for biomedical citations, the University of Lagos (UNILAG) led in international academic partnerships and patents, while Covenant University topped private institutions for research output per capita and digital campus infrastructure.',
    category: 'Institutional Ranking',
    source: 'National Universities Commission (NUC)',
    publishedDate: '2026-10-08',
    readTime: '4 min read',
    officialDocRef: 'NUC/DIR/RANK/2026/01',
    tags: ['Rankings', 'NUC Audit', 'UI', 'UNILAG', 'Covenant University']
  },
  {
    id: 'news-004',
    title: 'NERDC & UBEC Approve New Artificial Intelligence & Bioscience Curriculum Framework for Basic and Junior Secondary Schools',
    summary: '10,000 unity colleges and public primary schools to commence introductory computational biology, data literacy, and renewable energy modules.',
    content: 'The Nigerian Educational Research and Development Council (NERDC), in partnership with the Universal Basic Education Commission (UBEC), has completed the rollout of the revised 9-year Basic Education Curriculum. Starting next term, pupils from Basic 4 through JSS 3 will receive practical instruction in algorithmic thinking, agricultural biotechnology, and ecological conservation.',
    category: 'Curriculum Reform',
    source: 'NERDC & UBEC Joint Taskforce',
    publishedDate: '2026-10-02',
    readTime: '3 min read',
    officialDocRef: 'NERDC/BE/CURR/2026/089',
    tags: ['Curriculum', 'UBEC', 'Basic Education', 'STEM Reform']
  },
  {
    id: 'news-005',
    title: 'University of Ibadan College of Medicine Secures Patent for Phytomedical Anti-Plasmodial Formulations',
    summary: 'Clinical trials demonstrate 88% parasite clearance with standardized sesquiterpene lactone fractions derived from Vernonia amygdalina.',
    content: 'A multidisciplinary team at the Faculty of Pharmacy and University College Hospital (UCH), Ibadan, has registered patent rights with the Federal Ministry of Industry, Trade and Investment for an indigenous anti-malarial phytotherapeutic. The formulation exhibits potent efficacy against artemisinin-partial-resistant Plasmodium falciparum strains with negligible cytotoxicity.',
    category: 'Research Breakthrough',
    source: 'University College Hospital (UCH) & UI Faculty of Pharmacy',
    institution: 'University of Ibadan',
    publishedDate: '2026-09-28',
    readTime: '4 min read',
    officialDocRef: 'UI-MED-PAT-2026-019',
    tags: ['Research', 'Phytomedicine', 'Malaria', 'UCH Ibadan']
  },
  {
    id: 'news-006',
    title: 'TETFund Disburses ₦180 Billion National Research Fund (NRF) Grants to 350 Tertiary Research Teams',
    summary: 'Major federal funding tranche targets biotechnology, autonomous robotics, food security, and indigenous pharmaceutical manufacturing.',
    content: 'The Tertiary Education Trust Fund (TETFund) has completed the 2026 disbursement of the National Research Fund (NRF). Over 350 principal investigators across federal and state universities, polytechnics, and colleges of education received direct grant funding to establish research pipelines and sponsor doctoral students.',
    category: 'Policy Update',
    source: 'Tertiary Education Trust Fund (TETFund)',
    publishedDate: '2026-09-20',
    readTime: '3 min read',
    officialDocRef: 'TETFUND/NRF/2026/ALLOC/BATCH-A',
    tags: ['TETFund', 'Grants', 'Research Funding', 'Higher Education']
  }
];


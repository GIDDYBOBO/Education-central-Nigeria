import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SchoolsPage } from './pages/SchoolsPage';
import { SchoolDetailPage } from './pages/SchoolDetailPage';
import { AboutPage } from './pages/AboutPage';
import { VerificationModal } from './components/VerificationModal';
import { StudentTranscriptModal } from './components/StudentTranscriptModal';
import { TransferRequestModal } from './components/TransferRequestModal';
import { StudentProfileManager } from './components/StudentProfileManager';
import { MOCK_SCHOOLS } from './data/mockDatabase';
import { School, StudentProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'schools' | 'about'>('home');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolsInitialState, setSchoolsInitialState] = useState<string>('All States');

  // Modals state
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verificationPrefill, setVerificationPrefill] = useState('');
  const [isTransfersOpen, setIsTransfersOpen] = useState(false);

  // Student Profile Management System modal / view
  const [isStudentManagerOpen, setIsStudentManagerOpen] = useState(false);
  const [managingStudent, setManagingStudent] = useState<StudentProfile | null>(null);

  // Transcript viewer modal
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [transcriptStudent, setTranscriptStudent] = useState<StudentProfile | null>(null);
  const [transcriptSchool, setTranscriptSchool] = useState<School | null>(null);

  // Navigation handlers
  const handleSelectTab = (tab: 'home' | 'schools' | 'about') => {
    setCurrentTab(tab);
    setSelectedSchool(null);
    setIsStudentManagerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
    setCurrentTab('schools');
    setIsStudentManagerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSchoolsList = () => {
    setSelectedSchool(null);
    setCurrentTab('schools');
    setIsStudentManagerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSchools = (initialStateFilter = 'All States') => {
    setSchoolsInitialState(initialStateFilter);
    setSelectedSchool(null);
    setCurrentTab('schools');
    setIsStudentManagerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVerification = (prefilledNsin = '') => {
    setVerificationPrefill(prefilledNsin);
    setIsVerificationOpen(true);
  };

  const handleOpenStudentManager = (student?: StudentProfile) => {
    setManagingStudent(student || null);
    setIsStudentManagerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveStudentProfile = (updatedProfile: StudentProfile, schoolId: string) => {
    // Find school and update or add the student
    const targetSchool = MOCK_SCHOOLS.find((s) => s.id === schoolId);
    if (targetSchool) {
      const existingIdx = targetSchool.studentProfiles.findIndex((p) => p.id === updatedProfile.id || p.nsin === updatedProfile.nsin);
      if (existingIdx >= 0) {
        targetSchool.studentProfiles[existingIdx] = updatedProfile;
      } else {
        targetSchool.studentProfiles.unshift(updatedProfile);
      }

      // If selectedSchool is this school, sync state
      if (selectedSchool && selectedSchool.id === schoolId) {
        setSelectedSchool({ ...targetSchool });
      }
    }
  };

  const handleViewStudentTranscript = (student: StudentProfile, school: School) => {
    setTranscriptStudent(student);
    setTranscriptSchool(school);
    setIsTranscriptOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenVerification={() => handleOpenVerification()}
        onOpenTransfers={() => setIsTransfersOpen(true)}
        onOpenStudentProfileManager={() => handleOpenStudentManager()}
        selectedSchoolSlug={selectedSchool ? selectedSchool.slug : null}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {isStudentManagerOpen ? (
          <StudentProfileManager
            initialStudent={managingStudent}
            onSaveProfile={handleSaveStudentProfile}
            onViewTranscript={handleViewStudentTranscript}
            onClose={() => setIsStudentManagerOpen(false)}
          />
        ) : selectedSchool ? (
          <SchoolDetailPage
            school={selectedSchool}
            onBack={handleBackToSchoolsList}
            onViewStudentTranscript={handleViewStudentTranscript}
            onOpenVerification={handleOpenVerification}
            onOpenTransfers={() => setIsTransfersOpen(true)}
            onOpenStudentProfileManager={handleOpenStudentManager}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomePage
                onSelectSchool={handleSelectSchool}
                onNavigateToSchools={handleNavigateToSchools}
                onOpenVerification={handleOpenVerification}
                onOpenTransfers={() => setIsTransfersOpen(true)}
                onViewStudentTranscript={handleViewStudentTranscript}
                onOpenStudentProfileManager={() => handleOpenStudentManager()}
              />
            )}

            {currentTab === 'schools' && (
              <SchoolsPage
                onSelectSchool={handleSelectSchool}
                initialStateFilter={schoolsInitialState}
                onOpenVerification={handleOpenVerification}
              />
            )}

            {currentTab === 'about' && (
              <AboutPage
                onOpenVerification={() => handleOpenVerification()}
                onNavigateToSchools={() => handleNavigateToSchools()}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenVerification={() => handleOpenVerification()}
        onOpenTransfers={() => setIsTransfersOpen(true)}
      />

      {/* Modal 1: National Academic Record Verification Modal */}
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        prefilledNsin={verificationPrefill}
        onViewStudentTranscript={handleViewStudentTranscript}
      />

      {/* Modal 2: Official Digital Student Academic Transcript Modal */}
      <StudentTranscriptModal
        isOpen={isTranscriptOpen}
        onClose={() => setIsTranscriptOpen(false)}
        student={transcriptStudent}
        school={transcriptSchool}
      />

      {/* Modal 3: Inter-School Transfer & Transcript Exchange Modal */}
      <TransferRequestModal
        isOpen={isTransfersOpen}
        onClose={() => setIsTransfersOpen(false)}
      />

    </div>
  );
}

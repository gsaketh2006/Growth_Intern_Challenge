import React, { useState, useEffect } from 'react';
import { GrowthProvider } from './context/GrowthContext';
import { Navbar, NavTab } from './components/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { RegistrationModal } from './components/landing/RegistrationModal';
import { GrowthDashboard } from './components/dashboard/GrowthDashboard';
import { ReferralSystem } from './components/referrals/ReferralSystem';
import { MarketingAssistant } from './components/marketing/MarketingAssistant';
import { CampaignExperiments } from './components/experiments/CampaignExperiments';
import { AdminPanel } from './components/admin/AdminPanel';
import { ChannelType } from './types';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [prefilledCode, setPrefilledCode] = useState('');
  const [prefilledChannel, setPrefilledChannel] = useState<ChannelType>('College Communities');

  // Handle URL query parameters e.g. ?ref=AMB-RAHUL&tab=referrals
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    const chan = params.get('channel') as ChannelType | null;
    const tab = params.get('tab') as NavTab | null;

    if (ref) {
      setPrefilledCode(ref.toUpperCase());
    }
    if (chan && ['College Communities', 'Student Ambassadors', 'Peer Referrals'].includes(chan)) {
      setPrefilledChannel(chan);
    }
    if (tab && ['landing', 'dashboard', 'referrals', 'marketing', 'experiments', 'admin'].includes(tab)) {
      setCurrentTab(tab);
    }
  }, []);

  const handleOpenRegister = (code = '', chan: ChannelType = 'College Communities') => {
    if (code) {
      setPrefilledCode(code.toUpperCase());
    }
    if (chan) {
      setPrefilledChannel(chan);
    }
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openRegistrationModal={() => handleOpenRegister()}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onOpenRegister={() => handleOpenRegister()}
            onNavigateToReferrals={() => setCurrentTab('referrals')}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'dashboard' && <GrowthDashboard />}

        {currentTab === 'referrals' && (
          <ReferralSystem
            onOpenRegisterWithCode={(code) => handleOpenRegister(code, 'Student Ambassadors')}
          />
        )}

        {currentTab === 'marketing' && <MarketingAssistant />}

        {currentTab === 'experiments' && <CampaignExperiments />}

        {currentTab === 'admin' && <AdminPanel />}
      </main>

      {/* Registration Modal Dialog */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        prefilledReferralCode={prefilledCode}
        prefilledChannel={prefilledChannel}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GrowthProvider>
      <AppContent />
    </GrowthProvider>
  );
};

export default App;

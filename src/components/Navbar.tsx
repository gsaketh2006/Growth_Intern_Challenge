import React, { useState } from 'react';
import { 
  Rocket, 
  BarChart3, 
  Users, 
  Sparkles, 
  FlaskConical, 
  ShieldCheck, 
  Menu, 
  X, 
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useGrowth } from '../context/GrowthContext';

export type NavTab = 'landing' | 'dashboard' | 'referrals' | 'marketing' | 'experiments' | 'admin';

interface NavbarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  openRegistrationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openRegistrationModal,
}) => {
  const { isDemoMode, setIsDemoMode, allRegistrations, campaignTarget } = useGrowth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing' as NavTab, label: 'Workshop Page', icon: Rocket },
    { id: 'dashboard' as NavTab, label: 'Growth Dashboard', icon: BarChart3 },
    { id: 'referrals' as NavTab, label: 'Ambassador Referrals', icon: Users },
    { id: 'marketing' as NavTab, label: 'AI Copy Assistant', icon: Sparkles },
    { id: 'experiments' as NavTab, label: 'Experiments', icon: FlaskConical },
    { id: 'admin' as NavTab, label: 'Admin & Records', icon: ShieldCheck },
  ];

  const handleNavClick = (tab: NavTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPct = Math.min(100, Math.round((allRegistrations.length / campaignTarget) * 100));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0A0E17]/95 backdrop-blur-md">
      {/* Simulation / Demo Mode Alert Banner */}
      <div className={`px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b ${
        isDemoMode 
          ? 'bg-amber-950/40 border-amber-500/20 text-amber-300' 
          : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDemoMode ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Demonstration Mode Active:</strong> Showing synthetic campaign data for review. No real students contacted.
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Live Data Mode:</strong> Persistent local storage. Clean workspace for user signups and experiments.
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Data Source:</span>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                isDemoMode
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
              Switch to {isDemoMode ? 'Live Mode' : 'Demo Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  NxtWave <span className="text-cyan-400 font-extrabold">GrowthHub</span>
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  Intern Challenge
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                500 Engineering Students Acquisition Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & Target Progress Tracker */}
          <div className="hidden sm:flex items-center gap-3">
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs cursor-pointer hover:border-slate-700 transition-colors"
              title="Click to view growth dashboard"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Target: 500</div>
                <div className="font-bold text-slate-200">
                  {allRegistrations.length} <span className="text-[11px] font-normal text-cyan-400">({progressPct}%)</span>
                </div>
              </div>
              <div className="w-10 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <button
              onClick={openRegistrationModal}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Register Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openRegistrationModal}
              className="px-2.5 py-1.5 text-xs font-bold rounded-md bg-cyan-400 text-slate-950"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0F1624] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Goal: 500 Registrations</span>
              <span className="font-semibold text-cyan-400">{allRegistrations.length} achieved ({progressPct}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

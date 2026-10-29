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
  AlertTriangle,
  ArrowRight
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
    { id: 'landing' as NavTab, label: 'Workshop', icon: Rocket },
    { id: 'dashboard' as NavTab, label: 'Growth Dashboard', icon: BarChart3 },
    { id: 'referrals' as NavTab, label: 'Ambassadors', icon: Users },
    { id: 'marketing' as NavTab, label: 'AI Copy Assistant', icon: Sparkles },
    { id: 'experiments' as NavTab, label: 'A/B Experiments', icon: FlaskConical },
    { id: 'admin' as NavTab, label: 'Admin Records', icon: ShieldCheck },
  ];

  const handleNavClick = (tab: NavTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPct = Math.min(100, Math.round((allRegistrations.length / campaignTarget) * 100));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#080C15]/90 backdrop-blur-xl">
      {/* Simulation / Demo Mode Alert Banner */}
      <div className={`px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b transition-colors ${
        isDemoMode 
          ? 'bg-amber-950/30 border-amber-500/20 text-amber-300/90' 
          : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300/90'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            {isDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                <span>
                  <strong className="text-amber-200">Simulation Demo Mode:</strong> Displaying illustrative sample data (342 registrations). No real students contacted.
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>
                  <strong className="text-emerald-200">Live Workspace:</strong> Real-time registrations stored in local storage. Ready for live inputs.
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                isDemoMode
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/30'
              }`}
            >
              <span>Switch to {isDemoMode ? 'Live Mode' : 'Demo Mode'}</span>
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
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NxtWave <span className="text-cyan-400">GrowthHub</span>
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08] hidden sm:inline-block">
                Challenge
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Metrics & Register CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs cursor-pointer hover:border-cyan-500/30 transition-colors"
              title="Click to view growth metrics"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Target: 500</div>
                <div className="font-bold text-slate-200">
                  {allRegistrations.length} <span className="text-[10px] font-normal text-cyan-400">({progressPct}%)</span>
                </div>
              </div>
              <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <button
              onClick={openRegistrationModal}
              className="px-4 py-2 text-xs font-bold rounded-lg electric-glow-btn flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span>Register Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openRegistrationModal}
              className="px-3 py-1.5 text-xs font-bold rounded-lg electric-glow-btn"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0A0E1A] px-4 pt-2 pb-4 space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Goal: 500 Registrations</span>
              <span className="font-semibold text-cyan-400">{allRegistrations.length} achieved ({progressPct}%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
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

import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  ExternalLink, 
  MessageSquare, 
  PlusCircle, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import { Ambassador } from '../../types';

interface ReferralSystemProps {
  onOpenRegisterWithCode: (code: string) => void;
}

export const ReferralSystem: React.FC<ReferralSystemProps> = ({
  onOpenRegisterWithCode,
}) => {
  const { ambassadors, getAmbassadorAttribution, allRegistrations } = useGrowth();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom ambassador / peer code generator
  const [customName, setCustomName] = useState('');
  const [customCollege, setCustomCollege] = useState('');
  const [customGeneratedCode, setCustomGeneratedCode] = useState<string | null>(null);

  // Helper to construct registration link with query params
  const getShareableUrl = (code: string) => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?ref=${encodeURIComponent(code)}&channel=Student%20Ambassadors`;
  };

  const handleCopyLink = (code: string) => {
    const url = getShareableUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleWhatsAppShare = (code: string) => {
    const url = getShareableUrl(code);
    const message = `Hey! Interested in AI? NxtWave is planning a free online workshop called 'Build Your First AI Project in 60 Minutes.' Check out the workshop and register here: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGenerateCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const clean = customName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const newCode = `CAMPUS-${clean || 'LEAD'}${randomSuffix}`;
    setCustomGeneratedCode(newCode);
  };

  // Sort ambassadors by attributed registrations (Leaderboard)
  const rankedAmbassadors = [...ambassadors]
    .map((amb) => ({
      ...amb,
      attributedCount: getAmbassadorAttribution(amb.code),
    }))
    .sort((a, b) => b.attributedCount - a.attributedCount);

  const filteredAmbassadors = rankedAmbassadors.filter(
    (amb) =>
      amb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amb.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      amb.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReferralRegistrations = allRegistrations.filter(
    (r) => r.referralCode && r.referralCode.trim().length > 0
  ).length;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/80 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Feature 2: Student Ambassador & Referral System</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Ambassador Hub & Peer Attribution
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Empower campus leads and technical club coordinators with personalized referral links, direct WhatsApp invitations, and verified conversion tracking.
          </p>
        </div>

        {/* Aggregate Referral Stats */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shrink-0">
          <div>
            <div className="text-[11px] text-slate-400">Total Attributed Signups</div>
            <div className="text-2xl font-bold text-cyan-400">{totalReferralRegistrations}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-[11px] text-slate-400">Active Campus Leads</div>
            <div className="text-2xl font-bold text-white">{ambassadors.length}</div>
          </div>
        </div>
      </div>

      {/* Attribution Rule Note */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-cyan-300">Strict Conversion Attribution:</strong>
          <span className="text-slate-300 ml-1">
            Registrations are only attributed when an engineering student completes the registration form with the referral code. Raw link clicks or visits are never counted as completed registrations.
          </span>
        </div>
      </div>

      {/* Generate Custom Ambassador / Peer Link Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-b from-[#0F1624] to-[#0A0E17] border border-cyan-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Generate Your Campus Code</h3>
          </div>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Represent your college or technical club. Generate an instant trackable referral code to invite classmates.
          </p>

          <form onSubmit={handleGenerateCustomCode} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Priyanshu"
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">College / Society (Optional)</label>
              <input
                type="text"
                value={customCollege}
                onChange={(e) => setCustomCollege(e.target.value)}
                placeholder="e.g. IEEE Student Branch"
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
            >
              Generate Referral Link
            </button>
          </form>

          {customGeneratedCode && (
            <div className="mt-4 pt-4 border-t border-slate-800 animate-fade-in">
              <div className="text-[11px] text-slate-400">Your New Referral Code:</div>
              <div className="font-mono text-base font-bold text-cyan-400 mt-0.5">
                {customGeneratedCode}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleCopyLink(customGeneratedCode)}
                  className="flex-1 py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1 border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === customGeneratedCode ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={() => handleWhatsAppShare(customGeneratedCode)}
                  className="flex-1 py-1.5 px-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ambassador Leaderboard & Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Campus Ambassador Leaderboard</h3>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ambassador or college..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400 w-56"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAmbassadors.map((amb, index) => {
              const shareUrl = getShareableUrl(amb.code);
              const isCopied = copiedCode === amb.code;
              const progressPct = Math.min(100, Math.round((amb.attributedCount / amb.targetCount) * 100));

              return (
                <div
                  key={amb.id}
                  className="p-5 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-cyan-500/40 card-hover relative flex flex-col justify-between"
                >
                  {/* Top info */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <h4 className="font-bold text-sm text-white">{amb.name}</h4>
                        </div>
                        <p className="text-xs text-slate-400 ml-7">{amb.college}</p>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                        {amb.code}
                      </span>
                    </div>

                    {/* Performance metrics */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Verified Registrations:</span>
                        <span className="font-bold text-cyan-400 text-sm">
                          {amb.attributedCount} <span className="text-slate-400 text-xs font-normal">/ {amb.targetCount} target</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions: Copy URL & WhatsApp Share */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(amb.code)}
                      className="flex-1 py-2 px-2.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(amb.code)}
                      className="flex-1 py-2 px-2.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-950"
                      title="Share invitation with prefilled text on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => onOpenRegisterWithCode(amb.code)}
                      className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                      title="Test registration flow with this code"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WhatsApp Message Preview Section */}
      <div className="p-6 rounded-2xl bg-[#0F1624] border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Prefilled WhatsApp Invite Template</h3>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          This message is automatically loaded when an ambassador or peer clicks the WhatsApp button:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 max-w-3xl leading-relaxed">
          "Hey! Interested in AI? NxtWave is planning a free online workshop called 'Build Your First AI Project in 60 Minutes.' Check out the workshop and register here: [registration link]"
        </div>
      </div>
    </div>
  );
};

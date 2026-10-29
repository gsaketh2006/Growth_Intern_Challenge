import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  MessageSquare, 
  ArrowUpRight,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';

interface ReferralSystemProps {
  onOpenRegisterWithCode: (code: string) => void;
}

export const ReferralSystem: React.FC<ReferralSystemProps> = ({
  onOpenRegisterWithCode,
}) => {
  const { ambassadors, getAmbassadorAttribution, allRegistrations } = useGrowth();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom code generator
  const [customName, setCustomName] = useState('');
  const [customCollege, setCustomCollege] = useState('');
  const [customGeneratedCode, setCustomGeneratedCode] = useState<string | null>(null);

  const getShareableUrl = (code: string) => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?ref=${encodeURIComponent(code)}&channel=Student%20Ambassadors`;
  };

  const handleCopyLink = (code: string) => {
    const url = getShareableUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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

  // Sort ambassadors by attributed registrations
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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Feature 2: Student Ambassador & Referral System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ambassador Network & Referral Attribution
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Equip campus leads with personalized referral URLs, WhatsApp broadcast templates, and verified conversion metrics.
          </p>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-4 surface-card p-3 rounded-2xl shrink-0">
          <div>
            <div className="text-[10px] text-slate-400">Total Attributed Signups</div>
            <div className="text-xl font-bold text-cyan-400">{totalReferralRegistrations}</div>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div>
            <div className="text-[10px] text-slate-400">Active Campus Leads</div>
            <div className="text-xl font-bold text-white">{ambassadors.length}</div>
          </div>
        </div>
      </div>

      {/* Attribution Rule Note */}
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-cyan-300">Strict Conversion Attribution:</strong>
          <span className="text-slate-300 ml-1">
            Registrations are only credited when an engineering student completes the signup form with the referral code. Raw link clicks are never counted as completed registrations.
          </span>
        </div>
      </div>

      {/* Generator & Ambassador Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Custom Generator */}
        <div className="lg:col-span-1 surface-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Generate Campus Referral Code</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Represent your technical club or class. Generate a personalized trackable code to share with batchmates.
            </p>

            <form onSubmit={handleGenerateCustomCode} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Vikram"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">College / Society (Optional)</label>
                <input
                  type="text"
                  value={customCollege}
                  onChange={(e) => setCustomCollege(e.target.value)}
                  placeholder="e.g. ACM Student Chapter"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold electric-glow-btn transition-colors"
              >
                Create Referral Code
              </button>
            </form>

            {customGeneratedCode && (
              <div className="mt-4 pt-4 border-t border-white/[0.08] animate-fade-in">
                <div className="text-[10px] text-slate-400">Your Generated Code:</div>
                <div className="font-mono text-sm font-bold text-cyan-400 mt-0.5">
                  {customGeneratedCode}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleCopyLink(customGeneratedCode)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-medium flex items-center justify-center gap-1 border border-white/[0.08]"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode === customGeneratedCode ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <button
                    onClick={() => handleWhatsAppShare(customGeneratedCode)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] text-slate-500">
            Prefills the referral field directly when peers open your link.
          </div>
        </div>

        {/* Ambassador Leaderboard Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 surface-card p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-bold text-white">Campus Ambassador Leaderboard</h3>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search lead or college..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400 w-52"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredAmbassadors.map((amb, index) => {
              const isCopied = copiedCode === amb.code;
              const progressPct = Math.min(100, Math.round((amb.attributedCount / amb.targetCount) * 100));

              return (
                <div
                  key={amb.id}
                  className="p-4 rounded-2xl surface-card surface-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                            index === 0 ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
                            index === 1 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                            index === 2 ? 'bg-amber-700/20 text-amber-400 border border-amber-700/40' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            #{index + 1}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-white">{amb.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 ml-6">{amb.college}</p>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                        {amb.code}
                      </span>
                    </div>

                    {/* Verified Registrations Meter */}
                    <div className="mt-3 p-2.5 rounded-xl bg-black/30 border border-white/[0.04]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400 text-[11px]">Verified Signups:</span>
                        <span className="font-bold text-cyan-400 text-xs">
                          {amb.attributedCount} <span className="text-slate-500 font-normal">/ {amb.targetCount}</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(amb.code)}
                      className="flex-1 py-1.5 px-2 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[11px]">Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(amb.code)}
                      className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                      title="Share invitation with prefilled text on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => onOpenRegisterWithCode(amb.code)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/[0.08] transition-colors"
                      title="Test registration flow with this referral code"
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
      <div className="surface-card p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-1.5">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white">Standard WhatsApp Broadcast Message</h3>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          This verified invitation copy is automatically pre-filled when ambassadors click the WhatsApp share button:
        </p>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] font-mono text-xs text-emerald-300 leading-relaxed max-w-3xl">
          "Hey! Interested in AI? NxtWave is planning a free online workshop called 'Build Your First AI Project in 60 Minutes.' Check out the workshop and register here: [registration link]"
        </div>
      </div>
    </div>
  );
};

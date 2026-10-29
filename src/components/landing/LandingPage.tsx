import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Users, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';

interface LandingPageProps {
  onOpenRegister: () => void;
  onNavigateToReferrals: () => void;
  onNavigateToDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenRegister,
  onNavigateToReferrals,
}) => {
  const { allRegistrations, campaignTarget } = useGrowth();
  const seatsClaimed = allRegistrations.length;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is there any cost or registration fee?",
      a: "No. The workshop is 100% free for all engineering students as part of NxtWave's community learning initiative."
    },
    {
      q: "Do I need prior AI or Python experience?",
      a: "None required. The session is strictly beginner-friendly and guides you step-by-step through practical implementation."
    },
    {
      q: "How will I receive the workshop joining details?",
      a: "Upon completing registration, a unique pass ID is generated. Confirmed workshop timings and joining credentials will be sent directly to your registered email prior to the broadcast."
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] text-slate-100 flex flex-col justify-between">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-cyan-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 w-full space-y-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Free Online Workshop • Beginner-Friendly</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Build Your First <br className="hidden sm:inline" />
            <span className="electric-gradient-text">AI Project</span> in 60 Minutes.
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A free, beginner-friendly online workshop for engineering students who want to start building with AI.
          </p>

          {/* Format Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Format: Online
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cost: Free
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Duration: 60 Minutes
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold electric-glow-btn flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <span>Register for Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToReferrals}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.06] text-slate-200 border border-white/[0.1] hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Campus Ambassador Hub</span>
            </button>
          </div>

          {/* Live Progress Pill */}
          <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong className="text-white font-semibold">{seatsClaimed}</strong> of {campaignTarget} engineering student seats claimed
            </span>
          </div>
        </div>

        {/* 3 Core Benefits */}
        <div className="pt-4">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Why Join This Workshop</h2>
            <p className="text-xs text-slate-400 mt-1">Practical takeaways designed for engineering students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Benefit 1 */}
            <div className="surface-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Learn by Building</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No passive lecture slides. In 60 minutes, code along with an experienced mentor to build and run an interactive AI application live.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-cyan-300 font-medium">
                100% hands-on implementation
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="surface-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Explore AI Tools</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Discover how contemporary software engineers connect LLMs, prompt APIs, and web frameworks to build real-world intelligent utilities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-blue-300 font-medium">
                Modern developer toolchains
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="surface-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Take Your First Step</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Transform from an AI user to an AI builder. Gain the practical foundation to kickstart capstone projects, hackathons, and technical interviews.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-indigo-300 font-medium">
                Placement & project confidence
              </div>
            </div>
          </div>
        </div>

        {/* Clean, Focused FAQ Section */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="surface-card rounded-xl border border-white/[0.06] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick CTA Bottom */}
          <div className="mt-8 text-center">
            <button
              onClick={onOpenRegister}
              className="px-6 py-2.5 rounded-xl text-xs font-bold electric-glow-btn inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <span>Reserve Your Free Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-white/[0.06] text-center text-xs text-slate-500">
        <p>NxtWave GrowthHub • Built for the 500-Student Workshop Campaign</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Demonstration application for simulated growth engineering workflow.
        </p>
      </footer>
    </div>
  );
};

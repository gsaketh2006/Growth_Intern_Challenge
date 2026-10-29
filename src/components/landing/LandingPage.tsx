import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Laptop, 
  Globe2, 
  Users, 
  Clock, 
  Target, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Play,
  Share2,
  ShieldAlert
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

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is there any registration fee or hidden charge?",
      a: "No. The workshop is 100% free for all registered engineering students as part of NxtWave's community learning initiative. There are zero hidden costs."
    },
    {
      q: "Do I need prior Python, machine learning, or AI knowledge?",
      a: "None required! The session is designed specifically to be beginner-friendly. Our instructors walk you through the fundamental building blocks and live code every single line with you."
    },
    {
      q: "When and how will I receive the workshop joining details?",
      a: "Upon completing registration, you will receive an instant unique Registration Pass ID. Official session timings and direct access credentials will be delivered to your registered email and WhatsApp prior to the workshop broadcast."
    },
    {
      q: "Can I invite batchmates or members of our technical club?",
      a: "Absolutely! You can head over to our Ambassador & Referral hub to generate your own personalized campus referral link or share pre-formatted invitations directly on WhatsApp."
    }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Subtle radial ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-16 pb-14 md:pt-24 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Cohort Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Exclusively for Engineering Students • 100% Online & Free</span>
        </div>

        {/* Mandatory Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Build Your First <br className="hidden sm:inline" />
          <span className="electric-gradient-text">AI Project</span> in 60 Minutes.
        </h1>

        {/* Mandatory Subheadline */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A free, beginner-friendly online workshop for engineering students who want to start building with AI.
        </p>

        {/* Format Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 text-xs font-semibold text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Format: Online
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Cost: 100% Free
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Terminal className="w-3.5 h-3.5 text-blue-400" /> Level: Beginner-Friendly
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Duration: 60 Minutes
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold electric-glow-btn flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg"
          >
            <span>Register for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToReferrals}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.1] hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Ambassador & Referral Hub</span>
          </button>
        </div>

        {/* Live Seat Claimed Pill */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <div className="flex -space-x-1.5">
            <span className="inline-block w-5 h-5 rounded-full bg-cyan-600 ring-2 ring-[#080C15] text-[9px] text-white font-bold flex items-center justify-center">R</span>
            <span className="inline-block w-5 h-5 rounded-full bg-blue-600 ring-2 ring-[#080C15] text-[9px] text-white font-bold flex items-center justify-center">S</span>
            <span className="inline-block w-5 h-5 rounded-full bg-indigo-600 ring-2 ring-[#080C15] text-[9px] text-white font-bold flex items-center justify-center">A</span>
          </div>
          <span>
            <strong className="text-cyan-400 font-semibold">{seatsClaimed}</strong> of {campaignTarget} seats claimed for this cohort
          </span>
        </div>

        {/* Interactive Interactive Code Preview Component */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-[#0D1322] border border-white/[0.08] shadow-2xl overflow-hidden text-left">
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#0A0F1D] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[11px] font-mono text-slate-400 ml-2">workshop-demo.py — What You Will Code in 60 Mins</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Live Hands-on Build
            </span>
          </div>

          <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed bg-[#0A0F1D]/60">
            <p className="text-slate-500"># Step 1: Initialize your LLM client with zero complex setup</p>
            <p><span className="text-cyan-400">from</span> nxtwave_ai <span className="text-cyan-400">import</span> AIProjectPipeline</p>
            <p className="mt-2 text-slate-500"># Step 2: Connect real-time prompt reasoning & context processing</p>
            <p>agent = AIProjectPipeline(model=<span className="text-emerald-300">"developer-flash"</span>, project=<span className="text-emerald-300">"Resume-AI-Assistant"</span>)</p>
            <p className="mt-2 text-slate-500"># Step 3: Run interactive web demo to showcase to recruiters</p>
            <p>agent.deploy_local_preview(port=<span className="text-amber-300">8080</span>)</p>
            <p className="text-cyan-300 pt-2 font-semibold">✓ Project Compiled: Interactive AI Assistant Ready in 60 Mins</p>
          </div>
        </div>
      </section>

      {/* 3 Mandatory Benefits (Feature 1) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">What You Will Gain</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Practical AI Engineering Without Fluff
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Designed specifically for engineering students looking to stand out in technical screenings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="surface-card surface-card-hover p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Learn by Building</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Step away from passive videos. In 60 minutes, code along with an experienced mentor to build, test, and run an interactive AI application on your own laptop.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-cyan-300 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-time code walkthrough</span>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="surface-card surface-card-hover p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explore AI Tools</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discover how modern software engineers connect LLMs, prompt APIs, and web frameworks to build real-world intelligent utilities that recruiters value.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-blue-300 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Modern developer frameworks</span>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="surface-card surface-card-hover p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Take Your First Step</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transform from an AI consumer to an AI builder. Gain the practical foundation and confidence to kickstart capstone projects, hackathon prototypes, and technical portfolios.
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06] text-[11px] text-indigo-300 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Placement & interview edge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 60-Minute Workshop Timeline Breakdown */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl surface-card p-6 sm:p-10 border border-cyan-500/20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Session Roadmap</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              What We Will Cover In 60 Minutes
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              A structured, high-energy agenda focused on execution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 00 – 15</div>
              <h4 className="text-sm font-bold text-white mt-1">Architecture & APIs</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Tokens, embeddings, and connecting frontend code to AI endpoints cleanly without theoretical bloat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 15 – 45</div>
              <h4 className="text-sm font-bold text-white mt-1">Live Coding Build</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hands-on construction of an intelligent document assistant that parses inputs and produces dynamic results.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 45 – 60</div>
              <h4 className="text-sm font-bold text-white mt-1">Deploy & Engineering Q&A</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hosting your project online, resume positioning, and open interactive Q&A for final-year engineering students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final-Year Batch Highlight Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-1.5">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>Target Cohort: Final-Year Engineering Students (2025 Batch)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Preparing for campus placement technical rounds?
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Recruiters are consistently prioritizing engineering graduates with hands-on exposure to practical AI APIs and model integration. This workshop gives you a verifiable project to explain during interviews.
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 shadow-md transition-all active:scale-95"
          >
            Claim 2025 Priority Seat
          </button>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-white/[0.06]">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Clear answers with zero ambiguous promises</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="surface-card rounded-xl overflow-hidden border border-white/[0.06] transition-colors"
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
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06] text-center text-xs text-slate-500">
        <p>NxtWave GrowthHub • Growth Intern Challenge Project</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Working demonstration for a simulated campaign.
        </p>
      </footer>
    </div>
  );
};

import React from 'react';
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
  Layers, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';

interface LandingPageProps {
  onOpenRegister: () => void;
  onNavigateToReferrals: () => void;
  onNavigateToDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenRegister,
  onNavigateToReferrals,
  onNavigateToDashboard,
}) => {
  const { allRegistrations, campaignTarget } = useGrowth();
  const seatsClaimed = allRegistrations.length;

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-600/15 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Cohort Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold mb-6 shadow-lg shadow-cyan-950/40 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Exclusively for Engineering Students • 100% Online & Free</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          Build Your First <br className="hidden sm:inline" />
          <span className="electric-gradient-text">AI Project</span> in 60 Minutes.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A free, beginner-friendly online workshop for engineering students who want to start building with AI.
        </p>

        {/* Value Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800">
            <Globe2 className="w-4 h-4 text-cyan-400" /> Format: Online
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Cost: 100% Free
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800">
            <Terminal className="w-4 h-4 text-blue-400" /> Level: Beginner-Friendly
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800">
            <Clock className="w-4 h-4 text-amber-400" /> Duration: 60 Minutes
          </span>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 shadow-xl shadow-cyan-500/30 transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Register for Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onNavigateToReferrals}
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Student Ambassador Hub</span>
          </button>
        </div>

        {/* Real-time cohort indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <div className="flex -space-x-1.5">
            <span className="inline-block w-5 h-5 rounded-full bg-cyan-600 ring-2 ring-[#0A0E17] text-[9px] text-white font-bold flex items-center justify-center">R</span>
            <span className="inline-block w-5 h-5 rounded-full bg-blue-600 ring-2 ring-[#0A0E17] text-[9px] text-white font-bold flex items-center justify-center">S</span>
            <span className="inline-block w-5 h-5 rounded-full bg-indigo-600 ring-2 ring-[#0A0E17] text-[9px] text-white font-bold flex items-center justify-center">A</span>
          </div>
          <span>
            <strong className="text-cyan-400 font-semibold">{seatsClaimed}</strong> of {campaignTarget} engineering student seats claimed
          </span>
        </div>
      </section>

      {/* 3 Core Benefits (Explicitly Required) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">Workshop Highlights</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Why Engineering Students Love This Session
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            No convoluted mathematics or boring lecture slides. Step straight into practical development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Benefit 1: Learn by Building */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0F1624] to-[#0A0E17] border border-slate-800 hover:border-cyan-500/40 card-hover">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Learn by Building</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step away from passive video tutorials. In 60 minutes, code along with an experienced mentor to build, test, and run an interactive AI application on your own laptop.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                Live interactive coding session
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                No prior ML/AI background needed
              </li>
            </ul>
          </div>

          {/* Benefit 2: Explore AI Tools */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0F1624] to-[#0A0E17] border border-slate-800 hover:border-blue-500/40 card-hover">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Explore AI Tools</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Discover how contemporary software engineers connect Large Language Models, prompt APIs, and web frameworks to build real-world intelligent utilities that recruiters value.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                Modern developer toolchains & APIs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                Prompt engineering & model integration
              </li>
            </ul>
          </div>

          {/* Benefit 3: Take Your First Step */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0F1624] to-[#0A0E17] border border-slate-800 hover:border-indigo-500/40 card-hover">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Take Your First Step</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Transform from an AI consumer to an AI builder. Gain the practical foundation and confidence to kickstart capstone projects, hackathon prototypes, and technical interview portfolios.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                Resume-worthy project foundation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                Clarity on future AI career pathways
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 60-Minute Workshop Breakdown */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#0F1624]/90 border border-cyan-500/20 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Inside the 60-Minute Session</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              What We Will Build Together In 60 Minutes
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Here is how every minute of the online workshop is mapped to practical action:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 00 - 15</div>
                <div className="text-white font-bold text-sm mt-1">AI Architecture Demystified</div>
                <p className="text-xs text-slate-400 mt-1">Understanding LLM tokens, context windows, and how API requests communicate with web clients.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 15 - 45</div>
                <div className="text-white font-bold text-sm mt-1">Live Hands-on Coding</div>
                <p className="text-xs text-slate-400 mt-1">Constructing an intelligent query application that processes user inputs and delivers real-time AI responses.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-cyan-400 font-mono text-xs font-bold">Minutes 45 - 60</div>
                <div className="text-white font-bold text-sm mt-1">Deploy & Engineering Q&A</div>
                <p className="text-xs text-slate-400 mt-1">Packaging the project for your portfolio, sharing your demo, and open tech Q&A for placements.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>All you need is a browser and an internet connection.</span>
              </div>
              <button
                onClick={onOpenRegister}
                className="px-6 py-2.5 rounded-lg text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
              >
                Claim Your Seat Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final-Year Priority Spotlight */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Final-Year Engineering Student Focus (Batch of 2025)</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Preparing for campus placements or technical screenings?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Recruiters are consistently filtering for candidates who have transitioned beyond standard boilerplate code to real AI-enabled applications. This workshop gives you a verifiable project to talk about during technical rounds.
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-950 shadow-lg shadow-white/10 transition-all"
          >
            Register with 2025 Batch
          </button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-10">
          <HelpCircle className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about joining the workshop</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Is there any registration or entry fee?</h4>
            <p className="text-xs text-slate-300 mt-1">
              No. This workshop is 100% free for all registered engineering students as part of NxtWave's community learning initiative.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Do I need prior Python, machine learning, or AI experience?</h4>
            <p className="text-xs text-slate-300 mt-1">
              None required. The session is structured to be completely beginner-friendly, walking you through every line of code step-by-step.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white">How will I receive the joining link and session timing?</h4>
            <p className="text-xs text-slate-300 mt-1">
              Once you submit your registration, an instant confirmation ID is generated. Official joining credentials and session links will be sent directly to your registered email address and WhatsApp before the broadcast.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Can I share this workshop with my batchmates and technical club?</h4>
            <p className="text-xs text-slate-300 mt-1">
              Yes! You can use our Ambassador & Peer Referral system to generate your own shareable referral link and invite peers directly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>NxtWave GrowthHub • Built for the 500-Registration Engineering Challenge</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Demonstration application for simulated growth marketing workflow.
        </p>
      </footer>
    </div>
  );
};

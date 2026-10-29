import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Share2, 
  GraduationCap, 
  School, 
  Mail, 
  User, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGrowth } from '../../context/GrowthContext';
import { ChannelType, GraduationYear, Registration } from '../../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledReferralCode?: string;
  prefilledChannel?: ChannelType;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  prefilledReferralCode = '',
  prefilledChannel = 'College Communities',
}) => {
  const { addRegistration, getAmbassadorAttribution } = useGrowth();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState<GraduationYear>('2025 (Final Year)');
  const [referralCode, setReferralCode] = useState(prefilledReferralCode);
  const [channel, setChannel] = useState<ChannelType>(prefilledChannel);

  // States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState<Registration | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Pre-fill when opened or when params change
  useEffect(() => {
    if (prefilledReferralCode) {
      setReferralCode(prefilledReferralCode.toUpperCase());
      // If code starts with AMB-, set to Student Ambassadors; if PEER-, set to Peer Referrals
      if (prefilledReferralCode.toUpperCase().startsWith('AMB-')) {
        setChannel('Student Ambassadors');
      } else if (prefilledReferralCode.toUpperCase().startsWith('PEER-')) {
        setChannel('Peer Referrals');
      }
    }
    if (prefilledChannel) {
      setChannel(prefilledChannel);
    }
  }, [prefilledReferralCode, prefilledChannel, isOpen]);

  // Handle URL params detection if user lands with ?ref=... or ?channel=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    const chanParam = params.get('channel') as ChannelType | null;
    if (refParam) {
      setReferralCode(refParam.toUpperCase());
      if (refParam.toUpperCase().startsWith('AMB-')) {
        setChannel('Student Ambassadors');
      } else if (refParam.toUpperCase().startsWith('PEER-')) {
        setChannel('Peer Referrals');
      }
    }
    if (chanParam && ['College Communities', 'Student Ambassadors', 'Peer Referrals'].includes(chanParam)) {
      setChannel(chanParam);
    }
  }, []);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid college or personal email address.';
    }

    if (!college.trim() || college.trim().length < 2) {
      newErrors.college = 'Please specify your engineering college or university name.';
    }

    if (!graduationYear) {
      newErrors.graduationYear = 'Please select your expected year of graduation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Determine finalized channel attribution
    let finalChannel = channel;
    if (referralCode.trim()) {
      const codeUpper = referralCode.trim().toUpperCase();
      if (codeUpper.startsWith('AMB-')) {
        finalChannel = 'Student Ambassadors';
      } else if (codeUpper.startsWith('PEER-')) {
        finalChannel = 'Peer Referrals';
      }
    }

    const result = addRegistration({
      name,
      email,
      college,
      graduationYear,
      referralCode: referralCode.trim() ? referralCode.trim().toUpperCase() : undefined,
      channel: finalChannel,
    });

    setIsSubmitting(false);

    if (result.success && result.registration) {
      setSuccessRegistration(result.registration);
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#0070F3', '#38BDF8', '#FFFFFF'],
      });
    } else if (result.error) {
      setErrors({ email: result.error });
    }
  };

  const handleCopyId = () => {
    if (!successRegistration) return;
    navigator.clipboard.writeText(successRegistration.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setCollege('');
    setGraduationYear('2025 (Final Year)');
    setReferralCode('');
    setErrors({});
    setSuccessRegistration(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0F1624] border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 p-6 md:p-8 text-slate-100 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!successRegistration ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Cost • 100% Online • Beginner Friendly</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Register for <span className="text-cyan-400">AI Project Workshop</span>
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                "Build Your First AI Project in 60 Minutes" — Reserved exclusively for engineering students.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border ${
                      errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 transition-colors`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@gmail.com"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border ${
                      errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 transition-colors`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
                <span className="text-[11px] text-slate-400">
                  Only one workshop registration is permitted per email address.
                </span>
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College / University <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. IIT Madras, PSG Tech, NIT Warangal"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border ${
                      errors.college ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 transition-colors`}
                  />
                </div>
                {errors.college && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.college}
                  </p>
                )}
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Graduation Year <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value as GraduationYear)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white transition-colors"
                  >
                    <option value="2025 (Final Year)">2025 (Final Year) — Priority Cohort</option>
                    <option value="2026 (3rd Year)">2026 (3rd Year)</option>
                    <option value="2027 (2nd Year)">2027 (2nd Year)</option>
                    <option value="2028 (1st Year)">2028 (1st Year)</option>
                    <option value="Other">Other / Recent Graduate</option>
                  </select>
                </div>
                <span className="text-[11px] text-cyan-400/90 flex items-center gap-1 mt-1">
                  ⭐ Final-year engineering students receive priority Q&A allocation.
                </span>
              </div>

              {/* Referral Code (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Referral Code <span className="text-slate-500">(Optional)</span>
                  </label>
                  {referralCode && (
                    <span className="text-[11px] text-cyan-400 font-mono">
                      Applied: {referralCode}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. AMB-RAHUL or PEER-VIVEK"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 uppercase font-mono transition-colors"
                  />
                </div>
                <span className="text-[11px] text-slate-400">
                  Enter your student ambassador or peer referral code to credit their campus leaderboard.
                </span>
              </div>

              {/* Acquisition Channel selector (defaults to College Communities, auto-sets if referral) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  How did you discover this workshop?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['College Communities', 'Student Ambassadors', 'Peer Referrals'] as ChannelType[]).map((chan) => (
                    <button
                      type="button"
                      key={chan}
                      onClick={() => setChannel(chan)}
                      className={`px-2 py-1.5 rounded text-xs font-medium border text-center transition-all ${
                        channel === chan
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {chan === 'College Communities' ? 'College Group' : chan === 'Student Ambassadors' ? 'Campus Lead' : 'Friend / Peer'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transform active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Your Free Seat...</span>
                ) : (
                  <>
                    <span>Confirm Free Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero fees • Instant registration confirmation ID generated</span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-2 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              Registration Confirmed! 🎉
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
              You are successfully enrolled for <strong className="text-cyan-400">"Build Your First AI Project in 60 Minutes"</strong>.
            </p>

            {/* Registration Pass Ticket */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-left mb-6 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Unique Pass ID</span>
                  <div className="text-xl font-mono font-bold text-cyan-400 flex items-center gap-2">
                    {successRegistration.id}
                  </div>
                </div>
                <button
                  onClick={handleCopyId}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Student Name</span>
                  <span className="font-semibold text-slate-200">{successRegistration.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">College</span>
                  <span className="font-semibold text-slate-200 truncate block">{successRegistration.college}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Graduation Year</span>
                  <span className="font-semibold text-cyan-300">{successRegistration.graduationYear}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Channel Attribution</span>
                  <span className="font-semibold text-slate-300">{successRegistration.channel}</span>
                </div>
              </div>

              {successRegistration.referralCode && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Referral Code Credited:</span>
                  <span className="font-mono font-bold text-cyan-400">{successRegistration.referralCode}</span>
                </div>
              )}
            </div>

            {/* Essential note following guidelines */}
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-slate-300 text-left mb-6 flex items-start gap-2.5">
              <CalendarDays className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cyan-300">Next Steps & Session Access</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Workshop orientation instructions, session joining link, and calendar invite will be dispatched to <strong>{successRegistration.email}</strong> prior to the workshop broadcast.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleResetForm}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Register Another Student
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

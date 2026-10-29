import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  GraduationCap, 
  School, 
  Mail, 
  User, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Ticket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGrowth } from '../../context/GrowthContext';
import type { ChannelType, GraduationYear, Registration } from '../../types';

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
  const { addRegistration } = useGrowth();

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

  useEffect(() => {
    if (prefilledReferralCode) {
      setReferralCode(prefilledReferralCode.toUpperCase());
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

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 letters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid personal or university email address.';
    }

    if (!college.trim() || college.trim().length < 2) {
      newErrors.college = 'Please specify your engineering college or university.';
    }

    if (!graduationYear) {
      newErrors.graduationYear = 'Please select your graduation year.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

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
      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#38BDF8', '#2563EB', '#FFFFFF'],
        });
      } catch (err) {
        // Safe fallback
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B101D] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 text-slate-100 my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!successRegistration ? (
          <div>
            {/* Modal Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-2">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Zero Cost • 100% Online • Beginner Friendly</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Register for <span className="text-cyan-400">AI Project Workshop</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                "Build Your First AI Project in 60 Minutes" — Reserved exclusively for engineering students.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/90 border ${
                      errors.name ? 'border-rose-500' : 'border-white/[0.1] focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500`}
                  />
                </div>
                {errors.name && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@gmail.com"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/90 border ${
                      errors.email ? 'border-rose-500' : 'border-white/[0.1] focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Only one workshop registration is permitted per unique email.
                </span>
              </div>

              {/* College */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  College / University <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. IIT Madras, PSG Tech, NIT Warangal"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/90 border ${
                      errors.college ? 'border-rose-500' : 'border-white/[0.1] focus:border-cyan-400'
                    } focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500`}
                  />
                </div>
                {errors.college && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.college}
                  </p>
                )}
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Graduation Year <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value as GraduationYear)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/90 border border-white/[0.1] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white"
                  >
                    <option value="2025 (Final Year)">2025 (Final Year) — Priority Cohort</option>
                    <option value="2026 (3rd Year)">2026 (3rd Year)</option>
                    <option value="2027 (2nd Year)">2027 (2nd Year)</option>
                    <option value="2028 (1st Year)">2028 (1st Year)</option>
                    <option value="Other">Other / Recent Graduate</option>
                  </select>
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Referral Code <span className="text-slate-500">(Optional)</span>
                  </label>
                  {referralCode && (
                    <span className="text-[10px] text-cyan-400 font-mono">
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
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/90 border border-white/[0.1] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-white font-mono uppercase"
                  />
                </div>
              </div>

              {/* Channel Discovery Selection */}
              <div className="pt-1">
                <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                  Acquisition Pathway:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['College Communities', 'Student Ambassadors', 'Peer Referrals'] as ChannelType[]).map((chan) => (
                    <button
                      type="button"
                      key={chan}
                      onClick={() => setChannel(chan)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                        channel === chan
                          ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-300 font-semibold'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
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
                className="w-full mt-3 py-3 px-4 rounded-xl text-xs font-bold electric-glow-btn flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 transition-all"
              >
                {isSubmitting ? (
                  <span>Securing Seat...</span>
                ) : (
                  <>
                    <span>Confirm Free Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero registration fees • Unique digital confirmation pass generated</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmed Registration Boarding Pass / Ticket */
          <div className="text-center py-2 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-0.5">
              Registration Confirmed! 🎉
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              Seat confirmed for <strong className="text-cyan-300">"Build Your First AI Project in 60 Minutes"</strong>
            </p>

            {/* Boarding Pass Ticket Container */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0F1626] to-[#0A0F1D] border border-cyan-500/30 text-left mb-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Official Pass ID</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">{successRegistration.id}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyId}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-slate-200 flex items-center gap-1.5 border border-white/[0.08] transition-colors"
                >
                  {copiedId ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Student</span>
                  <span className="font-semibold text-slate-100">{successRegistration.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">College</span>
                  <span className="font-semibold text-slate-100 truncate block">{successRegistration.college}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Graduation</span>
                  <span className="font-semibold text-cyan-300">{successRegistration.graduationYear}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Channel</span>
                  <span className="font-semibold text-slate-300">{successRegistration.channel}</span>
                </div>
              </div>

              {successRegistration.referralCode && (
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-400">Referral Credited:</span>
                  <span className="font-mono font-semibold text-cyan-400">{successRegistration.referralCode}</span>
                </div>
              )}
            </div>

            {/* Compliance Guarantee Box */}
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs text-slate-300 text-left mb-5 flex items-start gap-2.5">
              <CalendarDays className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cyan-300 text-[11px]">Next Steps & Workshop Access</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Workshop orientation instructions and official session joining link will be dispatched directly to <strong>{successRegistration.email}</strong> prior to the broadcast.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5">
              <button
                onClick={handleResetForm}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-colors"
              >
                Register Another Student
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold electric-glow-btn transition-colors"
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

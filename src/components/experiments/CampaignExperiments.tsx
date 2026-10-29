import React, { useState } from 'react';
import { 
  FlaskConical, 
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Trash2, 
  Edit3
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import type { CampaignExperiment, ChannelType, ExperimentDecision, ExperimentStatus } from '../../types';

export const CampaignExperiments: React.FC = () => {
  const { experiments, addExperiment, updateExperiment, deleteExperiment } = useGrowth();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<ChannelType>('College Communities');
  const [targetAudience, setTargetAudience] = useState('');
  const [messageVariant, setMessageVariant] = useState('');
  const [outreachVolume, setOutreachVolume] = useState<number>(500);
  const [registrations, setRegistrations] = useState<number>(25);
  const [status, setStatus] = useState<ExperimentStatus>('Active');
  const [decision, setDecision] = useState<ExperimentDecision>('Under Review');
  const [notes, setNotes] = useState('');

  const handleOpenAdd = () => {
    setTitle('');
    setChannel('College Communities');
    setTargetAudience('Final Year CSE/IT WhatsApp Groups');
    setMessageVariant('');
    setOutreachVolume(500);
    setRegistrations(25);
    setStatus('Active');
    setDecision('Under Review');
    setNotes('');
    setEditingId(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (exp: CampaignExperiment) => {
    setTitle(exp.title);
    setChannel(exp.channel);
    setTargetAudience(exp.targetAudience);
    setMessageVariant(exp.messageVariant);
    setOutreachVolume(exp.outreachVolume);
    setRegistrations(exp.registrations);
    setStatus(exp.status);
    setDecision(exp.decision);
    setNotes(exp.notes);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      updateExperiment(editingId, {
        title,
        channel,
        targetAudience,
        messageVariant,
        outreachVolume: Number(outreachVolume) || 0,
        registrations: Number(registrations) || 0,
        status,
        decision,
        notes,
      });
    } else {
      addExperiment({
        title,
        channel,
        targetAudience,
        messageVariant,
        outreachVolume: Number(outreachVolume) || 0,
        registrations: Number(registrations) || 0,
        status,
        decision,
        notes,
      });
    }

    setIsAdding(false);
    setEditingId(null);
  };

  const calculateCR = (regs: number, volume: number): string => {
    if (!volume || volume <= 0) return '0.00%';
    const rate = (regs / volume) * 100;
    return `${rate.toFixed(2)}%`;
  };

  const getDecisionBadge = (d: ExperimentDecision) => {
    switch (d) {
      case 'Scale':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3" /> Scale (Winner)
          </span>
        );
      case 'Kill':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-950/70 text-rose-400 border border-rose-500/40">
            <XCircle className="w-3 h-3" /> Kill (Low CR)
          </span>
        );
      case 'Iterate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/70 text-amber-300 border border-amber-500/40">
            <RotateCcw className="w-3 h-3" /> Iterate
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
            <HelpCircle className="w-3 h-3" /> Under Review
          </span>
        );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Feature 5: A/B Campaign Experiments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Growth Experiment Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Test promotional copy angles, track outreach volume and conversion efficiency, and record decisions based on verified evidence.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold electric-glow-btn flex items-center gap-2 shrink-0 active:scale-95 transition-transform"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Experiment Variant</span>
        </button>
      </div>

      {/* Add / Edit Experiment Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B101D] border border-cyan-500/30 p-6 text-slate-100 shadow-2xl my-6">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingId ? 'Edit Campaign Experiment' : 'New Campaign Variant'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Record outreach volume and completed signups to compute actual conversion rate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Experiment Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Variant E: 'Placement Ready in 60 Mins'"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Target Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as ChannelType)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="College Communities">College Communities</option>
                    <option value="Student Ambassadors">Student Ambassadors</option>
                    <option value="Peer Referrals">Peer Referrals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Audience Segment</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Final Year CSE Class WhatsApp"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Message Variant Copy</label>
                <textarea
                  rows={2}
                  value={messageVariant}
                  onChange={(e) => setMessageVariant(e.target.value)}
                  placeholder="Paste the promotional message angle..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Outreach Sent</label>
                  <input
                    type="number"
                    min="0"
                    value={outreachVolume}
                    onChange={(e) => setOutreachVolume(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Registrations</label>
                  <input
                    type="number"
                    min="0"
                    value={registrations}
                    onChange={(e) => setRegistrations(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Real-time CR indicator */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Calculated Conversion Rate:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {calculateCR(registrations, outreachVolume)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ExperimentStatus)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Growth Decision</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value as ExperimentDecision)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Scale">Scale (Winning)</option>
                    <option value="Iterate">Iterate (Modify)</option>
                    <option value="Kill">Kill (Drop)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Evidence & Strategic Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Placement angle showed high resonance with Tier-2 colleges..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-bold electric-glow-btn transition-colors"
                >
                  Save Experiment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((exp) => {
          const cr = calculateCR(exp.registrations, exp.outreachVolume);

          return (
            <div
              key={exp.id}
              className="p-5 rounded-2xl surface-card surface-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                      {exp.channel}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-1.5">{exp.title}</h3>
                    <p className="text-[11px] text-slate-400">{exp.targetAudience}</p>
                  </div>

                  <div>{getDecisionBadge(exp.decision)}</div>
                </div>

                {exp.messageVariant && (
                  <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04] text-xs text-slate-300 font-mono mb-3.5 line-clamp-2">
                    "{exp.messageVariant}"
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-center mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Outreach</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{exp.outreachVolume.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Signups</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-400">{exp.registrations}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Conversion</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">{cr}</span>
                  </div>
                </div>

                {exp.notes && (
                  <p className="text-[11px] text-slate-400 mb-3">
                    <strong className="text-slate-300">Observation:</strong> {exp.notes}
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-xs text-slate-400">
                <span className="text-[10px]">Logged: {exp.createdAt}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-1.5 rounded hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                    title="Edit experiment"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteExperiment(exp.id)}
                    className="p-1.5 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete experiment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

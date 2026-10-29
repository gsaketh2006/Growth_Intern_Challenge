import React, { useState } from 'react';
import { 
  FlaskConical, 
  PlusCircle, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Scale, 
  Trash2, 
  Edit3, 
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import { CampaignExperiment, ChannelType, ExperimentDecision, ExperimentStatus } from '../../types';

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

  // Helper to calculate conversion rate safely
  const calculateCR = (regs: number, volume: number): string => {
    if (!volume || volume <= 0) return '0.00%';
    const rate = (regs / volume) * 100;
    return `${rate.toFixed(2)}%`;
  };

  const getDecisionBadge = (d: ExperimentDecision) => {
    switch (d) {
      case 'Scale':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Scale (Winning)
          </span>
        );
      case 'Kill':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-950 text-rose-400 border border-rose-800">
            <XCircle className="w-3.5 h-3.5" /> Kill (Sub-par)
          </span>
        );
      case 'Iterate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
            <RotateCcw className="w-3.5 h-3.5" /> Iterate
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            <HelpCircle className="w-3.5 h-3.5" /> Under Review
          </span>
        );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/80 mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Feature 5: A/B Campaign Experiments</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Growth Experiment Tracker
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Test copy variants, track conversion velocity across channels, and make data-driven decisions on where to allocate the promotional budget.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Experiment Variant</span>
        </button>
      </div>

      {/* Add / Edit Experiment Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0F1624] border border-cyan-500/30 p-6 sm:p-8 text-slate-100 shadow-2xl my-8">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingId ? 'Edit Campaign Experiment' : 'Launch New Campaign Variant'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Track outreach volume, attributed signups, and calculate real conversion efficiency.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experiment Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Variant E: 'Placement Ready in 60 Mins'"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as ChannelType)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="College Communities">College Communities</option>
                    <option value="Student Ambassadors">Student Ambassadors</option>
                    <option value="Peer Referrals">Peer Referrals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Audience Segment</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. Final Year CSE Class WhatsApp"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Copy Variant</label>
                <textarea
                  rows={3}
                  value={messageVariant}
                  onChange={(e) => setMessageVariant(e.target.value)}
                  placeholder="Paste the promotional message angle tested..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Outreach Volume (Sent)</label>
                  <input
                    type="number"
                    min="0"
                    value={outreachVolume}
                    onChange={(e) => setOutreachVolume(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Completed Registrations</label>
                  <input
                    type="number"
                    min="0"
                    value={registrations}
                    onChange={(e) => setRegistrations(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Real-time CR indicator */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Calculated Conversion Rate:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {calculateCR(registrations, outreachVolume)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ExperimentStatus)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Growth Decision</label>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value as ExperimentDecision)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Scale">Scale (Winning)</option>
                    <option value="Iterate">Iterate (Modify)</option>
                    <option value="Kill">Kill (Drop)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Strategic Insights</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Placement angle showed high resonance with Tier-2 colleges..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20 transition-colors"
                >
                  Save Experiment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiments.map((exp) => {
          const cr = calculateCR(exp.registrations, exp.outreachVolume);

          return (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-cyan-500/30 card-hover flex flex-col justify-between"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {exp.channel}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{exp.title}</h3>
                    <p className="text-xs text-slate-400">{exp.targetAudience}</p>
                  </div>

                  <div>{getDecisionBadge(exp.decision)}</div>
                </div>

                {/* Message snippet */}
                {exp.messageVariant && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 font-mono mb-4 line-clamp-2">
                    "{exp.messageVariant}"
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Outreach Sent</span>
                    <span className="text-sm font-bold text-white">{exp.outreachVolume.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Registrations</span>
                    <span className="text-sm font-bold text-cyan-400">{exp.registrations}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Conversion Rate</span>
                    <span className="text-sm font-bold text-emerald-400">{cr}</span>
                  </div>
                </div>

                {/* Strategic Notes */}
                {exp.notes && (
                  <p className="text-xs text-slate-400 italic mb-4">
                    <strong>Evidence:</strong> {exp.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-[11px]">Logged: {exp.createdAt}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
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

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Search, 
  DollarSign, 
  PlusCircle, 
  RotateCcw, 
  Trash2, 
  Lock, 
  Unlock, 
  KeyRound, 
  AlertTriangle,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import type { ChannelType, ExpenseCategory, GraduationYear } from '../../types';

export const AdminPanel: React.FC = () => {
  const {
    allRegistrations,
    expenses,
    addExpense,
    deleteExpense,
    resetAllData,
    exportToCSV,
    isDemoMode,
  } = useGrowth();

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nxtwave_admin_authenticated') === 'true';
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Table filters & pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | 'All'>('All');
  const [selectedGradYear, setSelectedGradYear] = useState<GraduationYear | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Expense recording form
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('Promotional experiments');
  const [expAmount, setExpAmount] = useState<number>(250);
  const [expDesc, setExpDesc] = useState('');

  // Reset confirmation modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode.trim().toLowerCase() === 'nxtwave' || adminPasscode.trim().toLowerCase() === 'nxtwave2025' || adminPasscode.trim() === 'demo') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('nxtwave_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Use "nxtwave" or "nxtwave2025" for reviewer access.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('nxtwave_admin_authenticated');
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expAmount || expAmount <= 0) return;

    addExpense({
      category: expCategory,
      amount: Number(expAmount),
      description: expDesc.trim() || 'Campaign expenditure',
      date: new Date().toISOString().split('T')[0],
    });

    setExpDesc('');
    setIsAddingExpense(false);
  };

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return allRegistrations.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.referralCode && r.referralCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesChannel = selectedChannel === 'All' || r.channel === selectedChannel;
      const matchesGrad = selectedGradYear === 'All' || r.graduationYear === selectedGradYear;

      return matchesSearch && matchesChannel && matchesGrad;
    });
  }, [allRegistrations, searchTerm, selectedChannel, selectedGradYear]);

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(start, start + itemsPerPage);
  }, [filteredRegistrations, currentPage]);

  if (!isAdminAuthenticated) {
    return (
      <div className="py-20 px-4 max-w-sm mx-auto text-slate-100 animate-fade-in">
        <div className="surface-card p-6 sm:p-8 rounded-2xl text-center shadow-2xl border border-cyan-500/20">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-white mb-1">
            Administrator Access
          </h2>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Restricted to authorized growth marketing coordinators.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-3.5">
            <div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Passcode (e.g. nxtwave)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              {authError && (
                <p className="text-[11px] text-rose-400 mt-1">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold electric-glow-btn transition-colors"
            >
              Sign In to Admin Hub
            </button>

            <div className="pt-2 text-[11px] text-slate-400">
              <span>Reviewer Passcode: </span>
              <button
                type="button"
                onClick={() => setAdminPasscode('nxtwave')}
                className="text-cyan-400 font-mono font-semibold hover:underline"
              >
                nxtwave
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Active • Growth Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Campaign Administration & Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Audit student registrations, export CSV callsets, manage campaign expense ledger, and configure demo simulation states.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold electric-glow-btn flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({allRegistrations.length})</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
            title="Lock admin session"
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Campaign Expense Manager Section */}
      <div className="surface-card p-5 sm:p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Campaign Expense Accounting (₹2,000 Total Budget)
            </h3>
            <p className="text-xs text-slate-400">Record and track operational costs against designated caps</p>
          </div>

          <button
            onClick={() => setIsAddingExpense(!isAddingExpense)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAddingExpense ? 'Cancel' : 'Record Expense'}</span>
          </button>
        </div>

        {/* Add Expense Form */}
        {isAddingExpense && (
          <form onSubmit={handleAddExpenseSubmit} className="p-4 rounded-xl bg-slate-900 border border-white/[0.1] mb-5 space-y-3 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Ambassador coordination">Ambassador coordination (Cap: ₹600)</option>
                  <option value="Promotional experiments">Promotional experiments (Cap: ₹1,000)</option>
                  <option value="Contingency">Contingency (Cap: ₹400)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={expAmount}
                  onChange={(e) => setExpAmount(Number(e.target.value))}
                  placeholder="250"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="e.g. Incentives for campus leads"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingExpense(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold electric-glow-btn rounded-lg"
              >
                Save Expense Entry
              </button>
            </div>
          </form>
        )}

        {/* Expenses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {expenses.map((exp) => (
            <div key={exp.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{exp.date}</span>
                  <span className="font-bold text-white text-sm">₹{exp.amount}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.04] text-cyan-300 block w-fit mb-1.5">
                  {exp.category}
                </span>
                <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                  {exp.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.06] flex justify-end">
                <button
                  onClick={() => deleteExpense(exp.id)}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registrations Audit Table */}
      <div className="surface-card p-5 sm:p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              Verified Student Registrations
            </h3>
            <p className="text-xs text-slate-400">
              Showing {filteredRegistrations.length} of {allRegistrations.length} total records
            </p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, college, ID..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <select
              value={selectedChannel}
              onChange={(e) => {
                setSelectedChannel(e.target.value as ChannelType | 'All');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Channels</option>
              <option value="College Communities">College Communities</option>
              <option value="Student Ambassadors">Student Ambassadors</option>
              <option value="Peer Referrals">Peer Referrals</option>
            </select>
          </div>

          <div>
            <select
              value={selectedGradYear}
              onChange={(e) => {
                setSelectedGradYear(e.target.value as GraduationYear | 'All');
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Graduation Years</option>
              <option value="2025 (Final Year)">2025 (Final Year Only)</option>
              <option value="2026 (3rd Year)">2026 (3rd Year)</option>
              <option value="2027 (2nd Year)">2027 (2nd Year)</option>
              <option value="2028 (1st Year)">2028 (1st Year)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0A0F1D] text-slate-400 uppercase text-[10px] font-semibold border-b border-white/[0.08]">
              <tr>
                <th className="px-4 py-3">Pass ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Email Address</th>
                <th className="px-4 py-3">College / University</th>
                <th className="px-4 py-3">Grad Year</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Referral Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] bg-black/20">
              {paginatedRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No registrations found matching the specified filters.
                  </td>
                </tr>
              ) : (
                paginatedRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-2.5 font-mono font-bold text-cyan-400">{reg.id}</td>
                    <td className="px-4 py-2.5 font-semibold text-white">{reg.name}</td>
                    <td className="px-4 py-2.5 text-slate-400">{reg.email}</td>
                    <td className="px-4 py-2.5 text-slate-300 max-w-xs truncate">{reg.college}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        reg.graduationYear.includes('2025')
                          ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/60'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}>
                        {reg.graduationYear}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-300">{reg.channel}</td>
                    <td className="px-4 py-2.5 font-mono font-semibold text-cyan-300">
                      {reg.referralCode || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-4 mt-1 text-xs text-slate-400">
          <span>
            Page {currentPage} of {totalPages} ({filteredRegistrations.length} items)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/[0.06]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/[0.06]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0B101D] border border-rose-500/40 p-6 text-slate-100 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white text-center mb-1">
              Confirm Data Reset
            </h3>
            <p className="text-xs text-slate-300 text-center mb-5 leading-relaxed">
              Are you sure you want to reset {isDemoMode ? 'the synthetic demo dataset' : 'all live registrations and recorded expenses'}? This action cannot be reversed.
            </p>

            <div className="flex gap-2.5">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

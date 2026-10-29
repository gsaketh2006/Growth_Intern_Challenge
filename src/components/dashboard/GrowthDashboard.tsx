import React, { useMemo } from 'react';
import { 
  Target, 
  Users, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Filter, 
  Calendar, 
  Layers, 
  ArrowUpRight,
  PieChart,
  BarChart2,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import { ChannelType } from '../../types';

export const GrowthDashboard: React.FC = () => {
  const {
    registrations,
    allRegistrations,
    campaignTarget,
    campaignDaysRemaining,
    campaignDaysTotal,
    totalBudget,
    totalBudgetSpent,
    budgetRemaining,
    budgetAllocations,
    costPerRegistration,
    channelFilter,
    setChannelFilter,
    dateFilter,
    setDateFilter,
    ambassadors,
    getAmbassadorAttribution,
    isDemoMode
  } = useGrowth();

  // Metrics
  const totalCount = allRegistrations.length;
  const filteredCount = registrations.length;
  const remainingCount = Math.max(0, campaignTarget - totalCount);
  const targetPct = Math.min(100, Math.round((totalCount / campaignTarget) * 100));

  // Channel breakdown
  const channelCounts = useMemo(() => {
    const counts: Record<ChannelType, number> = {
      'College Communities': 0,
      'Student Ambassadors': 0,
      'Peer Referrals': 0,
    };
    allRegistrations.forEach((r) => {
      if (counts[r.channel] !== undefined) {
        counts[r.channel]++;
      }
    });
    return counts;
  }, [allRegistrations]);

  // Daily trends calculation
  const dailyTrends = useMemo(() => {
    const map = new Map<string, number>();
    // Sort registrations by registeredAt
    const sorted = [...registrations].sort(
      (a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
    );

    sorted.forEach((r) => {
      const dateKey = r.registeredAt.split('T')[0];
      map.set(dateKey, (map.get(dateKey) || 0) + 1);
    });

    const entries = Array.from(map.entries()).map(([date, count]) => {
      const parsedDate = new Date(date);
      const label = isNaN(parsedDate.getTime()) 
        ? date 
        : parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        rawDate: date,
        label,
        count,
      };
    });

    return entries;
  }, [registrations]);

  const maxDailyCount = useMemo(() => {
    return Math.max(10, ...dailyTrends.map((d) => d.count));
  }, [dailyTrends]);

  // Top performing referral codes
  const topReferralCodes = useMemo(() => {
    const codeMap = new Map<string, { code: string; count: number; channel: string }>();
    allRegistrations.forEach((r) => {
      if (r.referralCode && r.referralCode.trim()) {
        const code = r.referralCode.trim().toUpperCase();
        const existing = codeMap.get(code) || { code, count: 0, channel: r.channel };
        existing.count++;
        codeMap.set(code, existing);
      }
    });

    return Array.from(codeMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [allRegistrations]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/80 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Feature 3: Growth Campaign Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            500 Student Acquisition Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time campaign performance across College Communities, Student Ambassadors, and Peer Referrals under the ₹2,000 budget constraint.
          </p>
        </div>

        {/* Global Campaign Health Pill */}
        <div className="flex items-center gap-3 bg-[#0F1624] p-3 rounded-2xl border border-cyan-500/30 shrink-0 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Pace to Target</div>
            <div className="text-base font-extrabold text-white flex items-center gap-2">
              <span>{targetPct}% achieved</span>
              <span className="text-xs font-medium text-cyan-400">({remainingCount} to go)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Total Registrations */}
        <div className="p-5 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-cyan-500/40 card-hover">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Registrations</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalCount} <span className="text-sm font-normal text-slate-400">/ {campaignTarget}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Remaining Gap:</span>
            <span className="font-bold text-amber-400">{remainingCount} students</span>
          </div>
        </div>

        {/* KPI 2: Target Achieved % */}
        <div className="p-5 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-blue-500/40 card-hover">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Goal Achievement</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-blue-400">
            {targetPct}%
          </div>
          <div className="mt-3">
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${targetPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Days Remaining */}
        <div className="p-5 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-amber-500/40 card-hover">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Campaign Timeline</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {campaignDaysRemaining} <span className="text-sm font-normal text-slate-400">Days Left</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Total Window:</span>
            <span className="font-semibold text-slate-200">{campaignDaysTotal} Days (Sprint)</span>
          </div>
        </div>

        {/* KPI 4: Budget per Registration */}
        <div className="p-5 rounded-2xl bg-[#0F1624] border border-slate-800 hover:border-emerald-500/40 card-hover">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Cost Per Registration</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {costPerRegistration !== null ? `₹${costPerRegistration}` : '—'}
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>Total Spent:</span>
            <span className="font-semibold text-slate-200">₹{totalBudgetSpent} / ₹{totalBudget}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Toward 500 Registrations */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F1624] via-[#141D2E] to-[#0F1624] border border-cyan-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Campaign Sprint Progress Toward 500 Target</h3>
          </div>
          <div className="text-xs text-slate-400">
            <span className="font-bold text-cyan-400">{totalCount}</span> of 500 Confirmed Registrations ({targetPct}%)
          </div>
        </div>

        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-700 relative shadow-md shadow-cyan-500/50"
            style={{ width: `${targetPct}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2">
          <span>Sprint Day 1 (0 signups)</span>
          <span className="font-semibold text-cyan-400">50% Milestone (250)</span>
          <span>Goal (500 signups)</span>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Channel Filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> Channel:
          </span>
          {(['All', 'College Communities', 'Student Ambassadors', 'Peer Referrals'] as Array<ChannelType | 'All'>).map((chan) => (
            <button
              key={chan}
              onClick={() => setChannelFilter(chan)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                channelFilter === chan
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {chan}
            </button>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Date:
          </span>
          <input
            type="date"
            value={dateFilter.startDate || ''}
            onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value || undefined })}
            className="px-2 py-1 text-xs rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            value={dateFilter.endDate || ''}
            onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value || undefined })}
            className="px-2 py-1 text-xs rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
          />
          {(dateFilter.startDate || dateFilter.endDate || channelFilter !== 'All') && (
            <button
              onClick={() => {
                setDateFilter({});
                setChannelFilter('All');
              }}
              className="text-xs text-cyan-400 hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Charts & Channel Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Registration Trends (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0F1624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                Daily Registration Velocity
              </h3>
              <p className="text-xs text-slate-400">Day-by-day confirmed student signups</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800/60">
              {filteredCount} records in view
            </span>
          </div>

          {dailyTrends.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              <Users className="w-8 h-8 text-slate-600 mb-2" />
              <span>No registrations recorded for the selected filter range.</span>
            </div>
          ) : (
            <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-800">
              {dailyTrends.map((d, i) => {
                const heightPct = Math.round((d.count / maxDailyCount) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] font-mono font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                      {d.count}
                    </div>
                    <div className="w-full max-w-[48px] bg-slate-800/60 rounded-t-lg relative overflow-hidden flex items-end justify-center h-full">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover:from-blue-500 group-hover:to-cyan-300 shadow-lg shadow-cyan-500/20"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Acquisition Channel Breakdown (1 Col) */}
        <div className="p-6 rounded-2xl bg-[#0F1624] border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <PieChart className="w-4 h-4 text-blue-400" />
              Registrations by Channel
            </h3>
            <p className="text-xs text-slate-400 mb-6">Distribution across 3 campaign pathways</p>

            <div className="space-y-4">
              {/* Channel 1: College Communities */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">1. College Communities</span>
                  <span className="font-bold text-white">
                    {channelCounts['College Communities']} ({totalCount > 0 ? Math.round((channelCounts['College Communities'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['College Communities'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Channel 2: Student Ambassadors */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">2. Student Ambassadors</span>
                  <span className="font-bold text-white">
                    {channelCounts['Student Ambassadors']} ({totalCount > 0 ? Math.round((channelCounts['Student Ambassadors'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['Student Ambassadors'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Channel 3: Peer Referrals */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">3. Peer Referrals</span>
                  <span className="font-bold text-white">
                    {channelCounts['Peer Referrals']} ({totalCount > 0 ? Math.round((channelCounts['Peer Referrals'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['Peer Referrals'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Highest Volume:</span>
            <span className="font-bold text-cyan-300">College Communities</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation & Leaderboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Budget Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0F1624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                ₹2,000 Campaign Budget Allocation
              </h3>
              <p className="text-xs text-slate-400">Strict cap across designated spending categories</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              ₹{budgetRemaining} Remaining
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Ambassador Co-ord</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.ambassadorCoordination}</div>
              <span className="text-[10px] text-slate-500">Fixed cap</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Promotional Exp.</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.promotionalExperiments}</div>
              <span className="text-[10px] text-slate-500">A/B Testing</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block">Contingency</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.contingency}</div>
              <span className="text-[10px] text-slate-500">Buffer</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Budget Spent so far:</span>
              <div className="text-sm font-bold text-white">₹{totalBudgetSpent} of ₹{totalBudget}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">Cost per Registration:</span>
              <div className="text-sm font-bold text-cyan-400">
                {costPerRegistration !== null ? `₹${costPerRegistration}` : 'N/A (No signups)'}
              </div>
            </div>
          </div>
        </div>

        {/* Top Referral Codes */}
        <div className="p-6 rounded-2xl bg-[#0F1624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Top-Performing Referral Codes
              </h3>
              <p className="text-xs text-slate-400">Highest attributed student registrations</p>
            </div>
          </div>

          {topReferralCodes.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
              No referral codes have been recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {topReferralCodes.map((item, idx) => (
                <div
                  key={item.code}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-cyan-400 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-mono font-bold text-white text-xs">{item.code}</span>
                      <span className="text-[10px] text-slate-400 block">{item.channel}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-cyan-400">{item.count}</span>
                    <span className="text-[10px] text-slate-500 block">completed</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

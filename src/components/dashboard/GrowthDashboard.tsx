import React, { useMemo, useState } from 'react';
import { 
  Target, 
  Users, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Filter, 
  Calendar, 
  PieChart,
  BarChart2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useGrowth } from '../../context/GrowthContext';
import type { ChannelType } from '../../types';

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
  } = useGrowth();

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Key metrics
  const totalCount = allRegistrations.length;
  const filteredCount = registrations.length;
  const remainingCount = Math.max(0, campaignTarget - totalCount);
  const targetPct = Math.min(100, Math.round((totalCount / campaignTarget) * 100));

  // Channel breakdown counts
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
    const sorted = [...registrations].sort(
      (a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
    );

    sorted.forEach((r) => {
      const dateKey = r.registeredAt.split('T')[0];
      map.set(dateKey, (map.get(dateKey) || 0) + 1);
    });

    return Array.from(map.entries()).map(([date, count]) => {
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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Growth Analytics & Campaign Performance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            500 Student Registration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Acquisition progress tracking across College Communities, Student Ambassadors, and Peer Referrals within the ₹2,000 budget.
          </p>
        </div>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-3 surface-card p-3 rounded-2xl shrink-0">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pace to Target</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{targetPct}% achieved</span>
              <span className="text-[11px] font-normal text-cyan-400">({remainingCount} to target)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Registrations */}
        <div className="surface-card surface-card-hover p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Total Registrations</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalCount} <span className="text-xs font-normal text-slate-400">/ {campaignTarget}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Remaining to Goal:</span>
            <span className="font-semibold text-amber-300">{remainingCount} students</span>
          </div>
        </div>

        {/* KPI 2: Target Achieved */}
        <div className="surface-card surface-card-hover p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Target Progress</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-blue-400">
            {targetPct}%
          </div>
          <div className="mt-3">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${targetPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Campaign Days Left */}
        <div className="surface-card surface-card-hover p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Days Remaining</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-300">
            {campaignDaysRemaining} <span className="text-xs font-normal text-slate-400">Days Left</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Campaign Duration:</span>
            <span className="font-semibold text-slate-200">{campaignDaysTotal} Days Total</span>
          </div>
        </div>

        {/* KPI 4: Cost per Registration */}
        <div className="surface-card surface-card-hover p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Cost per Registration</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {costPerRegistration !== null ? `₹${costPerRegistration}` : '—'}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Spend Recorded:</span>
            <span className="font-semibold text-slate-200">₹{totalBudgetSpent} / ₹{totalBudget}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Toward 500 Registrations */}
      <div className="surface-card p-5 rounded-2xl border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white">Campaign Sprint Progress Toward 500 Target</h3>
          </div>
          <div className="text-xs text-slate-400">
            <span className="font-bold text-cyan-400">{totalCount}</span> of 500 Confirmed Registrations ({targetPct}%)
          </div>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-700 shadow-sm shadow-cyan-500/50"
            style={{ width: `${targetPct}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
          <span>Sprint Day 1 (0 signups)</span>
          <span className="font-semibold text-cyan-400/90">250 Milestone (50%)</span>
          <span>500 Registrations (100% Goal)</span>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        {/* Channel Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Channel:
          </span>
          {(['All', 'College Communities', 'Student Ambassadors', 'Peer Referrals'] as Array<ChannelType | 'All'>).map((chan) => (
            <button
              key={chan}
              onClick={() => setChannelFilter(chan)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                channelFilter === chan
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {chan}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Date:
          </span>
          <input
            type="date"
            value={dateFilter.startDate || ''}
            onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value || undefined })}
            className="px-2 py-1 text-xs rounded bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
          />
          <span className="text-slate-500">to</span>
          <input
            type="date"
            value={dateFilter.endDate || ''}
            onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value || undefined })}
            className="px-2 py-1 text-xs rounded bg-slate-900 border border-white/[0.1] text-slate-200 focus:outline-none focus:border-cyan-400"
          />
          {(dateFilter.startDate || dateFilter.endDate || channelFilter !== 'All') && (
            <button
              onClick={() => {
                setDateFilter({});
                setChannelFilter('All');
              }}
              className="text-xs text-cyan-400 hover:underline ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Charts & Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Registration Trends (2 Cols) */}
        <div className="lg:col-span-2 surface-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyan-400" />
                  Daily Registration Trends
                </h3>
                <p className="text-xs text-slate-400">Day-by-day confirmed student signups</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {filteredCount} in view
              </span>
            </div>

            {dailyTrends.length === 0 ? (
              <div className="h-60 flex flex-col items-center justify-center text-slate-500 text-xs border border-dashed border-white/[0.08] rounded-xl">
                <span>No registrations recorded for the current filter criteria.</span>
              </div>
            ) : (
              <div className="h-60 flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-white/[0.08]">
                {dailyTrends.map((d, i) => {
                  const heightPct = Math.round((d.count / maxDailyCount) * 100);
                  const isHovered = hoveredBarIndex === i;

                  return (
                    <div 
                      key={i} 
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative cursor-pointer"
                      onMouseEnter={() => setHoveredBarIndex(i)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute -top-10 z-20 bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in">
                          <strong>{d.count} signups</strong> ({Math.round((d.count / (totalCount || 1)) * 100)}%)
                        </div>
                      )}

                      <div className="w-full max-w-[44px] bg-slate-800/40 rounded-t-lg relative overflow-hidden flex items-end justify-center h-full">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 ${
                            isHovered 
                              ? 'bg-gradient-to-t from-cyan-400 to-blue-400' 
                              : 'bg-gradient-to-t from-blue-600 to-cyan-500'
                          }`}
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

          <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Peak velocity: {Math.max(...dailyTrends.map(d => d.count), 0)} signups/day</span>
            <span className="text-cyan-400">Dynamic aggregation</span>
          </div>
        </div>

        {/* Acquisition Channel Breakdown (1 Col) */}
        <div className="surface-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1">
              <PieChart className="w-4 h-4 text-blue-400" />
              Channel Breakdown
            </h3>
            <p className="text-xs text-slate-400 mb-6">Distribution across 3 campaign categories</p>

            <div className="space-y-4">
              {/* Channel 1: College Communities */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">1. College Communities</span>
                  <span className="font-bold text-white">
                    {channelCounts['College Communities']} ({totalCount > 0 ? Math.round((channelCounts['College Communities'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['College Communities'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Channel 2: Student Ambassadors */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">2. Student Ambassadors</span>
                  <span className="font-bold text-white">
                    {channelCounts['Student Ambassadors']} ({totalCount > 0 ? Math.round((channelCounts['Student Ambassadors'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['Student Ambassadors'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Channel 3: Peer Referrals */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">3. Peer Referrals</span>
                  <span className="font-bold text-white">
                    {channelCounts['Peer Referrals']} ({totalCount > 0 ? Math.round((channelCounts['Peer Referrals'] / totalCount) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${totalCount > 0 ? (channelCounts['Peer Referrals'] / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between">
            <span>Primary Driver:</span>
            <span className="font-bold text-cyan-300">College Communities</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation & Referral Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Budget Allocation */}
        <div className="surface-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                ₹2,000 Campaign Budget Allocation
              </h3>
              <p className="text-xs text-slate-400">Recorded spending against designated caps</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
              ₹{budgetRemaining} Remaining
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase block">Ambassador Co-ord</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.ambassadorCoordination}</div>
              <span className="text-[10px] text-slate-500">Cap: ₹600</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase block">Promo Experiments</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.promotionalExperiments}</div>
              <span className="text-[10px] text-slate-500">Cap: ₹1,000</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase block">Contingency</span>
              <div className="text-sm font-bold text-white mt-0.5">₹{budgetAllocations.contingency}</div>
              <span className="text-[10px] text-slate-500">Cap: ₹400</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Total Recorded Spend:</span>
              <div className="font-bold text-white">₹{totalBudgetSpent} of ₹{totalBudget}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px]">Cost Per Registration:</span>
              <div className="font-bold text-cyan-400">
                {costPerRegistration !== null ? `₹${costPerRegistration}` : '— (No registrations)'}
              </div>
            </div>
          </div>
        </div>

        {/* Top Referral Codes */}
        <div className="surface-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Top-Performing Referral Codes
              </h3>
              <p className="text-xs text-slate-400">Highest attributed student registrations</p>
            </div>
          </div>

          {topReferralCodes.length === 0 ? (
            <div className="h-36 flex items-center justify-center text-xs text-slate-500 border border-dashed border-white/[0.08] rounded-xl">
              No referral codes recorded yet.
            </div>
          ) : (
            <div className="space-y-2">
              {topReferralCodes.map((item, idx) => (
                <div
                  key={item.code}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-cyan-400 flex items-center justify-center">
                      #{idx + 1}
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

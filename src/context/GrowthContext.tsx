import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Registration,
  Ambassador,
  Expense,
  CampaignExperiment,
  ChannelType,
  DateFilterRange,
} from '../types';
import {
  INITIAL_AMBASSADORS,
  SAMPLE_EXPENSES,
  SAMPLE_EXPERIMENTS,
  generateSampleRegistrations,
} from '../data/mockData';

interface GrowthContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  registrations: Registration[];
  allRegistrations: Registration[];
  ambassadors: Ambassador[];
  expenses: Expense[];
  experiments: CampaignExperiment[];
  channelFilter: ChannelType | 'All';
  setChannelFilter: (c: ChannelType | 'All') => void;
  dateFilter: DateFilterRange;
  setDateFilter: (df: DateFilterRange) => void;
  campaignTarget: number;
  campaignDaysTotal: number;
  campaignDaysRemaining: number;
  totalBudget: number;
  budgetAllocations: {
    ambassadorCoordination: number;
    promotionalExperiments: number;
    contingency: number;
  };
  totalBudgetSpent: number;
  budgetRemaining: number;
  costPerRegistration: number | null;
  addRegistration: (newReg: Omit<Registration, 'id' | 'registeredAt'>) => {
    success: boolean;
    registration?: Registration;
    error?: string;
  };
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  addExperiment: (experiment: Omit<CampaignExperiment, 'id' | 'createdAt'>) => void;
  updateExperiment: (id: string, updates: Partial<CampaignExperiment>) => void;
  deleteExperiment: (id: string) => void;
  resetAllData: () => void;
  exportToCSV: () => void;
  getAmbassadorAttribution: (code: string) => number;
}

const STORAGE_KEYS = {
  LIVE_REGISTRATIONS: 'nxtwave_live_registrations',
  LIVE_EXPENSES: 'nxtwave_live_expenses',
  LIVE_EXPERIMENTS: 'nxtwave_live_experiments',
  IS_DEMO: 'nxtwave_is_demo_mode',
};

const GrowthContext = createContext<GrowthContextType | undefined>(undefined);

export const GrowthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with Demo Mode enabled by default so reviewers immediately see rich analytics
  const [isDemoMode, setIsDemoModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IS_DEMO);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const setIsDemoMode = (val: boolean) => {
    setIsDemoModeState(val);
    localStorage.setItem(STORAGE_KEYS.IS_DEMO, JSON.stringify(val));
  };

  // Live state
  const [liveRegistrations, setLiveRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIVE_REGISTRATIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [liveExpenses, setLiveExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIVE_EXPENSES);
    return saved ? JSON.parse(saved) : [];
  });

  const [liveExperiments, setLiveExperiments] = useState<CampaignExperiment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LIVE_EXPERIMENTS);
    return saved ? JSON.parse(saved) : [];
  });

  // Demo synthetic state (cached in memory or regenerated)
  const [demoRegistrations, setDemoRegistrations] = useState<Registration[]>(() => generateSampleRegistrations());
  const [demoExpenses, setDemoExpenses] = useState<Expense[]>(SAMPLE_EXPENSES);
  const [demoExperiments, setDemoExperiments] = useState<CampaignExperiment[]>(SAMPLE_EXPERIMENTS);

  // Sync Live Data to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIVE_REGISTRATIONS, JSON.stringify(liveRegistrations));
  }, [liveRegistrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIVE_EXPENSES, JSON.stringify(liveExpenses));
  }, [liveExpenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIVE_EXPERIMENTS, JSON.stringify(liveExperiments));
  }, [liveExperiments]);

  // Current active data set depending on mode
  const rawRegistrations = isDemoMode ? demoRegistrations : liveRegistrations;
  const expenses = isDemoMode ? demoExpenses : liveExpenses;
  const experiments = isDemoMode ? demoExperiments : liveExperiments;

  // Filter state
  const [channelFilter, setChannelFilter] = useState<ChannelType | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<DateFilterRange>({});

  // Ambassadors list
  const ambassadors = INITIAL_AMBASSADORS;

  // Filtered registrations for dashboard view
  const registrations = useMemo(() => {
    return rawRegistrations.filter((reg) => {
      // Channel filter
      if (channelFilter !== 'All' && reg.channel !== channelFilter) {
        return false;
      }
      // Date filter
      if (dateFilter.startDate) {
        const regDate = reg.registeredAt.split('T')[0];
        if (regDate < dateFilter.startDate) return false;
      }
      if (dateFilter.endDate) {
        const regDate = reg.registeredAt.split('T')[0];
        if (regDate > dateFilter.endDate) return false;
      }
      return true;
    });
  }, [rawRegistrations, channelFilter, dateFilter]);

  // Campaign Targets & Constants
  const campaignTarget = 500;
  const campaignDaysTotal = 7;
  const campaignDaysRemaining = isDemoMode ? 3 : 7; // In demo mode, campaign is mid-flight on day 4
  const totalBudget = 2000;
  const budgetAllocations = {
    ambassadorCoordination: 600,
    promotionalExperiments: 1000,
    contingency: 400,
  };

  // Budget calculations
  const totalBudgetSpent = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const budgetRemaining = Math.max(0, totalBudget - totalBudgetSpent);

  // Cost per registration: only calculate if registrations > 0, otherwise null
  const costPerRegistration = useMemo(() => {
    if (rawRegistrations.length === 0) return null;
    return Number((totalBudgetSpent / rawRegistrations.length).toFixed(2));
  }, [totalBudgetSpent, rawRegistrations.length]);

  // Dynamic attribution lookup
  const getAmbassadorAttribution = (code: string): number => {
    if (!code) return 0;
    const cleanCode = code.trim().toUpperCase();
    return rawRegistrations.filter(
      (r) => r.referralCode && r.referralCode.trim().toUpperCase() === cleanCode
    ).length;
  };

  // Add Registration
  const addRegistration = (newReg: Omit<Registration, 'id' | 'registeredAt'>) => {
    const emailNormalized = newReg.email.trim().toLowerCase();
    
    // Uniqueness validation against current active dataset
    const emailExists = rawRegistrations.some(
      (r) => r.email.trim().toLowerCase() === emailNormalized
    );

    if (emailExists) {
      return {
        success: false,
        error: `This email address (${newReg.email}) is already registered for the workshop. Duplicate registrations are not allowed.`,
      };
    }

    // Generate unique Registration ID e.g. NWG-592814
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const regId = `NWG-${randomSuffix}`;

    const record: Registration = {
      ...newReg,
      id: regId,
      name: newReg.name.trim(),
      email: emailNormalized,
      college: newReg.college.trim(),
      referralCode: newReg.referralCode ? newReg.referralCode.trim().toUpperCase() : undefined,
      registeredAt: new Date().toISOString(),
    };

    if (isDemoMode) {
      setDemoRegistrations((prev) => [record, ...prev]);
    } else {
      setLiveRegistrations((prev) => [record, ...prev]);
    }

    return {
      success: true,
      registration: record,
    };
  };

  // Add Expense
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    if (isDemoMode) {
      setDemoExpenses((prev) => [newExpense, ...prev]);
    } else {
      setLiveExpenses((prev) => [newExpense, ...prev]);
    }
  };

  const deleteExpense = (id: string) => {
    if (isDemoMode) {
      setDemoExpenses((prev) => prev.filter((e) => e.id !== id));
    } else {
      setLiveExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // Add Experiment
  const addExperiment = (expData: Omit<CampaignExperiment, 'id' | 'createdAt'>) => {
    const newExp: CampaignExperiment = {
      ...expData,
      id: `exp-v${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    if (isDemoMode) {
      setDemoExperiments((prev) => [newExp, ...prev]);
    } else {
      setLiveExperiments((prev) => [newExp, ...prev]);
    }
  };

  const updateExperiment = (id: string, updates: Partial<CampaignExperiment>) => {
    const updater = (prev: CampaignExperiment[]) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item));

    if (isDemoMode) {
      setDemoExperiments(updater);
    } else {
      setLiveExperiments(updater);
    }
  };

  const deleteExperiment = (id: string) => {
    if (isDemoMode) {
      setDemoExperiments((prev) => prev.filter((e) => e.id !== id));
    } else {
      setLiveExperiments((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // Reset Data
  const resetAllData = () => {
    if (isDemoMode) {
      setDemoRegistrations(generateSampleRegistrations());
      setDemoExpenses(SAMPLE_EXPENSES);
      setDemoExperiments(SAMPLE_EXPERIMENTS);
    } else {
      setLiveRegistrations([]);
      setLiveExpenses([]);
      setLiveExperiments([]);
      localStorage.removeItem(STORAGE_KEYS.LIVE_REGISTRATIONS);
      localStorage.removeItem(STORAGE_KEYS.LIVE_EXPENSES);
      localStorage.removeItem(STORAGE_KEYS.LIVE_EXPERIMENTS);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Registration ID', 'Name', 'Email', 'College', 'Graduation Year', 'Channel', 'Referral Code', 'Registered At (UTC)'];
    const rows = rawRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.college.replace(/"/g, '""')}"`,
      `"${r.graduationYear}"`,
      `"${r.channel}"`,
      `"${r.referralCode || 'N/A'}"`,
      `"${r.registeredAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStamp = new Date().toISOString().split('T')[0];
    const prefix = isDemoMode ? 'nxtwave_demo_registrations' : 'nxtwave_live_registrations';
    link.setAttribute('download', `${prefix}_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GrowthContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        registrations,
        allRegistrations: rawRegistrations,
        ambassadors,
        expenses,
        experiments,
        channelFilter,
        setChannelFilter,
        dateFilter,
        setDateFilter,
        campaignTarget,
        campaignDaysTotal,
        campaignDaysRemaining,
        totalBudget,
        budgetAllocations,
        totalBudgetSpent,
        budgetRemaining,
        costPerRegistration,
        addRegistration,
        addExpense,
        deleteExpense,
        addExperiment,
        updateExperiment,
        deleteExperiment,
        resetAllData,
        exportToCSV,
        getAmbassadorAttribution,
      }}
    >
      {children}
    </GrowthContext.Provider>
  );
};

export const useGrowth = () => {
  const context = useContext(GrowthContext);
  if (!context) {
    throw new Error('useGrowth must be used within a GrowthProvider');
  }
  return context;
};

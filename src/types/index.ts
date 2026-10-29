export type ChannelType = 'College Communities' | 'Student Ambassadors' | 'Peer Referrals';

export type GraduationYear = '2025 (Final Year)' | '2026 (3rd Year)' | '2027 (2nd Year)' | '2028 (1st Year)' | 'Other';

export interface Registration {
  id: string;
  name: string;
  email: string;
  college: string;
  graduationYear: GraduationYear;
  referralCode?: string;
  channel: ChannelType;
  registeredAt: string; // ISO date string
}

export interface Ambassador {
  id: string;
  name: string;
  college: string;
  code: string;
  channel: ChannelType;
  targetCount: number;
  contactNumber?: string;
}

export type ExpenseCategory = 'Ambassador coordination' | 'Promotional experiments' | 'Contingency';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
}

export type ExperimentDecision = 'Scale' | 'Iterate' | 'Kill' | 'Under Review';
export type ExperimentStatus = 'Active' | 'Completed' | 'Draft';

export interface CampaignExperiment {
  id: string;
  title: string;
  channel: ChannelType;
  targetAudience: string;
  messageVariant: string;
  outreachVolume: number;
  registrations: number;
  status: ExperimentStatus;
  decision: ExperimentDecision;
  notes: string;
  createdAt: string;
}

export type AudienceType = 
  | 'College WhatsApp Groups' 
  | 'Technical Clubs' 
  | 'Student Ambassadors' 
  | 'Personal Friend Referrals';

export type MessageTone = 'friendly' | 'professional' | 'exciting';
export type MessageObjective = 'awareness' | 'registration' | 'referral';

export interface CampaignBudgetConfig {
  total: number;
  categories: {
    ambassadorCoordination: number;
    promotionalExperiments: number;
    contingency: number;
  };
}

export interface DateFilterRange {
  startDate?: string;
  endDate?: string;
}

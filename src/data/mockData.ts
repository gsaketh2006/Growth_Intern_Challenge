import { Ambassador, CampaignExperiment, Expense, Registration } from '../types';

export const INITIAL_AMBASSADORS: Ambassador[] = [
  {
    id: 'amb-1',
    name: 'Rahul Sharma',
    college: 'IIT Madras',
    code: 'AMB-RAHUL',
    channel: 'Student Ambassadors',
    targetCount: 60,
  },
  {
    id: 'amb-2',
    name: 'Sneha Reddy',
    college: 'NIT Warangal',
    code: 'AMB-SNEHA',
    channel: 'Student Ambassadors',
    targetCount: 60,
  },
  {
    id: 'amb-3',
    name: 'Aditya Verma',
    college: 'BITS Pilani',
    code: 'AMB-ADITYA',
    channel: 'Student Ambassadors',
    targetCount: 50,
  },
  {
    id: 'amb-4',
    name: 'Pooja Iyer',
    college: 'PSG Tech Coimbatore',
    code: 'AMB-POOJA',
    channel: 'Student Ambassadors',
    targetCount: 50,
  },
  {
    id: 'amb-5',
    name: 'Karthik Nair',
    college: 'Vellore Institute of Tech (VIT)',
    code: 'AMB-KARTHIK',
    channel: 'Student Ambassadors',
    targetCount: 50,
  },
  {
    id: 'amb-6',
    name: 'Ananya Deshmukh',
    college: 'COEP Pune',
    code: 'AMB-ANANYA',
    channel: 'Student Ambassadors',
    targetCount: 40,
  },
];

// Helper to generate past dates relative to campaign
export const getCampaignDate = (dayOffset: number): string => {
  const base = new Date();
  base.setDate(base.getDate() - (4 - dayOffset)); // Simulation: current is Day 4
  return base.toISOString().split('T')[0];
};

export const SAMPLE_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    category: 'Ambassador coordination',
    amount: 350,
    description: 'Welcome gift hampers & mobile data stipends for top 5 active campus leads',
    date: getCampaignDate(1),
  },
  {
    id: 'exp-2',
    category: 'Promotional experiments',
    amount: 500,
    description: 'Sponsored post in 3 targeted regional engineering Discord & Telegram communities',
    date: getCampaignDate(2),
  },
  {
    id: 'exp-3',
    category: 'Promotional experiments',
    amount: 300,
    description: 'Instagram campus meme page micro-boost targeting final year BE/B.Tech students',
    date: getCampaignDate(3),
  },
  {
    id: 'exp-4',
    category: 'Contingency',
    amount: 100,
    description: 'Quick graphic asset turnaround bonus for hackathon partnership',
    date: getCampaignDate(4),
  },
];

export const SAMPLE_EXPERIMENTS: CampaignExperiment[] = [
  {
    id: 'exp-v1',
    title: 'Variant A: "Build ChatGPT for your College Notes"',
    channel: 'College Communities',
    targetAudience: 'Final Year CSE/IT WhatsApp Groups',
    messageVariant: 'Hey guys! Most AI tutorials are pure theory. In this 60-min live workshop, we will code a real document AI assistant from scratch. Zero fluff.',
    outreachVolume: 920,
    registrations: 98,
    status: 'Completed',
    decision: 'Scale',
    notes: 'Outperformed benchmark conversion by 42%. Placement/practical project angle resonated strongly with 2025 graduates.',
    createdAt: getCampaignDate(1),
  },
  {
    id: 'exp-v2',
    title: 'Variant B: "AI Project on your Resume Before Placements"',
    channel: 'Student Ambassadors',
    targetAudience: 'Campus Technical Club Members',
    messageVariant: 'Final year engineering placements are tough this season. Having a shipped AI project sets your resume apart in technical interviews.',
    outreachVolume: 780,
    registrations: 84,
    status: 'Active',
    decision: 'Scale',
    notes: 'High conversion among Tier-2 engineering colleges looking for competitive edge.',
    createdAt: getCampaignDate(2),
  },
  {
    id: 'exp-v3',
    title: 'Variant C: Generic "Learn AI in 60 mins" Flash Message',
    channel: 'College Communities',
    targetAudience: 'Inter-college Telegram Announcements',
    messageVariant: 'Free AI workshop online. 60 minutes. Learn modern artificial intelligence tools. Click link to register now.',
    outreachVolume: 650,
    registrations: 18,
    status: 'Completed',
    decision: 'Kill',
    notes: 'Low 2.77% conversion rate. Lacked specific outcomes or relevance to engineering placement concerns.',
    createdAt: getCampaignDate(2),
  },
  {
    id: 'exp-v4',
    title: 'Variant D: Peer-to-Peer Study Buddy Challenge',
    channel: 'Peer Referrals',
    targetAudience: '1-on-1 WhatsApp Referrals',
    messageVariant: 'Hey! I just signed up for this free 60-min AI project workshop by NxtWave. Let us register together so we can build the project as partners.',
    outreachVolume: 320,
    registrations: 46,
    status: 'Active',
    decision: 'Iterate',
    notes: 'Highest conversion rate (14.38%), but constrained by organic forward velocity. Adding ambassador incentive next.',
    createdAt: getCampaignDate(3),
  },
];

// Generate 342 realistic synthetic registrations for demonstration mode
export const generateSampleRegistrations = (): Registration[] => {
  const colleges = [
    'IIT Madras', 'NIT Warangal', 'BITS Pilani', 'PSG Tech Coimbatore',
    'Vellore Institute of Technology', 'COEP Pune', 'RV College of Engineering',
    'Thapar University', 'SRM University', 'Manipal Institute of Technology',
    'Osmania University', 'JNTU Hyderabad', 'Delhi Technological University',
    'Anna University', 'Kalinga Institute of Industrial Technology'
  ];

  const firstNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
    'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Kabir', 'Rudra', 'Aryan', 'Kavya', 'Ananya',
    'Diya', 'Isha', 'Aarohi', 'Pari', 'Saanvi', 'Anika', 'Navya', 'Riya', 'Sneha', 'Tanvi',
    'Pooja', 'Shreya', 'Meera', 'Rohan', 'Karthik', 'Nikhil', 'Harsh', 'Vikram', 'Manish', 'Siddharth'
  ];

  const lastNames = [
    'Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Deshmukh', 'Gupta', 'Singh', 'Rao',
    'Kumar', 'Joshi', 'Mehta', 'Chopra', 'Bhat', 'Menon', 'Pillai', 'Banerjee', 'Chatterjee', 'Das'
  ];

  const channels: Array<{ channel: Registration['channel']; weight: number }> = [
    { channel: 'College Communities', weight: 0.44 },
    { channel: 'Student Ambassadors', weight: 0.38 },
    { channel: 'Peer Referrals', weight: 0.18 },
  ];

  const ambassadorCodes = ['AMB-RAHUL', 'AMB-SNEHA', 'AMB-ADITYA', 'AMB-POOJA', 'AMB-KARTHIK', 'AMB-ANANYA'];
  const peerCodes = ['PEER-PRIYA', 'PEER-ROHIT', 'PEER-DEEPAK', 'PEER-MEGHA'];

  const registrations: Registration[] = [];
  const usedEmails = new Set<string>();

  // Distribution over 4 simulated days: Day 1: 52, Day 2: 78, Day 3: 104, Day 4: 108 = 342
  const dayCounts = [52, 78, 104, 108];

  let idCounter = 1001;

  dayCounts.forEach((count, dayIndex) => {
    const dayStr = getCampaignDate(dayIndex + 1);

    for (let i = 0; i < count; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${fName} ${lName}`;
      
      let email = `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 900 + 100)}@gmail.com`;
      while (usedEmails.has(email)) {
        email = `${fName.toLowerCase()}${Math.floor(Math.random() * 9000 + 1000)}@gmail.com`;
      }
      usedEmails.add(email);

      const college = colleges[Math.floor(Math.random() * colleges.length)];

      // 82% 2025 Final Year to reflect targeted campaign objective
      const gradRoll = Math.random();
      const graduationYear: Registration['graduationYear'] = 
        gradRoll < 0.82 ? '2025 (Final Year)' : 
        gradRoll < 0.94 ? '2026 (3rd Year)' : '2027 (2nd Year)';

      // Pick channel
      const chanRoll = Math.random();
      let channel: Registration['channel'] = 'College Communities';
      let referralCode: string | undefined = undefined;

      if (chanRoll < 0.44) {
        channel = 'College Communities';
        if (Math.random() < 0.25) {
          referralCode = 'CAMPUS-COMMUNITY';
        }
      } else if (chanRoll < 0.82) {
        channel = 'Student Ambassadors';
        referralCode = ambassadorCodes[Math.floor(Math.random() * ambassadorCodes.length)];
      } else {
        channel = 'Peer Referrals';
        referralCode = peerCodes[Math.floor(Math.random() * peerCodes.length)];
      }

      // Add realistic time jitter within the day
      const hour = Math.floor(Math.random() * 14 + 9); // between 9am and 11pm
      const minute = Math.floor(Math.random() * 60);
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      const registeredAt = `${dayStr}T${timeStr}.000Z`;

      registrations.push({
        id: `NWG-${idCounter++}`,
        name,
        email,
        college,
        graduationYear,
        referralCode,
        channel,
        registeredAt,
      });
    }
  });

  return registrations;
};

# NxtWave GrowthHub 🚀

> **Growth Engineering Dashboard & Workshop Acquisition Platform**  
> Built for the **NxtWave Growth Intern Challenge**: Acquire 500 final-year engineering student registrations for the free online workshop, *"Build Your First AI Project in 60 Minutes"*, within 7 days using a ₹2,000 budget.

---

## ⚡ Executive Summary

**NxtWave GrowthHub** is an end-to-end growth platform designed to execute, monitor, and optimize student acquisition across three targeted channels:
1. **College Communities** (Department WhatsApp groups, college Discord servers)
2. **Student Ambassadors** (Campus leads & technical club coordinators)
3. **Peer Referrals** (1-on-1 study buddy invitations)

> **Important Disclosure:** This application is a working demonstration for a simulated campaign. It does not claim that real students have registered. A prominent **Demonstration Mode** switcher allows reviewers to toggle seamlessly between realistic illustrative benchmark data and a clean **Live Mode** workspace.

---

## 🖥️ Live Running Application

- **Local Preview URL:** [http://localhost:5173/](http://localhost:5173/)
- **Network URL:** `http://10.7.172.224:5173/`

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Design System:** Dark charcoal aesthetic (`#0A0E17`), electric cyan/blue neon accents (`#00F0FF`, `#0070F3`), glassmorphism, responsive cards, and accessible typography.
- **State & Storage:** Persistent `localStorage` client-side datastore with reactive context (`GrowthContext`) supporting instantaneous CRUD, CSV export, duplicate email deduplication, and isolated sample/live data modes.
- **Interactive Visuals:** Tailwind responsive SVG charts, Confetti particle celebrations (`canvas-confetti`), Lucide React icons.

---

## 🌟 Core Features Built

### 1. Public Workshop Landing Page (`/` or Workshop Tab)
- **Headline:** *"Build Your First AI Project in 60 Minutes."*
- **Subheadline:** *"A free, beginner-friendly online workshop for engineering students who want to start building with AI."*
- **Core Value Pillars:**
  - *Learn by Building:* Live interactive coding session to ship a working AI app.
  - *Explore AI Tools:* Modern developer frameworks, LLM APIs, and prompt workflows.
  - *Take Your First Step:* Foundation for capstone projects, hackathons, and placement screenings.
- **Workshop Format:** 100% Online, Zero Cost / Free, Beginner-Friendly (no prior ML background needed).
- **Registration Form & Pass Modal:**
  - Captures Full Name, Email, College/University, Graduation Year (highlighting 2025 Final Year), and optional Referral Code.
  - Prevents duplicate signups with client-side RFC email validation and uniqueness constraints.
  - Generates a unique Registration Pass ID (e.g. `NWG-749102`).
  - Triggers celebratory confetti upon confirmation.
  - **Compliance Guarantee:** Explicitly adheres to instructions — does not invent unconfirmed dates, session links, or certificates.

### 2. Student Ambassador & Referral System
- **Campus Lead Directory:** Pre-configured campus coordinators (IIT Madras, NIT Warangal, BITS Pilani, PSG Tech, etc.) with unique codes (`AMB-RAHUL`, `AMB-SNEHA`, etc.).
- **Dynamic Referral Link Generator:** Generates URLs with query parameters `?ref=CODE&channel=Student%20Ambassadors` that auto-prefill the registration form.
- **1-Click WhatsApp Invite Sharing:** Pre-populates the required outreach invite:
  > *"Hey! Interested in AI? NxtWave is planning a free online workshop called 'Build Your First AI Project in 60 Minutes.' Check out the workshop and register here: [registration link]"*
- **Strict Conversion Attribution:** Attribution counts increment **only upon completed registration submissions**. Raw clicks/visits are never inflated as signups.
- **Custom Referral Code Creator:** Enables any student to generate a custom campus or club code on the fly.

### 3. Growth Dashboard
- **Campaign Target Tracking:** Real-time progress toward the 500-student target with remaining gap calculation.
- **Campaign Timeline:** Countdown of remaining days within the 7-day sprint.
- **Multi-Channel Distribution:** Breakdown across *College Communities*, *Student Ambassadors*, and *Peer Referrals*.
- **Daily Registration Velocity:** Bar chart of daily registrations.
- **Top Referral Codes Leaderboard:** Top performing ambassadors ranked by confirmed signups.
- **Financial Accounting (₹2,000 Budget):**
  - Ambassador coordination: ₹600 cap
  - Promotional experiments: ₹1,000 cap
  - Contingency: ₹400 cap
- **Cost Per Registration:** Automatically computed from actual recorded expenses divided by confirmed registrations. Safely displays neutral placeholder (`—` or `N/A`) if zero registrations exist.
- **Interactive Filters:** Filter analytics by acquisition channel and date ranges.

### 4. AI Marketing Copy Assistant
- **Deterministic Growth Copy Engine:** Offline rules-based generator (explicitly labeled to avoid false AI API claims).
- **Audience Selectors:** College WhatsApp Groups, Technical Clubs, Student Ambassadors, Personal Friend Referrals.
- **Tone & Objective Selectors:** Friendly, Professional, Exciting | Registration, Awareness, Referral.
- **Live Preview:** Simulated WhatsApp chat bubble with instant copy-to-clipboard and direct WhatsApp launch.

### 5. Campaign Experiments Tracker
- **A/B Testing Framework:** Track variants, outreach volume, and confirmed registrations.
- **Safe Conversion Rate Calculation:** `(Registrations / Volume) * 100%` calculated when volume > 0.
- **Strategic Decision Matrix:** Tag experiments as `Scale`, `Iterate`, `Kill`, or `Under Review`.

### 6. Admin Panel & Data Management
- **Role-Based Demo Authentication:** Admin security gate (Passcode: `nxtwave` or `nxtwave2025`).
- **Student Audit Table:** Searchable by name, email, college, referral code, or pass ID, with channel and graduation year filters.
- **CSV Callset Export:** Download full registration lists for campaign operations.
- **Expense Recording Form:** Record live campaign operational costs categorized under the 3 official budget buckets.
- **Data Reset Modal:** Reset demo or live data safely with confirmation dialogs.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18 or higher; tested on v24.16.0)
- npm (v9 or higher; tested on v11.13.0)

### Quick Start
```bash
# 1. Clone or navigate to the project directory
cd d:\NXTWAVE

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Or build and run production preview
npm run build
npm run preview -- --port 5173
```

---

## 🔒 Security & Best Practices
- **No Secrets Leaked:** No API keys or credentials exposed in frontend code.
- **Isolated Datastores:** Demo and live datasets never pollute each other.
- **Clean Architecture:** Type-safe TypeScript interfaces throughout.

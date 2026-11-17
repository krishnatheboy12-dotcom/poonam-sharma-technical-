/* ==========================================================================
   TECHNOVA 2026 — OFFICIAL EVENT APPLICATION SCRIPT
   Pure Vanilla JavaScript (ES Module · Zero External Dependencies)

   IMPORTANT ARCHITECTURE NOTE:
   This frontend-only implementation persists registration records in the
   current browser's localStorage. Records are NOT shared across different
   students, browsers, or devices. For public production deployment, connect
   these functions to a secure backend API, database, and authenticated
   organiser session.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. SITE CONFIGURATION (Edit event details, countdown & contacts here)
   -------------------------------------------------------------------------- */
export const SITE_CONFIG = {
  festivalName: 'TECHNOVA 2026',
  organiserClub: 'Electronics Club',
  storageKey: 'technova_2026_registrations_v1',

  /**
   * Set eventDateISO to a valid ISO-8601 date-time string to enable the live
   * countdown timer (e.g. '2026-12-18T09:00:00+05:30').
   * Set to null or '' if the date is not yet finalised to display
   * "DATE TO BE ANNOUNCED".
   */
  eventDateISO: '2026-12-18T09:00:00+05:30',
  eventDateLabel: '18 December 2026 (Configurable)',
  venue: 'Main Engineering Auditorium & Labs — Campus Venue TBA',
  registrationStatus: 'Registrations Open',

  contact: {
    organiserName: '[Organiser Name — Update in script.js]',
    email: 'electronicsclub@college-domain.edu',
    phone: '+91 98000 00000 (Placeholder)',
    collegeName: '[Institute / College Name — Update in script.js]',
    campusAddress: '[Department of Electronics, Campus Block & City]',
  },

  socialLinks: [
    { label: 'Instagram', href: '#contact', handle: '@electronicsclub.tech' },
    { label: 'LinkedIn', href: '#contact', handle: 'Electronics Club Official' },
    { label: 'GitHub', href: '#contact', handle: 'electronics-club-dev' },
  ],
};

/* --------------------------------------------------------------------------
   2. CENTRALIZED EVENT DATA (Single Source of Truth)
   -------------------------------------------------------------------------- */
export const EVENTS_DATA = [
  {
    id: 'robo-wars',
    number: '01',
    code: 'ROBO',
    name: 'Robo Wars',
    discipline: 'Combat Robotics',
    participationType: 'Team',
    maxTeamSize: 4,
    deadlineISO: '2026-12-14T23:59:59+05:30',
    deadlineLabel: '14 Dec 2026 · 23:59',
    image: './assets/images/event-robo-wars.jpg',
    imageAlt: 'Custom aluminum and steel combat robot chassis on an engineering workbench',
    description:
      'Design, build and control your own combat robot. Enter the arena, test your engineering skills and defeat your opponents.',
    rules: [
      'Each team must have a registered team leader.',
      'Robots must comply with the specified weight and size limits.',
      'Remote-control operation must follow competition guidelines.',
      'Unsafe equipment is prohibited.',
    ],
  },
  {
    id: 'code-clash',
    number: '02',
    code: 'CODE',
    name: 'Code Clash',
    discipline: 'Competitive Programming',
    participationType: 'Individual',
    maxTeamSize: 1,
    deadlineISO: '2026-12-15T23:59:59+05:30',
    deadlineLabel: '15 Dec 2026 · 23:59',
    image: './assets/images/event-code-clash.jpg',
    imageAlt: 'Minimalist university programming competition hall with participants at laptops',
    description:
      'A competitive programming challenge where logic, speed and problem-solving skills determine the winner.',
    rules: [
      'Participants must solve programming problems within the allocated time.',
      'Internet access restrictions will be announced before the competition.',
      'Plagiarism or copied solutions result in disqualification.',
    ],
  },
  {
    id: 'circuitrix',
    number: '03',
    code: 'CIRC',
    name: 'Circuitrix',
    discipline: 'Hardware & Circuit Design',
    participationType: 'Team',
    maxTeamSize: 3,
    deadlineISO: '2026-12-15T23:59:59+05:30',
    deadlineLabel: '15 Dec 2026 · 23:59',
    image: './assets/images/event-circuitrix.jpg',
    imageAlt: 'Printed circuit board with copper traces, microcontroller, and oscilloscope probe',
    description:
      'Test your understanding of electronics by designing circuits, solving practical problems and demonstrating your technical knowledge.',
    rules: [
      'Teams must bring the materials specifically requested by the organisers.',
      'All circuit connections must follow safety instructions.',
      'Evaluation will consider accuracy, functionality and implementation.',
    ],
  },
  {
    id: 'tech-quiz',
    number: '04',
    code: 'QUIZ',
    name: 'Tech Quiz',
    discipline: 'Science & Emerging Tech',
    participationType: 'Team',
    maxTeamSize: 2,
    deadlineISO: '2026-12-16T23:59:59+05:30',
    deadlineLabel: '16 Dec 2026 · 23:59',
    image: './assets/images/event-tech-quiz.jpg',
    imageAlt: 'University auditorium stage with two minimalist podiums under warm spotlights',
    description:
      'Challenge your knowledge of science, technology, electronics and emerging innovations in an exciting technical quiz.',
    rules: [
      'Teams must answer within the allocated time.',
      'Mobile phones and external assistance are prohibited.',
      'Organiser decisions regarding scores are final.',
    ],
  },
];

/* --------------------------------------------------------------------------
   3. EDITABLE SCHEDULE & FAQ CONFIGURATION
   -------------------------------------------------------------------------- */
export const SCHEDULE_DATA = [
  {
    time: '08:30 – 09:30 (TBA)',
    title: 'Reporting and Registration',
    description: 'Participant check-in, registration ID verification, and kit collection at the registration desk.',
    location: 'Main Foyer — Venue Placeholder',
  },
  {
    time: '09:30 – 10:15 (TBA)',
    title: 'Opening Ceremony',
    description: 'Welcome address by the Electronics Club, competition briefing, and safety rule overview.',
    location: 'Central Auditorium — Venue Placeholder',
  },
  {
    time: '10:30 – 13:00 (TBA)',
    title: 'Robo Wars',
    description: 'Bot weight and safety inspection followed by head-to-head combat arena bouts.',
    location: 'Robotics Arena — Venue Placeholder',
  },
  {
    time: '10:45 – 12:45 (TBA)',
    title: 'Code Clash',
    description: 'Timed individual algorithmic and problem-solving rounds under supervised lab conditions.',
    location: 'Computing Lab 01 — Venue Placeholder',
  },
  {
    time: '13:30 – 15:30 (TBA)',
    title: 'Circuitrix',
    description: 'Practical circuit analysis, hardware prototyping, and bench evaluation rounds.',
    location: 'Electronics Design Lab — Venue Placeholder',
  },
  {
    time: '15:45 – 17:00 (TBA)',
    title: 'Tech Quiz',
    description: 'Preliminary written screening and live stage buzzer finals across electronics and science.',
    location: 'Seminar Hall — Venue Placeholder',
  },
  {
    time: '17:15 – 17:45 (TBA)',
    title: 'Prize Distribution',
    description: 'Announcement of final standings, trophy presentation, and merit certificates.',
    location: 'Central Auditorium — Venue Placeholder',
  },
  {
    time: '17:45 – 18:15 (TBA)',
    title: 'Closing Ceremony',
    description: 'Vote of thanks by the organising committee and official wrap-up of TECHNOVA 2026.',
    location: 'Central Auditorium — Venue Placeholder',
  },
];

export const FAQ_DATA = [
  {
    question: 'Who can participate in TECHNOVA 2026?',
    answer:
      'Undergraduate and postgraduate college students from any engineering or science discipline with a valid college email address and student ID are eligible to participate.',
  },
  {
    question: 'Can I participate in multiple events?',
    answer:
      'Yes. A student can register for multiple different events using the same college email address, provided the event schedule allows attending each competition.',
  },
  {
    question: 'Can I register individually?',
    answer:
      'Code Clash is strictly an individual competition. For team events (Robo Wars, Circuitrix, Tech Quiz), you register as a team leader and optionally add teammates up to the maximum team size.',
  },
  {
    question: 'How do I find my registration ID?',
    answer:
      'Your unique registration ID (for example TN26-ROBO-00101) is displayed on the confirmation screen immediately after submission. You can also retrieve it anytime in the My Registrations section using your college email address.',
  },
  {
    question: 'Can I modify my registration?',
    answer:
      'In this browser-based demonstration, submitted entries are locked after confirmation to preserve the generated registration ID. Please review all details carefully in Step 4 before submitting, or contact the organising committee for changes.',
  },
  {
    question: 'What happens if my team size exceeds the maximum?',
    answer:
      'The registration form enforces each event’s maximum team limit automatically (4 for Robo Wars, 3 for Circuitrix, 2 for Tech Quiz, and 1 for Code Clash), counting the team leader within that total.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'Fee details—if any—are announced directly by the Electronics Club organising committee prior to event day. No online payment is collected on this registration portal.',
  },
  {
    question: 'Whom should I contact for assistance?',
    answer:
      'Reach out to the Electronics Club organising committee using the email address and phone contact listed in the Contact section at the bottom of this page.',
  },
];

export const SAMPLE_DEMO_RECORDS = [
  {
    registrationId: 'TN26-ROBO-00101',
    fullName: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@college.edu',
    phone: '9820112233',
    department: 'Mechanical Engineering',
    academicYear: 'Third Year',
    eventId: 'robo-wars',
    eventName: 'Robo Wars',
    participationType: 'Team',
    teamName: 'Torque Vector',
    teamMembers: [
      { name: 'Rohan Kulkarni', email: 'rohan.k@college.edu' },
      { name: 'Siddharth Nair', email: 'siddharth.n@college.edu' },
    ],
    registeredAtISO: '2026-11-16T10:15:00.000Z',
    status: 'Confirmed',
  },
  {
    registrationId: 'TN26-CODE-00102',
    fullName: 'Vikramaditya Rao',
    email: 'vikram.rao@college.edu',
    phone: '9876501234',
    department: 'Computer Science',
    academicYear: 'Second Year',
    eventId: 'code-clash',
    eventName: 'Code Clash',
    participationType: 'Individual',
    teamName: '',
    teamMembers: [],
    registeredAtISO: '2026-11-16T11:40:00.000Z',
    status: 'Confirmed',
  },
  {
    registrationId: 'TN26-CIRC-00103',
    fullName: 'Meera Iyer',
    email: 'meera.iyer@college.edu',
    phone: '9765432109',
    department: 'Electronics & Communication',
    academicYear: 'Fourth Year',
    eventId: 'circuitrix',
    eventName: 'Circuitrix',
    participationType: 'Team',
    teamName: 'Impedance Match',
    teamMembers: [{ name: 'Kabir Sharma', email: 'kabir.sharma@college.edu' }],
    registeredAtISO: '2026-11-16T14:05:00.000Z',
    status: 'Confirmed',
  },
  {
    registrationId: 'TN26-QUIZ-00104',
    fullName: 'Devansh Joshi',
    email: 'devansh.joshi@college.edu',
    phone: '9911223344',
    department: 'Electrical Engineering',
    academicYear: 'First Year',
    eventId: 'tech-quiz',
    eventName: 'Tech Quiz',
    participationType: 'Team',
    teamName: 'Maxwell Duo',
    teamMembers: [{ name: 'Ishita Sen', email: 'ishita.sen@college.edu' }],
    registeredAtISO: '2026-11-16T16:22:00.000Z',
    status: 'Confirmed',
  },
];

/* --------------------------------------------------------------------------
   4. PURE LOGIC: COUNTDOWN, VALIDATION, DUPLICATE PREVENTION, CSV & STATS
   -------------------------------------------------------------------------- */

export function getEventById(eventId) {
  return EVENTS_DATA.find((ev) => ev.id === eventId) || null;
}

/**
 * Computes countdown state from a target ISO timestamp.
 * Returns status: 'tba' | 'started' | 'counting'
 */
export function computeCountdown(eventDateISO, nowMs = Date.now()) {
  if (!eventDateISO || typeof eventDateISO !== 'string' || !eventDateISO.trim()) {
    return { status: 'tba', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const targetMs = Date.parse(eventDateISO);
  if (Number.isNaN(targetMs)) {
    return { status: 'tba', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const diffMs = targetMs - nowMs;
  if (diffMs <= 0) {
    return { status: 'started', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { status: 'counting', days, hours, minutes, seconds };
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidEmail(email) {
  const cleaned = String(email || '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleaned);
}

/**
 * Indian mobile number validation: strictly 10 digits starting with 6, 7, 8, or 9.
 */
export function isValidIndianPhone(phone) {
  const cleaned = normalizePhone(phone);
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function isDeadlineOpen(deadlineISO, nowMs = Date.now()) {
  if (!deadlineISO) return true;
  const deadlineMs = Date.parse(deadlineISO);
  if (Number.isNaN(deadlineMs)) return true;
  return nowMs <= deadlineMs;
}

export function validatePersonalDetails(data) {
  const errors = {};
  const fullName = String(data.fullName || '').trim();
  const email = String(data.email || '').trim();
  const phone = String(data.phone || '').trim();
  const department = String(data.department || '').trim();
  const academicYear = String(data.academicYear || '').trim();

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid college email address.';
  }
  if (!isValidIndianPhone(phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6–9.';
  }
  if (department.length < 2) {
    errors.department = 'Please enter your academic department.';
  }
  const allowedYears = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Other'];
  if (!allowedYears.includes(academicYear)) {
    errors.academicYear = 'Please select your academic year.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTeamDetails(teamName, leaderEmail, members, event) {
  /** @type {{ teamName: string, membersError: string, memberRows: Array<{ name: string, email: string }> }} */
  const errors = {
    teamName: '',
    membersError: '',
    memberRows: [],
  };

  if (!event || event.participationType === 'Individual' || event.maxTeamSize <= 1) {
    return { valid: true, errors };
  }

  const trimmedTeam = String(teamName || '').trim();
  if (trimmedTeam.length < 2) {
    errors.teamName = 'Please enter a team name (at least 2 characters).';
  }

  const safeMembers = Array.isArray(members) ? members : [];
  const totalSize = 1 + safeMembers.length; // Team leader is included
  if (totalSize > event.maxTeamSize) {
    errors.membersError = `Maximum team size for ${event.name} is ${event.maxTeamSize} (including team leader).`;
  }

  const seenEmails = new Set([normalizeEmail(leaderEmail)]);
  safeMembers.forEach((member, idx) => {
    const rowErr = { name: '', email: '' };
    const mName = String(member.name || '').trim();
    const mEmail = String(member.email || '').trim();
    const normMemberEmail = normalizeEmail(mEmail);

    if (mName.length < 2) {
      rowErr.name = `Enter member ${idx + 2}'s full name.`;
    }
    if (!isValidEmail(mEmail)) {
      rowErr.email = 'Enter a valid college email address.';
    } else if (seenEmails.has(normMemberEmail)) {
      rowErr.email = 'Duplicate email within the same team.';
    } else {
      seenEmails.add(normMemberEmail);
    }

    errors.memberRows.push(rowErr);
  });

  const hasRowErrors = errors.memberRows.some((r) => r.name || r.email);
  const valid = !errors.teamName && !errors.membersError && !hasRowErrors;

  return { valid, errors };
}

export function buildDuplicateKey(email, eventId) {
  return `${normalizeEmail(email)}::${String(eventId || '').trim()}`;
}

export function isDuplicateRegistration(records, email, eventId) {
  const key = buildDuplicateKey(email, eventId);
  return (records || []).some((rec) => buildDuplicateKey(rec.email, rec.eventId) === key);
}

/**
 * Generates a unique registration ID such as TN26-ROBO-00105.
 */
export function generateRegistrationId(event, existingRecords = []) {
  const code = event?.code || 'EVNT';
  const existingIds = new Set((existingRecords || []).map((r) => r.registrationId));
  let seq = 101 + (existingRecords ? existingRecords.length : 0);

  let candidate = `TN26-${code}-${String(seq).padStart(5, '0')}`;
  while (existingIds.has(candidate)) {
    seq += 1;
    candidate = `TN26-${code}-${String(seq).padStart(5, '0')}`;
  }
  return candidate;
}

export function filterRegistrations(records, filters = {}) {
  const query = String(filters.query || '').trim().toLowerCase();
  const eventId = filters.eventId || 'all';
  const participationType = filters.participationType || 'all';

  return (records || []).filter((rec) => {
    if (eventId !== 'all' && rec.eventId !== eventId) return false;
    if (participationType !== 'all' && rec.participationType !== participationType) return false;
    if (query) {
      const hay = [
        rec.registrationId,
        rec.fullName,
        rec.email,
        rec.teamName || '',
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });
}

export function computeEventStats(records) {
  const stats = {
    total: 0,
    'robo-wars': 0,
    'code-clash': 0,
    circuitrix: 0,
    'tech-quiz': 0,
  };
  (records || []).forEach((rec) => {
    stats.total += 1;
    if (Object.prototype.hasOwnProperty.call(stats, rec.eventId)) {
      stats[rec.eventId] += 1;
    }
  });
  return stats;
}

function escapeCsvCell(value) {
  const str = String(value ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function registrationsToCsv(records) {
  const headers = [
    'Registration ID',
    'Student Name',
    'College Email',
    'Contact Number',
    'Department',
    'Academic Year',
    'Event',
    'Participation Type',
    'Team Name',
    'Team Members',
    'Registration Date',
  ];

  const rows = (records || []).map((rec) => {
    const memberSummary = (rec.teamMembers || [])
      .map((m) => `${m.name} (${m.email})`)
      .join('; ');
    return [
      rec.registrationId,
      rec.fullName,
      rec.email,
      rec.phone,
      rec.department,
      rec.academicYear,
      rec.eventName,
      rec.participationType,
      rec.teamName || (rec.participationType === 'Individual' ? 'Individual' : ''),
      memberSummary,
      formatDisplayDate(rec.registeredAtISO),
    ]
      .map(escapeCsvCell)
      .join(',');
  });

  return [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
}

export function formatDisplayDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return String(isoString);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* --------------------------------------------------------------------------
   5. LOCALSTORAGE PERSISTENCE HELPERS
   -------------------------------------------------------------------------- */
function loadRegistrations() {
  try {
    const raw = window.localStorage.getItem(SITE_CONFIG.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRegistrations(records) {
  try {
    window.localStorage.setItem(SITE_CONFIG.storageKey, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

/* --------------------------------------------------------------------------
   6. DOM RENDERING & INTERACTIVE CONTROLLERS
   -------------------------------------------------------------------------- */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initApp() {
  // Application State
  const state = {
    currentStep: 1,
    activeModalEventId: null,
    lastFocusedElement: null,
    lookupMode: 'email',
    clearConfirmArmed: false,
    form: {
      fullName: '',
      email: '',
      phone: '',
      department: '',
      academicYear: '',
      eventId: '',
      teamName: '',
      teamMembers: [],
      declaration: false,
    },
  };

  /* ---- DOM References ---- */
  const heroEventDateEl = document.getElementById('hero-event-date');
  const heroVenueEl = document.getElementById('hero-venue');
  const heroRegStatusEl = document.getElementById('hero-reg-status');
  const countdownGridEl = document.getElementById('countdown-grid');
  const countdownTbaEl = document.getElementById('countdown-tba');
  const cdDaysEl = document.getElementById('cd-days');
  const cdHoursEl = document.getElementById('cd-hours');
  const cdMinutesEl = document.getElementById('cd-minutes');
  const cdSecondsEl = document.getElementById('cd-seconds');

  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  const eventsGrid = document.getElementById('events-grid');
  const scheduleTimeline = document.getElementById('schedule-timeline');
  const faqAccordion = document.getElementById('faq-accordion');

  // Event Details Modal
  const eventModal = document.getElementById('event-modal');
  const modalPanel = eventModal?.querySelector('.modal-panel');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSecondaryCloseBtn = document.getElementById('modal-secondary-close');
  const modalRegisterBtn = document.getElementById('modal-register-btn');

  // Registration Form Elements
  const regForm = document.getElementById('registration-form');
  const globalErrorEl = document.getElementById('form-global-error');
  const stepperItems = Array.from(document.querySelectorAll('[data-step-indicator]'));
  const stepperTeamLabel = document.getElementById('stepper-team-label');
  const stepPanels = [1, 2, 3, 4].map((n) => document.getElementById(`step-${n}`));

  const inputFullName = document.getElementById('reg-full-name');
  const inputEmail = document.getElementById('reg-email');
  const inputPhone = document.getElementById('reg-phone');
  const inputDepartment = document.getElementById('reg-department');
  const inputYear = document.getElementById('reg-year');

  const selectEvent = document.getElementById('reg-event');
  const inputParticipationType = document.getElementById('reg-participation-type');
  const inputEventDeadline = document.getElementById('reg-event-deadline');
  const selectedEventBrief = document.getElementById('selected-event-brief');

  const individualSkipNote = document.getElementById('individual-skip-note');
  const teamFieldsWrapper = document.getElementById('team-fields-wrapper');
  const inputTeamName = document.getElementById('reg-team-name');
  const inputTeamLeader = document.getElementById('reg-team-leader');
  const teamSizeCounter = document.getElementById('team-size-counter');
  const btnAddMember = document.getElementById('btn-add-member');
  const teamMembersList = document.getElementById('team-members-list');

  const reviewSummaryContent = document.getElementById('review-summary-content');
  const inputDeclaration = document.getElementById('reg-declaration');

  const successScreen = document.getElementById('registration-success-screen');
  const successRegIdEl = document.getElementById('success-reg-id');
  const successDetailsGrid = document.getElementById('success-details-grid');
  const btnCopyRegId = document.getElementById('btn-copy-reg-id');
  const btnViewMyReg = document.getElementById('btn-view-my-reg');
  const btnRegisterAnother = document.getElementById('btn-register-another');

  // My Registrations Lookup
  const lookupForm = document.getElementById('lookup-form');
  const lookupTabs = Array.from(document.querySelectorAll('[data-lookup-mode]'));
  const lookupLabel = document.getElementById('lookup-query-label');
  const lookupInput = document.getElementById('lookup-query-input');
  const lookupErrorEl = document.getElementById('err-lookup');
  const lookupResultsEl = document.getElementById('lookup-results');

  // Organiser Dashboard
  const orgSearchInput = document.getElementById('org-search');
  const orgFilterEvent = document.getElementById('org-filter-event');
  const orgFilterType = document.getElementById('org-filter-type');
  const orgVisibleCount = document.getElementById('org-visible-count');
  const orgTableWrapper = document.getElementById('org-table-wrapper');
  const orgTableBody = document.getElementById('org-table-body');
  const orgEmptyState = document.getElementById('org-empty-state');
  const orgEmptyTitle = document.getElementById('org-empty-title');
  const orgEmptyDesc = document.getElementById('org-empty-desc');
  const orgFeedback = document.getElementById('org-feedback');
  const btnOrgRefresh = document.getElementById('btn-org-refresh');
  const btnOrgExport = document.getElementById('btn-org-export');
  const btnLoadSample = document.getElementById('btn-load-sample');
  const btnSeedMore = document.getElementById('btn-seed-more');
  const btnClearStorage = document.getElementById('btn-clear-storage');

  /* ---- A. Hero Metadata & Countdown ---- */
  function renderHeroMetadata() {
    if (heroEventDateEl) heroEventDateEl.textContent = SITE_CONFIG.eventDateLabel;
    if (heroVenueEl) heroVenueEl.textContent = SITE_CONFIG.venue;
    if (heroRegStatusEl) heroRegStatusEl.textContent = SITE_CONFIG.registrationStatus;
  }

  function updateCountdownDisplay() {
    const cd = computeCountdown(SITE_CONFIG.eventDateISO);
    if (cd.status === 'tba') {
      if (countdownGridEl) countdownGridEl.hidden = true;
      if (countdownTbaEl) {
        countdownTbaEl.textContent = 'DATE TO BE ANNOUNCED';
        countdownTbaEl.hidden = false;
      }
      return;
    }

    if (cd.status === 'started') {
      if (countdownGridEl) countdownGridEl.hidden = true;
      if (countdownTbaEl) {
        countdownTbaEl.textContent = 'EVENT IN PROGRESS';
        countdownTbaEl.hidden = false;
      }
      return;
    }

    if (countdownGridEl) countdownGridEl.hidden = false;
    if (countdownTbaEl) countdownTbaEl.hidden = true;
    if (cdDaysEl) cdDaysEl.textContent = String(cd.days).padStart(2, '0');
    if (cdHoursEl) cdHoursEl.textContent = String(cd.hours).padStart(2, '0');
    if (cdMinutesEl) cdMinutesEl.textContent = String(cd.minutes).padStart(2, '0');
    if (cdSecondsEl) cdSecondsEl.textContent = String(cd.seconds).padStart(2, '0');
  }

  /* ---- B. Render Events Grid & Select Dropdowns ---- */
  function renderEventsSection() {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = EVENTS_DATA.map((ev) => {
      const sizeText = ev.maxTeamSize === 1 ? '1 Participant' : `Up to ${ev.maxTeamSize} Members`;
      return `
        <article class="event-card" data-event-id="${escapeHtml(ev.id)}">
          <div class="event-card-media">
            <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(ev.imageAlt)}" referrerpolicy="no-referrer" loading="lazy" />
          </div>
          <div class="event-card-body">
            <p class="event-card-kicker mono-label">
              <strong>EVENT ${escapeHtml(ev.number)}</strong> · ${escapeHtml(ev.discipline)}
            </p>
            <h3 class="event-card-title">${escapeHtml(ev.name)}</h3>
            <p class="event-card-desc">${escapeHtml(ev.description)}</p>
            <div class="event-card-specs">
              <div>
                <span class="event-spec-label">Format</span>
                <span class="event-spec-value">${escapeHtml(ev.participationType)}</span>
              </div>
              <div>
                <span class="event-spec-label">Team Limit</span>
                <span class="event-spec-value">${escapeHtml(sizeText)}</span>
              </div>
              <div>
                <span class="event-spec-label">Deadline</span>
                <span class="event-spec-value">${escapeHtml(ev.deadlineLabel)}</span>
              </div>
            </div>
            <div class="event-card-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-open-modal="${escapeHtml(ev.id)}">
                View Rules &amp; Details
              </button>
              <button type="button" class="btn btn-primary btn-sm" data-quick-register="${escapeHtml(ev.id)}">
                Register
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Populate Registration Event Select & Organiser Event Filter
    if (selectEvent) {
      const optionsHtml = EVENTS_DATA.map(
        (ev) => `<option value="${escapeHtml(ev.id)}">${escapeHtml(ev.number)} — ${escapeHtml(ev.name)} (${escapeHtml(ev.participationType)})</option>`
      ).join('');
      selectEvent.innerHTML = `<option value="">Choose a competition</option>${optionsHtml}`;
    }

    if (orgFilterEvent) {
      const filterOpts = EVENTS_DATA.map(
        (ev) => `<option value="${escapeHtml(ev.id)}">${escapeHtml(ev.name)}</option>`
      ).join('');
      orgFilterEvent.innerHTML = `<option value="all">All Events</option>${filterOpts}`;
    }
  }

  /* ---- C. Event Details Modal ---- */
  function openEventModal(eventId) {
    const ev = getEventById(eventId);
    if (!ev || !eventModal) return;

    state.activeModalEventId = ev.id;
    state.lastFocusedElement = document.activeElement;

    document.getElementById('modal-event-code').textContent = `EVENT ${ev.number} · ${ev.discipline}`;
    const imgEl = document.getElementById('modal-event-img');
    imgEl.src = ev.image;
    imgEl.alt = ev.imageAlt;

    document.getElementById('modal-event-title').textContent = ev.name;
    document.getElementById('modal-event-meta').textContent = `${ev.participationType} · Max Team Size: ${ev.maxTeamSize}`;
    document.getElementById('modal-event-description').textContent = ev.description;
    document.getElementById('modal-participation').textContent = ev.participationType;
    document.getElementById('modal-team-size').textContent =
      ev.maxTeamSize === 1 ? '1 Participant (Individual)' : `${ev.maxTeamSize} Members (Including Leader)`;
    document.getElementById('modal-deadline').textContent = ev.deadlineLabel;

    const rulesList = document.getElementById('modal-rules-list');
    rulesList.innerHTML = ev.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('');

    modalRegisterBtn.textContent = `Register for ${ev.name}`;
    eventModal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalPanel?.focus();
  }

  function closeEventModal() {
    if (!eventModal || eventModal.hidden) return;
    eventModal.hidden = true;
    document.body.style.overflow = '';
    state.activeModalEventId = null;
    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }
  }

  /* ---- D. Schedule, FAQ & Contact Renderers ---- */
  function renderScheduleSection() {
    if (!scheduleTimeline) return;
    scheduleTimeline.innerHTML = SCHEDULE_DATA.map(
      (item, idx) => `
      <li class="schedule-row">
        <span class="schedule-time">${escapeHtml(String(idx + 1).padStart(2, '0'))} · ${escapeHtml(item.time)}</span>
        <div class="schedule-content">
          <h3 class="schedule-title">${escapeHtml(item.title)}</h3>
          <span class="schedule-location">${escapeHtml(item.location)}</span>
          <p class="schedule-desc">${escapeHtml(item.description)}</p>
        </div>
      </li>
    `
    ).join('');
  }

  function renderFaqSection() {
    if (!faqAccordion) return;
    faqAccordion.innerHTML = FAQ_DATA.map(
      (item, index) => `
      <div class="faq-item">
        <h3>
          <button
            type="button"
            class="faq-trigger"
            aria-expanded="false"
            aria-controls="faq-panel-${index}"
            id="faq-trigger-${index}"
          >
            <span>${escapeHtml(item.question)}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>
        </h3>
        <div
          class="faq-panel"
          id="faq-panel-${index}"
          role="region"
          aria-labelledby="faq-trigger-${index}"
          hidden
        >
          <p>${escapeHtml(item.answer)}</p>
        </div>
      </div>
    `
    ).join('');
  }

  function renderContactAndFooter() {
    const c = SITE_CONFIG.contact;
    const detailsList = document.getElementById('contact-details-list');
    const emailBtn = document.getElementById('contact-email-btn');
    const footerContactList = document.getElementById('footer-contact-list');
    const footerSocialList = document.getElementById('footer-social-list');

    if (emailBtn) {
      emailBtn.href = `mailto:${c.email}?subject=${encodeURIComponent('TECHNOVA 2026 Inquiry')}`;
    }

    const socialLinksHtml = SITE_CONFIG.socialLinks
      .map(
        (s) =>
          `<a href="${escapeHtml(s.href)}" aria-label="${escapeHtml(s.label)} (${escapeHtml(s.handle)})">${escapeHtml(s.label)} (${escapeHtml(s.handle)})</a>`
      )
      .join('');

    if (detailsList) {
      detailsList.innerHTML = `
        <div class="contact-row">
          <dt>Organiser Name</dt>
          <dd>${escapeHtml(c.organiserName)}</dd>
        </div>
        <div class="contact-row">
          <dt>Official Email</dt>
          <dd><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></dd>
        </div>
        <div class="contact-row">
          <dt>Contact Number</dt>
          <dd>${escapeHtml(c.phone)}</dd>
        </div>
        <div class="contact-row">
          <dt>College Name</dt>
          <dd>${escapeHtml(c.collegeName)}</dd>
        </div>
        <div class="contact-row">
          <dt>Campus Address</dt>
          <dd>${escapeHtml(c.campusAddress)}</dd>
        </div>
        <div class="contact-row">
          <dt>Social Channels</dt>
          <dd class="contact-social-links">${socialLinksHtml}</dd>
        </div>
      `;
    }

    if (footerContactList) {
      footerContactList.innerHTML = `
        <li><span>${escapeHtml(c.organiserName)}</span></li>
        <li><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></li>
        <li><span>${escapeHtml(c.phone)}</span></li>
        <li><span>${escapeHtml(c.collegeName)}</span></li>
      `;
    }

    if (footerSocialList) {
      footerSocialList.innerHTML = SITE_CONFIG.socialLinks
        .map((s) => `<li><a href="${escapeHtml(s.href)}">${escapeHtml(s.label)} · ${escapeHtml(s.handle)}</a></li>`)
        .join('');
    }
  }

  /* ---- E. Multi-Step Registration Controller ---- */
  function clearGlobalAlert() {
    if (!globalErrorEl) return;
    globalErrorEl.hidden = true;
    globalErrorEl.innerHTML = '';
  }

  function showGlobalAlert(message, duplicateRecordId = '') {
    if (!globalErrorEl) return;
    let actionHtml = '';
    if (duplicateRecordId) {
      actionHtml = `
        <div class="form-alert-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-jump-duplicate">
            View Existing Registration (${escapeHtml(duplicateRecordId)})
          </button>
        </div>
      `;
    }
    globalErrorEl.innerHTML = `<p>${escapeHtml(message)}</p>${actionHtml}`;
    globalErrorEl.hidden = false;

    const jumpBtn = document.getElementById('btn-jump-duplicate');
    if (jumpBtn && duplicateRecordId) {
      jumpBtn.addEventListener('click', () => {
        openLookupWithId(duplicateRecordId);
      });
    }
  }

  function syncFormInputsToState() {
    state.form.fullName = inputFullName?.value || '';
    state.form.email = inputEmail?.value || '';
    state.form.phone = inputPhone?.value || '';
    state.form.department = inputDepartment?.value || '';
    state.form.academicYear = inputYear?.value || '';
    state.form.eventId = selectEvent?.value || '';
    state.form.teamName = inputTeamName?.value || '';
    state.form.declaration = Boolean(inputDeclaration?.checked);
  }

  function updateStep2EventDetailsUI() {
    const ev = getEventById(selectEvent?.value);
    if (!ev) {
      if (inputParticipationType) inputParticipationType.value = 'Select an event first';
      if (inputEventDeadline) inputEventDeadline.value = '—';
      if (selectedEventBrief) selectedEventBrief.hidden = true;
      if (stepperTeamLabel) stepperTeamLabel.textContent = 'Team Details';
      return;
    }

    state.form.eventId = ev.id;
    const isIndividual = ev.participationType === 'Individual' || ev.maxTeamSize <= 1;

    if (inputParticipationType) {
      inputParticipationType.value = isIndividual
        ? 'Individual (1 Participant)'
        : `Team (Up to ${ev.maxTeamSize} Members)`;
    }

    if (inputEventDeadline) {
      const openState = isDeadlineOpen(ev.deadlineISO) ? 'Open' : 'Closed';
      inputEventDeadline.value = `${ev.deadlineLabel} (${openState})`;
    }

    if (selectedEventBrief) {
      selectedEventBrief.hidden = false;
      selectedEventBrief.innerHTML = `<strong>${escapeHtml(ev.name)} (${escapeHtml(ev.discipline)}):</strong> ${escapeHtml(ev.description)}`;
    }

    if (stepperTeamLabel) {
      stepperTeamLabel.textContent = isIndividual ? 'Team Details (N/A)' : 'Team Details';
    }

    // Trim excess members if switching to an event with a smaller maxTeamSize
    const maxAdditional = Math.max(0, ev.maxTeamSize - 1);
    if (state.form.teamMembers.length > maxAdditional) {
      state.form.teamMembers = state.form.teamMembers.slice(0, maxAdditional);
    }
  }

  function renderTeamStepUI() {
    const ev = getEventById(state.form.eventId);
    const isIndividual = !ev || ev.participationType === 'Individual' || ev.maxTeamSize <= 1;

    if (individualSkipNote) individualSkipNote.hidden = !isIndividual;
    if (teamFieldsWrapper) teamFieldsWrapper.hidden = isIndividual;

    if (isIndividual) return;

    if (inputTeamLeader) {
      const leaderName = state.form.fullName.trim() || 'Participant';
      const leaderEmail = state.form.email.trim() || '—';
      inputTeamLeader.value = `${leaderName} (${leaderEmail})`;
    }

    const maxSize = ev.maxTeamSize;
    const currentSize = 1 + state.form.teamMembers.length;

    if (teamSizeCounter) {
      teamSizeCounter.textContent = `Team Size: ${currentSize} / ${maxSize} (including team leader)`;
    }

    if (btnAddMember) {
      btnAddMember.disabled = currentSize >= maxSize;
      btnAddMember.textContent =
        currentSize >= maxSize ? `Maximum Size Reached (${maxSize}/${maxSize})` : 'Add Team Member';
    }

    if (!teamMembersList) return;
    if (state.form.teamMembers.length === 0) {
      teamMembersList.innerHTML =
        '<p class="field-hint">No additional members added yet. You may compete solo as team leader or add teammates up to the maximum limit.</p>';
      return;
    }

    teamMembersList.innerHTML = state.form.teamMembers
      .map(
        (member, idx) => `
      <div class="member-row" data-member-index="${idx}">
        <div class="field-group">
          <label for="member-name-${idx}" class="field-label">Member ${idx + 2} Full Name <span class="req">*</span></label>
          <input
            type="text"
            id="member-name-${idx}"
            class="field-input"
            data-member-field="name"
            data-member-index="${idx}"
            value="${escapeHtml(member.name)}"
            placeholder="e.g. Priya Nair"
            required
          />
          <p class="field-error" id="err-member-name-${idx}" aria-live="polite"></p>
        </div>

        <div class="field-group">
          <label for="member-email-${idx}" class="field-label">Member ${idx + 2} College Email <span class="req">*</span></label>
          <input
            type="email"
            id="member-email-${idx}"
            class="field-input"
            data-member-field="email"
            data-member-index="${idx}"
            value="${escapeHtml(member.email)}"
            placeholder="e.g. priya.nair@college.edu"
            required
          />
          <p class="field-error" id="err-member-email-${idx}" aria-live="polite"></p>
        </div>

        <button
          type="button"
          class="btn btn-ghost btn-sm member-remove-btn"
          data-remove-member="${idx}"
          aria-label="Remove team member ${idx + 2}"
        >
          Remove
        </button>
      </div>
    `
      )
      .join('');
  }

  function renderReviewStepUI() {
    if (!reviewSummaryContent) return;
    const ev = getEventById(state.form.eventId);
    const isTeam = ev && ev.participationType === 'Team' && ev.maxTeamSize > 1;

    let teamHtml = '';
    if (isTeam) {
      const membersMarkup =
        state.form.teamMembers.length > 0
          ? state.form.teamMembers
              .map((m, i) => `<div>Member ${i + 2}: ${escapeHtml(m.name)} (${escapeHtml(m.email)})</div>`)
              .join('')
          : '<div>No additional members</div>';

      teamHtml = `
        <div class="review-card review-card-full">
          <div class="review-card-header">
            <span class="review-card-title">Team Details</span>
            <button type="button" class="review-edit-link" data-jump-step="3">Edit</button>
          </div>
          <dl class="review-dl">
            <dt>Team Name</dt>
            <dd>${escapeHtml(state.form.teamName.trim())}</dd>
            <dt>Team Leader</dt>
            <dd>${escapeHtml(state.form.fullName.trim())} (${escapeHtml(state.form.email.trim())})</dd>
            <dt>Team Size</dt>
            <dd>${1 + state.form.teamMembers.length} / ${ev.maxTeamSize}</dd>
            <dt>Teammates</dt>
            <dd>${membersMarkup}</dd>
          </dl>
        </div>
      `;
    }

    reviewSummaryContent.innerHTML = `
      <div class="review-card">
        <div class="review-card-header">
          <span class="review-card-title">Personal Details</span>
          <button type="button" class="review-edit-link" data-jump-step="1">Edit</button>
        </div>
        <dl class="review-dl">
          <dt>Full Name</dt>
          <dd>${escapeHtml(state.form.fullName.trim())}</dd>
          <dt>College Email</dt>
          <dd>${escapeHtml(state.form.email.trim())}</dd>
          <dt>Contact Number</dt>
          <dd>${escapeHtml(normalizePhone(state.form.phone))}</dd>
          <dt>Department</dt>
          <dd>${escapeHtml(state.form.department.trim())}</dd>
          <dt>Academic Year</dt>
          <dd>${escapeHtml(state.form.academicYear)}</dd>
        </dl>
      </div>

      <div class="review-card">
        <div class="review-card-header">
          <span class="review-card-title">Event Selection</span>
          <button type="button" class="review-edit-link" data-jump-step="2">Edit</button>
        </div>
        <dl class="review-dl">
          <dt>Selected Event</dt>
          <dd>${escapeHtml(ev ? ev.name : '—')}</dd>
          <dt>Participation</dt>
          <dd>${escapeHtml(ev ? ev.participationType : '—')}</dd>
          <dt>Max Team Size</dt>
          <dd>${ev ? ev.maxTeamSize : '—'}</dd>
          <dt>Deadline</dt>
          <dd>${escapeHtml(ev ? ev.deadlineLabel : '—')}</dd>
        </dl>
      </div>

      ${teamHtml}
    `;
  }

  function goToStep(stepNumber) {
    state.currentStep = stepNumber;
    clearGlobalAlert();

    const ev = getEventById(state.form.eventId);
    const isIndividual = ev && (ev.participationType === 'Individual' || ev.maxTeamSize <= 1);

    stepPanels.forEach((panel, idx) => {
      if (!panel) return;
      const num = idx + 1;
      const isCurrent = num === stepNumber;
      panel.hidden = !isCurrent;
      panel.classList.toggle('is-active', isCurrent);
    });

    stepperItems.forEach((item) => {
      const num = Number(item.dataset.stepIndicator);
      item.classList.toggle('is-active', num === stepNumber);
      item.classList.toggle('is-completed', num < stepNumber && !(num === 3 && isIndividual));
      item.classList.toggle('is-skipped', num === 3 && Boolean(isIndividual));
    });

    if (stepNumber === 2) updateStep2EventDetailsUI();
    if (stepNumber === 3) renderTeamStepUI();
    if (stepNumber === 4) renderReviewStepUI();
  }

  function setFieldError(inputEl, errorElId, message) {
    const errEl = document.getElementById(errorElId);
    if (errEl) errEl.textContent = message || '';
    if (inputEl) inputEl.classList.toggle('is-invalid', Boolean(message));
  }

  function validateStep1UI() {
    syncFormInputsToState();
    const res = validatePersonalDetails(state.form);
    setFieldError(inputFullName, 'err-full-name', res.errors.fullName);
    setFieldError(inputEmail, 'err-email', res.errors.email);
    setFieldError(inputPhone, 'err-phone', res.errors.phone);
    setFieldError(inputDepartment, 'err-department', res.errors.department);
    setFieldError(inputYear, 'err-year', res.errors.academicYear);
    return res.valid;
  }

  function validateStep2UI() {
    syncFormInputsToState();
    const ev = getEventById(state.form.eventId);
    if (!ev) {
      setFieldError(selectEvent, 'err-event', 'Please select an event to continue.');
      return false;
    }
    if (!isDeadlineOpen(ev.deadlineISO)) {
      setFieldError(selectEvent, 'err-event', `Registration deadline for ${ev.name} has passed.`);
      return false;
    }
    const existing = loadRegistrations();
    if (isDuplicateRegistration(existing, state.form.email, ev.id)) {
      const existingMatch = existing.find(
        (r) => buildDuplicateKey(r.email, r.eventId) === buildDuplicateKey(state.form.email, ev.id)
      );
      setFieldError(
        selectEvent,
        'err-event',
        `${state.form.email.trim()} is already registered for ${ev.name}.`
      );
      showGlobalAlert(
        `Duplicate registration prevented: ${state.form.email.trim()} is already registered for ${ev.name}.`,
        existingMatch?.registrationId || ''
      );
      return false;
    }

    setFieldError(selectEvent, 'err-event', '');
    clearGlobalAlert();
    return true;
  }

  function validateStep3UI() {
    syncFormInputsToState();
    const ev = getEventById(state.form.eventId);
    const res = validateTeamDetails(state.form.teamName, state.form.email, state.form.teamMembers, ev);

    setFieldError(inputTeamName, 'err-team-name', res.errors.teamName);
    const membersErrEl = document.getElementById('err-team-members');
    if (membersErrEl) membersErrEl.textContent = res.errors.membersError || '';

    res.errors.memberRows.forEach((rowErr, idx) => {
      const nameInput = document.getElementById(`member-name-${idx}`);
      const emailInput = document.getElementById(`member-email-${idx}`);
      setFieldError(nameInput, `err-member-name-${idx}`, rowErr.name);
      setFieldError(emailInput, `err-member-email-${idx}`, rowErr.email);
    });

    return res.valid;
  }

  function preselectEventAndScroll(eventId) {
    // Reset success view if currently showing
    if (successScreen && !successScreen.hidden) {
      resetRegistrationForm(false);
    }
    if (selectEvent && eventId) {
      selectEvent.value = eventId;
      state.form.eventId = eventId;
      updateStep2EventDetailsUI();
    }
    const registerSection = document.getElementById('register');
    registerSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (state.currentStep === 1) {
      inputFullName?.focus({ preventScroll: true });
    }
  }

  function showSuccessScreen(record) {
    if (!regForm || !successScreen) return;
    regForm.hidden = true;
    successScreen.hidden = false;
    if (successRegIdEl) successRegIdEl.textContent = record.registrationId;

    const teamRow =
      record.participationType === 'Team'
        ? `
        <div class="success-detail-item">
          <dt>Team Name</dt>
          <dd>${escapeHtml(record.teamName)}</dd>
        </div>
        <div class="success-detail-item">
          <dt>Team Members (${1 + record.teamMembers.length})</dt>
          <dd>${escapeHtml(
            [record.fullName, ...record.teamMembers.map((m) => m.name)].join(', ')
          )}</dd>
        </div>
      `
        : '';

    if (successDetailsGrid) {
      successDetailsGrid.innerHTML = `
        <div class="success-detail-item">
          <dt>Participant Name</dt>
          <dd>${escapeHtml(record.fullName)}</dd>
        </div>
        <div class="success-detail-item">
          <dt>Selected Event</dt>
          <dd>${escapeHtml(record.eventName)}</dd>
        </div>
        <div class="success-detail-item">
          <dt>Participation Type</dt>
          <dd>${escapeHtml(record.participationType)}</dd>
        </div>
        <div class="success-detail-item">
          <dt>College Email</dt>
          <dd>${escapeHtml(record.email)}</dd>
        </div>
        <div class="success-detail-item">
          <dt>Registration Date</dt>
          <dd>${escapeHtml(formatDisplayDate(record.registeredAtISO))}</dd>
        </div>
        <div class="success-detail-item">
          <dt>Status</dt>
          <dd>${escapeHtml(record.status)}</dd>
        </div>
        ${teamRow}
      `;
    }

    if (btnCopyRegId) btnCopyRegId.textContent = 'Copy ID';
    btnViewMyReg.dataset.regId = record.registrationId;
    successScreen.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetRegistrationForm(keepPersonal = false) {
    if (!regForm || !successScreen) return;
    successScreen.hidden = true;
    regForm.hidden = false;
    clearGlobalAlert();

    if (!keepPersonal) {
      regForm.reset();
      state.form = {
        fullName: '',
        email: '',
        phone: '',
        department: '',
        academicYear: '',
        eventId: '',
        teamName: '',
        teamMembers: [],
        declaration: false,
      };
      goToStep(1);
    } else {
      // Keep personal info so registering for another event is frictionless
      state.form.eventId = '';
      state.form.teamName = '';
      state.form.teamMembers = [];
      state.form.declaration = false;
      if (selectEvent) selectEvent.value = '';
      if (inputTeamName) inputTeamName.value = '';
      if (inputDeclaration) inputDeclaration.checked = false;
      goToStep(2);
    }

    document
      .querySelectorAll('.field-error')
      .forEach((el) => {
        if (el.id !== 'err-lookup') el.textContent = '';
      });
    document.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  }

  /* ---- F. My Registrations Lookup ---- */
  function setLookupMode(mode) {
    state.lookupMode = mode;
    lookupTabs.forEach((tab) => {
      const isSelected = tab.dataset.lookupMode === mode;
      tab.classList.toggle('is-active', isSelected);
      tab.setAttribute('aria-selected', String(isSelected));
    });

    if (mode === 'email') {
      if (lookupLabel) lookupLabel.textContent = 'College Email Address';
      if (lookupInput) {
        lookupInput.placeholder = 'Enter your registered college email (e.g. aarav.mehta@college.edu)';
        lookupInput.type = 'email';
      }
    } else {
      if (lookupLabel) lookupLabel.textContent = 'Unique Registration ID';
      if (lookupInput) {
        lookupInput.placeholder = 'Enter your unique ID (e.g. TN26-ROBO-00101)';
        lookupInput.type = 'text';
      }
    }
    if (lookupErrorEl) lookupErrorEl.textContent = '';
  }

  function executeLookup(rawQuery) {
    const query = String(rawQuery || '').trim();
    if (!query) {
      if (lookupErrorEl) {
        lookupErrorEl.textContent =
          state.lookupMode === 'email'
            ? 'Please enter your college email address.'
            : 'Please enter your unique registration ID.';
      }
      return;
    }

    if (state.lookupMode === 'email' && !isValidEmail(query)) {
      if (lookupErrorEl) lookupErrorEl.textContent = 'Please enter a valid email address.';
      return;
    }

    if (lookupErrorEl) lookupErrorEl.textContent = '';

    const allRecords = loadRegistrations();
    let matches = [];
    if (state.lookupMode === 'email') {
      const norm = normalizeEmail(query);
      matches = allRecords.filter((rec) => normalizeEmail(rec.email) === norm);
    } else {
      const normId = query.toUpperCase();
      matches = allRecords.filter((rec) => rec.registrationId.toUpperCase() === normId);
    }

    if (!lookupResultsEl) return;

    if (matches.length === 0) {
      lookupResultsEl.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-title">No matching registration found</p>
          <p class="empty-state-desc">
            No entry in this browser's records matched "${escapeHtml(query)}". Check your spelling or register for an event above.
          </p>
        </div>
      `;
      return;
    }

    lookupResultsEl.innerHTML = `<div class="lookup-results-grid">${matches
      .map((rec) => {
        const teamBlock =
          rec.participationType === 'Team'
            ? `
            <dt>Team Name</dt>
            <dd>${escapeHtml(rec.teamName || '—')}</dd>
            <dt>Team Members</dt>
            <dd>${escapeHtml([rec.fullName, ...(rec.teamMembers || []).map((m) => m.name)].join(', '))}</dd>
          `
            : '';

        return `
          <article class="reg-record-card">
            <div class="reg-record-top">
              <span class="reg-record-id">${escapeHtml(rec.registrationId)}</span>
              <span class="reg-record-status">${escapeHtml(rec.status)}</span>
            </div>
            <h3 class="reg-record-event">${escapeHtml(rec.eventName)}</h3>
            <dl class="review-dl">
              <dt>Student Name</dt>
              <dd>${escapeHtml(rec.fullName)}</dd>
              <dt>College Email</dt>
              <dd>${escapeHtml(rec.email)}</dd>
              <dt>Participation</dt>
              <dd>${escapeHtml(rec.participationType)}</dd>
              ${teamBlock}
              <dt>Registered On</dt>
              <dd>${escapeHtml(formatDisplayDate(rec.registeredAtISO))}</dd>
            </dl>
          </article>
        `;
      })
      .join('')}</div>`;
  }

  function openLookupWithId(regId) {
    setLookupMode('id');
    if (lookupInput) lookupInput.value = regId;
    executeLookup(regId);
    document.getElementById('my-registrations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---- G. Organiser Dashboard ---- */
  function renderOrganiserDashboard() {
    const allRecords = loadRegistrations();
    const stats = computeEventStats(allRecords);

    document.getElementById('stat-total').textContent = String(stats.total);
    document.getElementById('stat-robo').textContent = String(stats['robo-wars']);
    document.getElementById('stat-code').textContent = String(stats['code-clash']);
    document.getElementById('stat-circuitrix').textContent = String(stats.circuitrix);
    document.getElementById('stat-quiz').textContent = String(stats['tech-quiz']);

    const filtered = filterRegistrations(allRecords, {
      query: orgSearchInput?.value || '',
      eventId: orgFilterEvent?.value || 'all',
      participationType: orgFilterType?.value || 'all',
    });

    if (orgVisibleCount) {
      orgVisibleCount.textContent = `Showing ${filtered.length} of ${allRecords.length}`;
    }

    if (!orgTableBody || !orgTableWrapper || !orgEmptyState) return;

    if (allRecords.length === 0) {
      orgTableWrapper.hidden = true;
      orgEmptyState.hidden = false;
      if (orgEmptyTitle) orgEmptyTitle.textContent = 'No registrations recorded yet';
      if (orgEmptyDesc) {
        orgEmptyDesc.textContent =
          'Registrations submitted on this browser will appear here immediately. You can submit a new registration above or load sample demonstration records.';
      }
      if (btnLoadSample) btnLoadSample.hidden = false;
      return;
    }

    if (filtered.length === 0) {
      orgTableWrapper.hidden = true;
      orgEmptyState.hidden = false;
      if (orgEmptyTitle) orgEmptyTitle.textContent = 'No matching registrations';
      if (orgEmptyDesc) {
        orgEmptyDesc.textContent = 'Try adjusting your search query or clearing the event and participation filters.';
      }
      if (btnLoadSample) btnLoadSample.hidden = true;
      return;
    }

    orgTableWrapper.hidden = false;
    orgEmptyState.hidden = true;

    orgTableBody.innerHTML = filtered
      .map(
        (rec) => `
      <tr>
        <td class="td-mono">${escapeHtml(rec.registrationId)}</td>
        <td>${escapeHtml(rec.fullName)}</td>
        <td>${escapeHtml(rec.email)}</td>
        <td class="td-mono">${escapeHtml(rec.phone)}</td>
        <td>${escapeHtml(rec.department)}</td>
        <td>${escapeHtml(rec.academicYear)}</td>
        <td>${escapeHtml(rec.eventName)}</td>
        <td>${escapeHtml(rec.participationType)}</td>
        <td>${escapeHtml(rec.teamName || '—')}</td>
        <td class="td-mono">${escapeHtml(formatDisplayDate(rec.registeredAtISO))}</td>
      </tr>
    `
      )
      .join('');
  }

  function showOrgFeedback(message) {
    if (!orgFeedback) return;
    orgFeedback.textContent = message;
    window.setTimeout(() => {
      if (orgFeedback.textContent === message) orgFeedback.textContent = '';
    }, 3500);
  }

  function loadSampleDemoData() {
    const current = loadRegistrations();
    let added = 0;
    SAMPLE_DEMO_RECORDS.forEach((sample) => {
      if (!isDuplicateRegistration(current, sample.email, sample.eventId)) {
        const existingIds = new Set(current.map((r) => r.registrationId));
        const rec = { ...sample };
        if (existingIds.has(rec.registrationId)) {
          rec.registrationId = generateRegistrationId(getEventById(rec.eventId), current);
        }
        current.push(rec);
        added += 1;
      }
    });
    saveRegistrations(current);
    renderOrganiserDashboard();
    showOrgFeedback(
      added > 0
        ? `Loaded ${added} sample demonstration record${added === 1 ? '' : 's'}.`
        : 'Sample demonstration records are already loaded.'
    );
  }

  function exportOrganiserCsv() {
    const allRecords = loadRegistrations();
    const filtered = filterRegistrations(allRecords, {
      query: orgSearchInput?.value || '',
      eventId: orgFilterEvent?.value || 'all',
      participationType: orgFilterType?.value || 'all',
    });

    if (filtered.length === 0) {
      showOrgFeedback('No records available to export.');
      return;
    }

    const csvText = registrationsToCsv(filtered);
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'technova-2026-registrations.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showOrgFeedback(`Exported ${filtered.length} registration${filtered.length === 1 ? '' : 's'} to CSV.`);
  }

  /* ---- H. Event Listeners & Interactions ---- */
  function attachListeners() {
    // Mobile Menu Drawer
    if (mobileToggleBtn && mobileDrawer) {
      mobileToggleBtn.addEventListener('click', () => {
        const isOpen = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
        mobileToggleBtn.setAttribute('aria-expanded', String(!isOpen));
        mobileToggleBtn.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        mobileDrawer.hidden = isOpen;
      });

      mobileDrawer.querySelectorAll('[data-mobile-link]').forEach((link) => {
        link.addEventListener('click', () => {
          mobileToggleBtn.setAttribute('aria-expanded', 'false');
          mobileDrawer.hidden = true;
        });
      });
    }

    // Event Card Clicks (Open Modal or Pre-select Registration)
    eventsGrid?.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const modalTrigger = target.closest('[data-open-modal]');
      if (modalTrigger) {
        openEventModal(modalTrigger.getAttribute('data-open-modal'));
        return;
      }

      const registerTrigger = target.closest('[data-quick-register]');
      if (registerTrigger) {
        preselectEventAndScroll(registerTrigger.getAttribute('data-quick-register'));
      }
    });

    // Event Modal Controls
    modalCloseBtn?.addEventListener('click', closeEventModal);
    modalSecondaryCloseBtn?.addEventListener('click', closeEventModal);
    modalRegisterBtn?.addEventListener('click', () => {
      const id = state.activeModalEventId;
      closeEventModal();
      if (id) preselectEventAndScroll(id);
    });
    eventModal?.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && eventModal && !eventModal.hidden) {
        closeEventModal();
      }
    });

    // Registration Stepper Navigation
    document.getElementById('btn-step1-next')?.addEventListener('click', () => {
      if (validateStep1UI()) goToStep(2);
    });

    document.getElementById('btn-step2-prev')?.addEventListener('click', () => {
      syncFormInputsToState();
      goToStep(1);
    });

    document.getElementById('btn-step2-next')?.addEventListener('click', () => {
      if (!validateStep2UI()) return;
      const ev = getEventById(state.form.eventId);
      if (ev && (ev.participationType === 'Individual' || ev.maxTeamSize <= 1)) {
        goToStep(4); // Skip hidden team step cleanly
      } else {
        goToStep(3);
      }
    });

    selectEvent?.addEventListener('change', () => {
      updateStep2EventDetailsUI();
      setFieldError(selectEvent, 'err-event', '');
      clearGlobalAlert();
    });

    document.getElementById('btn-step3-prev')?.addEventListener('click', () => {
      syncFormInputsToState();
      goToStep(2);
    });

    document.getElementById('btn-step3-next')?.addEventListener('click', () => {
      if (validateStep3UI()) goToStep(4);
    });

    btnAddMember?.addEventListener('click', () => {
      const ev = getEventById(state.form.eventId);
      if (!ev) return;
      if (1 + state.form.teamMembers.length >= ev.maxTeamSize) return;
      state.form.teamMembers.push({ name: '', email: '' });
      renderTeamStepUI();
      const lastIdx = state.form.teamMembers.length - 1;
      document.getElementById(`member-name-${lastIdx}`)?.focus();
    });

    teamMembersList?.addEventListener('input', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      const idx = Number(target.dataset.memberIndex);
      const field = target.dataset.memberField;
      if (Number.isInteger(idx) && state.form.teamMembers[idx] && (field === 'name' || field === 'email')) {
        state.form.teamMembers[idx][field] = target.value;
      }
    });

    teamMembersList?.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const removeBtn = target.closest('[data-remove-member]');
      if (!removeBtn) return;
      const idx = Number(removeBtn.getAttribute('data-remove-member'));
      if (Number.isInteger(idx)) {
        state.form.teamMembers.splice(idx, 1);
        renderTeamStepUI();
      }
    });

    document.getElementById('btn-step4-prev')?.addEventListener('click', () => {
      const ev = getEventById(state.form.eventId);
      if (ev && (ev.participationType === 'Individual' || ev.maxTeamSize <= 1)) {
        goToStep(2);
      } else {
        goToStep(3);
      }
    });

    reviewSummaryContent?.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const jumpBtn = target.closest('[data-jump-step]');
      if (jumpBtn) {
        goToStep(Number(jumpBtn.getAttribute('data-jump-step')));
      }
    });

    // Final Registration Submission
    regForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      syncFormInputsToState();

      if (!inputDeclaration?.checked) {
        setFieldError(inputDeclaration, 'err-declaration', 'Please confirm that you have reviewed the event rules.');
        return;
      }
      setFieldError(inputDeclaration, 'err-declaration', '');

      // Re-run all validations before committing
      if (!validateStep1UI()) {
        goToStep(1);
        return;
      }
      if (!validateStep2UI()) {
        goToStep(2);
        return;
      }
      const ev = getEventById(state.form.eventId);
      if (!ev) return;

      const isTeam = ev.participationType === 'Team' && ev.maxTeamSize > 1;
      if (isTeam && !validateStep3UI()) {
        goToStep(3);
        return;
      }

      if (!isDeadlineOpen(ev.deadlineISO)) {
        showGlobalAlert(`Registration deadline for ${ev.name} has closed.`);
        return;
      }

      const existing = loadRegistrations();
      if (isDuplicateRegistration(existing, state.form.email, ev.id)) {
        const match = existing.find(
          (r) => buildDuplicateKey(r.email, r.eventId) === buildDuplicateKey(state.form.email, ev.id)
        );
        showGlobalAlert(
          `Duplicate registration prevented: ${state.form.email.trim()} is already registered for ${ev.name}.`,
          match?.registrationId || ''
        );
        return;
      }

      const newRecord = {
        registrationId: generateRegistrationId(ev, existing),
        fullName: state.form.fullName.trim(),
        email: state.form.email.trim(),
        phone: normalizePhone(state.form.phone),
        department: state.form.department.trim(),
        academicYear: state.form.academicYear,
        eventId: ev.id,
        eventName: ev.name,
        participationType: ev.participationType,
        teamName: isTeam ? state.form.teamName.trim() : '',
        teamMembers: isTeam
          ? state.form.teamMembers.map((m) => ({
              name: m.name.trim(),
              email: m.email.trim(),
            }))
          : [],
        registeredAtISO: new Date().toISOString(),
        status: 'Confirmed',
      };

      existing.push(newRecord);
      saveRegistrations(existing);
      renderOrganiserDashboard();
      showSuccessScreen(newRecord);
    });

    // Success Screen Actions
    btnCopyRegId?.addEventListener('click', async () => {
      const idText = successRegIdEl?.textContent || '';
      if (!idText) return;
      try {
        await navigator.clipboard.writeText(idText);
        btnCopyRegId.textContent = 'Copied!';
      } catch {
        btnCopyRegId.textContent = 'ID Selected';
      }
      window.setTimeout(() => {
        btnCopyRegId.textContent = 'Copy ID';
      }, 2000);
    });

    btnViewMyReg?.addEventListener('click', () => {
      const id = btnViewMyReg.dataset.regId || successRegIdEl?.textContent || '';
      if (id) openLookupWithId(id);
    });

    btnRegisterAnother?.addEventListener('click', () => {
      resetRegistrationForm(true);
    });

    // My Registrations Lookup
    lookupTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        setLookupMode(tab.dataset.lookupMode || 'email');
      });
    });

    lookupForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      executeLookup(lookupInput?.value || '');
    });

    // FAQ Accordion
    faqAccordion?.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest('.faq-trigger');
      if (!trigger) return;

      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) panel.hidden = isExpanded;
    });

    // Organiser Dashboard Controls
    orgSearchInput?.addEventListener('input', renderOrganiserDashboard);
    orgFilterEvent?.addEventListener('change', renderOrganiserDashboard);
    orgFilterType?.addEventListener('change', renderOrganiserDashboard);

    btnOrgRefresh?.addEventListener('click', () => {
      renderOrganiserDashboard();
      showOrgFeedback('Registration list refreshed from browser storage.');
    });

    btnOrgExport?.addEventListener('click', exportOrganiserCsv);
    btnLoadSample?.addEventListener('click', loadSampleDemoData);
    btnSeedMore?.addEventListener('click', loadSampleDemoData);

    btnClearStorage?.addEventListener('click', () => {
      if (!state.clearConfirmArmed) {
        state.clearConfirmArmed = true;
        btnClearStorage.textContent = 'Confirm Clear Browser Records?';
        window.setTimeout(() => {
          state.clearConfirmArmed = false;
          btnClearStorage.textContent = 'Clear Browser Records';
        }, 4000);
        return;
      }
      state.clearConfirmArmed = false;
      btnClearStorage.textContent = 'Clear Browser Records';
      saveRegistrations([]);
      renderOrganiserDashboard();
      showOrgFeedback('All local browser registration records cleared.');
    });

    // Scroll Reveal & Active Navigation Observer
    setupObservers();
  }

  function setupObservers() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(document.querySelectorAll('.reveal'));

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('is-pending');
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.95) {
          el.classList.add('is-pending');
          revealObserver.observe(el);
        }
      });
    }

    // Highlight active section in primary nav
    const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
    const observedSections = [
      ...navLinks
        .map((link) => {
          const href = link.getAttribute('href');
          return href && href.startsWith('#') ? document.querySelector(href) : null;
        })
        .filter(Boolean),
      document.getElementById('organiser'),
    ].filter(Boolean);

    if ('IntersectionObserver' in window && observedSections.length > 0) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = `#${entry.target.id}`;
              navLinks.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === id);
              });
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      observedSections.forEach((sec) => navObserver.observe(sec));
    }
  }

  /* ---- Initial Bootstrap ---- */
  renderHeroMetadata();
  updateCountdownDisplay();
  window.setInterval(updateCountdownDisplay, 1000);

  renderEventsSection();
  renderScheduleSection();
  renderFaqSection();
  renderContactAndFooter();
  goToStep(1);
  renderOrganiserDashboard();
  attachListeners();
}

// Run DOM initialization only inside browser environments
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

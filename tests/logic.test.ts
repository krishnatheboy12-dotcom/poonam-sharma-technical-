import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EVENTS_DATA,
  computeCountdown,
  validatePersonalDetails,
  validateTeamDetails,
  isDuplicateRegistration,
  isDeadlineOpen,
  generateRegistrationId,
  filterRegistrations,
  computeEventStats,
  registrationsToCsv,
} from '../script.js';

test('countdown handles unconfigured date (TBA), past date, and future countdown', () => {
  assert.equal(computeCountdown(null).status, 'tba');
  assert.equal(computeCountdown('').status, 'tba');
  assert.equal(computeCountdown('invalid-date').status, 'tba');

  const now = Date.parse('2026-11-17T10:00:00Z');
  const past = '2026-11-16T10:00:00Z';
  assert.equal(computeCountdown(past, now).status, 'started');

  const future = '2026-11-19T12:30:45Z'; // 2d 2h 30m 45s ahead
  const res = computeCountdown(future, now);
  assert.equal(res.status, 'counting');
  assert.equal(res.days, 2);
  assert.equal(res.hours, 2);
  assert.equal(res.minutes, 30);
  assert.equal(res.seconds, 45);
});

test('personal details validation rejects invalid email and non-Indian phone numbers', () => {
  const invalid = validatePersonalDetails({
    fullName: 'A',
    email: 'not-an-email',
    phone: '5123456789',
    department: '',
    academicYear: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.department);
  assert.ok(invalid.errors.academicYear);

  const valid = validatePersonalDetails({
    fullName: 'Aarav Mehta',
    email: 'aarav@college.edu',
    phone: '+91 9876543210',
    department: 'ECE',
    academicYear: 'Third Year',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('team validation enforces maximum team size including team leader and detects duplicate emails', () => {
  const roboWars = EVENTS_DATA.find((e) => e.id === 'robo-wars')!;
  const techQuiz = EVENTS_DATA.find((e) => e.id === 'tech-quiz')!;

  // Robo Wars max is 4: leader + 3 members = 4 (valid)
  const okTeam = validateTeamDetails(
    'Torque',
    'leader@college.edu',
    [
      { name: 'Member Two', email: 'm2@college.edu' },
      { name: 'Member Three', email: 'm3@college.edu' },
      { name: 'Member Four', email: 'm4@college.edu' },
    ],
    roboWars
  );
  assert.equal(okTeam.valid, true);

  // Exceeding max (leader + 4 = 5 > 4)
  const tooLarge = validateTeamDetails(
    'Torque',
    'leader@college.edu',
    [
      { name: 'M2', email: 'm2@college.edu' },
      { name: 'M3', email: 'm3@college.edu' },
      { name: 'M4', email: 'm4@college.edu' },
      { name: 'M5', email: 'm5@college.edu' },
    ],
    roboWars
  );
  assert.equal(tooLarge.valid, false);
  assert.match(tooLarge.errors.membersError, /Maximum team size/);

  // Duplicate leader email inside team members for Tech Quiz (max 2)
  const dupMember = validateTeamDetails(
    'Maxwell',
    'Leader@college.edu',
    [{ name: 'Teammate', email: 'leader@college.edu' }],
    techQuiz
  );
  assert.equal(dupMember.valid, false);
  assert.match(dupMember.errors.memberRows[0].email, /Duplicate email/);
});

test('duplicate registration check uses normalized email + eventId', () => {
  const existing = [
    {
      registrationId: 'TN26-ROBO-00101',
      email: 'Aarav.Mehta@college.edu',
      eventId: 'robo-wars',
    },
  ];

  assert.equal(isDuplicateRegistration(existing, '  aarav.mehta@COLLEGE.edu ', 'robo-wars'), true);
  assert.equal(isDuplicateRegistration(existing, 'aarav.mehta@college.edu', 'code-clash'), false);
});

test('deadline check and unique registration ID generation', () => {
  const now = Date.parse('2026-11-17T10:00:00Z');
  assert.equal(isDeadlineOpen('2026-12-14T23:59:59+05:30', now), true);
  assert.equal(isDeadlineOpen('2026-11-01T23:59:59+05:30', now), false);

  const roboWars = EVENTS_DATA.find((e) => e.id === 'robo-wars')!;
  const existing = [{ registrationId: 'TN26-ROBO-00102' }];
  const generated = generateRegistrationId(roboWars, existing);
  assert.equal(generated, 'TN26-ROBO-00103');
  assert.notEqual(generated, 'TN26-ROBO-00102');
});

test('organiser filtering, stats calculation, and CSV export', () => {
  const records = [
    {
      registrationId: 'TN26-ROBO-00101',
      fullName: 'Ananya Deshmukh',
      email: 'ananya@college.edu',
      phone: '9820112233',
      department: 'Mechanical',
      academicYear: 'Third Year',
      eventId: 'robo-wars',
      eventName: 'Robo Wars',
      participationType: 'Team',
      teamName: 'Torque, Inc',
      teamMembers: [{ name: 'Rohan', email: 'rohan@college.edu' }],
      registeredAtISO: '2026-11-16T10:15:00.000Z',
    },
    {
      registrationId: 'TN26-CODE-00102',
      fullName: 'Vikram Rao',
      email: 'vikram@college.edu',
      phone: '9876501234',
      department: 'CSE',
      academicYear: 'Second Year',
      eventId: 'code-clash',
      eventName: 'Code Clash',
      participationType: 'Individual',
      teamName: '',
      teamMembers: [],
      registeredAtISO: '2026-11-16T11:40:00.000Z',
    },
  ];

  const stats = computeEventStats(records);
  assert.equal(stats.total, 2);
  assert.equal(stats['robo-wars'], 1);
  assert.equal(stats['code-clash'], 1);
  assert.equal(stats.circuitrix, 0);

  const filtered = filterRegistrations(records, {
    query: 'vikram',
    eventId: 'all',
    participationType: 'Individual',
  });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].registrationId, 'TN26-CODE-00102');

  const csv = registrationsToCsv(records);
  assert.match(csv, /^Registration ID,Student Name,College Email/);
  assert.match(csv, /"Torque, Inc"/);
  assert.match(csv, /TN26-CODE-00102/);
});

const assert = require('assert');

const { buildAIReadyPayload } = require('../utils/aiDataPrep');

const profile = {
  bio: 'Frontend developer with API integration experience.',
  skills: [
    { name: 'react', level: 'advanced' },
    { name: 'node.js', level: 'intermediate' },
    { name: 'mongodb', level: 'intermediate' },
  ],
  experience: [
    {
      role: 'Frontend Developer',
      company: 'Acme',
      description: 'Built dashboards',
      duration: {
        startDate: '2024-01-01T00:00:00.000Z',
        endDate: '2025-01-01T00:00:00.000Z',
        isCurrent: false,
      },
    },
  ],
  projects: [
    {
      title: 'Job Tracker',
      description: 'Tracks applications',
      techStack: ['react', 'node.js', 'react'],
    },
    {
      title: 'Portfolio',
      description: 'Developer portfolio',
      techStack: ['mongodb'],
    },
  ],
  education: [
    {
      degree: 'B.Tech CSE',
      institution: 'XYZ University',
      year: 2025,
    },
  ],
  resume: {
    url: 'https://cdn.example.com/resume.pdf',
    publicId: 'resume-123',
  },
};

const job = {
  title: 'Full Stack Developer',
  description: 'Build product features with React and Node.js.',
  skillsRequired: ['React', 'Node.js', 'MongoDB'],
  experienceLevel: 'Junior',
  company: 'Jobify',
};

const payload = buildAIReadyPayload({ profile, job });

assert.deepStrictEqual(payload.profile.skills, ['react', 'node.js', 'mongodb']);
assert.strictEqual(payload.profile.projectCount, 2);
assert.strictEqual(payload.profile.experienceCount, 1);
assert.strictEqual(payload.profile.resume.hasResume, true);
assert.strictEqual(payload.profile.resume.url, 'https://cdn.example.com/resume.pdf');
assert.ok(payload.profile.experienceYears >= 1);
assert.deepStrictEqual(payload.job.skillsRequired, ['React', 'Node.js', 'MongoDB']);
assert.strictEqual(payload.job.title, 'Full Stack Developer');

console.log('AI data prep test passed');

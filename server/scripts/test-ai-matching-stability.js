const assert = require('assert');

const Profile = require('../models/profile.model');
const {
  getResumeAnalysis,
} = require('../controllers/profile.controller');
const {
  cleanResumeText,
  parseResumeBuffer,
} = require('../utils/resumeParser');
const {
  calculateJobMatch,
} = require('../utils/matchingEngine');
const {
  createResumeSourceHash,
} = require('../utils/resumeAnalysis');

const createMockResponse = () => ({
  statusCode: 200,
  body: undefined,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
});

const withMockedMethod = async (target, methodName, mockImplementation, callback) => {
  const originalMethod = target[methodName];
  target[methodName] = mockImplementation;

  try {
    await callback();
  } finally {
    target[methodName] = originalMethod;
  }
};

const testEmptyResume = async () => {
  const parsed = await parseResumeBuffer(Buffer.from('empty'), async () => ({ text: '', numpages: 0 }));

  assert.strictEqual(parsed.cleanedText, '');
  assert.deepStrictEqual(parsed.extractedSkills, []);
};

const testLargeResume = async () => {
  const largeText = `React Developer\nNode.js\n${'Built scalable software services. '.repeat(50000)}`;
  const parsed = await parseResumeBuffer(Buffer.from('large'), async () => ({ text: largeText, numpages: 12 }));

  assert.ok(parsed.cleanedText.length > 100000);
  assert.deepStrictEqual(parsed.extractedSkills, ['React', 'Node.js']);
  assert.strictEqual(parsed.pageCount, 12);
};

const testResumeWithoutSkills = async () => {
  const parsed = await parseResumeBuffer(Buffer.from('no-skills'), async () => ({
    text: 'Experienced product manager with leadership experience.',
    numpages: 1,
  }));

  assert.deepStrictEqual(parsed.extractedSkills, []);
};

const testInvalidResume = async () => {
  await assert.rejects(
    () => parseResumeBuffer('not-a-buffer', async () => ({ text: '' })),
    /valid PDF buffer is required/
  );
};

const testMultipleMatchingJobs = () => {
  const profile = {
    skills: [{ name: 'React' }, { name: 'Node.js' }, { name: 'MongoDB' }],
    resume: { extractedSkills: [] },
  };
  const jobs = [
    { title: 'Backend Developer', skillsRequired: ['Node', 'Mongo', 'Docker'] },
    { title: 'Frontend Developer', skillsRequired: ['React', 'JavaScript'] },
    { title: 'Full Stack Developer', skillsRequired: ['React', 'Node', 'Mongo'] },
  ];
  const ranked = jobs
    .map((job) => ({ job, match: calculateJobMatch({ profile, job }) }))
    .sort((first, second) => second.match.matchPercentage - first.match.matchPercentage);

  assert.strictEqual(ranked[0].job.title, 'Full Stack Developer');
  assert.strictEqual(ranked[0].match.matchPercentage, 100);
  assert.strictEqual(ranked[1].match.matchPercentage, 67);
};

const testJobsWithoutSkills = () => {
  const match = calculateJobMatch({
    profile: { skills: [{ name: 'React' }], resume: {} },
    job: { skillsRequired: [], extractedSkills: [] },
  });

  assert.strictEqual(match.matchPercentage, 0);
  assert.deepStrictEqual(match.matchedSkills, []);
  assert.deepStrictEqual(match.missingSkills, []);
};

const testDuplicateAnalysisAndCacheValidation = async () => {
  const resumeText = 'React Developer with Node.js experience';
  const sourceHash = createResumeSourceHash(resumeText);
  let openAIWouldBeCalled = false;
  const profile = {
    userId: { toString: () => 'user-1' },
    resume: {
      cleanedText: resumeText,
      analysis: {
        sourceHash,
        analyzedAt: new Date(),
        strengths: ['Clear technical focus'],
        weaknesses: [],
        missingSkills: [],
        atsIssues: [],
        grammarSuggestions: [],
        recommendations: [],
      },
    },
  };

  await withMockedMethod(Profile, 'findOne', async () => profile, async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    try {
      const req = { user: { _id: 'user-1' } };
      const res = createMockResponse();
      await getResumeAnalysis(req, res);
      openAIWouldBeCalled = res.body.cached !== true;

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.cached, true);
      assert.deepStrictEqual(res.body.analysis.strengths, ['Clear technical focus']);
    } finally {
      if (originalKey === undefined) {
        delete process.env.OPENAI_API_KEY;
      } else {
        process.env.OPENAI_API_KEY = originalKey;
      }
    }
  });

  assert.strictEqual(openAIWouldBeCalled, false);
  assert.strictEqual(createResumeSourceHash(resumeText), sourceHash);
};

const run = async () => {
  const tests = [
    ['Empty resume', testEmptyResume],
    ['Large resume', testLargeResume],
    ['Resume without skills', testResumeWithoutSkills],
    ['Invalid resume', testInvalidResume],
    ['Multiple matching jobs', testMultipleMatchingJobs],
    ['Jobs without skills', testJobsWithoutSkills],
    ['Duplicate analysis and cache validation', testDuplicateAnalysisAndCacheValidation],
  ];

  for (const [name, testFn] of tests) {
    await testFn();
    console.log(`PASS ${name}`);
  }

  console.log('All AI matching stability tests passed');
};

run().catch((error) => {
  console.error('AI matching stability test failed:', error);
  process.exitCode = 1;
});

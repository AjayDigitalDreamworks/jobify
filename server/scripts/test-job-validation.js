const assert = require('assert');

const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { jobCreateSchema } = require('../validators/schemas');
const { updateJob, deleteJob } = require('../controllers/job.controller');
const Job = require('../models/job.model');

const validJobPayload = {
  title: 'Backend Engineer',
  description: 'Build and maintain API services.',
  company: 'Jobify',
  location: 'Remote',
  employmentType: 'Full-time',
  workMode: 'Remote',
  salaryMin: 50000,
  salaryMax: 90000,
  skillsRequired: ['Node.js', 'MongoDB'],
  experienceLevel: 'Mid-level',
};

const createMockResponse = () => {
  const res = {
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
  };

  return res;
};

const runMiddleware = async (middleware, req) => {
  const res = createMockResponse();
  let nextCalled = false;

  await middleware(req, res, () => {
    nextCalled = true;
  });

  return { res, nextCalled };
};

const withMockedFindById = async (mockImplementation, callback) => {
  const originalFindById = Job.findById;
  Job.findById = mockImplementation;

  try {
    await callback();
  } finally {
    Job.findById = originalFindById;
  }
};

const testJobSeekerCannotCreateJob = async () => {
  const middleware = authorize('recruiter');
  const req = {
    user: {
      _id: 'user-1',
      role: 'jobSeeker',
    },
  };

  const { res, nextCalled } = await runMiddleware(middleware, req);

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(res.statusCode, 403);
};

const testInvalidSalaryIsRejected = async () => {
  const middleware = validate(jobCreateSchema);
  const req = {
    body: {
      ...validJobPayload,
      salaryMin: 90000,
      salaryMax: 50000,
    },
  };

  const { res, nextCalled } = await runMiddleware(middleware, req);

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.body.message, 'Validation failed');
};

const testEmptyTitleIsRejected = async () => {
  const middleware = validate(jobCreateSchema);
  const req = {
    body: {
      ...validJobPayload,
      title: '   ',
    },
  };

  const { res, nextCalled } = await runMiddleware(middleware, req);

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.body.message, 'Validation failed');
};

const testUnauthorizedEditIsRejected = async () => {
  await withMockedFindById(async () => ({
    createdBy: {
      toString: () => 'owner-1',
    },
    save: async () => {
      throw new Error('save should not be called');
    },
  }), async () => {
    const req = {
      params: { id: 'job-1' },
      user: {
        _id: {
          toString: () => 'other-user',
        },
      },
      body: {
        title: 'Updated title',
      },
    };
    const res = createMockResponse();

    await updateJob(req, res);

    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body.message, 'You are not authorized to update this job');
  });
};

const testUnauthorizedDeleteIsRejected = async () => {
  await withMockedFindById(async () => ({
    createdBy: {
      toString: () => 'owner-1',
    },
  }), async () => {
    const req = {
      params: { id: 'job-1' },
      user: {
        _id: {
          toString: () => 'other-user',
        },
      },
    };
    const res = createMockResponse();

    await deleteJob(req, res);

    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body.message, 'You are not authorized to delete this job');
  });
};

const run = async () => {
  const tests = [
    ['Job seeker creates job', testJobSeekerCannotCreateJob],
    ['Invalid salary', testInvalidSalaryIsRejected],
    ['Empty title', testEmptyTitleIsRejected],
    ['Unauthorized edit', testUnauthorizedEditIsRejected],
    ['Unauthorized delete', testUnauthorizedDeleteIsRejected],
  ];

  for (const [name, testFn] of tests) {
    await testFn();
    console.log(`PASS ${name}`);
  }

  console.log('All job validation tests passed');
};

run().catch((error) => {
  console.error('Job validation test failed:', error);
  process.exitCode = 1;
});

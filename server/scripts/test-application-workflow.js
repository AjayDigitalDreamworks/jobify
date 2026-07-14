const assert = require('assert');

const authMiddleware = require('../middleware/auth.middleware');
const Job = require('../models/job.model');
const Application = require('../models/application.model');
const {
  applyForJob,
  updateApplicationStatus,
  withdrawApplication,
} = require('../controllers/application.controller');

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

const testApplySuccessfully = async () => {
  const createdApplication = {
    _id: 'app-1',
    applicant: 'user-1',
    job: 'job-1',
    status: 'applied',
  };

  await withMockedMethod(Job, 'findById', () => ({
    select: async () => ({ isActive: true }),
  }), async () => {
    await withMockedMethod(Application, 'findOne', async () => null, async () => {
      await withMockedMethod(Application, 'create', async () => createdApplication, async () => {
        const req = {
          params: { jobId: 'job-1' },
          user: { _id: 'user-1', role: 'jobSeeker' },
          body: {
            coverLetter: 'I am interested in this role',
            resumeUrl: 'https://example.com/resume.pdf',
          },
        };
        const res = createMockResponse();

        await applyForJob(req, res);

        assert.strictEqual(res.statusCode, 201);
        assert.strictEqual(res.body.success, true);
        assert.strictEqual(res.body.application._id, 'app-1');
      });
    });
  });
};

const testApplyTwiceIsBlocked = async () => {
  await withMockedMethod(Job, 'findById', () => ({
    select: async () => ({ isActive: true }),
  }), async () => {
    await withMockedMethod(Application, 'findOne', async () => ({ _id: 'existing-app' }), async () => {
      const req = {
        params: { jobId: 'job-1' },
        user: { _id: 'user-1', role: 'jobSeeker' },
        body: {},
      };
      const res = createMockResponse();

      await applyForJob(req, res);

      assert.strictEqual(res.statusCode, 409);
      assert.strictEqual(res.body.message, 'Already Applied');
    });
  });
};

const testApplyOnInactiveJob = async () => {
  await withMockedMethod(Job, 'findById', () => ({
    select: async () => ({ isActive: false }),
  }), async () => {
    const req = {
      params: { jobId: 'job-1' },
      user: { _id: 'user-1', role: 'jobSeeker' },
      body: {},
    };
    const res = createMockResponse();

    await applyForJob(req, res);

    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.message, 'Job not found');
  });
};

const testRecruiterCanChangeStatus = async () => {
  const applicationDoc = {
    status: 'applied',
    job: {
      createdBy: {
        toString: () => 'recruiter-1',
      },
    },
    timeline: [],
    save: async () => undefined,
  };

  await withMockedMethod(Application, 'findById', () => ({
    populate: async () => applicationDoc,
  }), async () => {
    const req = {
      params: { id: 'app-1' },
      body: { status: 'shortlisted' },
      user: { _id: 'recruiter-1', role: 'recruiter' },
    };
    const res = createMockResponse();

    await updateApplicationStatus(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(applicationDoc.status, 'shortlisted');
    assert.strictEqual(applicationDoc.timeline.length, 1);
    assert.strictEqual(applicationDoc.timeline[0].status, 'shortlisted');
  });
};

const testJobSeekerCannotChangeStatus = async () => {
  const req = {
    params: { id: 'app-1' },
    body: { status: 'shortlisted' },
    user: { _id: 'user-1', role: 'jobSeeker' },
  };
  const res = createMockResponse();

  await updateApplicationStatus(req, res);

  assert.strictEqual(res.statusCode, 403);
  assert.strictEqual(res.body.message, 'Forbidden: only recruiters can update application status');
};

const testWithdrawApplication = async () => {
  const applicationDoc = {
    applicant: {
      toString: () => 'user-1',
    },
    status: 'applied',
    timeline: [],
    save: async () => undefined,
  };

  await withMockedMethod(Application, 'findById', () => ({
    populate: async () => applicationDoc,
  }), async () => {
    const req = {
      params: { id: 'app-1' },
      user: { _id: 'user-1', role: 'jobSeeker' },
    };
    const res = createMockResponse();

    await withdrawApplication(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(applicationDoc.status, 'withdrawn');
    assert.strictEqual(applicationDoc.timeline.length, 1);
    assert.strictEqual(applicationDoc.timeline[0].status, 'withdrawn');
  });
};

const testUnauthorizedAccess = async () => {
  const req = {
    headers: {
      authorization: '',
    },
  };
  const res = createMockResponse();
  let nextCalled = false;

  await authMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(res.statusCode, 401);
  assert.strictEqual(res.body.message, 'Authorization token is required');
};

const run = async () => {
  const tests = [
    ['Apply successfully', testApplySuccessfully],
    ['Apply twice', testApplyTwiceIsBlocked],
    ['Apply on inactive job', testApplyOnInactiveJob],
    ['Recruiter changing status', testRecruiterCanChangeStatus],
    ['Job seeker trying to change status', testJobSeekerCannotChangeStatus],
    ['Withdraw application', testWithdrawApplication],
    ['Unauthorized access', testUnauthorizedAccess],
  ];

  for (const [name, testFn] of tests) {
    await testFn();
    console.log(`PASS ${name}`);
  }

  console.log('All application workflow tests passed');
};

run().catch((error) => {
  console.error('Application workflow test failed:', error);
  process.exitCode = 1;
});

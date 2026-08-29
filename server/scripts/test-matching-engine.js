const assert = require('assert');

const { calculateJobMatch, calculateSkillMatch } = require('../utils/matchingEngine');

const testPromptExample = () => {
  const result = calculateSkillMatch({
    requiredSkills: ['React', 'Node', 'Mongo', 'Docker', 'Git'],
    candidateSkills: ['React', 'Mongo', 'Git'],
  });

  assert.strictEqual(result.commonSkillsCount, 3);
  assert.strictEqual(result.totalRequiredSkills, 5);
  assert.strictEqual(result.matchPercentage, 60);
  assert.deepStrictEqual(result.matchedSkills, ['React', 'Mongo', 'Git']);
  assert.deepStrictEqual(result.missingSkills, ['Node', 'Docker']);
};

const testProfileAndJobDocuments = () => {
  const result = calculateJobMatch({
    profile: {
      skills: [
        { name: 'React' },
        { name: 'MongoDB' },
      ],
      resume: {
        extractedSkills: ['Git'],
      },
    },
    job: {
      skillsRequired: ['React', 'Node.js', 'MongoDB', 'Docker', 'Git'],
      extractedSkills: ['React', 'Node.js', 'MongoDB', 'Docker', 'Git'],
    },
  });

  assert.strictEqual(result.matchPercentage, 60);
  assert.deepStrictEqual(result.candidateSkills, ['React', 'MongoDB', 'Git']);
  assert.deepStrictEqual(result.requiredSkills, ['React', 'Node.js', 'MongoDB', 'Docker', 'Git']);
};

const testSkillsRequiredFallback = () => {
  const result = calculateJobMatch({
    profile: {
      skills: [{ name: 'JavaScript' }],
      resume: {},
    },
    job: {
      skillsRequired: ['JavaScript', 'AWS'],
      extractedSkills: [],
    },
  });

  assert.strictEqual(result.matchPercentage, 50);
  assert.deepStrictEqual(result.missingSkills, ['AWS']);
};

const run = () => {
  testPromptExample();
  testProfileAndJobDocuments();
  testSkillsRequiredFallback();
  console.log('Matching engine test passed');
};

run();

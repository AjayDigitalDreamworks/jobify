const assert = require('assert');

const { calculateJobMatch, calculateSkillGap, calculateSkillMatch } = require('../utils/matchingEngine');

const testPromptExample = () => {
  const result = calculateSkillMatch({
    requiredSkills: ['React', 'Node', 'Mongo', 'Docker', 'Git'],
    candidateSkills: ['React', 'Mongo', 'Git'],
  });

  assert.strictEqual(result.commonSkillsCount, 3);
  assert.strictEqual(result.totalRequiredSkills, 5);
  assert.strictEqual(result.matchPercentage, 60);
  assert.deepStrictEqual(result.matchedSkills, ['React', 'MongoDB', 'Git']);
  assert.deepStrictEqual(result.missingSkills, ['Node.js', 'Docker']);
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

const testSkillGapPromptExample = () => {
  const result = calculateSkillGap({
    requiredSkills: ['React', 'Node', 'Mongo', 'Docker', 'Redis'],
    candidateSkills: ['React', 'Mongo'],
  });

  assert.deepStrictEqual(result.missingSkills, ['Node.js', 'Docker', 'Redis']);
  assert.strictEqual(result.missingSkillsCount, 3);
  assert.deepStrictEqual(
    result.learningRecommendations.map((item) => item.skill),
    ['Node.js', 'Docker', 'Redis']
  );
};

const run = () => {
  testPromptExample();
  testProfileAndJobDocuments();
  testSkillsRequiredFallback();
  testSkillGapPromptExample();
  console.log('Matching engine test passed');
};

run();

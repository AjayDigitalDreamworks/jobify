const assert = require('assert');

const { extractJobSkills } = require('../utils/jobSkillExtractor');

const testJobDescriptionSkills = () => {
  const extracted = extractJobSkills({
    title: 'React Developer',
    description: 'Looking for a React Developer with Node.js, MongoDB and Express.',
  });

  assert.deepStrictEqual(extracted.extractedSkills, ['React', 'Node.js', 'MongoDB', 'Express']);
};

const testExpressDotJsPrefersStructuredResult = () => {
  const extracted = extractJobSkills({
    title: 'Backend Engineer',
    description: 'Strong experience with Express.js, Node.js and MongoDB is required.',
  });

  assert.deepStrictEqual(extracted.extractedSkills, ['Express.js', 'Node.js', 'MongoDB']);
};

const run = () => {
  testJobDescriptionSkills();
  testExpressDotJsPrefersStructuredResult();
  console.log('Job skill extractor test passed');
};

run();

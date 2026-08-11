const assert = require('assert');

const {
  cleanResumeText,
  extractSkillsFromText,
  parseResumeBuffer,
} = require('../utils/resumeParser');

const testCleanResumeText = () => {
  const cleaned = cleanResumeText('  React   Developer \r\n\r\n Node.js \t MongoDB  ');
  assert.strictEqual(cleaned, 'React Developer\nNode.js MongoDB');
};

const testExtractSkillsFromText = () => {
  const skills = extractSkillsFromText('Experienced with React, Node.js, MongoDB and Tailwind CSS.');
  assert.deepStrictEqual(skills, ['React', 'Node.js', 'MongoDB', 'Tailwind CSS']);
};

const testParseResumeBuffer = async () => {
  const fakeParser = async () => ({
    text: 'Frontend Developer\nSkills: React, Node.js, MongoDB',
    numpages: 1,
  });

  const parsed = await parseResumeBuffer(Buffer.from('fake-pdf-buffer'), fakeParser);

  assert.strictEqual(parsed.extractedText, 'Frontend Developer\nSkills: React, Node.js, MongoDB');
  assert.strictEqual(parsed.cleanedText, 'Frontend Developer\nSkills: React, Node.js, MongoDB');
  assert.deepStrictEqual(parsed.extractedSkills, ['React', 'Node.js', 'MongoDB']);
  assert.strictEqual(parsed.pageCount, 1);
  assert.strictEqual(parsed.parser, 'pdf-parse');
};

const run = async () => {
  testCleanResumeText();
  testExtractSkillsFromText();
  await testParseResumeBuffer();
  console.log('Resume parser test passed');
};

run().catch((error) => {
  console.error('Resume parser test failed:', error);
  process.exitCode = 1;
});

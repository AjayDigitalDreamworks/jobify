const pdfParse = require('pdf-parse');

const KNOWN_SKILLS = [
  'React',
  'Node.js',
  'MongoDB',
  'Express.js',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Bootstrap',
  'Next.js',
  'Redux',
  'Git',
  'GitHub',
  'REST API',
  'GraphQL',
  'SQL',
  'MySQL',
  'PostgreSQL',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Firebase',
  'Mongoose',
  'JWT',
  'OAuth',
  'Machine Learning',
  'Data Structures',
  'Algorithms',
  'Figma',
  'React Native',
  'Flutter',
  'PHP',
  'Laravel',
];

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const cleanResumeText = (text = '') => text
  .replace(/\r/g, '\n')
  .replace(/\u00a0/g, ' ')
  .replace(/[ \t]+/g, ' ')
  .replace(/\n{3,}/g, '\n\n')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .join('\n')
  .trim();

const extractSkillsFromText = (text = '', skillList = KNOWN_SKILLS) => {
  const normalizedText = text.toLowerCase();
  const matchedRanges = [];
  const matchedSkills = [];
  const skillsBySpecificity = [...skillList].sort((left, right) => right.length - left.length);

  skillsBySpecificity.forEach((skill) => {
    const pattern = new RegExp(`(^|[^a-z0-9])(${escapeRegex(skill.toLowerCase())})([^a-z0-9]|$)`, 'gi');
    let match = pattern.exec(normalizedText);

    while (match) {
      const matchedValue = match[2];
      const startIndex = match.index + match[0].indexOf(matchedValue);
      const endIndex = startIndex + matchedValue.length;
      const overlaps = matchedRanges.some((range) => startIndex < range.end && endIndex > range.start);

      if (!overlaps) {
        matchedRanges.push({ start: startIndex, end: endIndex });
        matchedSkills.push({
          skill,
          index: startIndex,
        });
        break;
      }

      match = pattern.exec(normalizedText);
    }
  });

  return matchedSkills
    .sort((left, right) => left.index - right.index)
    .map((item) => item.skill);
};

const parseResumeBuffer = async (buffer, parser = pdfParse) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('A valid PDF buffer is required');
  }

  const parsedPdf = await parser(buffer);
  const extractedText = (parsedPdf.text || '').trim();
  const cleanedText = cleanResumeText(extractedText);
  const extractedSkills = extractSkillsFromText(cleanedText);

  return {
    extractedText,
    cleanedText,
    extractedSkills,
    pageCount: parsedPdf.numpages || 0,
    parser: 'pdf-parse',
  };
};

module.exports = {
  KNOWN_SKILLS,
  cleanResumeText,
  extractSkillsFromText,
  parseResumeBuffer,
};

const { extractSkillsFromText, cleanResumeText } = require('./resumeParser');

const buildJobSkillsSource = ({ title = '', description = '' } = {}) => (
  [title, description]
    .filter((value) => typeof value === 'string' && value.trim())
    .join('\n')
);

const extractJobSkills = ({ title = '', description = '' } = {}) => {
  const sourceText = buildJobSkillsSource({ title, description });
  const cleanedText = cleanResumeText(sourceText);

  return {
    sourceText,
    cleanedText,
    extractedSkills: extractSkillsFromText(cleanedText),
  };
};

module.exports = {
  buildJobSkillsSource,
  extractJobSkills,
};

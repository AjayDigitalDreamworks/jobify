const { SKILL_ALIASES } = require('../data/skillsDatabase');

const skillCanonicalMap = Object.entries(SKILL_ALIASES).reduce((accumulator, [canonicalSkill, aliases]) => {
  accumulator[canonicalSkill.toLowerCase()] = canonicalSkill;

  aliases.forEach((alias) => {
    accumulator[alias.toLowerCase()] = canonicalSkill;
  });

  return accumulator;
}, {});

const normalizeSkill = (skill = '') => skill.toString().trim().toLowerCase();

const canonicalizeSkill = (skill = '') => {
  const normalizedSkill = normalizeSkill(skill);

  return skillCanonicalMap[normalizedSkill] || skill.toString().trim();
};

const uniqueSkills = (skills = []) => {
  const seen = new Set();

  return skills.reduce((accumulator, skill) => {
    const canonicalSkill = canonicalizeSkill(skill);
    const normalizedSkill = normalizeSkill(canonicalSkill);

    if (!normalizedSkill || seen.has(normalizedSkill)) {
      return accumulator;
    }

    seen.add(normalizedSkill);
    accumulator.push(canonicalSkill);
    return accumulator;
  }, []);
};

const getCandidateSkills = (profile = {}) => uniqueSkills([
  ...(profile.skills || []).map((skill) => skill?.name || skill),
  ...(profile.resume?.extractedSkills || []),
]);

const getRequiredJobSkills = (job = {}) => {
  const extractedSkills = uniqueSkills(job.extractedSkills || []);

  if (extractedSkills.length > 0) {
    return extractedSkills;
  }

  return uniqueSkills(job.skillsRequired || []);
};

const calculateSkillMatch = ({ candidateSkills = [], requiredSkills = [] } = {}) => {
  const uniqueCandidateSkills = uniqueSkills(candidateSkills);
  const uniqueRequiredSkills = uniqueSkills(requiredSkills);
  const candidateSkillSet = new Set(uniqueCandidateSkills.map(normalizeSkill));
  const commonSkills = uniqueRequiredSkills.filter((skill) => candidateSkillSet.has(normalizeSkill(skill)));
  const totalRequiredSkills = uniqueRequiredSkills.length;
  const matchPercentage = totalRequiredSkills === 0
    ? 0
    : Math.round((commonSkills.length / totalRequiredSkills) * 100);

  return {
    matchPercentage,
    matchedSkills: commonSkills,
    missingSkills: uniqueRequiredSkills.filter((skill) => !candidateSkillSet.has(normalizeSkill(skill))),
    commonSkillsCount: commonSkills.length,
    totalRequiredSkills,
  };
};

const buildLearningRecommendations = (missingSkills = []) => missingSkills.map((skill) => ({
  skill,
  recommendation: `Learn ${skill} fundamentals and build one small project using it.`,
  status: 'planned',
}));

const calculateSkillGap = ({ candidateSkills = [], requiredSkills = [] } = {}) => {
  const skillMatch = calculateSkillMatch({ candidateSkills, requiredSkills });

  return {
    missingSkills: skillMatch.missingSkills,
    missingSkillsCount: skillMatch.missingSkills.length,
    learningRecommendations: buildLearningRecommendations(skillMatch.missingSkills),
  };
};

const calculateJobMatch = ({ profile, job } = {}) => {
  const candidateSkills = getCandidateSkills(profile);
  const requiredSkills = getRequiredJobSkills(job);
  const skillMatch = calculateSkillMatch({ candidateSkills, requiredSkills });
  const skillGap = calculateSkillGap({ candidateSkills, requiredSkills });

  return {
    candidateSkills,
    requiredSkills,
    ...skillMatch,
    skillGap,
  };
};

module.exports = {
  calculateJobMatch,
  calculateSkillGap,
  calculateSkillMatch,
  canonicalizeSkill,
  getCandidateSkills,
  getRequiredJobSkills,
};

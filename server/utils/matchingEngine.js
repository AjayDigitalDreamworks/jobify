const normalizeSkill = (skill = '') => skill.toString().trim().toLowerCase();

const uniqueSkills = (skills = []) => {
  const seen = new Set();

  return skills.reduce((accumulator, skill) => {
    const normalizedSkill = normalizeSkill(skill);

    if (!normalizedSkill || seen.has(normalizedSkill)) {
      return accumulator;
    }

    seen.add(normalizedSkill);
    accumulator.push(skill.toString().trim());
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

const calculateJobMatch = ({ profile, job } = {}) => {
  const candidateSkills = getCandidateSkills(profile);
  const requiredSkills = getRequiredJobSkills(job);

  return {
    candidateSkills,
    requiredSkills,
    ...calculateSkillMatch({ candidateSkills, requiredSkills }),
  };
};

module.exports = {
  calculateJobMatch,
  calculateSkillMatch,
  getCandidateSkills,
  getRequiredJobSkills,
};

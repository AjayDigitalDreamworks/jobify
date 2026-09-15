const clamp = (value, minimum = 0, maximum = 100) => Math.min(Math.max(value, minimum), maximum);

const hasText = (value) => typeof value === 'string' && value.trim().length > 0;

const scoreSkills = (skills = []) => {
  const validSkills = skills.filter((skill) => hasText(skill?.name));
  return Math.round(clamp((Math.min(validSkills.length, 6) / 6) * 30));
};

const scoreProjects = (projects = []) => {
  const validProjects = projects.filter((project) => hasText(project?.title));
  const completeProjects = validProjects.filter((project) => (
    hasText(project.description) &&
    (Array.isArray(project.techStack) && project.techStack.some(hasText)) &&
    (hasText(project.link) || hasText(project.github))
  ));

  return Math.round(clamp(
    (Math.min(validProjects.length, 3) / 3) * 12 +
    (Math.min(completeProjects.length, 3) / 3) * 8
  ));
};

const scoreExperience = (experience = []) => {
  const validExperience = experience.filter((item) => hasText(item?.role) && hasText(item?.company));
  const documentedExperience = validExperience.filter((item) => (
    hasText(item.description) && item.duration?.startDate
  ));

  return Math.round(clamp(
    (Math.min(validExperience.length, 3) / 3) * 12 +
    (Math.min(documentedExperience.length, 3) / 3) * 8
  ));
};

const scoreResume = (resume = {}) => {
  if (!hasText(resume.url) && !hasText(resume.cleanedText) && !hasText(resume.extractedText)) {
    return 0;
  }

  const hasParsedText = hasText(resume.cleanedText) || hasText(resume.extractedText);
  const hasSkills = Array.isArray(resume.extractedSkills) && resume.extractedSkills.length > 0;
  const hasPages = Number(resume.pageCount) > 0;

  return Math.round(clamp(
    8 + (hasParsedText ? 6 : 0) + (hasSkills ? 4 : 0) + (hasPages ? 2 : 0)
  ));
};

const scoreEducation = (education = []) => {
  const validEducation = education.filter((item) => (
    hasText(item?.degree) && hasText(item?.institution) && Number.isFinite(Number(item?.year))
  ));

  return Math.round(clamp((Math.min(validEducation.length, 2) / 2) * 10));
};

const calculateProfileScore = (profileDocument) => {
  const profile = profileDocument?.toObject?.() || profileDocument || {};
  const breakdown = {
    skills: scoreSkills(profile.skills),
    projects: scoreProjects(profile.projects),
    experience: scoreExperience(profile.experience),
    resume: scoreResume(profile.resume),
    education: scoreEducation(profile.education),
  };

  return {
    total: Object.values(breakdown).reduce((total, score) => total + score, 0),
    max: 100,
    breakdown,
  };
};

module.exports = {
  calculateProfileScore,
};

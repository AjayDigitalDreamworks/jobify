const millisecondsPerDay = 1000 * 60 * 60 * 24;
const { calculateJobMatch } = require('./matchingEngine');

const normalizeString = (value = '') => value.toString().trim();

const uniqueStrings = (values = []) => {
  const seen = new Set();

  return values.reduce((accumulator, value) => {
    const normalizedValue = normalizeString(value);
    const key = normalizedValue.toLowerCase();

    if (!normalizedValue || seen.has(key)) {
      return accumulator;
    }

    seen.add(key);
    accumulator.push(normalizedValue);
    return accumulator;
  }, []);
};

const toPlainObject = (document = {}) => document?.toObject?.() || document;

const calculateExperienceYears = (experienceItems = []) => {
  const totalDays = experienceItems.reduce((sum, item) => {
    const startDate = item?.duration?.startDate ? new Date(item.duration.startDate) : null;
    const endDate = item?.duration?.endDate ? new Date(item.duration.endDate) : new Date();

    if (!startDate || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return sum;
    }

    const diffInDays = Math.max(0, Math.round((endDate - startDate) / millisecondsPerDay));
    return sum + diffInDays;
  }, 0);

  return Number((totalDays / 365).toFixed(1));
};

const formatProfileForAI = (profileDocument) => {
  const profile = toPlainObject(profileDocument);
  const skills = uniqueStrings((profile.skills || []).map((skill) => skill?.name));
  const projects = (profile.projects || [])
    .map((project) => ({
      title: normalizeString(project?.title),
      description: normalizeString(project?.description),
      techStack: uniqueStrings(project?.techStack || []),
    }))
    .filter((project) => project.title);
  const experience = (profile.experience || [])
    .map((item) => ({
      role: normalizeString(item?.role),
      company: normalizeString(item?.company),
      description: normalizeString(item?.description),
      isCurrent: Boolean(item?.duration?.isCurrent),
      startDate: item?.duration?.startDate || null,
      endDate: item?.duration?.endDate || null,
    }))
    .filter((item) => item.role || item.company);
  const education = (profile.education || [])
    .map((item) => ({
      degree: normalizeString(item?.degree),
      institution: normalizeString(item?.institution),
      year: item?.year ?? null,
    }))
    .filter((item) => item.degree || item.institution || item.year !== null);

  return {
    bio: normalizeString(profile.bio),
    skills,
    skillLevels: (profile.skills || [])
      .map((skill) => ({
        name: normalizeString(skill?.name),
        level: normalizeString(skill?.level || 'beginner'),
      }))
      .filter((skill) => skill.name),
    experience,
    experienceYears: calculateExperienceYears(profile.experience || []),
    experienceCount: experience.length,
    projects,
    projectCount: projects.length,
    education,
    educationCount: education.length,
    resume: {
      hasResume: Boolean(profile.resume?.url),
      url: normalizeString(profile.resume?.url),
      cleanedText: normalizeString(profile.resume?.cleanedText),
      extractedSkills: uniqueStrings(profile.resume?.extractedSkills || []),
      parsedAt: profile.resume?.parsedAt || null,
    },
  };
};

const formatJobForAI = (jobDocument) => {
  const job = toPlainObject(jobDocument);

  return {
    title: normalizeString(job.title),
    description: normalizeString(job.description),
    skillsRequired: uniqueStrings(job.skillsRequired || []),
    extractedSkills: uniqueStrings(job.extractedSkills || []),
    experienceLevel: normalizeString(job.experienceLevel),
    company: normalizeString(job.company),
  };
};

const buildAIReadyPayload = ({ profile, job }) => ({
  profile: formatProfileForAI(profile),
  job: formatJobForAI(job),
  match: calculateJobMatch({ profile: toPlainObject(profile), job: toPlainObject(job) }),
});

module.exports = {
  formatProfileForAI,
  formatJobForAI,
  buildAIReadyPayload,
};

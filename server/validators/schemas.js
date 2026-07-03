const { z } = require('zod');

const trimmedRequiredString = (fieldName) =>
  z.string().trim().min(1, `${fieldName} is required`);

const salaryNumber = (fieldName) =>
  z.coerce.number({
    invalid_type_error: `${fieldName} must be a number`,
  }).min(0, `${fieldName} cannot be negative`);

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['jobSeeker', 'recruiter']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const jobFieldsSchema = z.object({
  title: trimmedRequiredString('Title'),
  description: trimmedRequiredString('Description'),
  company: trimmedRequiredString('Company'),
  location: trimmedRequiredString('Location'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract']),
  workMode: z.enum(['Remote', 'Hybrid', 'Onsite']),
  salaryMin: salaryNumber('Minimum salary'),
  salaryMax: salaryNumber('Maximum salary'),
  skillsRequired: z
    .array(trimmedRequiredString('Skill'))
    .min(1, 'At least one skill is required'),
  experienceLevel: z.enum(['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Director']),
});

const jobCreateSchema = jobFieldsSchema.strict().superRefine((data, ctx) => {
  if (data.salaryMax < data.salaryMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Maximum salary must be greater than or equal to minimum salary',
      path: ['salaryMax'],
    });
  }
});

const jobUpdateSchema = jobFieldsSchema.partial().strict().superRefine((data, ctx) => {
  if (
    data.salaryMin !== undefined &&
    data.salaryMax !== undefined &&
    data.salaryMax < data.salaryMin
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Maximum salary must be greater than or equal to minimum salary',
      path: ['salaryMax'],
    });
  }
});

const durationSchema = z.object({
  startDate: z.string().refine((d) => !Number.isNaN(Date.parse(d)), { message: 'Invalid start date' }),
  endDate: z.string().nullable().optional().refine((d) => d === null || !Number.isNaN(Date.parse(d)), { message: 'Invalid end date' }),
  isCurrent: z.boolean().optional(),
});

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  duration: durationSchema,
  description: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  link: z.string().url().optional().or(z.literal('')).optional(),
  github: z.string().url().optional().or(z.literal('')).optional(),
});

const skillSchema = z.object({
  name: z.string().min(1),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

const educationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  year: z.number().int().gte(1900).lte(3000),
});

const profileCreateSchema = z.object({
  bio: z.string().max(1000).optional(),
  skills: z.array(skillSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  education: z.array(educationSchema).optional(),
  resume: z.object({ url: z.string().url().optional().or(z.literal('')), publicId: z.string().optional() }).optional(),
});

const profileUpdateSchema = profileCreateSchema.partial();

module.exports = {
  registerSchema,
  loginSchema,
  jobCreateSchema,
  jobUpdateSchema,
  profileCreateSchema,
  profileUpdateSchema,
};

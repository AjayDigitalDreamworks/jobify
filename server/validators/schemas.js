const { z } = require('zod');

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

const salarySchema = z.object({
  min: z.number().nullable().optional(),
  max: z.number().nullable().optional(),
  currency: z.string().optional(),
});

const jobCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  salary: salarySchema.optional(),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  experience: z.enum(['Entry Level', 'Mid Level', 'Senior Level']).optional(),
  skills: z.array(z.string()).optional(),
  postedBy: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  status: z.enum(['Active', 'Closed', 'Draft']).optional(),
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
  profileCreateSchema,
  profileUpdateSchema,
};

const { createHash } = require('crypto');

const ANALYSIS_FIELDS = [
  'strengths',
  'weaknesses',
  'missingSkills',
  'atsIssues',
  'grammarSuggestions',
  'recommendations',
];

const createResumeSourceHash = (resumeText) => (
  createHash('sha256').update(resumeText).digest('hex')
);

const normalizeAnalysis = (analysis = {}) => ANALYSIS_FIELDS.reduce((result, field) => {
  result[field] = Array.isArray(analysis[field])
    ? analysis[field].filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
    : [];
  return result;
}, {});

const parseModelResponse = (content) => {
  const withoutCodeFence = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  return normalizeAnalysis(JSON.parse(withoutCodeFence));
};

const analyzeResumeWithOpenAI = async (resumeText) => {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error('OPENAI_API_KEY is not configured');
    error.code = 'OPENAI_NOT_CONFIGURED';
    throw error;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_RESUME_MODEL || 'gpt-4o-mini',
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume reviewer. Return only valid JSON with arrays of concise strings for strengths, weaknesses, missingSkills, atsIssues, grammarSuggestions, and recommendations. Do not invent facts that are not supported by the resume.',
        },
        {
          role: 'user',
          content: `Analyze this resume and provide strengths, weaknesses, missing skills, ATS issues, grammar suggestions, and improvement recommendations.\n\nResume:\n${resumeText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error(`OpenAI request failed with status ${response.status}`);
    error.code = 'OPENAI_REQUEST_FAILED';
    error.details = errorBody;
    throw error;
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content !== 'string' || !content.trim()) {
    const error = new Error('OpenAI returned an empty analysis');
    error.code = 'OPENAI_EMPTY_RESPONSE';
    throw error;
  }

  return normalizeAnalysis(parseModelResponse(content));
};

module.exports = {
  analyzeResumeWithOpenAI,
  createResumeSourceHash,
  normalizeAnalysis,
};

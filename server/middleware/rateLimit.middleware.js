const createRateLimiter = ({ windowMs, max, message }) => {
  const hits = new Map();

  return (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const existing = hits.get(key);

    for (const [storedKey, entry] of hits.entries()) {
      if (now > entry.resetAt) {
        hits.delete(storedKey);
      }
    }

    if (!existing || now > existing.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    existing.count += 1;

    if (existing.count > max) {
      return res.status(429).json({
        message,
        retryAfterMs: existing.resetAt - now,
      });
    }

    return next();
  };
};

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many auth attempts. Please try again later.',
});

module.exports = authRateLimiter;

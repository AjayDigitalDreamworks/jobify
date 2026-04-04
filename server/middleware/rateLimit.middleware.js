const createRateLimiter = ({ windowMs, max, message }) => {
  //ye memory storage hai
  //👉 isme store hota hai:
  //kis IP ne kitni request ki
  //kab tak allowed hai
  const hits = new Map();

  return (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const existing = hits.get(key); //existing entry check karte hain

    for (const [storedKey, entry] of hits.entries()) {
      if (now > entry.resetAt) { //agar current time reset time se bada hai, toh us entry ko delete kar dete hain, taki memory me sirf valid entries rahe
        hits.delete(storedKey);
      }
    }

    //agar koi entry nahi hai ya phir reset time cross ho chuka hai, toh nayi entry create karte hain
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

//15 minutes me 5 requests allowed hain, uske baad 429 Too Many Requests error aayega
const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many auth attempts. Please try again later.',
});

module.exports = authRateLimiter;

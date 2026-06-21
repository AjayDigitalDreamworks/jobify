const { z } = require('zod');

module.exports = function validate(schema) {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      return next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
      }
      return res.status(400).json({ message: 'Invalid request' });
    }
  };
};
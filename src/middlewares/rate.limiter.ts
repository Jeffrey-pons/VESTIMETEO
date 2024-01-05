import setRateLimit from "express-rate-limit";

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Vous avez dépassé votre limite de 6 requêtes par minute.",
  headers: true,
});

export default rateLimitMiddleware;

import setRateLimit from "express-rate-limit";

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Vous avez dépassé votre limite de 10 requêtes par minute.",
  headers: true,
});

export default rateLimitMiddleware;

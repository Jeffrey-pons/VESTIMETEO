import setRateLimit from "express-rate-limit";

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 2000,
  max: 10,
  message: "Vous avez dépassé votre limite de 10 requêtes par 2 secondes.",
  headers: true,
});

export default rateLimitMiddleware;

import { Cache } from '../../index.js';
export const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl; // Utilisez l'URL comme clé du cache
    const cachedResult = Cache.get(cacheKey);
    if (cachedResult) {
        res.status(200).json(cachedResult);
    }
    else {
        res.sendResponse = res.json;
        res.json = (body) => {
            Cache.set(cacheKey, body, 600); // Mettez en cache la réponse
            return res.sendResponse(body);
        };
        next();
    }
};

import { Cache } from '../../index.js';
export const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedResult = Cache.get(cacheKey);
    if (cachedResult) {
        res.status(200).json(cachedResult);
    }
    else {
        res.sendResponse = res.json;
        res.json = (body) => {
            Cache.set(cacheKey, body, 600);
            return res.sendResponse(body);
        };
        next();
    }
};

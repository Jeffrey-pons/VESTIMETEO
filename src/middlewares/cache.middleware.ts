import { Request, Response, NextFunction } from 'express';
import { Cache } from '../../index.js';

interface ExtendedResponse extends Response {
  sendResponse?: Response['json'];
}

export const cacheMiddleware = (
  req: Request,
  res: ExtendedResponse,
  next: NextFunction
): void => {
  const cacheKey = req.originalUrl; 
  const cachedResult = Cache.get(cacheKey);

  if (cachedResult) {
    res.status(200).json(cachedResult);
  } else {
    res.sendResponse = res.json;
    res.json = (body): Response => {
      Cache.set(cacheKey, body, 600); 
      return res.sendResponse!(body);
    };
    next();
  }
};


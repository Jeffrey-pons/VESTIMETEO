import escape from "validator";

interface AnyObject {
  [key: string]: any;
}

const sanitize = (obj: AnyObject): AnyObject => {
  const keys = Object.keys(obj);
  const newObj: AnyObject = {};

  for (let key of keys) {
    const value = obj[key];
    let newValue = value;

    newObj[key] = newValue;
  }
  return newObj;
};

export const sanitizeMiddleware = (req: AnyObject, res: AnyObject, next: () => void): void => {
  req.body = sanitize(req.body);
  req.params = sanitize(req.params);

  console.log("_");
  console.log("body", req.body);

  next();
};

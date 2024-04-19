import jwt from "jsonwebtoken";

import { User } from "../models/authModel.js";
import HttpError from "../helpers/HttpError.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return  next(HttpError(401,"Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401,"Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401,"Not authorized"));
  }
};

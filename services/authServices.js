import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

import { User } from "../models/authModel.js";
import HttpError from "../helpers/HttpError.js";


export const createUser = async (req, _, next) => {
  const { email, password, avatarURL  } = req.body;
  const user = await User.findOne({ email });
     console.log(user);
  if (user) {
    return next(HttpError(409, "Email in use")); 
  }
  const emailHash = crypto.createHash('md5').update(email).digest('hex');
  const avatar = `https://gravatar.com/avatar/${emailHash}.jpg?d=robohash`;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ ...req.body, avatarURL: avatar,  password: hashPassword });
  
  return newUser;
};


export const getUser = async (req,  _, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(HttpError(401, "Email or password is wrong"));
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return next(HttpError(401, "Email or password is wrong"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  }
};
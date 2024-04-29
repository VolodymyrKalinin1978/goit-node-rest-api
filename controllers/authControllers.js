import Jimp from "jimp";
import path from "path";
import fs from 'fs';

import { User } from "../models/authModel.js";
import { createUser, getUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const avatarPath = path.resolve("public", "avatars");

export const registerUser = async (req, res, next) => {
  const newUser = await createUser(req, res, next);
  if (newUser === undefined || newUser === null || newUser === false) return;
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

export const loginUser = async (req, res, next) =>
  res.json(await getUser(req, res, next));

export const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};



export const logoutUser = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { subscription });

  res.sendStatus(200);
};

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, "No file uploaded"));
  }

  let { avatarURL, _id } = req.user;

  const { path: oldPath, filename } = req.file;

  Jimp.read(oldPath, (err, image) => {
    if (err) throw err;

    image.resize(250, 250);

    const newPath = path.join(avatarPath, filename);
    image.write(newPath);
  });

   
   fs.unlink(oldPath, (err) => {
    if (err) {
      console.error("Error deleting old images:", err);
    }
  });

  const poster = path.join("avatars", filename);
  avatarURL = poster;
  console.log(avatarURL);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL: avatarURL,
  });
};

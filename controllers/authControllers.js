import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/authModel.js";

import HttpError from "../helpers/HttpError.js";
import { createUser, getUser } from "../services/authServices.js";


export const registerUser = async (req, res, next) => {
  const newUser = await createUser(req, res, next); 
  if (newUser === undefined || newUser === null || newUser === false ) return; 
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    }
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
  const  {subscription} = req.body
  console.log(_id);
  await User.findByIdAndUpdate(_id, { subscription });

  res.sendStatus(200);
};

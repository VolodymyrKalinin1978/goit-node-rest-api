import { model, Schema } from 'mongoose';

import { userRoles } from '../constants/userRoles.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRoles), // ['admin', 'user', 'moderator'],
      default: userRoles.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model('User', userSchema);

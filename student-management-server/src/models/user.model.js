import { model, Schema } from "mongoose";

import { BaseSchema } from "./base.model.js";
import { USER_ROLE } from "../config/enum.js";

const UserSchema = BaseSchema({
  first_name: String,
  last_name: String,
  full_name: String,
  phone: String,
  studentCode: String,
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: { type: String, select: false },
  salt: { type: String, select: false },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// Add indexes for faster queries
UserSchema.index({ role: 1 });

export const User = model("User", UserSchema);

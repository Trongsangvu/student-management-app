import { model, Schema } from "mongoose";
import { USER_ROLE } from "../config/enum.js";
import { BaseSchema } from "./base.model.js";

const UserSchema = BaseSchema({
  first_name: String,
  last_name: String,
  full_name: String,
  phone: String,
  avatar: {
    type: String,
    require: false,
  },
  student_code: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
  },
  teacher_code: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.STUDENT,
    index: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    default: null,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export const User = model("User", UserSchema);

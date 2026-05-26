import mongoose from "mongoose";
import { BaseSchema } from "./base.model";
import { GENDER, USER_STATUS } from "../config/enum";

const studentSchema = BaseSchema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  student_code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  full_name: {
    type: String,
    required: true,
    trim: true,
  },

  gender: {
    type: String,
    enum: Object.values(GENDER),
  },

  date_of_birth: {
    type: Date,
  },

  phone_number: {
    type: String,
    trim: true,
  },

  address: {
    type: String,
    trim: true,
  },

  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  faculty: {
    type: String,
    trim: true,
  },

  enrollment_year: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
});

studentSchema.index({
  student_code: 1,
});

export const Student = mongoose.model("Student", studentSchema);

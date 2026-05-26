import { model } from "mongoose";
import { BaseSchema } from "./base.model.js";

const SubjectSchema = BaseSchema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const Subject = model("Subject", SubjectSchema);

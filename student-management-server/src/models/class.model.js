import mongoose, { model } from "mongoose";
import { BaseSchema } from "./base.model";

const classesSchema = BaseSchema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
});

export const Classes = model("Classes", classesSchema);

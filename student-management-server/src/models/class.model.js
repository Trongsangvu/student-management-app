import mongoose, { model } from "mongoose";
import { BaseSchema } from "./base.model";

const classSchema = BaseSchema({
  name: String,
  faculty: String,
  academicYear: String,
});

export const Class = model("Class", classSchema);

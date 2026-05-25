import { BaseSchema } from "./base.model";

const subjectSchema = BaseSchema({
  code: String,
  name: String,
  credits: Number,
});

export const Subject = model("Subject", subjectSchema);

import { BaseSchema } from "./base.model";

const subjectSchema = BaseSchema({
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

export const Subject = model("Subject", subjectSchema);

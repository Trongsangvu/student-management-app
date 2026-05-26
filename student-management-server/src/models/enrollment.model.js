import mongoose from "mongoose";
import { BaseSchema } from "./base.model";

const EnrollmentSchema = BaseSchema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  semester: { type: String, required: true },
});

EnrollmentSchema.index(
  { student: 1, subject: 1, semester: 1 },
  { unique: true },
);

export const EnrollMent = model("EnrollMent", EnrollmentSchema);

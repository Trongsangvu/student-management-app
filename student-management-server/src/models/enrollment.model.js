import mongoose from "mongoose";
import { BaseSchema } from "./base.model";

const EnrollmentSchema = BaseSchema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },

  semester: String,
});

export const EnrollMent = model("EnrollMent", EnrollmentSchema);

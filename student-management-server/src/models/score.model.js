import mongoose from "mongoose";
import { BaseSchema } from "./base.model";

const ScoreSchema = BaseSchema({
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
  },

  assignmentScore: Number,
  midtermScore: Number,
  finalScore: Number,

  totalScore: Number,
  letterGrade: String,
});

export const Score = model("Score", ScoreSchema);


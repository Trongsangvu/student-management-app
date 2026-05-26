import mongoose from "mongoose";
import { BaseSchema } from "./base.model";

const scoreSchema = BaseSchema({
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
    unique: true,
  },
  assignmentScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  midtermScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  finalScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  letterGrade: {
    type: String,
    required: true,
  },
});

export const Score = model("Score", ScoreSchema);

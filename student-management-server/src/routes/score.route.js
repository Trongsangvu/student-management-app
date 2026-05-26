import express from "express";
import scoreController from "../controller/score.controller";
import { adminAndTeacherTokenRequired } from "../middlewares/auth.middleware";
import { scoreCreateRequest } from "../requests/score.request";

const router = express.Router();

router.post(
  "/",
  adminAndTeacherTokenRequired,
  validateRequest(scoreCreateRequest),
  scoreController.create,
);

router.get(
  "/:id/gpa",
  adminAndTeacherTokenRequired,
  scoreController.getStudentGPA,
);

export default router;

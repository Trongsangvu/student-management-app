import express from "express";
import scoreController from "../controller/score.controller.js";
import { adminAndTeacherTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { scoreCreateRequest } from "../requests/score.request.js";

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

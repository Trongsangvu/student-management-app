import express from "express";

const router = express.Router();

router.post(
  "/scores",
  adminAndTeacherTokenRequired,
  validateRequest(scoreCreateRequest),
  scoreController.create,
);

router.get(
  "/students/:studentId/gpa",
  adminAndTeacherTokenRequired,
  scoreController.getStudentGPA,
);

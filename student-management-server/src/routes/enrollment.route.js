import express from "express";

import enrollmentController from "../controller/enrollment.controller.js";
import { adminAndTeacherTokenRequired, allTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { objectIdSchema } from "../requests/base.request.js";
import { enrollmentCreateRequest } from "../requests/enrollment.request.js";

const router = express.Router();

router.post(
  "/",
  adminAndTeacherTokenRequired,
  validateRequest(enrollmentCreateRequest),
  enrollmentController.create,
);

router.get(
  "/students/:id/subjects",
  allTokenRequired,
  validateRequest(objectIdSchema),
  enrollmentController.getStudentSubjects,
);

export default router;

import express from "express";

import enrollmentController from "../controller/enrollment.controller.js";
import { adminAndTeacherTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import {
  enrollmentCreateRequest
} from "../requests/academic.request.js";

const router = express.Router();

router.post(
  "/enrollments",
  adminAndTeacherTokenRequired,
  validateRequest(enrollmentCreateRequest),
  enrollmentController.create,
);

export default router;

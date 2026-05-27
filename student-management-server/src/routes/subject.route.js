import express from "express";

import subjectController from "../controller/subject.controller.js";
import { adminAndTeacherTokenRequired, adminTokenRequired, allTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { objectIdSchema } from "../requests/base.request.js";
import { subjectCreateRequest, subjectUpdateRequest } from "../requests/subject.request.js";

const router = express.Router();

router.post(
  "/",
  adminTokenRequired,
  validateRequest(subjectCreateRequest),
  subjectController.create,
);

router.get(
  "/",
  adminAndTeacherTokenRequired,
  subjectController.getAll
);

router.get(
  "/:id",
  allTokenRequired,
  validateRequest(objectIdSchema),
  subjectController.getById,
);

router.put(
  "/:id",
  adminTokenRequired,
  validateRequest(objectIdSchema),
  validateRequest(subjectUpdateRequest),
  subjectController.update,
);

router.delete(
  "/:id",
  adminTokenRequired,
  validateRequest(objectIdSchema),
  subjectController.remove,
);

export default router;

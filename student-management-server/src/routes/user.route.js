import express from "express";

import userController from "../controller/user.controller.js";
import { adminAndTeacherTokenRequired, adminTokenRequired, allTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { objectIdSchema } from "../requests/base.request.js";
import { userCreateRequest, userLoginRequest, userUpdateRequest } from "../requests/user.request.js";

const router = express.Router();

router.get("/verify-token", allTokenRequired, userController.verifyToken);

router.post("/login", validateRequest(userLoginRequest), userController.login);

router.post(
  "/",
  adminTokenRequired,
  validateRequest(userCreateRequest),
  userController.create,
);

router.get("/", adminAndTeacherTokenRequired, userController.list);

router.get(
  "/:id",
  adminAndTeacherTokenRequired,
  validateRequest(objectIdSchema),
  userController.userById,
  userController.detail,
);

router.put(
  "/:id",
  adminAndTeacherTokenRequired,
  validateRequest(objectIdSchema),
  validateRequest(userUpdateRequest),
  userController.userById,
  userController.update,
);

export default router;

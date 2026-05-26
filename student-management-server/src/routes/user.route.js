import express from "express";

import { userController } from "../controllers/index.js";
import { allTokenRequired, managerAndAdminTokenRequired } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { userChangePassRequest, userCreateRequest, userForgotPassRequest, userLoginRequest, userResetPassOtpRequest, userUpdateProfileRequest, userUpdateRequest } from "../requests/user.request.js";
import { objectIdSchema } from "../requests/base.request.js";

const router = express.Router();

router.get(
  "/verify-token",
  allTokenRequired,
  userController.verifyToken,
);

router.post(
  "/login",
  validateRequest(userLoginRequest),
  userController.login,
);

router.post(
  "/",
  managerAndAdminTokenRequired,
  validateRequest(userCreateRequest),
  userController.create,
);

router.get(
  "/",
  managerAndAdminTokenRequired,
  userController.list,
);

router.get(
  "/profile",
  allTokenRequired,
  userController.profile,
);

router.put(
  "/profile",
  allTokenRequired,
  validateRequest(userUpdateProfileRequest),
  userController.profileUpdate,
);

router.put(
  "/password/change",
  allTokenRequired,
  validateRequest(userChangePassRequest),
  userController.passwordChange,
);

router.post(
  "/password/forgot",
  validateRequest(userForgotPassRequest),
  userController.passwordForgotOtp,
);

router.post(
  "/password/reset",
  validateRequest(userResetPassOtpRequest),
  userController.passwordResetOtp,
);

router.get(
  "/:id",
  managerAndAdminTokenRequired,
  validateRequest(objectIdSchema),
  userController.userById,
  userController.getById,
);

router.put(
  "/:id",
  managerAndAdminTokenRequired,
  validateRequest(objectIdSchema),
  validateRequest(userUpdateRequest),
  userController.userById,
  userController.update,
);

router.patch(
  "/:id/toggle-active",
  managerAndAdminTokenRequired,
  validateRequest(objectIdSchema),
  userController.userById,
  userController.toggleActive,
);

export default router;

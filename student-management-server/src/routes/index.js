import express from "express";

import userRoute from "./user.route.js";
import scoreRoute from "./score.route.js";
import enrollmentRoute from "./enrollment.route.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/scores", scoreRoute);
router.use("/enrollments", enrollmentRoute);

export default router;

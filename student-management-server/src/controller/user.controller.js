import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";
import { logError } from "../utils/log.util.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.util.js";
import { ApiResponse } from "../config/response.js";

const initAdmin = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await userService.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists, skipping initialization");
      return;
    }

    const randomSalt = generateRandomSalt();
    const hashedPass = await hashPassword("Admin@12345", randomSalt);

    // Default admin credentials
    const adminData = new User({
      email: "admin@gmail.com",
      salt: randomSalt,
      password: hashedPass,
      first_name: "System",
      last_name: "Administrator",
      display_name: "System Administrator",
      role: "admin",
    });

    // TODO: Create admin user in database
    const adminSaved = await userService.save(adminData);

    console.log(`Admin user initialized successfully: ${adminSaved.email}`);
  } catch (error) {
    logError(error);
  }
};

const verifyToken = async (req, res) => {
  try {
    return ApiResponse.OK(res, { user: req.user });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

export default {
  initAdmin,
  verifyToken,
};

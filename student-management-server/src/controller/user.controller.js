import { CONSTANTS } from "../config/constants.js";
import { USER_ROLE, USER_SEARCH_FIELDS } from "../config/enum.js";
import {
  MESSAGE_USER,
  messageDeleted,
  messageExisted,
  messageNotFound,
} from "../config/messages.js";
import { ApiResponse } from "../config/response.js";
import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";
import {
  generateRandomSalt,
  hashPassword,
  verifyPassword,
} from "../utils/hash.util.js";
import { jwtEncode } from "../utils/jwt.util.js";
import { logError } from "../utils/log.util.js";
import { buildSearchQuery } from "../utils/query.util.js";

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
      full_name: "System Administrator",
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
    return ApiResponse.InternalServerError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmailForAuth(email);

    if (!user) {
      return ApiResponse.Unauthorized(res, "Invalid email or password");
    }
    const isValid = await verifyPassword(password, user.password, user.salt);
    if (!isValid) {
      return ApiResponse.Unauthorized(res, "Invalid email or password");
    }

    user.password = undefined;
    user.salt = undefined;
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;

    const jwtData = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    const access_token = jwtEncode(
      jwtData,
      CONSTANTS.JWT_SECRET_KEY,
      CONSTANTS.JWT_EXPIRES_SIGNIN,
    );

    return ApiResponse.OK(res, {
      user,
      access_token,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const create = async (req, res) => {
  try {
    const user = req.user;
    const userData = req.validatedBody;

    const existingUser = await userService.findOne({ email: userData.email });
    if (existingUser) {
      return ApiResponse.BadRequest(res, MESSAGE_USER.USER_EXISTED_WITH_EMAIL);
    }

    if (userData.student_code) {
      const existingStudentCode = await userService.findOne({
        student_code: userData.student_code,
      });

      if (existingStudentCode) {
        return ApiResponse.BadRequest(res, messageExisted("student code"));
      }
    }

    if (userData.teacher_code) {
      const existingTeacherCode = await userService.findOne({
        teacher_code: userData.teacher_code,
      });

      if (existingTeacherCode) {
        return ApiResponse.BadRequest(res, messageExisted("teacher code"));
      }
    }

    if (userData.role === USER_ROLE.ADMIN) {
      userData.student_code = undefined;
      userData.teacher_code = undefined;
      userData.class = undefined;
    }

    if (userData.role === USER_ROLE.TEACHER) {
      userData.student_code = undefined;
      userData.class = undefined;
      userData.teacher_code = await userService.generateUserCode(
        USER_ROLE.TEACHER,
      );
    }

    if (userData.role === USER_ROLE.STUDENT) {
      userData.teacher_code = undefined;
      userData.student_code = await userService.generateUserCode(
        USER_ROLE.STUDENT,
      );
    }

    const randomSalt = generateRandomSalt();
    const hashedPass = await hashPassword(userData.password, randomSalt);

    userData.salt = randomSalt;
    userData.password = hashedPass;
    userData.full_name = `${userData.last_name} ${userData.first_name}`;
    userData.created_by = user.id;

    const data = await userService.create(userData);

    return ApiResponse.Created(res, { data: data });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const list = async (req, res) => {
  try {
    const user = req.user;
    const { search } = req.query;
    let query = {};

    query.role = {
      $in: [USER_ROLE.TEACHER, USER_ROLE.STUDENT],
    };

    const searchQuery = buildSearchQuery(search, USER_SEARCH_FIELDS);
    if (searchQuery) {
      query = {
        $and: [query, searchQuery],
      };
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const data = await userService.list(query, skip, limit);

    return ApiResponse.OK(res, { data: data });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const userById = async (req, res, next) => {
  try {
    const { params } = req;

    // Define base query
    const query = { _id: params.id };

    const foundUser = await userService.findOne(query);
    if (!foundUser) {
      return ApiResponse.NotFound(res, messageNotFound("User"));
    }

    req.targetUser = foundUser;
    next();
  } catch (err) {
    return ApiResponse.InternalServerError(res, err);
  }
};

const detail = async (req, res) => {
  try {
    return ApiResponse.OK(res, req.targetUser);
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const data = await userService.update(req.params.id, req.body);

    return ApiResponse.OK(res, { data: data });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    await userService.remove(req.params.id);

    return ApiResponse.OK(res, messageDeleted("User"));
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

export default {
  initAdmin,
  verifyToken,
  login,
  create,
  update,
  detail,
  remove,
  list,
  userById,
};

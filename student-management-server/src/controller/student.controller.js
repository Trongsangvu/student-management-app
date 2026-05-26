import { USER_ROLE } from "../config/enum.js";
import { messageDeleted, messageNotFound } from "../config/messages.js";
import { ApiResponse } from "../config/response.js";
import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const studentData = {
      ...req.validatedBody,
      role: USER_ROLE.STUDENT,
    };

    const student = await userService.create(studentData);

    return ApiResponse.Created(res, { data: student });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const query = {
      role: USER_ROLE.STUDENT,
    };

    if (search) {
      query.$or = [
        { full_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { student_code: { $regex: search, $options: "i" } },
      ];
    }

    const page = parseInt(page, 10) || 1;
    const limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { users, count } = await userService.list(query, skip, limit);

    return ApiResponse.OK(res, { users, count });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    return ApiResponse.OK(res, {
      data: req.targetUser,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    if (!req.targetUser || req.targetUser.role !== USER_ROLE.STUDENT) {
      return ApiResponse.NotFound(res, messageNotFound("Student"));
    }

    const student = await userService.update(req.params.id, {
      ...req.validatedBody,
      role: USER_ROLE.STUDENT,
    });

    return ApiResponse.OK(res, {
      data: student,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    if (!req.targetUser || req.targetUser.role !== USER_ROLE.STUDENT) {
      return ApiResponse.NotFound(res, messageNotFound("Student"));
    }

    await userService.remove(req.params.id);

    return ApiResponse.OK(res, {
      message: messageDeleted("Student"),
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};

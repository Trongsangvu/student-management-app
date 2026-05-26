import classService from "../services/class.service.js";
import { ApiResponse } from "../config/response.js";
import {
  messageDeleted,
  messageExisted,
  messageNotFound,
} from "../config/messages.js";

const create = async (req, res) => {
  try {
    const data = req.validatedBody;

    const existingClass = await classService.findOne({
      name: data.name,
    });

    if (existingClass) {
      return ApiResponse.BadRequest(res, messageExisted("Class"));
    }

    const newClass = await classService.create(data);

    return ApiResponse.Created(res, { data: newClass });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const page = parseInt(page, 10) || 1;
    const limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { classes, count } = await classService.list(query, skip, limit);

    return ApiResponse.OK(res, { classes, count });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const classData = await classService.findById(req.params.id);

    if (!classData) {
      return ApiResponse.NotFound(res, messageNotFound("Class"));
    }

    return ApiResponse.OK(res, { data: classData });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const classData = await classService.update(
      req.params.id,
      req.validatedBody,
    );

    if (!classData) {
      return ApiResponse.NotFound(res, messageNotFound("Class"));
    }

    return ApiResponse.OK(res, { data: classData });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const classData = await classService.remove(req.params.id);

    if (!classData) {
      return ApiResponse.NotFound(res, messageNotFound("Class"));
    }

    return ApiResponse.OK(res, {
      message: messageDeleted("Class"),
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

import subjectService from "../services/subject.service.js";
import { ApiResponse } from "../config/response.js";
import {
  messageDeleted,
  messageExisted,
  messageNotFound,
} from "../config/messages.js";

const create = async (req, res) => {
  try {
    const data = req.validatedBody;

    const existingSubject = await subjectService.findOne({
      code: data.code,
    });

    if (existingSubject) {
      return ApiResponse.BadRequest(res, messageExisted("Subject"));
    }

    const subject = await subjectService.create(data);

    return ApiResponse.Created(res, { data: subject });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const { search } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { subjects, count } = await subjectService.list(query, skip, limit);

    return ApiResponse.OK(res, { subjects, count });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const subject = await subjectService.findById(req.params.id);

    if (!subject) {
      return ApiResponse.NotFound(res, messageNotFound("Subject"));
    }

    return ApiResponse.OK(res, { data: subject });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const subject = await subjectService.update(
      req.params.id,
      req.validatedBody,
    );

    if (!subject) {
      return ApiResponse.NotFound(res, messageNotFound("Subject"));
    }

    return ApiResponse.OK(res, { data: subject });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const subject = await subjectService.remove(req.params.id);

    if (!subject) {
      return ApiResponse.NotFound(res, messageNotFound("Subject"));
    }

    return ApiResponse.OK(res, {
      message: messageDeleted("Subject"),
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

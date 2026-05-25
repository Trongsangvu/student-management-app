import { messageDeleted, messageNotFound } from "../config/messages";
import { ApiResponse } from "../config/response";
import { User } from "../models/user.model";
import userService from "../services/user.service";

const create = async (req, res) => {
  try {
    const student = await userService.create(req.body);

    ApiResponse.Created(res, { data: student });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const getAll = async (req, res) => {
  try {
    const students = await User.find().sort({ createdAt: -1 });

    ApiResponse.OK(res, { data: students });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const getById = async (req, res) => {
  try {
    ApiResponse.OK(res, req.targetUser);
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      ApiResponse.NotFound(res, messageNotFound("Student"));
    }

    ApiResponse.OK(res, { data: student });
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);

    if (!student) {
      ApiResponse.NotFound(res, messageNotFound("Student"));
    }

    ApiResponse.OK(res, messageDeleted("Student"));
  } catch (error) {
    ApiResponse.InternalServerError(res, error);
  }
};

export default { create, getAll, getById, remove, update };

import { EnrollMent } from "../models/enrollment.model.js";

const save = (enrollment) => {
  return enrollment.save();
};

const create = async (data) => {
  const enrollment = await EnrollMent.create(data);

  return Enrollment.findById(enrollment._id)
    .populate("student")
    .populate("subject");
};

const findOne = (query) => {
  return Enrollment.findOne(query).populate("student").populate("subject");
};

const findById = (id) => {
  return Enrollment.findById(id).populate("student").populate("subject");
};

const findByStudent = (studentId) => {
  return Enrollment.find({ student: studentId }).populate("subject");
};

const list = async ({ query = {}, skip = 0, limit = 10 }) => {
  const [enrollments, count] = await Promise.all([
    Enrollment.find(query)
      .populate("student")
      .populate("subject")
      .sort("-created_at")
      .skip(skip)
      .limit(limit),

    Enrollment.countDocuments(query),
  ]);

  return {
    enrollments,
    count,
  };
};

export default {
  save,
  create,
  findOne,
  findById,
  findByStudent,
  list,
};

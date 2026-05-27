import { Subject } from "../models/subject.model.js";

const create = async (data) => {
  const subject = await Subject.create(data);
  return Subject.findById(subject._id);
};

const findOne = (query) => {
  return Subject.findOne(query);
};

const findById = (id) => {
  return Subject.findById(id);
};

const list = async (query = {}, skip = 0, limit = 10) => {
  const [subjects, count] = await Promise.all([
    Subject.find(query).sort("-created_at").skip(skip).limit(limit),
    Subject.countDocuments(query),
  ]);

  return { subjects, count };
};

const update = (id, data) => {
  return Subject.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

const remove = (id) => {
  return Subject.findByIdAndDelete(id);
};

export default {
  create,
  findOne,
  findById,
  list,
  update,
  remove,
};

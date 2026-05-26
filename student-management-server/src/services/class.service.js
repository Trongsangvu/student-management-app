import { Classes } from "../models/class.model.js";

const save = (classData) => {
  return classData.save();
};

const create = async (data) => {
  const newClass = await Classes.create(data);

  return Classes.findById(newClass._id);
};

const findOne = (query) => {
  return Classes.findOne(query);
};

const findById = (id) => {
  return Classes.findById(id);
};

const findByName = (name) => {
  return Classes.findOne({ name });
};

const list = async ({ query = {}, skip = 0, limit }) => {
  const [classRes, count] = await Promise.all([
    Classes.find(query).sort("-created_at").skip(skip).limit(limit),

    Classes.countDocuments(query),
  ]);

  return {
    classRes,
    count,
  };
};

export default {
  save,
  create,
  findOne,
  findById,
  findByName,
  list,
};

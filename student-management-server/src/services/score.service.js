import { Score } from "../models/score.model";

const save = (score) => {
  return score.save();
};

const create = async (data) => {
  const score = await Score.create(data);

  return Score.findById(score._id).populate({
    path: "enrollment",
    populate: ["student", "subject"],
  });
};

const findOne = (query) => {
  return Score.findOne(query).populate({
    path: "enrollment",
    populate: ["student", "subject"],
  });
};

const findById = (id) => {
  return Score.findById(id).populate({
    path: "enrollment",
    populate: ["student", "subject"],
  });
};

const findByEnrollments = (enrollmentIds) => {
  return Score.find({
    enrollment: { $in: enrollmentIds },
  });
};

const list = async ({ query = {}, skip = 0, limit = 10 }) => {
  const [scores, count] = await Promise.all([
    Score.find(query)
      .populate({
        path: "enrollment",
        populate: ["student", "subject"],
      })
      .sort("-created_at")
      .skip(skip)
      .limit(limit),

    Score.countDocuments(query),
  ]);

  return {
    scores,
    count,
  };
};

export default {
  save,
  create,
  list,
  findOne,
  findById,
  findByEnrollments,
};

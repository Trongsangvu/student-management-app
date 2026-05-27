import { USER_ROLE } from "../config/enum.js";
import { User } from "../models/user.model.js";

const save = async (user) => {
  await user.save();
  return user;
};

const create = async (data) => {
  const user = new User(data);
  await user.save();
  return User.findById(user._id);
};

const findOne = async (query) => {
  const user = await User.findOne(query);
  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const findByEmailForAuth = async (email) => {
  const user = await User.findOne({ email }).select("+password +salt");
  return user;
};

const findByIdForAuth = async (id) => {
  const user = await User.findById(id).select("+password +salt");
  return user;
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};

const list = async (query, skip, limit) => {
  const [users, count] = await Promise.all([
    User.find(query)
      .skip(skip)
      .limit(limit)
      .populate("created_by", "full_name email")
      .sort("-created_at"),
    User.countDocuments(query),
  ]);
  return { users, count };
};

const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const count = (query = {}) => {
  return User.countDocuments(query);
};

const generateUserCode = async (role) => {
  const prefix = role === USER_ROLE.STUDENT ? "STU" : "TCH";

  const result = await count({ role });

  return `${prefix}${String(result + 1).padStart(4, "0")}`;
};

export default {
  save,
  create,
  findOne,
  findByEmailForAuth,
  findByIdForAuth,
  findByEmail,
  list,
  findById,
  update,
  remove,
  generateUserCode,
};

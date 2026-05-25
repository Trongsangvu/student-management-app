import { Subject } from "../models/subject.model";

const createSubject = async (payload) => {
  const existingSubject = await Subject.findOne({
    code: payload.code,
  });

  if (existingSubject) {
    throw new Error("Subject already exists");
  }

  return Subject.create(payload);
};

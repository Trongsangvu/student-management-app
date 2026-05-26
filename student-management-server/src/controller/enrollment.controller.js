import { USER_ROLE } from "../config/enum.js";
import { MESSAGE_ENROLL, messageNotFound } from "../config/messages.js";
import { ApiResponse } from "../config/response.js";
import enrollmentService from "../services/enrollment.service.js";
import subjectService from "../services/subject.service.js";
import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const data = req.validatedBody;

    const student = await userService.findById(data.student);

    if (!student || student.role !== USER_ROLE.STUDENT) {
      return ApiResponse.BadRequest(res, messageNotFound("Student"));
    }

    const subject = await subjectService.findById(data.subject);

    if (!subject) {
      return ApiResponse.BadRequest(res, messageNotFound("Subject"));
    }

    const existingEnrollment = await enrollmentService.findOne({
      student: data.student,
      subject: data.subject,
      semester: data.semester,
    });

    if (existingEnrollment) {
      return ApiResponse.BadRequest(res, MESSAGE_ENROLL.USER_ALREADY_ENROLLED);
    }

    const enrollment = await enrollmentService.create(data);

    return ApiResponse.Created(res, {
      data: enrollment,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getStudentSubjects = async (req, res) => {
  try {
    const student = await userService.findById(req.params.studentId);

    if (!student || student.role !== USER_ROLE.STUDENT) {
      return ApiResponse.BadRequest(res, messageNotFound("Student"));
    }

    const enrollments = await enrollmentService.findByStudent(
      req.params.studentId,
    );

    return ApiResponse.OK(res, {
      data: enrollments,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

export default {
  create,
  getStudentSubjects,
};

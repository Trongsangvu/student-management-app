import { MESSAGE_SCORE, messageNotFound } from "../config/messages.js";
import { ApiResponse } from "../config/response.js";
import enrollmentService from "../services/enrollment.service.js";
import scoreService from "../services/score.service.js";
import {
  calculateLetterGrade,
  calculateTotalScore,
} from "../utils/score.util.js";

const create = async (req, res) => {
  try {
    const data = req.validatedBody;

    const enrollment = await enrollmentService.findById(data.enrollment);

    if (!enrollment) {
      return ApiResponse.BadRequest(res, messageNotFound("Enrollment"));
    }

    const existingScore = await scoreService.findByEnrollment(data.enrollment);

    if (existingScore) {
      return ApiResponse.BadRequest(res, MESSAGE_SCORE.SCORE_EXISTS_ENROLLMENT);
    }

    const totalScore = calculateTotalScore(data);
    const letterGrade = calculateLetterGrade(totalScore);

    const score = await scoreService.create({
      ...data,
      total_score: totalScore,
      letter_grade: letterGrade,
    });

    return ApiResponse.Created(res, {
      data: score,
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

const getStudentGPA = async (req, res) => {
  try {
    const enrollments = await enrollmentService.findByStudent(
      req.params.studentId,
    );

    const enrollmentIds = enrollments.map((item) => item._id);

    const scores = await scoreService.findByEnrollments(enrollmentIds);

    if (!scores.length) {
      return ApiResponse.OK(res, {
        data: {
          gpa: 0,
          total_subjects: 0,
        },
      });
    }

    const total = scores.reduce((sum, item) => sum + item.total_score, 0);

    const gpa = total / scores.length;

    return ApiResponse.OK(res, {
      data: {
        gpa: Number(gpa.toFixed(2)),
        total_subjects: scores.length,
      },
    });
  } catch (error) {
    return ApiResponse.InternalServerError(res, error);
  }
};

export default {
  create,
  getStudentGPA,
};

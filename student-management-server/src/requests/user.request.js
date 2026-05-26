import z from "zod";
import { USER_ROLE, USER_STATUS } from "../configs/enum.js";

const DEFAULT_ROLE = USER_ROLE.STUDENT;
const ROLE_VALUES = Object.values(USER_ROLE);
const STATUS_VALUES = Object.values(USER_STATUS);

const optionalString = z.string().trim().optional();

export const userCreateRequest = z
  .object({
    first_name: z.string().trim().nonempty(),
    last_name: z.string().trim().nonempty(),
    email: z.email().nonempty(),
    password: z.string().trim().nonempty(),
    role: z.enum(ROLE_VALUES).default(DEFAULT_ROLE).optional(),
    student_code: optionalString,
    teacher_code: optionalString,
    class: optionalString,
    phone: optionalString,
    avatar: optionalString,
  })
  .superRefine((data, ctx) => {
    if (data.role === USER_ROLE.STUDENT) {
      if (!data.student_code) {
        ctx.addIssue({
          code: "custom",
          path: ["student_code"],
          message: "Student code is required",
        });
      }

      if (!data.class) {
        ctx.addIssue({
          code: "custom",
          path: ["class"],
          message: "Class is required",
        });
      }
    }

    if (data.role === USER_ROLE.TEACHER && !data.teacher_code) {
      ctx.addIssue({
        code: "custom",
        path: ["teacher_code"],
        message: "Teacher code is required",
      });
    }
  });

export const userUpdateRequest = z
  .object({
    first_name: optionalString,
    last_name: optionalString,
    email: z.email().optional(),
    phone: optionalString,
    postcode: optionalString,
    address: optionalString,
    avatar: optionalString,
    status: z.enum(STATUS_VALUES).default(USER_STATUS.ACTIVE).optional(),
    role: z.enum(ROLE_VALUES).optional(),
    student_code: optionalString,
    teacher_code: optionalString,
    class: optionalString,
  })
  .superRefine((data, ctx) => {
    if (data.role === USER_ROLE.STUDENT) {
      if (!data.student_code) {
        ctx.addIssue({
          code: "custom",
          path: ["student_code"],
          message: "Student code is required",
        });
      }

      if (!data.class) {
        ctx.addIssue({
          code: "custom",
          path: ["class"],
          message: "Class is required",
        });
      }
    }

    if (data.role === USER_ROLE.TEACHER && !data.teacher_code) {
      ctx.addIssue({
        code: "custom",
        path: ["teacher_code"],
        message: "Teacher code is required",
      });
    }
  });

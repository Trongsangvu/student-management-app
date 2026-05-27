import z from "zod";
import { USER_STATUS, USER_ROLE } from "../config/enum.js";

const DEFAULT_ROLE = USER_ROLE.STUDENT;
const ROLE_VALUES = Object.values(USER_ROLE);
const STATUS_VALUES = Object.values(USER_STATUS);

const optionalString = z.string().trim().optional();

export const userLoginRequest = z.object({
  body: z.object({
    email: z.email().nonempty(),
    password: z.string().trim().nonempty(),
  }),
});

export const userCreateRequest = z.object({
  body: z
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
      if (data.role === USER_ROLE.STUDENT && !data.class) {
        ctx.addIssue({
          code: "custom",
          path: ["class"],
          message: "Class is required",
        });
      }
    }),
});

export const userUpdateRequest = z.object({
  body: z
    .object({
      first_name: optionalString,
      last_name: optionalString,
      email: z.email().optional(),

      phone: optionalString,
      postcode: optionalString,
      address: optionalString,
      avatar: optionalString,

      status: z.enum(STATUS_VALUES).optional(),
      role: z.enum(ROLE_VALUES).optional(),

      class: optionalString,
    })
    .superRefine((data, ctx) => {
      if (data.role === USER_ROLE.STUDENT && !data.class) {
        ctx.addIssue({
          code: "custom",
          path: ["class"],
          message: "Class is required",
        });
      }
    }),
});

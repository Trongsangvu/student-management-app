import z from "zod";

export const enrollmentCreateRequest = z.object({
  body: z.object({
    student: z.string().nonempty(),
    subject: z.string().nonempty(),
    semester: z.string().trim().nonempty(),
  }),
});

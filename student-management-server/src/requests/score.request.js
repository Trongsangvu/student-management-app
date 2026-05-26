import z from "zod";

export const scoreCreateRequest = z.object({
  body: z.object({
    enrollment: z.string().nonempty(),
    assignment_score: z.number().min(0).max(10),
    midterm_score: z.number().min(0).max(10),
    final_score: z.number().min(0).max(10),
  }),
});

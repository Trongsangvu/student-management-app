import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { messageInvalid } from "../config/messages.js";

export const objectIdSchema = z.object({
  params: z.object({
    id: z.string().refine(isValidObjectId, { message: messageInvalid("ID") }),
  }),
});

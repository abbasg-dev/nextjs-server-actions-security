import { z } from "zod";

// Validate untrusted form data before it reaches business logic.
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(["low", "medium", "high"]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

// Updates require a validated resource identifier as well.
export const updateTaskSchema = createTaskSchema.extend({
  id: z.string().min(1, "Task ID is required"),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

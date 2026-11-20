"use server";

import type { ActionState } from "@/lib/types";
import * as db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { createTaskSchema, updateTaskSchema } from "@/lib/schemas";

// Create: authenticate, validate, then persist with a server-derived owner.
export async function createTask(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await verifySession();

  if (!session) {
    return { errors: {}, message: "You must be signed in to create a task." };
  }

  const result = createTaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    priority: formData.get("priority") || "medium",
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Invalid task data. Please check your input.",
    };
  }

  const { title, description, priority } = result.data;
  db.insertTask({
    title,
    description: description ?? "",
    priority,
    ownerId: session.userId,
  });

  revalidatePath("/");
  return { errors: {}, message: "Task created successfully!" };
}

// Update: validate the ID, load the resource, and enforce ownership.
export async function updateTask(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await verifySession();

  if (!session) {
    return { errors: {}, message: "You must be signed in to create a task." };
  }

  const result = updateTaskSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description") || "",
    priority: formData.get("priority") || "medium",
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Invalid task data. Please check your input.",
    };
  }

  const { id, title, description, priority } = result.data;
  const existing = db.getTaskById(id);

  if (!existing) {
    return { errors: {}, message: "Task not found." };
  }

  if (existing.ownerId !== session.userId) {
    return { errors: {}, message: "Not authorized to update this task." };
  }

  const updated = db.updateTask(id, {
    title,
    description: description ?? "",
    priority,
  });

  if (!updated) {
    return { errors: {}, message: "Task not found." };
  }

  revalidatePath("/");
  return { errors: {}, message: "Task updated successfully!" };
}

// Delete: check existence and ownership before the destructive operation.
export async function deleteTask(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await verifySession();

  if (!session) {
    return { errors: {}, message: "You must be signed in to create a task." };
  }

  const idValue = formData.get("id");
  const id = typeof idValue === "string" ? idValue : "";

  if (!id) {
    return { errors: { id: ["Task ID is required."] }, message: "Invalid task data." };
  }

  const existing = db.getTaskById(id);

  if (!existing) {
    return { errors: {}, message: "Task not found." };
  }

  if (existing.ownerId !== session.userId) {
    return { errors: {}, message: "Not authorized to delete this task." };
  }

  const deleted = db.deleteTask(id);

  if (!deleted) {
    return { errors: {}, message: "Task not found." };
  }

  revalidatePath("/");
  return { errors: {}, message: "Task deleted successfully!" };
}

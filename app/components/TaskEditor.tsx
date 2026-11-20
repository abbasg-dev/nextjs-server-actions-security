"use client";

import { useActionState } from "react";
import { deleteTask, updateTask } from "@/app/actions";
import type { ActionState } from "@/lib/types";
import type { Task } from "@/lib/db";
import { SubmitButton } from "./SubmitButton";

const initialState: ActionState = { errors: {}, message: null };

export function TaskEditor({ task }: { task: Task }) {
  const [updateState, updateAction] = useActionState(updateTask, initialState);
  const [deleteState, deleteAction] = useActionState(deleteTask, initialState);

  return (
    <article className="task-card">
      <div className="task-heading">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
      </div>

      <p className="task-description">{task.description}</p>
      <p className="task-meta">
        owner: {task.ownerId} <span>•</span> {task.status === "completed" ? "✓ completed" : "○ pending"}
      </p>

      <div className="task-actions">
        <details className="edit-details">
          <summary className="action-button">Edit</summary>
          <div className="edit-panel">
            {updateState.message && (
              <div className="message-banner error" role="alert">{updateState.message}</div>
            )}
            <form action={updateAction} className="edit-form">
              <input type="hidden" name="id" value={task.id} />
              <label>
                TITLE
                <input name="title" defaultValue={task.title} required maxLength={100} />
              </label>
              {updateState.errors?.title?.map((error, index) => (
                <span className="field-error" key={index}>{error}</span>
              ))}
              <label>
                DESCRIPTION
                <textarea name="description" defaultValue={task.description} rows={2} maxLength={500} />
              </label>
              <label>
                PRIORITY
                <select name="priority" defaultValue={task.priority}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <SubmitButton label="Save changes" />
            </form>
          </div>
        </details>

        <form action={deleteAction}>
          <input type="hidden" name="id" value={task.id} />
          <button className="action-button delete-button" type="submit">Delete</button>
          {deleteState.message && (
            <span className="action-message" role="alert">{deleteState.message}</span>
          )}
        </form>
      </div>
    </article>
  );
}

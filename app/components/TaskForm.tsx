"use client";

import { useActionState } from "react";
import { createTask } from "@/app/actions";
import type { ActionState } from "@/lib/types";
import { SubmitButton } from "./SubmitButton";

const initialState: ActionState = { errors: {}, message: null };

export function TaskForm() {
  const [state, formAction] = useActionState(createTask, initialState);
  const hasFieldErrors = Object.keys(state.errors ?? {}).length > 0;
  const showBanner = Boolean(state.message) && !hasFieldErrors;
  const isSuccess = state.message?.toLowerCase().includes("successfully") ?? false;

  return (
    <section className="panel form-panel">
      <h2 className="panel-title"><span className="sparkle">✦</span> Create New Task</h2>

      {showBanner && (
        <div className={`message-banner ${isSuccess ? "success" : "error"}`} role="alert">
          {state.message}
        </div>
      )}

      <form action={formAction}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">TITLE</label>
            <input id="title" name="title" type="text" placeholder="What needs to be done?" required maxLength={100} />
            {state.errors?.title?.map((error, index) => (
              <span className="field-error" role="alert" key={index}>{error}</span>
            ))}
          </div>

          <div className="form-group">
            <label htmlFor="priority">PRIORITY</label>
            <select id="priority" name="priority" defaultValue="medium">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {state.errors?.priority?.map((error, index) => (
              <span className="field-error" role="alert" key={index}>{error}</span>
            ))}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">DESCRIPTION</label>
            <textarea id="description" name="description" rows={3} maxLength={500} placeholder="Add some details..." />
            {state.errors?.description?.map((error, index) => (
              <span className="field-error" role="alert" key={index}>{error}</span>
            ))}
          </div>

          <div className="full-width">
            <SubmitButton />
          </div>
        </div>
      </form>
    </section>
  );
}

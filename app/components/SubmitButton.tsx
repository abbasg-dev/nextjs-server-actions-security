"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label = "Create Task",
}: {
  label?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending && <span className="spinner" aria-hidden="true" />}
      {pending ? "Saving..." : label}
    </button>
  );
}

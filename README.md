# Next.js Server Actions Security Lab

A runnable recreation of the task-management security lab based on the files and implementation developed in the conversation.

## Requirements

- Node.js 20.9 or newer (Node.js 22 recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Try the ownership checks

1. Click **Sign in as user-1**.
2. Try editing or deleting the task owned by `user-2`. The server action should reject the request.
3. Sign in as `user-2` and try the task owned by `user-1`.
4. Sign out and try creating a task. The action should return an authentication error.
5. Sign in as the task owner and create, edit, or delete tasks.

## Main lab files

- `lib/schemas.ts` — Zod input schemas.
- `lib/dal.ts` — mock session verification, matching the reference solution supplied in the lab.
- `lib/db.ts` — in-memory task data store, including `getTaskById`.
- `lib/types.ts` — Server Action state type.
- `app/actions.ts` — create, update, and delete Server Actions with validation, authentication, and ownership checks.
- `app/components/TaskForm.tsx` — create form and accessible message banner.
- `app/components/SubmitButton.tsx` — pending submit state using `useFormStatus`.
- `app/components/TaskEditor.tsx` — update/delete UI.
- `app/dev-session-actions.ts` and `app/components/DemoSession.tsx` — local demo controls for switching mock users.

## Important security limitation

This is a learning project, not production authentication. The supplied lab DAL uses a module-level mock variable rather than a real session cookie or identity provider. The in-memory database resets when the server restarts and is not shared across server instances. The demo session controls are only for local practice. For production, use a real session mechanism, persist data in a database, and enforce ownership in the database mutation itself (for example, update/delete by both task ID and owner ID).

The lab's mock session variable is process-local. It is suitable for illustrating the exercise's control flow in a local single-process development environment, but it is not safe for multi-user production deployment.

// In-memory data keeps this lab focused on Server Action security.
export type Priority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  ownerId: string;
  status: TaskStatus;
  createdAt: string;
}

// Seed mixed ownership so IDOR checks are easy to reproduce.
const tasks: Task[] = [
  {
    id: "task-1",
    title: "Update dependencies",
    description: "Run npm audit and update all packages to their latest stable versions.",
    priority: "low",
    ownerId: "user-bob",
    status: "pending",
    createdAt: "2026-11-20T10:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Write API documentation",
    description: "Document all REST endpoints for the v2 API.",
    priority: "medium",
    ownerId: "user-alice",
    status: "pending",
    createdAt: "2026-11-20T09:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Design landing page mockup",
    description: "Create high-fidelity mockups for the new marketing landing page.",
    priority: "high",
    ownerId: "user-alice",
    status: "pending",
    createdAt: "2026-11-20T08:00:00.000Z",
  },
  {
    id: "task-4",
    title: "Fix navigation bug on mobile",
    description: "Hamburger menu does not close after selecting a link on iOS Safari.",
    priority: "high",
    ownerId: "user-bob",
    status: "completed",
    createdAt: "2026-11-20T07:00:00.000Z",
  },
];

let nextId = 5;

// Return a copy so callers cannot mutate the store directly.
export function getTasks(): Task[] {
  return [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function insertTask(input: Omit<Task, "id" | "createdAt" | "status">): Task {
  const task: Task = {
    ...input,
    id: `task-${nextId++}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(
  id: string,
  updates: Pick<Task, "title" | "description" | "priority">
): boolean {
  const task = getTaskById(id);
  if (!task) return false;
  Object.assign(task, updates);
  return true;
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

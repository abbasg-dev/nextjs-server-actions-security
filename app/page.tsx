import { TaskForm } from "@/app/components/TaskForm";
import { TaskEditor } from "@/app/components/TaskEditor";
import { DemoSession } from "@/app/components/DemoSession";
import { getTasks } from "@/lib/db";
import { _getMockCookie } from "@/lib/dal";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const token = _getMockCookie();
  const activeUser = token?.startsWith("token-") ? token.slice("token-".length) : null;
  const tasks = getTasks();

  return (
    <main className="container">
      <header className="page-header">
        <h1>TaskVault</h1>
        <p>Secure task management powered by React 19 Server Actions</p>
        <div className="security-status"><span className="status-icon">⚠</span> UNSECURED - Complete the lab to lock this down</div>
      </header>

      <DemoSession activeUser={activeUser} />
      <TaskForm />

      <section className="task-section">
        <div className="section-heading">
          <h2>Your Tasks</h2>
          <span className="task-count">{tasks.length} tasks</span>
        </div>
        <div className="task-list">
          {tasks.map((task) => <TaskEditor key={task.id} task={task} />)}
        </div>
      </section>
    </main>
  );
}

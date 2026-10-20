import { useCallback, useEffect, useRef, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const priorityLabels = ['low', 'medium', 'high'];

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const timer = useRef(null);
  const notify = message => {
    setToast(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 3200);
  };
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { setTasks(await getTasks()); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function addTask(event) {
    event.preventDefault();
    if (!title.trim() || busy) return;
    setBusy(true); setError('');
    const draftTitle = title.trim();
    const temporaryId = 'temp-' + Date.now();
    const temp = { _id: temporaryId, title: draftTitle, priority, completed: false };
    setTasks(old => [temp, ...old]); // Optimistic UI for supplementary problem.
    try {
      await createTask({ title: draftTitle, priority, completed: false });
      setTitle(''); notify('Task created successfully');
      await refresh();
    } catch (err) {
      setTasks(old => old.filter(t => t._id !== temporaryId));
      setError(err.message); notify('Task creation failed');
    } finally { setBusy(false); }
  }

  async function toggle(task) {
    if (busy) return;
    setBusy(true); setError('');
    try {
      await updateTask(task._id, { completed: !task.completed });
      notify('Task updated successfully'); await refresh();
    } catch (err) { setError(err.message); notify('Task update failed'); }
    finally { setBusy(false); }
  }

  async function edit(task) {
    const newTitle = window.prompt('Edit task title', task.title);
    if (newTitle === null) return;
    if (!newTitle.trim()) { notify('Title cannot be empty'); return; }
    setBusy(true); setError('');
    try {
      await updateTask(task._id, { title: newTitle.trim() });
      notify('Task updated successfully'); await refresh();
    } catch (err) { setError(err.message); notify('Task update failed'); }
    finally { setBusy(false); }
  }

  async function confirmDelete() {
    if (!toDelete || busy) return;
    setBusy(true); setError('');
    try {
      await deleteTask(toDelete._id);
      setToDelete(null); notify('Task deleted successfully'); await refresh();
    } catch (err) { setError(err.message); notify('Task deletion failed'); }
    finally { setBusy(false); }
  }

  const completed = tasks.filter(task => task.completed).length;
  return <section className="section" id="tasks">
    <p className="eyebrow">$ tasks --mongodb</p>
    <h2 className="section-title">My Tasks</h2>
    <div className="task-summary"><span>{tasks.length - completed} tasks remaining</span><span>{completed} completed</span></div>
    <form className="task-form" onSubmit={addTask}>
      <input aria-label="Task title" placeholder="Add a new task..." value={title} onChange={e => setTitle(e.target.value)} maxLength={150} required />
      <select aria-label="Priority" value={priority} onChange={e => setPriority(e.target.value)}>{priorityLabels.map(p => <option key={p} value={p}>{p}</option>)}</select>
      <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Add Task'}</button>
    </form>
    {loading ? <p className="task-info">Loading tasks from MongoDB...</p> : null}
    {error ? <div role="alert" className="task-error"><strong>Error loading tasks</strong><p>{error}</p><button type="button" className="btn btn-ghost" onClick={refresh}>Retry</button></div> : null}
    {!loading && !error && tasks.length === 0 ? <p className="task-info">No tasks yet. Add one above.</p> : null}
    <div className="task-list">{tasks.map(task => <article key={task._id} className={'task-card' + (task.completed ? ' task-done' : '')}>
      <label className="task-name"><input type="checkbox" checked={task.completed} disabled={busy || task._id.startsWith('temp-')} onChange={() => toggle(task)} /><span>{task.title}</span></label>
      <span className={'task-priority priority-' + task.priority}>{task.priority}</span>
      <div className="task-actions">
        <button type="button" disabled={busy} onClick={() => edit(task)}>Edit</button>
        <button type="button" disabled={busy} onClick={() => setToDelete(task)}>Delete</button>
      </div>
    </article>)}</div>
    {toDelete && <div className="confirm-overlay" role="presentation"><div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-label="Confirm deletion">
      <strong>Delete “{toDelete.title}”?</strong><p>This action cannot be undone.</p>
      <div><button type="button" className="btn btn-primary" disabled={busy} onClick={confirmDelete}>Yes, delete</button> <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => setToDelete(null)}>Cancel</button></div>
    </div></div>}
    {toast && <div role="status" className="task-toast">{toast}</div>}
  </section>;
}

import React, { useEffect, useMemo, useState } from 'react'
import * as api from './services/tasks.js'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import TaskFilter from './components/TaskFilter.jsx'
import './App.css'

export default function App() {
const [tasks, setTasks] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [query, setQuery] = useState('')
const [status, setStatus] = useState('all')
const [sort, setSort] = useState('new') 

async function refresh() {
  setLoading(true)
  try {
    const data = await api.list({ searching: query, status, sort })
    setTasks(data)
    setError('')
  } catch (e) {
    setError(e?.message || 'Failed to fetch')
  } finally {
    setLoading(false)
}
}
useEffect(() => {
  refresh()
}, [query, status, sort])


async function handleAdd({ title, description, priority }) {
  const new_task = await api.create({ title, description, priority })
  // Re-fetch to respect server-side sort
  await refresh();
  return new_task;
}
async function handleSearch(id) {
  await api.toggle(id);
  await refresh();
}
async function handleUpdate(id, patch) {
  await api.update(id, patch);
  await refresh();
}
async function handleDelete(id) {
  await api.remove(id);
  setTasks(prev => prev.filter(t => t.id !== id));
}
const counts = useMemo(() => ({
  total: tasks.length,
  done: tasks.filter(t => t.completed).length,
  todo: tasks.filter(t => !t.completed).length,
}), [tasks])


return (
  <div className="container">
    <header className="header">
      <h1>Task Manager</h1>
      <div className="counts">Total {counts.total} · Todo {counts.todo} · Done
      {counts.done}</div>
    </header>

    <TaskFilter query={query} setQuery={setQuery} status={status} setStatus={setStatus} />
    <TaskForm onAdd={handleAdd} />

    {loading && <div className="info">Loading…</div>}
    {error && <div className="error">{error}</div>}
    {!loading && !tasks.length && <div className="empty">No tasks yet. Add your first task! </div>}

    <TaskList tasks={tasks} onSearch={handleSearch} onUpdate={handleUpdate} onDelete={handleDelete} />
  </div>
)
}

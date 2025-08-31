import React, { useState } from 'react';
import '../styles/TaskForm.css';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');

    if (!title.trim()) return setErr('Title is required');
    if (!description.trim()) return setErr('Description is required');

    setLoading(true);
    try {
      await onAdd({ title: title.trim(), description: description.trim(), priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (e) {
      setErr('Failed to add');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="row">
        <input
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Task description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding…' : 'Add'}
        </button>
      </div>
      <div className="row">
        {err && <div className="error">{err}</div>}
      </div>
    </form>
  );
}

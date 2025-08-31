const BASE = 'http://localhost:4000'

// utility to build query strings
function qs(params) {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).length) usp.set(k, v)
    })
    return usp.toString()
}

// fetch tasks
export async function list({ searching = '', status = 'all'} = {}) {
    const url = `${BASE}/api/tasks?${qs({ searching, status})}`
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load tasks')
    return res.json();
}

// create a new task
export async function create(body) {
    const res = await fetch(`${BASE}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error('Failed to create task')
    return res.json();
}

// update an existing task
export async function update(id, body) {
    const res = await fetch(`${BASE}/api/tasks/${id}`, {    
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json();
}

// toggle a task's completion status
export async function toggle(id) {
    const res = await fetch(`${BASE}/api/tasks/${id}/toggle`, {
        method: 'PATCH'
    });
    if (!res.ok) throw new Error('Failed to toggle task');
    return res.json();
}

// delete a task
export async function remove(id) {
    const res = await fetch(`${BASE}/api/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('Failed to delete task');
}

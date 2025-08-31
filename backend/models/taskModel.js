import { randomUUID } from 'crypto'
let tasks = [];

// display the tasks via the quary in the URL
export function getTasks({ searching, status}){
    let result = [...tasks]
    if (searching) {
    const s = searching.toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(s) || (t.description || '').toLowerCase().includes(s))
    }
    if (status && status !== 'all') {
        let wanted =false
        if (status === 'completed'){
            wanted= true
        } else {
            wanted= false
        }
    result = result.filter(t => t.completed === wanted)
    }
    return result
}
// insert new task to the top of the list of tasks 
export function createTask({title, description, priority}){
    const date= new Date().toISOString();
    const new_task= {id:randomUUID(), title, description, completed:false, createdAt: date, priority}
    tasks.unshift(new_task);
    return new_task;
}

export function findById(id){
    return tasks.find(t => t.id === id);
}

export function updateTask(id, updateFields){
    const task= findById(id);
    if (!updateFields){
        return null;
    }
    if (!task || !updateFields) return null;
  if (updateFields.title !== undefined) task.title = updateFields.title;
  if (updateFields.description !== undefined) task.description = updateFields.description;
  if (updateFields.completed !== undefined) task.completed = !!updateFields.completed;
  if (updateFields.priority !== undefined) task.priority = updateFields.priority;
  return task;
}

export function toggleTask(id){
    const task= findById(id);
    if (!task){
        return null;
    }
    task.completed = !task.completed;
    return task;
}

export function removeTask(id){
    const task = tasks.findIndex(t => t.id === id);
    if (task === -1){
        return false;
    }
    tasks.splice(task,1);
    return true;
}
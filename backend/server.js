import express from 'express'

const app = express();
const PORT= 4000;


let tasks = [];

export function getTasks(){
    return tasks;
}
export function createTask({title, description, priority}){
    const date= new Date().toISOString();
    const new_task= {id:date, title, description, completed:false, createdAt: date, priority}
    tasks.push(new_task);
    return new_task;
}

export function findById(id){
    return tasks.find(t => t.id === id);
}

export function updateTask({id, updateFields}){
    const task= findById(id);
    if (!updateFields){
        return null;
    }
    task.title = updateFields.title;
    task.description = updateFields.description;
    task.completed = !!updateFields.completed;
    task.priority = updateFields. priority;
    return task;
}

export function removeTask({id}){
    const task = tasks.findIndex(t => t.id === id);
    if (task === -1){
        return false;
    }
    tasks.splice(task,1);
    return true;
}

app.listen(PORT, () => console.log("listening"));
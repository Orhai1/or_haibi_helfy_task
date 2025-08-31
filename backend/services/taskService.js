import { getTasks, createTask, updateTask, findById, toggleTask, removeTask } from "../models/taskModel.js";

export function list (params){
    return getTasks(params);
}

export function create ({title, description, priority}){
    if (!title){
        const err = new Error ("title is required");
        err.status = 400;
        throw err;
    }

    if (!description){
        const err = new Error ("description is required");
        err.status = 400;
        throw err;
    }

    if (!priority){
        const err = new Error ("priority is required");
        err.status = 400;
        throw err;
    }

    return createTask({title, description, priority })
}

export function edit (id, fields){
    if (!fields.title){
        const err = new Error ("title is required");
        err.status = 400;
        throw err;
    }

    if (!fields.description){
        const err = new Error ("description is required");
        err.status = 400;
        throw err;
    }

    const task= updateTask(id, fields)
    if (!task){
        const err = new Error("task not found");
        err.status=404;
        throw err;
    }
    return task;
}

export function toggle(id){
    const task = toggleTask(id);
    if (!task){
        const err= new Error ("task not found");
        err.status=404;
        throw err;
    }
    return task;
}

export function remove(id){
    const removed = removeTask(id);
    if (!removed){
        const err= new Error ("task not found");
        err.status=404;
        throw err;
    }
}
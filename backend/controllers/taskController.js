import {list, create, edit, toggle, remove} from '../services/taskService.js'


export function getList (req,res,next){
    try {
        res.json(list(req.query));
    } catch (err){
        next(err)
    }
}

export function createdTask (req, res, next){
    try{
        const task = create(req.body || {});
        res.status(201).json(task);
    } catch (err){
        next (err);
    }
}

export function updatedTask (req, res, next){
    try{
        const task = edit(req.params.id, req.body || {});
        res.json(task);
    } catch (err){
        next (err);
    }
}

export function toggledTask (req, res, next){
    try{
        const task = toggle(req.params.id);
        res.json(task);
    } catch (err){
        next (err);
    }
}

export function removedTask (req, res, next){
    try {
        remove(req.params.id);
        res.status(204).end();
    } catch (err){
        next (err);
    }
}
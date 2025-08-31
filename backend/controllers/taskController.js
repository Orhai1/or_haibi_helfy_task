import {list, create, edit, toggle, remove} from '../services/taskService.js'


export function getList (req,res,next){
    try {
        res.json(list());
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
        const task = edit(req.parems.id, req.body || {});
        res.json(task);
    } catch (err){
        next (err);
    }
}

export function toggledTask (req, res, next){
    try{
        const task = toggle(req.parems.id || {});
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
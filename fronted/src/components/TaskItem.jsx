import { useState } from "react";
import '../styles/TaskItem.css'

export default function TaskItem ({task, onSearch, onUpdate, onDelete}){
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState (task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority]= useState(task.priority || 'medium');

    async function save() {
        await onUpdate(task.id, { title, description, done: task.done })
        setEditing(false)
    }
    
    return (
        <li className = {"task" + (task.completed ? ' completed' : '')}>
            <input type="checkbox" checked={task.completed} onChange={() => onSearch(task.id)} />

            {editing ? (
                <>
                    <input className="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />

                    <input className="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} />   

                    <input className="text" 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)} />    

                    <button onClick={save}>Save </button>    

                    <button onClick={()=> {
                        setEditing(false);
                        setTitle(task.title);
                        setDescription(task.description);
                        setPriority(task.priority)}} >
                            Cancel
                        </button>
                    </>
            ): (
                <>
                <div className="content">
                    <div className="title">
                        {task.title}
                    </div>
                    {task.description && (
                        <div className="description">
                            {task.description}
                        </div>
                    )}

                    <div className="date">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </div>

                    <div className="priority">
                        {task.priority}
                    </div>
                </div>
                <button onClick={() => setEditing(true)}>
                    Edit
                </button>

                <button className="delete" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
                </>
            )}   
        </li>
    )
}
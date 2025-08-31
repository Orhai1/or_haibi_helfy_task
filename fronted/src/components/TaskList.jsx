import React from 'react'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

export default function TaskList({tasks, onSearch, onUpdate, onDelete}){
    return (
        <ul className='list'>
            {tasks.map(t => (
                <TaskItem key = {t.id} task={t} onSearch={onSearch} onUpdate={onUpdate}
                onDelete={onDelete} />
            ))}
        </ul>
    )
}
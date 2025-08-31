import React from 'react'
import '../styles/TaskFilter.css'


export default function Filter({ query, setQuery, status, setStatus}) {

    return (
        <div className="card">
            <div className="wrapper">
                <input placeholder="Search…" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} />

            <select 
                value={status} 
                onChange={e => setStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            </div>
        </div>
    )
}

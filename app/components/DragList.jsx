"use client"

import React from 'react'
import { updateTaskStatusInDB } from '../actions/tasks'


function KanbanTaskCard({ task, onDelete, onEdit }) {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", String(task.task_id))
    e.currentTarget.style.opacity = "0.4"
  }

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1"
  }

  const priorityStyles = {
    High: 'bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 ring-red-500',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50 ring-amber-500',
    Low: 'bg-green-50 text-green-700 border-green-200/60 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900/50 ring-green-500'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white dark:bg-[#22272b] border border-slate-200/80 dark:border-[#2c333a] hover:border-indigo-400 dark:hover:border-indigo-500 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group relative flex flex-col gap-3.5 select-none"
    >

      <div className="flex justify-between items-start gap-2 pr-14">
        <div className="flex flex-wrap gap-1.5">
          {task.label && (
            <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border tracking-wide uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50">
              Label: {task.label}
            </span>
          )}
          {task.tag && (
            <span className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border tracking-wide uppercase ${task.tag === 'BILLING'
              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50'
              : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/50'
              }`}>
              {task.tag}
            </span>
          )}
        </div>


        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit && onEdit(task)}
            className="text-slate-500 dark:text-[#9fadbc] hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-[#2c333a] p-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer"
            title="Edit Task"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(task.task_id)}
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 p-1.5 rounded-md text-sm transition-colors cursor-pointer"
            title="Delete Task"
          >
            ✕
          </button>
        </div>
      </div>


      <div className="flex flex-row items-baseline gap-1.5 w-full select-none">
        <span className="text-[14px] font-bold text-slate-400 dark:text-[#9fadbc]/60 uppercase tracking-wide shrink-0">
          Title:
        </span>
        <h3 className="text-slate-800 dark:text-[#c7d1db] text-base font-bold leading-snug line-clamp-2 break-words flex-1">
          {task.title}
        </h3>
      </div>


      {task.description && (
        <div className="flex flex-row items-baseline gap-1.5 w-full mt-1.5 select-none">
          <span className="text-[14px] font-bold text-slate-400 dark:text-[#9fadbc]/60 uppercase tracking-wide shrink-0">
            Desc:
          </span>
          <p className="text-slate-500 dark:text-[#c7d1db] text-md leading-relaxed line-clamp-2 break-words flex-1">
            {task.description}
          </p>
        </div>
      )}


      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-[#2c333a] mt-1 text-xs">
        <div className="flex justify-between items-center flex-wrap gap-2">
          {task.assignee && (
            <div className="bg-slate-100 dark:bg-[#1d2125] border border-slate-200/60 dark:border-[#30363d] px-2.5 py-1 rounded-lg text-xs text-slate-700 dark:text-[#c7d1db] font-bold flex items-center gap-1 shadow-sm">
              <span className="text-slate-400 dark:text-[#9fadbc] font-bold mr-0.5">Assignee:</span>
              <span className="text-sm">👤</span>
              <span className="dark:text-white">{task.assignee}</span>
            </div>
          )}

          {task.priority && (
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-bold ${priorityStyles[task.priority] || 'bg-slate-50 dark:bg-[#1d2125] text-slate-600'}`}>
              <span className="text-slate-400 dark:text-[#9fadbc]/80 font-bold mr-0.5">Priority:</span>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span className="dark:text-white">{task.priority}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}


function KanbanColumn({ col, tasks, onDelete, onDropTask, onEditTask }) {
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    if (taskId) {
      onDropTask(taskId, col.id)
    }
  }

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}

        className="w-[85vw] sm:w-80 min-w-[85vw] sm:min-w-[21rem] bg-slate-50/90 dark:bg-[#1d2125] backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-4 h-full max-h-full border border-slate-200 dark:border-[#22272b] shrink-0 shadow-sm"
      >

        <div className="flex items-center justify-between px-1.5 py-1 select-none border-b border-slate-200/60 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${col.id === 'TODO' ? 'bg-amber-500' : col.id === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-emerald-500'
              }`}></span>
            <span className="text-sm font-bold dark:text-white text-slate-700 tracking-wide uppercase">
              {col.title}
            </span>
          </div>
          <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-inner min-w-[24px] text-center">
            {tasks.length}
          </span>
        </div>


        <div className="space-y-3 overflow-y-auto flex-1 pr-1 pb-2 scrollbar-thin">
          {tasks.map((task) => (
            <KanbanTaskCard
              key={task.task_id}
              task={task}
              onDelete={onDelete}
              onEdit={onEditTask}
            />
          ))}


          {tasks.length === 0 && (
            <div className="text-center dark:text-white   py-12 text-xs font-medium text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 select-none">
              No active assignments here.
            </div>
          )}
        </div>
      </div>
    </>
  )
}


export function DragList({ tasks, setTasks, onEditTask, onDeleteTask }) {
  const initialColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  async function handleDelete(id) {
    if (onDeleteTask) {
      onDeleteTask(id);
    }
  }

  async function handleDropTask(taskId, targetColId) {
    setTasks(prevTasks =>
      prevTasks.map(task => String(task.task_id) === String(taskId) ? { ...task, status: targetColId } : task
      )
    )

    const response = await updateTaskStatusInDB(taskId, targetColId)
    if (!response.success) { alert("Databases not change") }
  }

  function handleEditClick(task) {
    if (onEditTask) {
      onEditTask(task)
    }
  }

  return (
    <div className="w-full h-full flex flex-row gap-5 overflow-x-auto overflow-y-hidden pb-4 pt-1 items-start touch-pan-x scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#2c333a] scroll-smooth">
      {initialColumns.map((col) => {
        const matchingColumnTasks = tasks.filter(t => t.status === col.id)
        return (
          <KanbanColumn
            key={col.id}
            col={col}
            tasks={matchingColumnTasks}
            onDelete={handleDelete}
            onDropTask={handleDropTask}
            onEditTask={handleEditClick}
          />
        )
      })}
    </div>
  )
}

"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TaskFormDialog({ isOpen, onClose, onSubmit, taskData = null }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  useEffect(() => {
    if (isOpen) {
      if (taskData) {

        let cleanedDate = "";

        if (taskData.due_date) {
          const dateStr = Array.isArray(taskData.due_date)
            ? String(taskData.due_date[0])
            : String(taskData.due_date);

          if (dateStr.includes('T')) {

            cleanedDate = dateStr.split('T')[0];
          } else if (dateStr.includes(' ')) {

            cleanedDate = dateStr.split(' ')[0];
          } else {

            const parts = dateStr.split('-');
            if (parts[0].length === 4) {
              cleanedDate = dateStr;
            } else if (parts[2]?.length === 4) {
              cleanedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }
        }

        reset({
          task_id: taskData.task_id,
          title: taskData.title || "",
          description: taskData.description || "",
          assignee: taskData.assignee || "",
          label: taskData.label || "",
          status: taskData.status || "todo",
          priority: taskData.priority || "medium",
          due_date: cleanedDate,
        });
      } else {
        reset({ task_id: "", title: "", description: "", assignee: "", label: "", status: "todo", priority: "medium", due_date: "" });
      }
    }
  }, [taskData, isOpen, reset]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4 transition-all duration-200">


      <div className="bg-white dark:bg-[#1d2125] rounded-xl shadow-2xl w-full max-w-lg p-6 border border-slate-100 dark:border-[#2c333a] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 transition-colors">


        <h2 className="text-xl font-bold text-slate-900 dark:text-[#c7d1db] border-b border-slate-100 dark:border-[#2c333a] pb-3 flex items-center justify-between">
          <span>{taskData ? "✏️ Edit Task Details" : "📋 Create New Task"}</span>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg cursor-pointer transition-colors">✕</button>
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (err) => console.log("🔴 Form Validation Errors:", err)
        )} >
          <input type="hidden" {...register("task_id")} />


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Title</label>
            <input
              type="text"
              placeholder="Enter task title..."
              name="title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
            />
            {errors.title && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5 font-medium">{errors.title.message}</p>}
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Description</label>
            <textarea
              placeholder="Write task description here..."
              name="description"
              {...register("description", { required: "This is required" })}
              className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none h-24 resize-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
            />
            {errors.description && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5 font-medium">{errors.description.message}</p>}
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Assignee 👤</label>
              <input
                type="text"
                name="assignee"
                placeholder="Assignee Name"
                {...register("assignee", { required: "This is required" })}
                className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
              />
              {errors.assignee && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5 font-medium">{errors.assignee.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Label 🏷️</label>
              <input
                type="text"
                name="label"
                placeholder="BUG, FEATURE..."
                {...register("label", { required: "This is required" })}
                className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
              />
              {errors.label && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5 font-medium">{errors.label.message}</p>}
            </div>
          </div>


          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Status</label>
              <select
                name="status"
                {...register("status")}
                className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm bg-white dark:bg-[#22272b] text-slate-800 dark:text-white outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
              >
                <option value="todo" className="dark:bg-[#1d2125]">Todo</option>
                <option value="in_progress" className="dark:bg-[#1d2125]">In Progress</option>
                <option value="done" className="dark:bg-[#1d2125]">Done</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Priority</label>
              <select
                name="priority"
                {...register("priority")}
                className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm bg-white dark:bg-[#22272b] text-slate-800 dark:text-white outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all"
              >
                <option value="low" className="dark:bg-[#1d2125]">Low</option>
                <option value="medium" className="dark:bg-[#1d2125]">Medium</option>
                <option value="high" className="dark:bg-[#1d2125]">High</option>
              </select>
            </div>
          </div>


          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-[#9fadbc] uppercase tracking-wide">Due Date</label>
            <input
              type="date"
              name="due_date"
              {...register("due_date")}
              className="w-full px-4 py-2 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm bg-white dark:bg-[#22272b] text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-blue-500 transition-all color-scheme-dark"
              style={{
                colorScheme: 'light dark',
              }}
            />
          </div>


          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#2c333a] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-[#2c333a] hover:bg-slate-200 dark:hover:bg-[#343c44] font-bold rounded-lg text-xs text-slate-600 dark:text-[#9fadbc] cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 font-bold text-white rounded-lg text-xs shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer transition-colors"
            >
              {taskData ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

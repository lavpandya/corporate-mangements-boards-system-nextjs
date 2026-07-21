"use client";

import { useState, useEffect, useMemo } from 'react';
import { DragList } from "../components/DragList";
import TaskFormDialog from '../components/TaskFormDialog';
import { toast } from "react-hot-toast";
import { getTasksFromDB, deleteTaskFromDB, createTaskInDB, updateTaskStatusInDB, updateTaskDetailsInDB } from "../actions/tasks";


export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");


  useEffect(() => {
    async function loadTasks() {
      const data = await getTasksFromDB();
      setTasks(data);
      setLoading(false);
    }
    loadTasks();
  }, []);

  const handleOpenAddModal = () => { setSelectedTask(null); setIsModalOpen(true); };
  const handleOpenEditModal = (task) => { setSelectedTask(task); setIsModalOpen(true); };

  const handleDeleteTask = async (id) => {
    if (confirm("Are you sure Delete file")) {
      setTasks((prev) => prev.filter((t) => String(t.task_id) !== String(id)));
      const response = await deleteTaskFromDB(id);
      if (response.success) toast.success("Task deleted successfully! 🗑️");
      else toast.error("Not Delete Database");
    }
  };

  const handleFormSubmit = async (data) => {
    if (data.task_id) {
      // const response = await updateTaskStatusInDB(data); 
      const response = await updateTaskDetailsInDB(data);
      if (response.success) {
        setTasks((prev) => prev.map((t) => (t.task_id === data.task_id ? data : t)));
        toast.success("Task updated successfully!");
        setIsModalOpen(false);
      } else toast.error("Update Failed");
    } else {
      const response = await createTaskInDB(data);
      if (response.success) {
        // const newTask = { ...data, task_id: String(response.task_id) };
        // setTasks((prev) => [...prev, newTask]);
        const updatedData = await getTasksFromDB();
        setTasks(updatedData);
        toast.success("Task created successfully!");
        setIsModalOpen(false);
      } else toast.error("New Task Create Problem");
    }
  };


  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];


    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter((task) => {

        const matchTitle = task.title?.toLowerCase() || "";
        const matchDesc = task.description?.toLowerCase() || "";
        const matchAssignee = task.assignee?.toLowerCase() || "";
        const matchLabel = task.label?.toLowerCase() || "";

        return (
          matchTitle.includes(query) ||
          matchDesc.includes(query) ||
          matchAssignee.includes(query) ||
          matchLabel.includes(query)
        );
      });
    }


    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority?.toLowerCase() === priorityFilter.toLowerCase());
    }

    if (assigneeFilter !== "all") {
      result = result.filter((task) => task.assignee?.toLowerCase() === assigneeFilter.toLowerCase());
    }


    if (labelFilter !== "all") {
      result = result.filter((task) => task.label?.toLowerCase() === labelFilter.toLowerCase());
    }



    return result;
  }, [tasks, searchQuery, priorityFilter, assigneeFilter, labelFilter]);


  const dynamicAssignees = useMemo(() => {

    const names = tasks.map((t) => t.assignee).filter(Boolean);
    return [...new Set(names)];
  }, [tasks]);

  const dynamicLabels = useMemo(() => {
    const labels = tasks.map((t) => t.label).filter(Boolean);
    return [...new Set(labels)];
  }, [tasks]);



  if (loading) return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">⏳ Loading Board...</div>;

  return (
    <div className="bg-slate-50/50 dark:bg-[#1c1e21] h-[calc(100vh-3.5rem)] w-full overflow-hidden transition-colors duration-200">


      <div className="p-4 lg:p-6 max-w-7xl mx-auto h-full flex flex-col gap-4">

        <div className="mb-2 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">📋</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Board Management
            </h1>
          </div>

        </div>


        <div className="bg-white dark:bg-[#1d2125] p-4 rounded-xl border border-slate-200 dark:border-[#22272b] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors shrink-0">

          <div className="flex flex-wrap items-center gap-3 flex-1 max-w-xlg">

            <input
              type="text"
              placeholder="🔍 Search by title, desc, assignee or label..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 bg-white dark:bg-[#22272b] text-slate-800 dark:text-[#c7d1db] placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-[#c7d1db] cursor-pointer transition-colors"
            >
              <option value="all" className="dark:bg-[#22272b]">🎯 All Priorities</option>
              <option value="high" className="dark:bg-[#22272b]">🔴 High Only</option>
              <option value="medium" className="dark:bg-[#22272b]">🟡 Medium Only</option>
              <option value="low" className="dark:bg-[#22272b]">🟢 Low Only</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-[#c7d1db] cursor-pointer"
            >
              <option value="all">👤 All Assignees</option>
              {dynamicAssignees.map((name) => (
                <option key={name} value={name.toLowerCase()} className="dark:bg-[#1d2125]">
                  {name}
                </option>
              ))}
            </select>


            <select
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-[#30363d] rounded-lg text-sm outline-none bg-white dark:bg-[#22272b] text-slate-800 dark:text-[#c7d1db] cursor-pointer"
            >
              <option value="all">🏷️ All Labels</option>

              {dynamicLabels.map((label) => (
                <option key={label} value={label.toLowerCase()} className="dark:bg-[#1d2125]">
                  {label}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-1.5 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md transition-colors cursor-pointer shrink-0"
          >
            + Add New Task
          </button>
        </div>

        <div className="flex-1 min-h-0 w-full">
          <DragList
            tasks={filteredAndSortedTasks}
            setTasks={setTasks}
            onEditTask={handleOpenEditModal}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      <TaskFormDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} taskData={selectedTask} />
    </div>
  );
}

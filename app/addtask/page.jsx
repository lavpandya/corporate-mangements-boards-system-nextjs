
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddtaskPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });



    if (res.ok) {
      // alert("Task created successfully!");
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      // alert("Failed to create task");
      toast.error("Something went wrong!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-slate-50/50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">
          Create New Task
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <input
            type="text"
            placeholder="Task Title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            placeholder="Task Description"
            {...register("description")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* Status */}
          <select
            {...register("status")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          {/* Priority */}
          <select
            {...register("priority")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            {...register("due_date")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* Hidden fields */}
          <input type="hidden" {...register("board_id")} value="1" />
          <input type="hidden" {...register("column_id")} value="1" />
          <input type="hidden" {...register("created_by")} value="123" />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Task
          </button>
        </form>
      </div>
    </main>
  );
}

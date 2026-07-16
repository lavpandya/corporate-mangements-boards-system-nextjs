import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title, description, assignee, label, status, priority, due_date,
      board_id, column_id, created_by
    } = body;

 
    const validStatus = ["todo", "in_progress", "done"];
    const userStatus = validStatus.includes(status?.toLowerCase()) ? status.toLowerCase() : "todo";


    const query = `
      INSERT INTO tbl_tasks 
      (board_id, column_id, title, description, assignee, label, status, priority, created_by, created_at, due_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    const [result] = await pool.query(query, [
      board_id || 1,       
      column_id || 1,      
      title,
      description || null,
      assignee || null,
      label,
      userStatus,
      priority || "medium",
      created_by || "123", 
      due_date || null
    ]);

    return NextResponse.json({
      message: "AddTask successful",
      task_id: result.insertId, 
    });
  } catch (error) {
    console.error("AddTask error:", error);
    return NextResponse.json({ error: "AddTask failed" }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const body = await req.json();
    const { task_id, title, description, assignee, label, status, priority, due_date } = body;

    if (!task_id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

  
    const query = `
      UPDATE tbl_tasks 
      SET title = ?, description = ?, assignee = ?, label = ?, status = ?, priority = ?, due_date = ? 
      WHERE task_id = ?
    `;

    await pool.query(query, [
      title,
      description || null,
      assignee || null,
      label || null,
      status,
      priority,
      due_date || null,
      task_id
    ]);

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("UpdateTask error:", error);
    return NextResponse.json({ error: "UpdateTask failed" }, { status: 500 });
  }
}




export async function DELETE(req) {
  try {
  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

 
    const query = "DELETE FROM tbl_tasks WHERE task_id = ?";
    await pool.query(query, [id]);

 

    return NextResponse.json({ message: "Task deleted successfully from MySQL" });
  } catch (error) {
    console.error("🔴 MySQL Delete Error Details:", error);
    return NextResponse.json({ error: "DeleteTask failed", details: error.message }, { status: 500 });
  }
}

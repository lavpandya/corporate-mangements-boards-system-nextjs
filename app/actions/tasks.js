"use server"
import pool from "@/lib/db";


export async function getTasksFromDB() {
  try {

    const [rows] = await pool.query('SELECT * FROM tbl_tasks')

    return rows.map(task => ({
      ...task,
      task_id: String(task.task_id),
      due_date: task.due_date ? new Date(task.due_date).toISOString().split('T') : null,

      created_time: task.created_at ? new Date(task.created_at).toISOString() : null
    }));

  } catch (error) {

    return []
  }


}


export async function updateTaskStatusInDB(task_id, targetColId) {
  try {
    const query = 'UPDATE tbl_tasks SET status = ? WHERE task_id = ?'
    await pool.query(query, [targetColId, task_id])

    return { success: true }
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message }
  }
}


export async function deleteTaskFromDB(task_id) {
  try {

    const query = 'DELETE FROM tbl_tasks WHERE task_id = ?'
    await pool.query(query, [task_id])

    return { success: true }
  } catch (error) {
    console.error("MySQL Delete Error:", error)
    return { success: false, error: error.message }
  }
}



// export async function createTaskInDB(data) {
//   try {
//     const { title, description, assignee, label, status, priority, due_date } = data;
//     const query = `INSERT INTO tbl_tasks (title, description, assignee, label, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     const [result] = await pool.query(query, [title, description, assignee, label, status, priority, due_date]);
//     return { success: true, task_id: result.insertId };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: error.message };
//   }
// }

export async function createTaskInDB(data) {
  try {
    const { title, description, assignee, label, status, priority, due_date } = data;
    const finalDate = due_date === "" ? null : due_date;

    const query = `INSERT INTO tbl_tasks (title, description, assignee, label, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

   
    const [result] = await pool.query(query, [title, description, assignee, label, status, priority, finalDate]);

    return { success: true, task_id: result.insertId };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}


export async function updateTaskDetailsInDB(data) {
  try {
    const { task_id, title, description, assignee, label, status, priority, due_date } = data;

    let finalDueDate = due_date;
    if (Array.isArray(due_date)) {
      finalDueDate = due_date[0];
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
      finalDueDate || null,
      task_id
    ]);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

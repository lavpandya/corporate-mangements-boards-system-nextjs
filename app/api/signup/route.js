import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate role (must be 'admin' or 'member')
    const validRoles = ["admin", "member"];
    const userRole = validRoles.includes(role) ? role : "member";

    // Insert query (match schema)
    const [result] = await pool.query(
      "INSERT INTO tbl_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole]
    );

    return NextResponse.json({
      message: "Signup successful",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}

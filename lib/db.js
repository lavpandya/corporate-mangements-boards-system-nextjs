// 'use server'
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",        // apna MySQL host
  user: "root",             // apna MySQL user
  password: "",             // apna MySQL password
  database: "board_management",  // apna database name

});

export default db;
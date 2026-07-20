
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: 'mysql-bc438a8-luvpandya2-ea8d.d.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_Rm_pyJiABmWmIZu34u6',
  database: 'defaultdb',
  port: 14263,
  ssl: {
    rejectUnauthorized: false
  }
});

export default db;



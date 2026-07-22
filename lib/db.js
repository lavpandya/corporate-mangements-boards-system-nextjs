import mysql from "mysql2/promise";

// Next.js री-लोड के दौरान पुराने कनेक्शन को याद रखने के लिए ग्लोबल वेरिएबल का इस्तेमाल
let db;

if (process.env.NODE_ENV === "production") {
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: { rejectUnauthorized: false }
  });
} else {
  // लोकल डेवलपमेंट के लिए ग्लोबल स्टेट का उपयोग ताकि बार-बार नए पूल न बनें
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: { rejectUnauthorized: false }
    });
  }
  db = global._mysqlPool;
}

export default db;

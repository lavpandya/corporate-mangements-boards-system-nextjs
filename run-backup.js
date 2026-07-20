// const mysql = require('mysql2/promise');
// const fs = require('fs');
// const path = require('path');

// async function uploadBackup() {
//   try {
//     console.log("🔄 Reading db_backup.sql file...");
//     const sqlFilePath = path.join(__dirname, 'db_backup.sql');
//     const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

//     console.log("🔌 Connecting to Aiven Cloud Database...");
//     const db = await mysql.createPool({
//       host: 'mysql-bc438a8-luvpandya2-ea8d.d.aivencloud.com',
//       user: 'avnadmin', 
//       password: 'AVNS_Rm_pyJiABmWmIZu34u6', 
//       database: 'defaultdb',
//       port: 14263, 
//       ssl: {
//         rejectUnauthorized: false
//       },
//       multipleStatements: true
//     });

//     console.log("🚀 Executing SQL Script on live server...");
   
//     await db.query("SET SESSION sql_require_primary_key = 0;");
    
 
//     await db.query(sqlScript);
    

//     await db.query("SET SESSION sql_require_primary_key = 1;");
    
//     console.log("🎉 SUCCESS! Your database structure and tables are now live in defaultdb.");
//     await db.end();
//   } catch (error) {
//     console.error("❌ Error running backup script:", error);
//   }
// }

// uploadBackup();

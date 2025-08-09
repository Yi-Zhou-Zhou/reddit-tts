import mysql from 'mysql2/promise';
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_PASS)
    throw new Error("Missing DB HOST, NAME OR USER");
export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});
//# sourceMappingURL=database.js.map
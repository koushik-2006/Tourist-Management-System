const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    try {
        console.log('Connecting to MySQL to initialize database...');
        // Connect without database selected first
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        // Read the SQL file
        const sqlFilePath = path.join(__dirname, 'database.sql');
        const sqlFile = fs.readFileSync(sqlFilePath, 'utf8');

        // Split into statements
        const statements = sqlFile.split(';').filter(stmt => stmt.trim() !== '');

        for (let stmt of statements) {
            if (stmt.trim()) {
                await connection.query(stmt);
            }
        }

        console.log('Database initialized successfully!');
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database. Ensure MySQL is running on your machine.', error.message);
        process.exit(1);
    }
}

initDB();

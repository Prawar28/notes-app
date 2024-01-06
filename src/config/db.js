import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "your-username>",
    password: "your-password>",
    host: "localhost",
    database: "notes_app",
    port: 5434,
    max: 5
})

export default pool
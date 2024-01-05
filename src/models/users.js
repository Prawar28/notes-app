import pool from '../config/db.js'

export const usernameExists = async (username) => {
    const data = await pool.query("SELECT * FROM users WHERE username=$1", [
        username,
    ]);

    if (data.rowCount == 0) return false; 
    return data.rows[0];
};

// export const verifyPassword = async (password) => {
//     // implement from bcrypt util
// }

export const createUser = async (username, password) => {
  
    // TO:DO error handling here
    const data = await pool.query(
      "INSERT INTO users(username, hashed_password) VALUES ($1, $2) RETURNING id, username, hashed_password",
      [username, password]
    );
   
    if (data.rowCount == 0) return false;
    return data.rows[0];
  };
  
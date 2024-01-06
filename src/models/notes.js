import pool from "../config/db.js";

export const getNotesForUserId = async (userId) => {
    const data = await pool.query("SELECT id as note_id, content as note FROM notes WHERE user_id = $1", [
        userId
    ]);

    return data.rows;
}

export const searchInNotes = async (userId, query) => {
    const searchQuery = `SELECT id as note_id, content as note FROM notes WHERE user_id = $1 and content_vector @@ to_tsquery('english', '${query}')`;
    const data = await pool.query(searchQuery, [userId]);

    return data.rows;
}

export const createUserNote = async (userId, content) => {
    const data = await pool.query("INSERT INTO notes(user_id, content) VALUES ($1, $2) RETURNING id, content, user_id", [
        userId, content
    ]);

    if (data.rowCount == 0) return false; 
    return data.rows[0];
}

export const getNotesById = async (noteIds) => {

    const data = await pool.query("SELECT id as note_id, content as note FROM notes WHERE id = ANY($1)", [
        noteIds
    ]);

    if (data.rowCount == 0) return []; 
    return data.rows;
}

export const updateNote = async (noteId, content) => {
    try {
        const data = await pool.query("UPDATE notes SET content = $1 WHERE id = $2 RETURNING id, content, user_id", [
            content, noteId
        ]);

        if (data.rowCount == 0) return false; 
        return data.rows[0];
    } catch {
        return false;
    }
}

// TO:DO to raise appropriate error message if note is not found or does not belong to user
export const deleteNote = async (noteId, userId) => {
    const data = await pool.query("DELETE FROM notes WHERE id = $1 and user_id = $2 RETURNING true", [
        noteId, userId
    ]);

    if (data) return true;
    return false;
}

export const searchInNotesByNoteId = async (noteIds, query) => {

    const searchQuery = `SELECT id as note_id, content as note FROM notes WHERE id = ANY($1) and content_vector @@ to_tsquery('english', '${query}')`;
    const data = await pool.query(searchQuery, [noteIds]);

    return data.rows;
}
import pool from "../config/db.js";
import { getNotesById, searchInNotes, searchInNotesByNoteId } from "./notes.js";

export const getSharedNotesForUser = async (userId) => {
    const noteIds = await pool.query("SELECT note_id FROM shared_notes where user_id = $1", [
        userId
    ]);

    if (noteIds.rowCount == 0) return [];
    const data = await getNotesById(noteIds.rows.map((note) => note.note_id))

    return data;
}

export const searchInSharedNotesForUser = async (userId, query) => {

    const noteIds = await pool.query("SELECT note_id FROM shared_notes where user_id = $1", [
        userId
    ]);

    if (noteIds.rowCount == 0) return [];
    const data = await searchInNotesByNoteId(noteIds.rows.map((note) => note.note_id), query)

    return data;
}

export const shareNote = async (noteId, userId) => {
    const data = await pool.query("INSERT INTO shared_notes(user_id, note_id) VALUES ($1, $2) RETURNING user_id, note_id", [
        userId, noteId
    ]);
    if (data.rowCount == 0) return false; 
    return data.rows[0];
}

import { createUserNote, deleteNote, getNotesById, getNotesForUserId, searchInNotes, updateNote } from "../models/notes.js";
import { getSharedNotesForUser, searchInSharedNotesForUser, shareNote } from "../models/sharedNotes.js";

export const getNotes = async (req, res) => {
    var user = req.user.rows[0];
   
    try {
        const userNotes = await getNotesForUserId(user.id);
        const sharedNotes = await getSharedNotesForUser(user.id);

        res.status(200).json({'user_notes': userNotes, 'shared_notes': sharedNotes});
    } catch {
        res.status(400).json({error: 'error in fetching notes'})
    }
}

export const createNote = async (req, res) => {
    var user = req.user.rows[0];
    var content = req.body.content;

    if (!content) {
        res.status(400).json({error: 'please add content'});
    }

    const data = await createUserNote(user.id, content);

    if (data) {
        res.status(200).json({data: 'note created succesfully'})
    } else {
        res.status(400).json({error: 'error in creating note'})
    }
}

export const getNoteById = async (req, res) => {
    try {
        var noteId = Number(req.params.id);
    } catch {
        res.status(400).json({error: 'invalid note id'});
    }

    const data = await getNotesById([noteId]);

    if (data) {
        res.status(200).json(data[0]);
    } else {
        res.status(400).json({error: 'error in fetching notes'})
    }
}

export const updateNoteByID = async (req, res) => {
    try {
        var noteId = Number(req.params.id);
    } catch {
        res.status(400).json({error: 'invalid note id'});
    }

    var content = req.body.content;

    if (!content) {
        res.status(400).json({error: 'please add content to be updated'});
    }

    const data = await updateNote(noteId, content);

    if (data) {
        res.status(200).json({data: 'note updated succesfully'})
    } else {
        res.status(400).json({error: 'error in updating note'})
    }
}

export const deleteNoteByID = async (req, res) => {
    try {
        var noteId = Number(req.params.id);
        var user = req.user.rows[0];
    } catch {
        res.status(400).json({error: 'invalid note id'});
    }

    const data = await deleteNote(noteId, user.id);

    if (data) {
        res.status(200).json({data: 'note deleted succesfully'})
    } else {
        res.status(400).json({error: 'error in deleting note'})
    }
}

export const shareNoteWithUser = async (req, res) => {
    try {
        var noteId = Number(req.params.id);
        var userId = Number(req.body.user_id)
    } catch {
        res.status(400).json({error: 'invalid noteId or userId'});
    }

    try {
        var data = await shareNote(noteId, userId);
        console.log(data);
        if (data) {
            res.status(200).json({data: 'note shared succesfully'})
        } else {
            res.status(400).json({error: 'error in sharing note'})
        }
    } catch (error) {
        res.status(400).json({error: 'error in sharing note'})
    }
}

export const searchNotes = async (req, res) => {
    var user = req.user.rows[0];
    var query = req.query.q

    try {
        const userNotes = await searchInNotes(user.id, query);
        const sharedNotes = await searchInSharedNotesForUser(user.id, query);

        res.status(200).json({'user_notes': userNotes, 'shared_notes': sharedNotes});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'error in fetching notes'})
    }

}
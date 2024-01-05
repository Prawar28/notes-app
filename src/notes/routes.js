import express from "express";
import { createNote, deleteNoteByID, getNoteById, getNotes, shareNoteWithUser, updateNoteByID } from './controller.js'

const { Router } = express;

const notesRouter = Router();

notesRouter.get("/", getNotes);

notesRouter.post("/", createNote);

notesRouter.get("/:id", getNoteById);

notesRouter.put("/:id", updateNoteByID);

notesRouter.delete("/:id", deleteNoteByID);

notesRouter.post("/:id/share", shareNoteWithUser)

export default notesRouter;
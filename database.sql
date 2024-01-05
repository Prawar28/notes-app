-- create database
create database notes_app;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL
    hashed_password VARCHAR(255)
);

-- Create notes table with text indexing
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content TEXT,
    content_vector tsvector,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create shared_notes table
CREATE TABLE shared_notes (
    user_id INTEGER REFERENCES users(id),
    note_id INTEGER REFERENCES notes(id),
    PRIMARY KEY (user_id, note_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);

-- Create index for text search on the notes table
CREATE INDEX idx_notes_content_vector ON notes USING gin(content_vector);

-- Trigger to update the content_vector when the content is updated
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
    ON notes FOR EACH ROW EXECUTE PROCEDURE
    tsvector_update_trigger(content_vector, 'pg_catalog.english', content);

-- tables
-- user (id, username (varchar and unique))
-- notes (user_id (foreign_key to users table), content,)
-- notes and user table has one-to-many mapping
-- shared_notes (user_id (foreign_key), note_id (foreign_key))
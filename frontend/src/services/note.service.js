import { db } from "../localDb";
import axios from '../axios';

export const switchStorage = (storage, notes) => {
    if (notes.length) {
        if (storage === 'local') {
            return Promise.all(notes.map(async (note) => {
                await deleteNotefromRemoteDB(note._id);
                delete note._id;
                const response = await addNotetoLocalDB(JSON.stringify(note));
                return response;
            }));
        } else if (storage === 'remote') {
            return Promise.all(notes.map(async (note) => {
                await deleteNoteFromLocalDB(note._id);
                delete note._id;
                const response = await addNoteToRemoteDB(JSON.stringify(note));
                return response.data;
            }));
        }
    };
    return;
}

// Indexed DB
export const getNotesFromLocalDB = async () => {
    const notes = await db.notes.toArray();
    return notes;
}

export const addNotetoLocalDB = async (note) => {
    try {

        // Add the new friend!
        const id = await db.notes.add({
            note
        })
        return { _id: id, ...JSON.parse(note) };
    } catch (error) {
        return error;
    }
}

export const updateNoteInLocalDB = async (updatedNote) => {
    // Update the note with the specified id in IndexedDB
    try {
        await db.transaction('rw', db.notes, () => {
            return db.notes.put(updatedNote);
        });
        return { _id: updatedNote.id, ...JSON.parse(updatedNote.note) };
    } catch (error) {
        return error;
    }
};

export const deleteNoteFromLocalDB = async (id) => {
    // Delete the note with the specified id from IndexedDB;
    try {
        await db.transaction('rw', db.notes, () => {
            return db.notes.delete(id);
        });
        return id;
    } catch (error) {
        return error;
    }
};

// Remote DB
export const getNotesFromRemoteDB = async () => {
    try {
        const response = await axios.get('/users/notes');
        return response.data.notes;
    } catch {
        return [];
    }
}

export const addNoteToRemoteDB = async (note) => {
    const response = await axios.post('/users/notes', { note: note });
    return response;
}

export const updateNoteInRemoteDB = async (note) => {
    console.log(note);
    const response = await axios.patch('/users/notes', note);
    return response;
}

export const deleteNotefromRemoteDB = async (id) => {
    const response = await axios.delete(`/users/notes?id=${id}`);
    return response.status;
}
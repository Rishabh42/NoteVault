import { db } from "../localDb";
import axios from '../axios';
import Crypto from "./crypto.service";

export const switchStorage = (storage, notes, key) => {
    if (notes.length) {
        if (storage === 'local') {
            return Promise.all(notes.map(async (note) => {
                await deleteNotefromRemoteDB(note._id);
                delete note._id;
                const encryptedNote = await Crypto.encrypt(key, JSON.stringify(note))
                const id = await addNotetoLocalDB(encryptedNote);
                return { _id: id, ...note };
            }));
        } else if (storage === 'remote') {
            return Promise.all(notes.map(async (note) => {
                await deleteNoteFromLocalDB(note._id);
                delete note._id;
                const encryptedNote = await Crypto.encrypt(key, JSON.stringify(note))
                const response = await addNoteToRemoteDB(encryptedNote);
                return { _id: response.data._id, ...note };
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
        return id;
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
        return { _id: updatedNote._id };
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
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addNoteToRemoteDB = async (note) => {
    const response = await axios.post('/users/notes', { note: note });
    return response;
}

export const updateNoteInRemoteDB = async (note) => {
    const response = await axios.patch('/users/notes', note);
    return response;
}

export const deleteNotefromRemoteDB = async (id) => {
    const response = await axios.delete(`/users/notes?id=${id}`);
    return response.status;
}
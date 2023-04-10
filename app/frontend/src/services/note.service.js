/* --------------------------------------------------------------------
This file contains all functions to manage the notes of the user. 
----------------------------------------------------------------------- */
import { db } from "../localDb";
import axios from '../axios';
import Crypto from "./crypto.service";

/**
 * This function deletes all notes from MongoDB and transfers them to IndexedDB when storage is set to local and vice versa for remote
 * @param {string} storage local or remote
 * @param {{_id: string, title: string, body: string, lastModified: Date}[]} notes array of user's notes
 * @param {string} passphrase the passphrase used while generating the key for encryption and decryption
 * @returns 
 */
export const switchStorage = (storage, notes, passphrase) => {
    if (notes.length) {
        if (storage === 'local') {
            return Promise.all(notes.map(async (note) => {
                await MongoDB.deleteNote(note._id);
                delete note._id;
                // Encrypt the note before saving it
                const encryptedNote = await Crypto.encrypt(passphrase, JSON.stringify(note))
                const id = await IndexedDB.addNote(encryptedNote);
                return { _id: id, ...note };
            }));
        } else if (storage === 'remote') {
            return Promise.all(notes.map(async (note) => {
                await IndexedDB.deleteNote(note._id);
                delete note._id;
                const encryptedNote = await Crypto.encrypt(passphrase, JSON.stringify(note))
                const response = await MongoDB.addNote(encryptedNote);
                return { _id: response.data._id, ...note };
            }));
        }
    };
    return;
}

/**
 * Get the randomly generated passphrase (only for guest mode)
 * @returns 
 */
export const getPassphrase = async () => {
    const id = await db.keys.toArray();
    return id;
}

/**
 * Add passphrase to local DB (only for guest mode)
 * @param {string} passphrase a randomly generated string
 * @returns 
 */
export const addPassphrase = async (passphrase) => {
    try {

        const id = await db.keys.add({
            passphrase
        })
        return id;
    } catch (error) {
        return error;
    }
}


// Class for local storage in IndexedDB
export class IndexedDB {
    /**
     * Retrieve notes saved in IndexedDB
     * @returns 
     */
    static getNotes = async () => {
        const notes = await db.notes.toArray();
        return notes;
    }

    /**
     * Add note to IndexedDB
     * @param {string} note encrypted note string
     * @returns 
     */
    static addNote = async (note) => {
        try {

            const id = await db.notes.add({
                note
            })
            return id;
        } catch (error) {
            return error;
        }
    }

    /**
     * Update an existing note in IndexedDB
     * @param {string} updatedNote encrypted string of updated note
     * @returns 
     */
    static updateNote = async (updatedNote) => {
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

    /**
     * Delete note with the specified id from IndexedDB
     * @param {number} id _id field of the note to be deleted
     * @returns 
     */
    static deleteNote = async (id) => {
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
}


// Class for remote storage in MongoDB
export class MongoDB {
    /**
     * Retrieve notes stored in MongoDB
     * @returns 
     */
    static getNotes = async () => {
        try {
            const response = await axios.get('/users/notes');
            return response.data.notes;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Add note to MongoDB
     * @param {string} note encrypted note string
     * @returns 
     */
    static addNote = async (note) => {
        const response = await axios.post('/users/notes', { note: note });
        return response;
    }

    /**
     * Update note in MongoDB
     * @param {string} note encrypted string of updated note
     * @returns 
     */
    static updateNote = async (note) => {
        const response = await axios.patch('/users/notes', note);
        return response;
    }

    /**
     * Delete note from MongoDB
     * @param {string} id _id field of the note to be deleted
     * @returns 
     */
    static deleteNote = async (id) => {
        const response = await axios.delete(`/users/notes?id=${id}`);
        return response.status;
    }
}


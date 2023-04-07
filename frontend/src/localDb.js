import Dexie from 'dexie';

// Instantiate a new database in IndexedDb
export const db = new Dexie('comp555');
db.version(2).stores({
    notes: '++_id, note', // Primary key and indexed props
    keys: '++id'
});


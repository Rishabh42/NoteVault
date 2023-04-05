import Dexie from 'dexie';

export const db = new Dexie('comp555');
db.version(1).stores({
    notes: '++_id, note', // Primary key and indexed props
});


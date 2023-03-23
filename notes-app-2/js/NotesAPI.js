

export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }


    static async saveNote(noteToSave) {
        const data = JSON.stringify({
            "pinataOptions": {
                "cidVersion": 1
            },
            "pinataMetadata": {
                "name": "testing",
            },
            "pinataContent": {
                "title": noteToSave.title,
                "body": noteToSave.body,
                "updated": new Date().toISOString()
            }
        });

        const PINATA_JWT = "JWT_TOKEN"
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PINATA_JWT}`
            },
            body: data
        };

        const response = await (await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', config)).json();
        console.log(response);
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}

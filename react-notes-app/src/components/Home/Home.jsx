import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NoteListItem = ({ title, lastModified }) => (
    <Box sx={{ background: "#ddd" }}>
        <Typography variant='h6'>{title}</Typography>
        <Typography>{new Date(lastModified).toLocaleDateString()}</Typography>
    </Box>
)

const Home = () => {
    const [notes, setNotes] = React.useState([{ title: "Add title...", body: "", lastModified: Date.now() }]);
    const [index, setIndex] = React.useState(0);

    const addNote = () => {
        setNotes([...notes, { title: "Add title...", body: "", lastModified: Date.now() }])
        setIndex(notes.length + 1)
    }

    const updateTitle = (title) => {
        let updatedNote = notes[index];
        updatedNote.title = title;
        setNotes([...notes.slice(0, index), updatedNote, ...notes.slice(index + 1)])
    }

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container columnGap={2}>
                <Grid xs={4} justifyContent="center" >
                    <Button variant="contained" onClick={addNote}>Add Note</Button>
                    {notes.map((note, i) => (
                        <NoteListItem key={i} title={note.title} lastModified={note.lastModified} />
                    ))}
                </Grid>
                <Grid xs={7}>
                    <Note index={index} title={notes[index].title} body={notes[index].body} setNotes={setNotes} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;

import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

const NoteListItem = ({ title, lastModified }) => (
    <Box sx={{ background: "#ddd" }} >
        <Typography variant='h6'>{title}</Typography>
        <Typography>{new Date(lastModified).toLocaleString()}</Typography>
    </Box>
)

const Home = () => {
    const [notes, setNotes] = React.useState([{ title: "Add title...", body: "", lastModified: Date.now() }]);
    const [index, setIndex] = React.useState(0);

    const addNote = () => {
        setNotes([...notes, { title: "Add title...", body: "", lastModified: Date.now() }])
        setIndex(notes.length)
    }

    const updateTitle = (title) => {
        let updatedNote = notes[index];
        updatedNote.title = title;
        setNotes([...notes.slice(0, index), updatedNote, ...notes.slice(index + 1)])
    }

    const updateBody = (body) => {
        let updatedNote = notes[index];
        updatedNote.body = body;
        setNotes([...notes.slice(0, index), updatedNote, ...notes.slice(index + 1)])
    }

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container columnGap={2}>
                <Grid xs={4} justifyContent="center" >
                    <Button variant="contained" onClick={addNote}>Add Note</Button>
                    {notes.map((note, i) => (
                        <ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }} onClick={() => setIndex(i)}>
                            <NoteListItem key={i} title={note.title || "Title"} lastModified={note.lastModified} />
                        </ButtonBase>
                    ))}
                </Grid>
                <Grid xs={7}>
                    <Note title={notes[index].title} body={notes[index].body} updateTitle={updateTitle} updateBody={updateBody} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;

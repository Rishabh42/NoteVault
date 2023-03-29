
import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CreateNote from '../CreateNote/CreateNote';

const NoteListItem = ({ title, lastModified }) => (
    <Box sx={{ background: "#ddd" }} >
        <Typography variant='h6'>{title}</Typography>
        <Typography>{new Date(lastModified).toLocaleString()}</Typography>
    </Box>
)

const Home = () => {
    const [notes, setNotes] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [mode, setMode] = React.useState(notes.length ? 1 : 0) // 1 - Display note, 0 - Create note

    const addNote = (title, body) => {
        setNotes(prevNotes => [...prevNotes, { title: title, body: body, lastModified: Date.now() }])
        setIndex(notes.length);
        setMode(1);
    }

    const discardNote = () => setMode(1);

    const updateNote = (title, body) => {
        const note = notes[index];
        note.title = title;
        note.body = body;
        note.lastModified = Date.now();
        setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
    }

    React.useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/users/notes', { credentials: 'include' }).then(res => res.text()).then(res => console.log(res))
    }, [])

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container columnGap={2}>
                <Grid xs={4} justifyContent="center" >
                    <Button variant="contained" onClick={() => setMode(0)} disabled={mode === 0}>Add Note</Button>
                    {notes.length === 0 ? <Typography>No Notes</Typography> : notes.map((note, i) => (
                        <ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }} onClick={() => setIndex(i)}>
                            <NoteListItem key={i} title={note.title || "Title"} lastModified={note.lastModified} />
                        </ButtonBase>
                    ))}
                </Grid>
                <Grid xs={7}>
                    {mode ? <Note initTitle={notes[index].title} initBody={notes[index].body} updateNote={updateNote} /> : <CreateNote addNote={addNote} discardNote={discardNote} />}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;

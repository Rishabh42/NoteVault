
import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import CreateNote from '../CreateNote/CreateNote';
import axios from "../../axios";
import { useNavigate } from 'react-router-dom';

const NoteListItem = ({ title, lastModified }) => (
    <Box sx={{ background: "#ddd" }} >
        <Typography variant='h6'>{title}</Typography>
        <Typography>{new Date(lastModified).toLocaleString()}</Typography>
    </Box>
)

const Home = () => {
    const navigate = useNavigate()
    const [notes, setNotes] = React.useState([]); // {_id: string, title: string, body: string, lastModified: Date}
    const [index, setIndex] = React.useState(0);
    const [mode, setMode] = React.useState(0) // 1 - Display note, 0 - Create note

    React.useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/users/notes');
                if (response.data.notes.length) {
                    setNotes(response.data.notes.map(x => ({ id: x._id, ...JSON.parse(x.note) })));
                    setMode(1);
                }
            } catch {
                navigate('/');
            }
        })();
    }, [])

    const addNote = async (title, body) => {
        const note = { title: title, body: body, lastModified: Date.now() };
        const response = await axios.post('/users/notes', { note: JSON.stringify(note) });
        console.log(response);
        if (response.status === 201) {
            setNotes(prevNotes => [...prevNotes, response.data])
            setIndex(notes.length);
            setMode(1);
        } else if (response.status === 401) {
            navigate('/');
        } else { alert("Error creating note"); }
    }

    const updateNote = async (title, body) => {
        const lastModified = Date.now();
        const response = await axios.patch('/users/notes', { id: notes[index].id, note: JSON.stringify({ title, body, lastModified }) })
        if (response.status === 204) {
            const note = { id: notes[index].id, title, body, lastModified };
            setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
        } else if (response.status === 401) {
            navigate('/');
        } else {
            alert("Error updating note");
        }
    }

    const deleteNote = async () => {
        const response = await axios.delete(`/users/notes?id=${notes[index].id}`)
        if (response.status === 204) {
            setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
            setIndex(Math.max(index - 1, 0));
        } else if (response.status === 401) {
            navigate('/');
        } else {
            alert("Error deleting note");
        }
    }

    const discardNote = () => setMode(1);

    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container columnGap={2}>
                <Grid xs={4} justifyContent="center" >
                    <Button variant="contained" onClick={() => setMode(0)} disabled={mode === 0}>Add Note</Button>
                    {notes.length === 0 ? <Typography>No Notes</Typography> : notes.map((note, i) => (
                        <ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }} onClick={() => setIndex(i)}>
                            <NoteListItem key={note.id} title={note.title || "Title"} lastModified={note.lastModified} />
                        </ButtonBase>
                    ))}
                </Grid>
                <Grid xs={7}>
                    {mode && notes.length > 0 ? <Note initTitle={notes[index].title} initBody={notes[index].body} updateNote={updateNote} deleteNote={deleteNote} /> : <CreateNote addNote={addNote} discardNote={discardNote} />}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;

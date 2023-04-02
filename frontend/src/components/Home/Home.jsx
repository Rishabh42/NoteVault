
import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CreateNote from '../CreateNote/CreateNote';
import axios from "../../axios";
import { useNavigate } from 'react-router-dom';
import NoteAdd from "@mui/icons-material/NoteAdd";
import NoNotes from "../../assets/images/no_notes.svg"
import { addNoteToRemoteDB, addNotetoLocalDB, deleteNoteFromLocalDB, deleteNotefromRemoteDB, getNotesFromLocalDB, getNotesFromRemoteDB, updateNoteInLocalDB, updateNoteInRemoteDB } from '../../services/note.service';

const NoteListItem = ({ title, lastModified }) => (
    <Card sx={{ backgroundColor: "primary.dark", my: 1, boxShadow: 3 }}>
        <CardContent>
            <Typography variant='h6' fontWeight="bold" color="white">{title}</Typography>
            <Typography color="white">{new Date(lastModified).toLocaleString()}</Typography>
        </CardContent>
    </Card>
)

const Home = ({ storage }) => {
    const navigate = useNavigate()
    const [notes, setNotes] = React.useState([]); // {_id: string, title: string, body: string, lastModified: Date}
    const [index, setIndex] = React.useState(0);
    const [mode, setMode] = React.useState(0); // 1 - Display note, 0 - Create note

    React.useEffect(() => {
        (async () => {
            try {
                let notes = [];
                if (storage === 'local')
                    notes = await getNotesFromLocalDB();
                else
                    notes = await getNotesFromRemoteDB();
                if (notes.length) {
                    setNotes(notes.map(x => ({ _id: x._id, ...JSON.parse(x.note) })));
                    setMode(1);
                }
            } catch {
                navigate('/');
            }
        })();
    }, [storage])

    const addNote = async (title, body) => {
        const note = JSON.stringify({ title: title, body: body, lastModified: Date.now() });
        // encrypt `note`
        if (storage === 'local') {
            try {
                const response = await addNotetoLocalDB(note);
                setNotes(prevNotes => [...prevNotes, response])
                setIndex(notes.length);
                setMode(1);
            } catch (error) {
                alert(`Failed to add note: ${error}`);
            }
        } else {
            const response = await addNoteToRemoteDB(note);
            if (response.status === 201) {
                setNotes(prevNotes => [...prevNotes, response.data])
                setIndex(notes.length);
                setMode(1);
            } else if (response.status === 401) {
                navigate('/');
            } else { alert("Error creating note"); }
        }
    }

    const updateNote = async (title, body) => {
        const lastModified = Date.now();
        const note = { _id: notes[index]._id, note: JSON.stringify({ title, body, lastModified }) };
        // encrypt `note`
        if (storage === 'local') {
            try {
                const response = await updateNoteInLocalDB(note);
                setNotes([...notes.slice(0, index), response, ...notes.slice(index + 1)])
            } catch {
                alert("Error updating note");
            }

        } else {
            const response = await updateNoteInRemoteDB()
            if (response.status === 204) {
                setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
            } else if (response.status === 401) {
                navigate('/');
            } else {
                alert("Error updating note");
            }
        }
    }

    const deleteNote = async () => {
        const id = notes[index]._id;
        if (storage === 'local') {
            try {
                await deleteNoteFromLocalDB(id);
                setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
            } catch {
                alert("Error deleting note");
            }
        } else {
            const status = await deleteNotefromRemoteDB(id);
            if (status === 204) {
                setNotes([...notes.slice(0, index), ...notes.slice(index + 1)]);
                setIndex(Math.max(index - 1, 0));
            } else if (status === 401) {
                navigate('/');
            } else {
                alert("Error deleting note");
            }
        }
    }

    const discardNote = () => setMode(1);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columnGap={2}>
                <Grid xs={3} sx={{ borderRight: '#eee 1px solid', }} m={2} >
                    <Button variant="contained" onClick={() => setMode(0)} disabled={mode === 0}><NoteAdd /> Add Note</Button>
                    {notes.length === 0 ? <><Typography variant='h5' textAlign="center" m={4} color="primary">Let's make some notes!</Typography> <img src={NoNotes} width="70%" alt="No notes found" /> </> : notes.map((note, i) => (
                        <ButtonBase sx={{ display: "block", width: "95%", textAlign: "left" }} onClick={() => setIndex(i)}>
                            <NoteListItem key={note._id} title={note.title || "Title"} lastModified={note.lastModified} />
                        </ButtonBase>
                    ))}
                </Grid>
                <Grid xs={8} m={2}>
                    {mode && notes.length > 0 ? <Note initTitle={notes[index].title} initBody={notes[index].body} updateNote={updateNote} deleteNote={deleteNote} /> : <CreateNote addNote={addNote} discardNote={discardNote} />}
                </Grid>
            </Grid >
        </Box >
    )
}

export default Home;

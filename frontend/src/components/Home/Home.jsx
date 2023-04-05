
import * as React from 'react';
import Note from "../Note/Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CreateNote from '../CreateNote/CreateNote';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Web3 from 'web3';
import NoteAdd from "@mui/icons-material/NoteAdd";
import NoNotes from "../../assets/images/no_notes.svg"
import { addLocalSecretKey, addNoteToRemoteDB, addNotetoLocalDB, deleteNoteFromLocalDB, deleteNotefromRemoteDB, getLocalSecretKey, getNotesFromLocalDB, getNotesFromRemoteDB, switchStorage, updateNoteInLocalDB, updateNoteInRemoteDB } from '../../services/note.service';
import crypto from "crypto";
import Crypto from '../../services/crypto.service';


const NoteListItem = ({ title, lastModified }) => (
    <Card sx={{ backgroundColor: "primary.dark", my: 1, boxShadow: 3 }}>
        <CardContent>
            <Typography variant='h6' fontWeight="bold" color="white">{title}</Typography>
            <Typography color="white">{new Date(lastModified).toLocaleString()}</Typography>
        </CardContent>
    </Card>
)

const Home = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]); // {_id: string, title: string, body: string, lastModified: Date}
    const [index, setIndex] = React.useState(0);
    const [mode, setMode] = React.useState(0); // 1 - Display note, 0 - Create note
    const [storage, setStorage] = React.useState('');

    React.useEffect(() => {
        const type = localStorage.getItem('storage');
        if (type)
            setStorage(type);
        else
            setStorage('local');
    }, [])

    React.useEffect(() => {
        (async () => {
            try {
                let notes = [];
                if (storage === 'local')
                    notes = await getNotesFromLocalDB();
                else if (storage === 'remote')
                    notes = await getNotesFromRemoteDB();
                if (notes.length) {
                    const key = await getKey();
                    const decryptedNotes = await Promise.all(notes.map(async (x) => {
                        const decryptedNote = await Crypto.decrypt(key, x.note);
                        return { _id: x._id, ...JSON.parse(decryptedNote) };
                    }));
                    setNotes(decryptedNotes);
                    setMode(1);
                }
            } catch (e) {
                //navigate('/');
            }
        })();
    }, [storage]);

    const getKey = async () => {
        let web3 = new Web3(window.ethereum);
        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            const id = await getLocalSecretKey();
            if (id.length)
                return id[0];
            else {
                const key = crypto.randomBytes(20).toString('hex');
                await addLocalSecretKey(key);
                return key;
            }
        }
        return coinbase;
    };

    const handleChange = async (event) => {
        const type = event.target.checked ? 'local' : 'remote';
        setStorage(type);
        localStorage.setItem('storage', type);
        const key = await getKey();
        const switchedNotes = await switchStorage(type, notes, key);
        if (switchedNotes) setNotes(switchedNotes);
    };

    const addNote = async (title, body) => {
        const key = await getKey();
        const note = { title: title, body: body, lastModified: Date.now() };
        const encryptedNote = await Crypto.encrypt(key, JSON.stringify(note));
        if (storage === 'local') {
            try {
                const id = await addNotetoLocalDB(encryptedNote);
                setNotes(prevNotes => [...prevNotes, { _id: id, ...note }])
                setIndex(notes.length);
                setMode(1);
            } catch (error) {
                alert(`Failed to add note: ${error}`);
            }
        } else if (storage === 'remote') {
            const response = await addNoteToRemoteDB(encryptedNote);
            if (response.status === 201) {
                setNotes(prevNotes => [...prevNotes, { _id: response.data._id, ...note }])
                setIndex(notes.length);
                setMode(1);
            } else if (response.status === 401) {
                navigate('/');
            } else { alert("Error creating note"); }
        }
    }

    const updateNote = async (title, body) => {
        const lastModified = Date.now();
        const note = { _id: notes[index]._id, title, body, lastModified };
        const key = await getKey();
        const encryptedNote = await Crypto.encrypt(key, JSON.stringify({ title, body, lastModified }));
        const updatedNote = { _id: notes[index]._id, note: encryptedNote }
        if (storage === 'local') {
            try {
                await updateNoteInLocalDB(updatedNote);
                setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
            } catch {
                alert("Error updating note");
            }

        } else if (storage === 'remote') {
            const response = await updateNoteInRemoteDB(updatedNote);
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
                setNotes(notes => notes.filter((x, i) => i !== index));
                setIndex(Math.max(index - 1, 0));
            } catch {
                alert("Error deleting note");
            }
        } else if (storage === 'remote') {
            const status = await deleteNotefromRemoteDB(id);
            if (status === 204) {
                setNotes(notes => notes.filter((x, i) => i !== index));
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
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="contained" onClick={() => setMode(0)} disabled={mode === 0}><NoteAdd /> Add Note</Button>
                        {!searchParams.get('mode') && <FormControlLabel
                            control={
                                <Switch checked={storage === 'local'} onChange={handleChange} name="storage" />
                            }
                            label="Store locally"
                        />}
                    </Stack>
                    {notes.length === 0 ? <><Typography variant='h5' textAlign="center" m={4} color="primary">Let's make some notes!</Typography> <img src={NoNotes} width="70%" alt="No notes found" /> </> : notes.map((note, i) => (
                        <ButtonBase key={note._id} sx={{ display: "block", width: "95%", textAlign: "left" }} onClick={() => setIndex(i)}>
                            <NoteListItem title={note.title || "Title"} lastModified={note.lastModified} />
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

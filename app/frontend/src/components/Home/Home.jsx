
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
import crypto from "crypto";
import Crypto from '../../services/crypto.service';
import { IndexedDB, MongoDB, switchStorage, getPassphrase, addPassphrase } from '../../services/note.service';

/**
 * Component for the note widget in the left panel of the homepage.
 * @param {Object} param0 
 * @returns 
 */
const NoteListItem = ({
    title,
    lastModified
}) => (
    <Card sx={{ backgroundColor: "primary.dark", my: 1, boxShadow: 3 }}>
        <CardContent>
            <Typography variant='h6' fontWeight="bold" color="white">{title}</Typography>
            <Typography color="white">{new Date(lastModified).toLocaleString()}</Typography>
        </CardContent>
    </Card>
)

/**
 * Component that displays and manages all the notes created by the user. This is the homepage of the application after the user is authenticated. 
 * @returns 
 */
const Home = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // State variable that holds the note 
    // Format: {_id: string, title: string, body: string, lastModified: Date}
    const [notes, setNotes] = React.useState([]);

    // State variable to manage array index of selected note
    const [index, setIndex] = React.useState(0);

    // State variable for storage type ('local' or 'remote)
    const [storage, setStorage] = React.useState('');

    // State variable to manage whether the right panel displays the create note component or display note component
    // 1 - Display note, 0 - Create note
    const [mode, setMode] = React.useState(0);


    React.useEffect(() => {
        // Retrieves user selected storage: remote or local
        const type = localStorage.getItem('storage');
        if (type)
            setStorage(type);
        else
            setStorage('local');
    }, [])

    React.useEffect(() => {
        // Retrieves all the notes from the respective database on page load
        (async () => {
            try {
                let notes = [];
                if (storage === 'local')
                    notes = await IndexedDB.getNotes()
                else if (storage === 'remote')
                    notes = await MongoDB.getNotes();
                if (notes.length) {
                    const key = await getAddress();
                    const decryptedNotes = await Promise.all(notes.map(async (x) => {
                        const decryptedNote = await Crypto.decrypt(key, x.note);
                        return { _id: x._id, ...JSON.parse(decryptedNote) };
                    }));
                    setNotes(decryptedNotes);
                    setMode(1);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [storage]);

    /**
     * This function retrieves the Metamask account public address of the user that is used to derive the private key
     * @returns 
     */
    const getAddress = async () => {
        let web3 = new Web3(window.ethereum);
        const coinbase = await web3.eth.getCoinbase();
        // If in guest mode, retrieve or generate a random string to be used as passphrase
        if (!coinbase) {
            const id = await getPassphrase();
            if (id.length)
                return id[0];
            else {
                const key = crypto.randomBytes(20).toString('hex');
                await addPassphrase(key);
                return key;
            }
        }
        return coinbase;
    };

    /**
     * This function is called when the user toggles the mode of storage. The following actions take place
     * 1. Update local storage variable for storage type
     * 2. Transfer the notes from one mode of storage to the other
     * @param {*} event 
     */
    const handleChange = async (event) => {
        const type = event.target.checked ? 'local' : 'remote';
        setStorage(type);
        localStorage.setItem('storage', type);
        const key = await getAddress();
        const switchedNotes = await switchStorage(type, notes, key);
        if (switchedNotes) setNotes(switchedNotes);
    };

    /**
     * This function is called when the user clicks on the Save button in the create note mode
     * 1. Encrypts note and saves it in the respective database
     * 2. Updates state of `notes` to reflect changes in the UI
     * @param {string} title 
     * @param {} body 
     */
    const addNote = async (title, body) => {
        const key = await getAddress();
        const note = { title: title, body: body, lastModified: Date.now() };
        const encryptedNote = await Crypto.encrypt(key, JSON.stringify(note));
        if (storage === 'local') {
            try {
                const id = await IndexedDB.addNote(encryptedNote);
                setNotes(prevNotes => [...prevNotes, { _id: id, ...note }])
                setIndex(notes.length);
                setMode(1);
            } catch (error) {
                alert(`Failed to add note: ${error}`);
            }
        } else if (storage === 'remote') {
            const response = await MongoDB.addNote(encryptedNote);
            if (response.status === 201) {
                setNotes(prevNotes => [...prevNotes, { _id: response.data._id, ...note }])
                setIndex(notes.length);
                setMode(1);
            } else if (response.status === 401) {
                navigate('/');
            } else { alert("Error creating note"); }
        }
    }

    /**
     * The function is called when the user clicks on the Save button in the display note mode
     * 1. Encrypts modified note and updates it in the respective database
     * 2  Updates state of `note` to reflect changes in the UI
     * @param {string} title 
     * @param {string} body 
     */
    const updateNote = async (title, body) => {
        const lastModified = Date.now();
        const note = { _id: notes[index]._id, title, body, lastModified };
        const key = await getAddress();
        const encryptedNote = await Crypto.encrypt(key, JSON.stringify({ title, body, lastModified }));
        const updatedNote = { _id: notes[index]._id, note: encryptedNote }
        if (storage === 'local') {
            try {
                await IndexedDB.updateNote(updatedNote);
                setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
            } catch {
                alert("Error updating note");
            }

        } else if (storage === 'remote') {
            const response = await MongoDB.updateNote(updatedNote);
            if (response.status === 204) {
                setNotes([...notes.slice(0, index), note, ...notes.slice(index + 1)])
            } else if (response.status === 401) {
                navigate('/');
            } else {
                alert("Error updating note");
            }
        }
    }

    /**
     * This function is called when the user clicks on the Delete button in the display note mode. Deletes the currently selected note.
     */
    const deleteNote = async () => {
        const id = notes[index]._id;
        if (storage === 'local') {
            try {
                await IndexedDB.deleteNote(id);
                setNotes(notes => notes.filter((x, i) => i !== index));
                setIndex(Math.max(index - 1, 0));
            } catch {
                alert("Error deleting note");
            }
        } else if (storage === 'remote') {
            const status = await MongoDB.deleteNote(id);
            if (status === 204) {
                setNotes(notes => notes.filter((x, i) => i !== index));
                // Update index of the currently selected note to the previous note
                setIndex(Math.max(index - 1, 0));
            } else if (status === 401) {
                navigate('/');
            } else {
                alert("Error deleting note");
            }
        }
    }

    /**
     * This function discards the note when the user clicks on Discard in create note mode
     * @returns 
     */
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

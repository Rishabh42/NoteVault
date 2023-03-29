
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

const CreateNote = ({ addNote, discardNote }) => {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    const handleSave = () => {
        addNote(title, body);
    }


    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: "90vh",
            }}
        >
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="contained" onClick={discardNote}>Discard</Button>
            <InputBase fullWidth placeholder="Add title..." value={title} onChange={(e) => setTitle(e.target.value)} />
            <InputBase multiline fullWidth maxRows={Infinity} placeholder="Add body..." sx={{ mt: 3 }} value={body} onChange={(e) => setBody(e.target.value)} />
        </Box>
    )
};

export default CreateNote;
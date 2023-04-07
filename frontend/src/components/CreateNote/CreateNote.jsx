import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/DeleteSweep';

/**
 * A component for creating a new note that takes in the title and body of the note 
 * @param {Object} param0 
 * @returns 
 */
const CreateNote = ({
    addNote, // Function to save the note in the respective database and update the state of the notes in the `Home` component
    discardNote // Function to discard the note 
}) => {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    /**
     * Function save the note
     */
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
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridAutoFlow: 'row',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr 1fr 16fr',
                    gap: 1,
                    height: "100%",
                    alignItems: "flex-start"
                }}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Button variant="contained" onClick={handleSave}><Save />Save</Button>
                    <Button variant="contained" onClick={discardNote}><Delete />Discard</Button>
                </Stack>

                <InputBase fullWidth sx={{
                    '&.MuiInputBase-root': {
                        fontSize: 25,
                        color: 'primary.dark',
                        background: "#efefef",
                        p: 1,
                        borderRadius: 3
                    },
                }} placeholder="Add title..." value={title} onChange={(e) => setTitle(e.target.value)} />

                <InputBase multiline fullWidth maxRows={Infinity} placeholder="Add body..." sx={{
                    height: "90%", '&.MuiInputBase-root': {
                        background: "#efefef",
                        p: 1,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    },
                }} value={body} onChange={(e) => setBody(e.target.value)} />

            </Box>
        </Box>
    )
};

export default CreateNote;
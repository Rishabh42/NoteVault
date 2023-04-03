import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';


const Note = ({ initTitle, initBody, updateNote, deleteNote }) => {
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    React.useEffect(() => {
        setTitle(initTitle);
        setBody(initBody);
    }, [initTitle, initBody])

    const handleSave = () => {
        updateNote(title, body);
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
                    height: "100%"
                }}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Button variant="contained" onClick={handleSave}><Save />Save</Button>
                    <Button variant="contained" onClick={deleteNote}><Delete />Delete</Button>
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

export default Note;
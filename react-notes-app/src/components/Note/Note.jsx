import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

const Note = ({ title, body, setNotes }) => {
    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: "90vh",
            }}
        >
            <Button variant="contained">Save</Button>
            <InputBase fullWidth placeholder="Add title..." value={title} />
            <InputBase multiline fullWidth maxRows={Infinity} placeholder="Add body..." sx={{ mt: 3 }} value={body} />
        </Box>
    )
};

export default Note;
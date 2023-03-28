
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

const Note = ({ title, body, updateTitle, updateBody }) => {

    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: "90vh",
            }}
        >
            <Button variant="contained">Save</Button>
            <InputBase fullWidth placeholder="Add title..." value={title} onChange={(e) => updateTitle(e.target.value)} />
            <InputBase multiline fullWidth maxRows={Infinity} placeholder="Add body..." sx={{ mt: 3 }} value={body} onChange={(e) => updateBody(e.target.value)} />
        </Box>
    )
};

export default Note;